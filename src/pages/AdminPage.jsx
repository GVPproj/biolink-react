import { useState, useEffect } from "react"
import { isAdminUser, logout } from "../data/pocketbaseUtils"
import LoginForm from "../components/admin/LoginForm"
import AuthenticatedView from "../components/admin/AuthenticatedView"
import "../css/admin.css"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setIsAuthenticated(isAdminUser())
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(isAdminUser())
  }

  const handleLogout = () => {
    logout()
    setIsAuthenticated(false)
  }

  return (
    <div className="admin-container">
      {isAuthenticated ? (
        <AuthenticatedView onLogout={handleLogout} />
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  )
}
