"use client"

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Box, Tabs, Tab, Menu, MenuItem, ListItemIcon, ListItemText, Paper } from "@mui/material"
import {
  Dashboard,
  Inventory,
  ShoppingCart,
  People,
  Analytics,
  Settings,
  KeyboardArrowDown,
  ViewList,
  Add,
  Category,
  Assignment,
  LocalShipping,
  Payment,
  PersonAdd,
  Group,
  TrendingUp,
  BarChart,
  PieChart,
  AccountCircle,
  Security,
  Notifications,
  Language,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"

const HorizontalNav = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [anchorEls, setAnchorEls] = useState({})

  const handleMenuOpen = (event, key) => {
    setAnchorEls((prev) => ({
      ...prev,
      [key]: event.currentTarget,
    }))
  }

  const handleMenuClose = (key) => {
    setAnchorEls((prev) => ({
      ...prev,
      [key]: null,
    }))
  }

  const handleNavigation = (path, key) => {
    navigate(path)
    if (key) handleMenuClose(key)
  }

  const menuItems = [
    {
      key: "dashboard",
      label: t("dashboard"),
      icon: <Dashboard />,
      path: "/",
    },
    {
      key: "products",
      label: t("products"),
      icon: <Inventory />,
      children: [
        { key: "all-products", label: "All Products", icon: <ViewList />, path: "/products" },
        { key: "add-product", label: "Add Product", icon: <Add />, path: "/products/add" },
        { key: "categories", label: "Categories", icon: <Category />, path: "/products/categories" },
      ],
    },
    {
      key: "orders",
      label: t("orders"),
      icon: <ShoppingCart />,
      children: [
        { key: "all-orders", label: "All Orders", icon: <ViewList />, path: "/orders" },
        { key: "pending-orders", label: "Pending", icon: <Assignment />, path: "/orders/pending" },
        { key: "shipping", label: "Shipping", icon: <LocalShipping />, path: "/orders/shipping" },
        { key: "payments", label: "Payments", icon: <Payment />, path: "/orders/payments" },
      ],
    },
    {
      key: "customers",
      label: t("customers"),
      icon: <People />,
      children: [
        { key: "all-customers", label: "All Customers", icon: <Group />, path: "/customers" },
        { key: "add-customer", label: "Add Customer", icon: <PersonAdd />, path: "/customers/add" },
      ],
    },
    {
      key: "analytics",
      label: t("analytics"),
      icon: <Analytics />,
      children: [
        { key: "overview", label: "Overview", icon: <TrendingUp />, path: "/analytics" },
        { key: "sales-report", label: "Sales Report", icon: <BarChart />, path: "/analytics/sales" },
        { key: "customer-analytics", label: "Customer Analytics", icon: <PieChart />, path: "/analytics/customers" },
      ],
    },
    {
      key: "settings",
      label: t("settings"),
      icon: <Settings />,
      children: [
        { key: "profile", label: "Profile", icon: <AccountCircle />, path: "/settings/profile" },
        { key: "security", label: "Security", icon: <Security />, path: "/settings/security" },
        { key: "notifications", label: "Notifications", icon: <Notifications />, path: "/settings/notifications" },
        { key: "language", label: "Language", icon: <Language />, path: "/settings/language" },
      ],
    },
  ]

  const getCurrentTab = () => {
    const currentPath = location.pathname
    if (currentPath === "/") return 0

    for (let i = 0; i < menuItems.length; i++) {
      const item = menuItems[i]
      if (item.path && currentPath.startsWith(item.path)) return i
      if (item.children) {
        for (const child of item.children) {
          if (currentPath.startsWith(child.path)) return i
        }
      }
    }
    return 0
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Box sx={{ px: 2 }}>
        <Tabs
          value={getCurrentTab()}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              minHeight: 64,
              textTransform: "none",
              fontWeight: 500,
            },
          }}
        >
          {menuItems.map((item, index) => (
            <motion.div key={item.key} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Tab
                icon={item.icon}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {item.label}
                    {item.children && <KeyboardArrowDown fontSize="small" />}
                  </Box>
                }
                iconPosition="start"
                onClick={(event) => {
                  if (item.children) {
                    handleMenuOpen(event, item.key)
                  } else {
                    handleNavigation(item.path)
                  }
                }}
                sx={{
                  "&.Mui-selected": {
                    color: "primary.main",
                  },
                }}
              />
            </motion.div>
          ))}
        </Tabs>

        {/* Dropdown Menus */}
        {menuItems.map(
          (item) =>
            item.children && (
              <Menu
                key={`menu-${item.key}`}
                anchorEl={anchorEls[item.key]}
                open={Boolean(anchorEls[item.key])}
                onClose={() => handleMenuClose(item.key)}
                PaperProps={{
                  elevation: 8,
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    "& .MuiMenuItem-root": {
                      py: 1,
                    },
                  },
                }}
              >
                {item.children.map((child) => (
                  <MenuItem
                    key={child.key}
                    onClick={() => handleNavigation(child.path, item.key)}
                    selected={location.pathname.startsWith(child.path)}
                  >
                    <ListItemIcon>{child.icon}</ListItemIcon>
                    <ListItemText primary={child.label} />
                  </MenuItem>
                ))}
              </Menu>
            ),
        )}
      </Box>
    </Paper>
  )
}

export default HorizontalNav
