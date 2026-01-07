import PocketBase from "pocketbase"

const pb = new PocketBase(import.meta.env.VITE_PB_URL)

export const getPb = () => {
  return pb
}
export const checkIfLoggedIn = (): boolean => {
  return pb.authStore.isValid
}

export const isAdminUser = (): boolean => {
  return pb.authStore.isValid && pb.authStore.record?.isAdmin === true
}
export const logout = () => {
  pb.authStore.clear()
}

export const login = async (email: string, password: string) => {
  return await pb.collection("users").authWithPassword(email, password)
}

// export async function initiateSignUp() {
//   await pb.collection("users").authWithOAuth2({ provider: "github" })
// }
