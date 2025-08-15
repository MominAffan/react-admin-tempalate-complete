"use client"

import { createContext, useContext, useState } from "react"

const LayoutContext = createContext()

export const useLayout = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error("useLayout must be used within a LayoutContextProvider")
  }
  return context
}

export const LayoutContextProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [layoutType, setLayoutType] = useState("vertical") // 'vertical' or 'horizontal'

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const changeLayout = (type) => {
    setLayoutType(type)
  }

  return (
    <LayoutContext.Provider
      value={{
        sidebarOpen,
        layoutType,
        toggleSidebar,
        changeLayout,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
