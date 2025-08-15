"use client"

import { Outlet } from "react-router-dom"
import { Box, useMediaQuery, useTheme, Backdrop } from "@mui/material"
import { useLayout } from "../../contexts/LayoutContext"
import Sidebar from "./Sidebar"
import Header from "./Header"
import HorizontalNav from "./HorizontalNav"

const Layout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const { layoutType, sidebarOpen, toggleSidebar } = useLayout()

  if (layoutType === "horizontal") {
    return (
      <Box className="app-container" sx={{ flexDirection: "column" }}>
        <Header />
        <HorizontalNav />
        <Box className="content-area" sx={{ flex: 1, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    )
  }

  return (
    <Box className="app-container">
      <Sidebar />
      <Box
        className="main-content"
        sx={{
          marginLeft: isMobile ? 0 : sidebarOpen ? 0 : 0, // Removed negative margin that was causing issues
          width: isMobile ? "100%" : sidebarOpen ? "calc(100% - 280px)" : "calc(100% - 64px)",
          transition: "all 0.3s ease",
          minWidth: 0, // Prevents overflow issues
        }}
      >
        <Header />
        <Box
          className="content-area"
          sx={{
            padding: { xs: "12px", sm: "16px", md: "24px" },
            width: "100%", // Ensures full width usage
            maxWidth: "100%", // Prevents overflow
            overflowX: "hidden", // Prevents horizontal scroll
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {isMobile && sidebarOpen && (
        <Backdrop
          open={sidebarOpen}
          onClick={toggleSidebar}
          sx={{
            zIndex: 1100, // Higher than sidebar z-index
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
      )}
    </Box>
  )
}

export default Layout
