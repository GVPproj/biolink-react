import assert from "node:assert/strict"
import { spawn, execFileSync } from "node:child_process"
import { randomBytes } from "node:crypto"
import { mkdtemp, rm } from "node:fs/promises"
import { createServer } from "node:net"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import { setTimeout as delay } from "node:timers/promises"
import test from "node:test"
import PocketBase from "pocketbase"

const binary = process.env.PB_BINARY
const authorizedId = "5g7ujooyvtijiy0"
const secret = () => randomBytes(24).toString("hex")
const email = () => `${secret()}@example.test`

async function freePort() {
  const server = createServer()
  await new Promise((resolve, reject) => {
    server.once("error", reject)
    server.listen(0, "127.0.0.1", resolve)
  })
  const { port } = server.address()
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
  return port
}

test("installed SDK compatibility with fresh PocketBase 0.40.4", {
  skip: !binary && "Set PB_BINARY to a PocketBase 0.40.4 executable; no backend requests made",
  timeout: 60_000,
}, async t => {
  const executable = resolve(binary)
  assert.match(execFileSync(executable, ["--version"], { encoding: "utf8" }), /\b0\.40\.4\b/)
  const root = await mkdtemp(join(tmpdir(), "biolink-pb-test-"))
  let child
  let stopped
  let logs = ""
  // Override every filesystem location: never load existing data, hooks or migrations.
  const flags = ["--dir", join(root, "data"), "--hooksDir", join(root, "hooks"),
    "--migrationsDir", join(root, "migrations"), "--publicDir", join(root, "public")]
  try {
    const adminEmail = email()
    const adminPassword = secret()
    execFileSync(executable, ["superuser", "upsert", adminEmail, adminPassword, ...flags], {
      cwd: root, stdio: "pipe", timeout: 15_000,
    })
    const port = await freePort()
    const url = `http://127.0.0.1:${port}`
    child = spawn(executable, ["serve", "--http", `127.0.0.1:${port}`, ...flags], { cwd: root })
    stopped = new Promise(resolve => {
      child.once("exit", resolve)
      child.once("error", error => { logs += error.message; resolve() })
    })
    child.stdout.on("data", data => { logs += data })
    child.stderr.on("data", data => { logs += data })
    const admin = new PocketBase(url)
    let ready = false
    for (let attempt = 0; attempt < 100; attempt++) {
      try {
        await admin.health.check({ requestKey: null, signal: AbortSignal.timeout(500) })
        ready = true
        break
      } catch {
        if (child.exitCode !== null || child.signalCode !== null) break
        await delay(50)
      }
    }
    assert.ok(ready, `Temporary PocketBase did not start: ${logs}`)
    await admin.collection("_superusers").authWithPassword(adminEmail, adminPassword)
    const users = await admin.collections.getOne("users")
    await admin.collections.update(users.id, {
      fields: [...users.fields, { name: "isAdmin", type: "bool" }],
      passwordAuth: { enabled: true, identityFields: ["email"] },
    })
    const writeRule = `@request.auth.id = "${authorizedId}"`
    await admin.collections.create({
      name: "bioLinks", type: "base", listRule: "", viewRule: "",
      createRule: writeRule, updateRule: writeRule, deleteRule: writeRule,
      fields: [
        { name: "linkText", type: "text", required: true },
        { name: "href", type: "url" },
        { name: "youTubeId", type: "text" },
        { name: "youTubeTitle", type: "text" },
        { name: "created", type: "autodate", onCreate: true },
        { name: "updated", type: "autodate", onCreate: true, onUpdate: true },
      ],
    })
    async function fixtureUser(isAdmin, id) {
      const identity = email()
      const password = secret()
      const record = await admin.collection("users").create({
        ...(id ? { id } : {}), email: identity, password, passwordConfirm: password, isAdmin,
      })
      const client = new PocketBase(url)
      await client.collection("users").authWithPassword(identity, password)
      assert.equal(client.authStore.isValid, true)
      assert.equal(client.authStore.record.id, record.id)
      assert.equal(client.authStore.record.collectionName, "users")
      assert.equal(client.authStore.record.isAdmin, isAdmin)
      return client
    }
    const owner = await fixtureUser(true, authorizedId)
    const other = await fixtureUser(false)
    // isAdmin is a UI gate, not the live write rule: even another admin is denied.
    const otherAdmin = await fixtureUser(true)
    const anonymous = new PocketBase(url)
    const older = await owner.collection("bioLinks").create({ linkText: "Older", href: "https://example.test/older" })
    await delay(30)
    const newer = await owner.collection("bioLinks").create({ linkText: "Newer", youTubeId: "fixture", youTubeTitle: "Video" })

    await t.test("exact public homepage projection and newest-first ordering", async () => {
      assert.ok(newer.created > older.created)
      const page = await anonymous.collection("bioLinks").getList(1, 50, {
        sort: "-created",
        fields: "linkText, href, youTubeId, youTubeTitle",
      })
      assert.deepEqual(page.items, [
        { linkText: "Newer", href: "", youTubeId: "fixture", youTubeTitle: "Video" },
        { linkText: "Older", href: "https://example.test/older", youTubeId: "", youTubeTitle: "" },
      ])
      assert.equal((await anonymous.collection("bioLinks").getOne(older.id)).linkText, "Older")
    })

    async function deniedWrites(client) {
      await assert.rejects(client.collection("bioLinks").create({ linkText: "Forbidden" }), error => error.status === 400)
      await assert.rejects(client.collection("bioLinks").update(older.id, { linkText: "Forbidden" }), error => error.status === 404)
      await assert.rejects(client.collection("bioLinks").delete(older.id), error => error.status === 404)
      assert.equal((await anonymous.collection("bioLinks").getOne(older.id)).linkText, "Older")
      assert.equal((await anonymous.collection("bioLinks").getList(1, 50)).totalItems, 2)
    }
    await t.test("anonymous and other users cannot write", async () => {
      for (const client of [anonymous, other, otherAdmin]) await deniedWrites(client)
    })
    await t.test("authorized users auth supports CRUD and schema validation", async () => {
      await assert.rejects(owner.collection("bioLinks").create({ href: "https://example.test" }), error => error.status === 400)
      await assert.rejects(owner.collection("bioLinks").create({ linkText: "Bad URL", href: "not-a-url" }), error => error.status === 400)
      const updated = await owner.collection("bioLinks").update(newer.id, { linkText: "Updated", href: "https://example.test/updated" })
      assert.equal(updated.linkText, "Updated")
      assert.equal((await anonymous.collection("bioLinks").getOne(newer.id)).href, "https://example.test/updated")
      assert.equal(await owner.collection("bioLinks").delete(newer.id), true)
      await assert.rejects(anonymous.collection("bioLinks").getOne(newer.id), error => error.status === 404)
    })
    await t.test("signout clears record/token and denies subsequent writes", async () => {
      owner.authStore.clear()
      assert.equal(owner.authStore.isValid, false)
      assert.equal(owner.authStore.record, null)
      assert.equal(owner.authStore.token, "")
      await assert.rejects(owner.collection("bioLinks").create({ linkText: "Signed out" }), error => error.status === 400)
      await assert.rejects(owner.collection("bioLinks").update(older.id, { linkText: "Signed out" }), error => error.status === 404)
      await assert.rejects(owner.collection("bioLinks").delete(older.id), error => error.status === 404)
    })
  } finally {
    if (child && child.exitCode === null && child.signalCode === null) {
      child.kill("SIGTERM")
      const killTimer = setTimeout(() => child.kill("SIGKILL"), 3000)
      await stopped
      clearTimeout(killTimer)
    }
    await rm(root, { recursive: true, force: true })
  }
})
