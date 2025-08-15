"use client";

import { useState } from "react";
import { Box, Grid, Typography, Tabs, Tab, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import SalesChart from "../../components/Dashboard/SalesChart";
import OrdersChart from "../../components/Dashboard/OrdersChart";
import CustomerAnalytics from "./CustomerAnalytics";
import ProductAnalytics from "../../components/Analytics/ProductAnalytics";
import RevenueAnalytics from "../../components/Analytics/RevenueAnalytics";

const Analytics = () => {
  const { t } = useLanguage();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          {t("analytics")}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Comprehensive analytics and insights for your e-commerce business.
        </Typography>

        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Overview" />
            <Tab label="Sales" />
            <Tab label="Customers" />
            <Tab label="Products" />
            <Tab label="Revenue" />
          </Tabs>
        </Paper>

        {/* Overview Tab */}
        {tabValue === 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            <Box sx={{ flex: "1 1 500px", minWidth: "300px" }}>
              <motion.div variants={itemVariants}>
                <SalesChart timeRange="30d" />
              </motion.div>
            </Box>
            <Box sx={{ flex: "1 1 300px", minWidth: "250px" }}>
              <motion.div variants={itemVariants}>
                <OrdersChart timeRange="30d" />
              </motion.div>
            </Box>
            <Box sx={{ flex: "1 1 100%" }}>
              <motion.div variants={itemVariants}>
                <CustomerAnalytics />
              </motion.div>
            </Box>
          </Box>
        )}

        {/* Sales Tab */}
        {tabValue === 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <motion.div variants={itemVariants}>
              <SalesChart timeRange="30d" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <RevenueAnalytics />
            </motion.div>
          </Box>
        )}

        {/* Customers Tab */}
        {tabValue === 2 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <motion.div variants={itemVariants}>
              <CustomerAnalytics />
            </motion.div>
          </Box>
        )}

        {/* Products Tab */}
        {tabValue === 3 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <motion.div variants={itemVariants}>
              <ProductAnalytics />
            </motion.div>
          </Box>
        )}

        {/* Revenue Tab */}
        {tabValue === 4 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <motion.div variants={itemVariants}>
              <RevenueAnalytics />
            </motion.div>
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

export default Analytics;
