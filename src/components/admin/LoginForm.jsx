import { useState } from "react"
import { login, isAdminUser, logout } from "../../data/pocketbaseUtils"

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      await login(email, password)
      if (!isAdminUser()) {
        logout()
        setError("You do not have admin access")
        return
      }
      onLoginSuccess()
    } catch (err) {
      setError(err.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="admin-login-form" onSubmit={handleSubmit}>
      <h1>Admin Login</h1>
      {error && <div className="admin-error">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  )
}
