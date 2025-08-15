"use client"

import { createContext, useContext, useState } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { lightTheme, darkTheme } from "../themes/themes"

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider")
  }
  return context
}

export const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode")
    return saved ? JSON.parse(saved) : false
  })

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev
      localStorage.setItem("darkMode", JSON.stringify(newValue))
      return newValue
    })
  }

  const theme = createTheme(isDarkMode ? darkTheme : lightTheme)

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
