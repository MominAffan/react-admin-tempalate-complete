"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider")
  }
  return context
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem("authToken")
    if (token) {
      // Simulate user data - in real app, validate token with API
      setUser({
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
      })
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulate API call
    if (email === "admin@example.com" && password === "admin123") {
      const userData = {
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
      }
      setUser(userData)
      localStorage.setItem("authToken", "fake-jwt-token")
      return { success: true }
    }
    return { success: false, error: "Invalid credentials" }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("authToken")
  }

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
}
