"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Grid, Typography, Menu, MenuItem, Chip } from "@mui/material";
import {
  ShoppingCart,
  People,
  AttachMoney,
  Inventory,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../contexts/LanguageContext";
import StatsCard from "../../components/Dashboard/StatsCard";
import SalesChart from "../../components/Dashboard/SalesChart";
import OrdersChart from "../../components/Dashboard/OrdersChart";
import RecentOrders from "../../components/Dashboard/RecentOrders";
import TopProducts from "../../components/Dashboard/TopProducts";
import CustomerActivity from "../../components/Dashboard/CustomerActivity";

const Dashboard = () => {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState("7d");
  const [anchorEl, setAnchorEl] = useState(null);
  const dashboardRef = useRef(null);
  const statsRef = useRef(null);
  const chartsRef = useRef(null);

  // Simulated dashboard data
  const [dashboardData, setDashboardData] = useState({
    totalSales: { value: 45231, change: 12.5, trend: "up" },
    totalOrders: { value: 1234, change: -2.3, trend: "down" },
    totalCustomers: { value: 8945, change: 8.7, trend: "up" },
    totalProducts: { value: 567, change: 5.2, trend: "up" },
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate stats cards with stagger
    gsap.fromTo(
      ".stats-card",
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }
    );

    // Animate charts with scroll trigger
    gsap.fromTo(
      ".chart-container",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: chartsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate activity widgets
    gsap.fromTo(
      ".activity-widget",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".activity-section",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const handleTimeRangeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTimeRangeClose = () => {
    setAnchorEl(null);
  };

  const handleTimeRangeSelect = (range) => {
    setTimeRange(range);
    setAnchorEl(null);

    // Animate stats update
    gsap.to(".stats-card", {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });

    // Simulate data update based on time range
    const multiplier = range === "30d" ? 1.5 : range === "7d" ? 1 : 0.7;
    setDashboardData((prev) => ({
      totalSales: { ...prev.totalSales, value: Math.floor(45231 * multiplier) },
      totalOrders: {
        ...prev.totalOrders,
        value: Math.floor(1234 * multiplier),
      },
      totalCustomers: {
        ...prev.totalCustomers,
        value: Math.floor(8945 * multiplier),
      },
      totalProducts: {
        ...prev.totalProducts,
        value: Math.floor(567 * multiplier),
      },
    }));
  };

  const timeRanges = [
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      ref={dashboardRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              {t("dashboard")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome back! Here's what's happening with your store.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Chip
              label={timeRanges.find((r) => r.value === timeRange)?.label}
              onClick={handleTimeRangeClick}
              variant="outlined"
              sx={{ cursor: "pointer" }}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleTimeRangeClose}
            >
              {timeRanges.map((range) => (
                <MenuItem
                  key={range.value}
                  onClick={() => handleTimeRangeSelect(range.value)}
                  selected={timeRange === range.value}
                >
                  {range.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
        {/* Stats Cards */}
        {/* Stats Cards */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            mb: 4,
          }}
          ref={statsRef}
        >
          <Box sx={{ flex: "1 1 250px", minWidth: "200px" }}>
            <motion.div variants={itemVariants} className="stats-card">
              <StatsCard
                title={t("totalSales")}
                value={`$${dashboardData.totalSales.value.toLocaleString()}`}
                change={dashboardData.totalSales.change}
                trend={dashboardData.totalSales.trend}
                icon={<AttachMoney />}
                color="primary"
              />
            </motion.div>
          </Box>

          <Box sx={{ flex: "1 1 250px", minWidth: "200px" }}>
            <motion.div variants={itemVariants} className="stats-card">
              <StatsCard
                title={t("totalOrders")}
                value={dashboardData.totalOrders.value.toLocaleString()}
                change={dashboardData.totalOrders.change}
                trend={dashboardData.totalOrders.trend}
                icon={<ShoppingCart />}
                color="secondary"
              />
            </motion.div>
          </Box>

          <Box sx={{ flex: "1 1 250px", minWidth: "200px" }}>
            <motion.div variants={itemVariants} className="stats-card">
              <StatsCard
                title={t("totalCustomers")}
                value={dashboardData.totalCustomers.value.toLocaleString()}
                change={dashboardData.totalCustomers.change}
                trend={dashboardData.totalCustomers.trend}
                icon={<People />}
                color="success"
              />
            </motion.div>
          </Box>

          <Box sx={{ flex: "1 1 250px", minWidth: "200px" }}>
            <motion.div variants={itemVariants} className="stats-card">
              <StatsCard
                title="Total Products"
                value={dashboardData.totalProducts.value.toLocaleString()}
                change={dashboardData.totalProducts.change}
                trend={dashboardData.totalProducts.trend}
                icon={<Inventory />}
                color="warning"
              />
            </motion.div>
          </Box>
        </Box>

        {/* // Charts Section */}
       <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    gap: 2, // small gap between them
    mb: 4,
  }}
>
  <Box sx={{ flex: 1, minWidth: 0 }}>
    <motion.div variants={itemVariants} style={{ height: "100%" }}>
      <SalesChart timeRange={timeRange} />
    </motion.div>
  </Box>

  <Box sx={{ flex: 1, minWidth: 0 }}>
    <motion.div variants={itemVariants} style={{ height: "100%" }}>
      <OrdersChart timeRange={timeRange} />
    </motion.div>
  </Box>
</Box>

        {/* // Activity Section */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
          className="activity-section"
        >
          <Box sx={{ flex: "1 1 350px", minWidth: "300px" }}>
            <motion.div variants={itemVariants} className="activity-widget">
              <RecentOrders />
            </motion.div>
          </Box>

          <Box sx={{ flex: "1 1 350px", minWidth: "300px" }}>
            <motion.div variants={itemVariants} className="activity-widget">
              <TopProducts />
            </motion.div>
          </Box>

          <Box sx={{ flex: "1 1 350px", minWidth: "300px" }}>
            <motion.div variants={itemVariants} className="activity-widget">
              <CustomerActivity />
            </motion.div>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Dashboard;
