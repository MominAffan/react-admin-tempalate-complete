"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material"
import {
  Dashboard,
  Inventory,
  ShoppingCart,
  People,
  Analytics,
  Settings,
  ExpandLess,
  ExpandMore,
  Category,
  Add,
  ViewList,
  LocalShipping,
  Payment,
  Assignment,
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
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { useLayout } from "../../contexts/LayoutContext"
import { useLanguage } from "../../contexts/LanguageContext"

const Sidebar = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const location = useLocation()
  const navigate = useNavigate()
  const { sidebarOpen, toggleSidebar } = useLayout()
  const { t } = useLanguage()
  const [openDropdowns, setOpenDropdowns] = useState({})
  const sidebarRef = useRef(null)
  const menuItemsRef = useRef([])

  useEffect(() => {
    if (sidebarRef.current) {
      // Animate menu items on sidebar open
      if (sidebarOpen) {
        gsap.fromTo(
          menuItemsRef.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
          },
        )
      }
    }
  }, [sidebarOpen])

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
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
      path: "/products",
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
      path: "/orders",
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
      path: "/customers",
      children: [
        { key: "all-customers", label: "All Customers", icon: <Group />, path: "/customers" },
        { key: "add-customer", label: "Add Customer", icon: <PersonAdd />, path: "/customers/add" },
      ],
    },
    {
      key: "analytics",
      label: t("analytics"),
      icon: <Analytics />,
      path: "/analytics",
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
      path: "/settings",
      children: [
        { key: "profile", label: "Profile", icon: <AccountCircle />, path: "/settings/profile" },
        { key: "security", label: "Security", icon: <Security />, path: "/settings/security" },
        { key: "notifications", label: "Notifications", icon: <Notifications />, path: "/settings/notifications" },
        { key: "language", label: "Language", icon: <Language />, path: "/settings/language" },
      ],
    },
  ]

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/"
    return location.pathname === path
  }

  const handleNavigation = (path) => {
    gsap.to(".sidebar", {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    })

    navigate(path)
    if (isMobile) {
      toggleSidebar()
    }
  }

  const handleDropdownToggle = (key, event) => {
    event.stopPropagation()
    event.preventDefault()

    const isOpening = !openDropdowns[key]
    if (isOpening) {
      gsap.fromTo(
        `.dropdown-${key}`,
        { opacity: 0, height: 0 },
        { opacity: 1, height: "auto", duration: 0.3, ease: "power2.out" },
      )
    }

    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: isMobile ? -280 : 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  }

  return (
    <motion.div
      ref={sidebarRef}
      className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}
      variants={sidebarVariants}
      animate={sidebarOpen ? "open" : "closed"}
      style={{
        position: isMobile ? "fixed" : "relative",
        zIndex: isMobile ? 1200 : "auto",
        height: "100vh",
        width: sidebarOpen ? 280 : 64,
        backgroundColor: theme.palette.background.paper,
        boxShadow: isMobile && sidebarOpen ? "2px 0 10px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <Box
        className="sidebar-header"
        sx={{
          padding: sidebarOpen ? "16px 24px" : "16px 8px",
          minHeight: { xs: 56, sm: 64 },
          display: "flex",
          alignItems: "center",
          justifyContent: sidebarOpen ? "flex-start" : "center",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {sidebarOpen ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Box>
              <Typography variant="h6" className="sidebar-logo" sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
                EcomAdmin
              </Typography>
            </Box>
          </motion.div>
        ) : (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <Typography variant="h6" sx={{ color: "primary.main", fontWeight: 700, fontSize: "1.5rem" }}>
              EA
            </Typography>
          </motion.div>
        )}
      </Box>

      <Divider />

      <Box className="sidebar-nav" sx={{ padding: "8px 0", backgroundColor: theme.palette.background.paper }}>
        <List>
          {menuItems.map((item, index) => (
            <motion.div
              key={item.key}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              ref={(el) => (menuItemsRef.current[index] = el)}
            >
              <ListItem disablePadding>
                <Tooltip title={!sidebarOpen ? item.label : ""} placement="right">
                  <ListItemButton
                    onClick={(event) => {
                      if (item.children && sidebarOpen) {
                        handleDropdownToggle(item.key, event)
                      } else {
                        handleNavigation(item.path || item.children?.[0]?.path)
                      }
                    }}
                    selected={!item.children && isActive(item.path)}
                    sx={{
                      minHeight: 48,
                      px: sidebarOpen ? 2.5 : 1.5,
                      borderRadius: 1,
                      mx: 1,
                      mb: 0.5,
                      justifyContent: sidebarOpen ? "initial" : "center",
                      "&.Mui-selected": {
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                      },
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: sidebarOpen ? 3 : 0,
                        justifyContent: "center",
                        color: "inherit",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {sidebarOpen && (
                      <>
                        <ListItemText primary={item.label} />
                        {item.children && (
                          <motion.div
                            animate={{ rotate: openDropdowns[item.key] ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {openDropdowns[item.key] ? <ExpandLess /> : <ExpandMore />}
                          </motion.div>
                        )}
                      </>
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>

              {item.children && sidebarOpen && (
                <AnimatePresence>
                  {openDropdowns[item.key] && (
                    <motion.div
                      className={`dropdown-${item.key}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Collapse in={openDropdowns[item.key]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.children.map((child, childIndex) => (
                            <motion.div
                              key={child.key}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: childIndex * 0.05 }}
                            >
                              <ListItem disablePadding>
                                <ListItemButton
                                  onClick={(event) => {
                                    event.stopPropagation()
                                    handleNavigation(child.path)
                                  }}
                                  selected={isActive(child.path)}
                                  sx={{
                                    pl: 4,
                                    minHeight: 40,
                                    borderRadius: 1,
                                    mx: 1,
                                    mb: 0.5,
                                    "&.Mui-selected": {
                                      backgroundColor: "primary.light",
                                      color: "primary.contrastText",
                                    },
                                    "&:hover": {
                                      backgroundColor: theme.palette.action.hover,
                                    },
                                  }}
                                >
                                  <ListItemIcon
                                    sx={{
                                      minWidth: 0,
                                      mr: 2,
                                      color: "inherit",
                                    }}
                                  >
                                    {child.icon}
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={child.label}
                                    primaryTypographyProps={{
                                      fontSize: "0.875rem",
                                    }}
                                  />
                                </ListItemButton>
                              </ListItem>
                            </motion.div>
                          ))}
                        </List>
                      </Collapse>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          ))}
        </List>
      </Box>
    </motion.div>
  )
}

export default Sidebar
