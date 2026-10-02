# Biolink

Inspired by @craftzdog's Link-In-Bio project and Linktree musician pages, I've built a simple React link page for my Instagram bio.

## Features

1. Links and YouTube embeds are loaded from PocketBase's public `bioLinks` collection. The admin UI signs in through the `users` auth collection to manage links.

2. A "Socials" grid of React components which include a tooltip indicating platform names for users unaware of platform branding.

## Local setup

Use Node 22.12+ (tested with 22.22.2) and npm:

```sh
npm ci
cp .env.example .env
npm run dev
```

Set `VITE_PB_URL` to your own PocketBase endpoint. It is public, browser-visible configuration, embedded at build time; never put passwords or superuser tokens in `VITE_*` variables. Restart Vite after changing it and rebuild for deployment.

### Backend contract

The JS SDK is pinned to **0.28.1**, tested against **PocketBase 0.40.4**. Installing npm dependencies does not install or upgrade the backend. For manual local development, run a separate 0.40.4 binary with a fresh data directory, bind to loopback (`serve --http=127.0.0.1:8090 --dir=/absolute/path/to/local/pb_data`), and configure these collections through its local dashboard. Keep local hooks/migrations separate from any existing backend.

- `users`: auth collection with email/password authentication and an `isAdmin` bool. The app uses `authStore.record?.isAdmin === true` as its admin UI gate and `authStore.clear()` for signout. Superusers are only for backend administration, not frontend login.
- `bioLinks`: base collection with required `linkText` text; optional `href` URL, `youTubeId` text and `youTubeTitle` text; standard `created`/`updated` autodate fields.
- Live `bioLinks` list/view rules are empty strings (public). Create/update/delete rules are exactly `@request.auth.id = "5g7ujooyvtijiy0"`. A different user's `isAdmin: true` does **not** grant write access. The UI gate is not a security boundary.
- The homepage calls `getList(1, 50, { sort: "-created", fields: "linkText, href, youTubeId, youTubeTitle" })`. The admin list requests page 1, 100 records, newest first, without projection.

These describe the existing contract, not instructions to loosen production security. A fresh backend will not automatically contain this schema or the authorized user. The integration test below provisions an isolated fixture, including that user ID, without changing any existing backend. Backend upgrades, production migrations/backups, and Likes are managed separately; this test does not verify an existing-data migration.

### Compatibility verification

```sh
npm test                 # clearly skips when PB_BINARY is unset
PB_BINARY=/home/gvp/.local/share/gvp-pocketbase-restore/bin/0.40.4/pocketbase npm test
npm run build
```

`PB_BINARY` must point to a trusted 0.40.4 executable. The test imports the actual installed SDK, creates a fresh temporary database, random superuser credentials and fixture user credentials, and starts a loopback-only server on an ephemeral port. Data, hooks, migrations and public directories are all isolated; the process and temporary files are cleaned up on completion. It never uses `VITE_PB_URL` or a production endpoint.

Assertions cover the exact public projection and ordering, public record view, ordinary `users` authentication and `authStore.record.isAdmin`, authorized CRUD, field validation, rejected anonymous/other-user writes (including another `isAdmin` user), and signout. Denied creates return 400; rule-filtered updates/deletes return 404. This is SDK/backend contract coverage, not browser/UI automation.

### Lockfile synchronization notes

The previous lockfile was stale beyond PocketBase. Only the PocketBase dependency declaration changed (`^0.26.5` → exact `0.28.1`); all unrelated manifest dependency ranges were preserved. Synchronizing with npm 10 (retaining lockfile format 2) also resolved existing manifest intent:

| Dependency | Previous lock | Synchronized lock |
| --- | --- | --- |
| pocketbase | 0.22.1 | 0.28.1 |
| @emotion/react | 11.13.5 | 11.14.0 |
| @radix-ui/react-tooltip | 1.1.4 | 1.2.16 |
| @tanstack/react-query | 5.59.20 | 5.104.1 |
| @tanstack/react-router | absent | 1.170.41 |
| react / react-dom | 18.3.1 | 19.3.0 |
| react-lite-youtube-embed | 2.4.0 | 3.7.0 |
| @types/react | 18.3.12 | 19.3.0 |
| @types/react-dom | 18.3.1 | 19.3.0 |
| @vitejs/plugin-react | 4.3.4 | 5.2.0 |
| vite | 6.0.1 | 7.3.6 |

Across lockfile package entries, 29 were added, 9 removed and 112 changed version (including PocketBase and transitive changes). The stale `npm-check-updates` entry was removed because it is absent from the manifest. `npm ci` succeeds. npm reports two moderate advisories (`@babel/runtime`, `yaml`); no unrelated audit fix was applied.

## Learning Experiences

- first time using Lighthouse scoring and analysis to optimize perforance
- used HSL colour schemes to adjust shades in a simplified way and to create an accessible and readable theme
- first time using component libraries (Radix and Mantine in this case) to implement handy UI features
  - I tried a few options before settling on the simplest solutions for tooltip and animation functionality
  - animation implementation revealed an issue with the flexbox gap property which led me back to margins for spacing

## To Do

- test Radix collapsible
- Youtube playlists via react-lite-youtube-embed
- create data folder for mutiple links lists
- pass in links data as a prop for LinksList(s) for reusability
- give images width and height to prevent ui jumps
- refactor and move css into components for easier maintenence
- react icons instead of hosting SVG files
- iterate into SocialIconsGrid instead of hard-coding
