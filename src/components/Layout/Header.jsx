"use client"

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  Switch,
  FormControlLabel,
  Chip,
} from "@mui/material"
import {
  Menu as MenuIcon,
  AccountCircle,
  Settings,
  Logout,
  DarkMode,
  LightMode,
  ViewModule,
  ViewList,
  Notifications,
  Language,
  StorefrontOutlined,
} from "@mui/icons-material"
import { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "../../contexts/AuthContext"
import { useTheme as useCustomTheme } from "../../contexts/ThemeContext"
import { useLayout } from "../../contexts/LayoutContext"
import { useLanguage } from "../../contexts/LanguageContext"

const Header = () => {
  const { user, logout } = useAuth()
  const { isDarkMode, toggleTheme } = useCustomTheme()
  const { toggleSidebar, layoutType, changeLayout } = useLayout()
  const { language, changeLanguage, t } = useLanguage()
  const [anchorEl, setAnchorEl] = useState(null)
  const [langAnchorEl, setLangAnchorEl] = useState(null)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLangMenuOpen = (event) => {
    setLangAnchorEl(event.currentTarget)
  }

  const handleLangMenuClose = () => {
    setLangAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleProfileMenuClose()
  }

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ]

  const currentLang = languages.find((lang) => lang.code === language)

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: { xs: 56, sm: 64 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
              sx={{ color: "text.primary" }}
            >
              <MenuIcon />
            </IconButton>
          </motion.div>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <StorefrontOutlined sx={{ color: "primary.main", fontSize: { xs: 24, sm: 28 } }} />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography
                variant="h6"
                sx={{ color: "text.primary", fontWeight: 700, fontSize: { sm: "1.1rem", md: "1.25rem" } }}
              >
                EcomAdmin
              </Typography>
            </Box>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 700, fontSize: "1rem" }}>
                EA
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Chip
              label={layoutType === "vertical" ? "Vertical" : "Horizontal"}
              size="small"
              variant="outlined"
              onClick={() => changeLayout(layoutType === "vertical" ? "horizontal" : "vertical")}
              icon={layoutType === "vertical" ? <ViewList /> : <ViewModule />}
              sx={{ cursor: "pointer" }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
          {/* Theme Toggle */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IconButton onClick={toggleTheme} sx={{ color: "text.primary" }} size="small">
              {isDarkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </motion.div>

          {/* Language Selector - Hidden on mobile */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton onClick={handleLangMenuOpen} sx={{ color: "text.primary" }} size="small">
                <Language />
              </IconButton>
            </motion.div>
          </Box>

          {/* Notifications - Hidden on mobile */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton sx={{ color: "text.primary" }} size="small">
                <Notifications />
              </IconButton>
            </motion.div>
          </Box>

          {/* Profile Menu */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
              <Avatar sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 }, bgcolor: "primary.main" }}>
                {user?.name?.charAt(0) || "A"}
              </Avatar>
            </IconButton>
          </motion.div>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          onClick={handleProfileMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              minWidth: 200,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <Avatar sx={{ bgcolor: "primary.main" }}>{user?.name?.charAt(0) || "A"}</Avatar>
            <Box>
              <Typography variant="subtitle2">{user?.name || "Admin User"}</Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email || "admin@example.com"}
              </Typography>
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            {t("settings")}
          </MenuItem>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <MenuItem onClick={handleLangMenuOpen}>
              <ListItemIcon>
                <Language fontSize="small" />
              </ListItemIcon>
              Language
            </MenuItem>
            <MenuItem onClick={() => changeLayout(layoutType === "vertical" ? "horizontal" : "vertical")}>
              <ListItemIcon>
                {layoutType === "vertical" ? <ViewList fontSize="small" /> : <ViewModule fontSize="small" />}
              </ListItemIcon>
              {layoutType === "vertical" ? "Horizontal" : "Vertical"} Layout
            </MenuItem>
          </Box>
          <MenuItem>
            <ListItemIcon>{isDarkMode ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}</ListItemIcon>
            <FormControlLabel
              control={<Switch checked={isDarkMode} onChange={toggleTheme} size="small" />}
              label={isDarkMode ? "Light Mode" : "Dark Mode"}
              sx={{ m: 0 }}
            />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            {t("logout")}
          </MenuItem>
        </Menu>

        {/* Language Menu */}
        <Menu
          anchorEl={langAnchorEl}
          open={Boolean(langAnchorEl)}
          onClose={handleLangMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              minWidth: 150,
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {languages.map((lang) => (
            <MenuItem
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code)
                handleLangMenuClose()
              }}
              selected={language === lang.code}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span>{lang.flag}</span>
                <Typography>{lang.name}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header
