"use client"

import { useState } from "react"
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { TrendingUp, TrendingDown, AttachMoney, ShoppingCart } from "@mui/icons-material"
import { Line } from "react-chartjs-2"
import { motion } from "framer-motion"

const SalesReport = () => {
  const [timeRange, setTimeRange] = useState("7days")

  const salesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Orders",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  }

  const topProducts = [
    { name: "Wireless Headphones", sales: "$12,250", orders: 245, growth: "+15.2%" },
    { name: "Smart Watch", sales: "$9,450", orders: 189, growth: "+8.7%" },
    { name: "Laptop Stand", sales: "$7,800", orders: 156, growth: "-2.3%" },
    { name: "USB-C Cable", sales: "$2,680", orders: 134, growth: "+12.1%" },
  ]

  const salesStats = [
    { title: "Total Revenue", value: "$45,231", change: "+12.5%", trend: "up", icon: <AttachMoney /> },
    { title: "Total Orders", value: "1,234", change: "-2.3%", trend: "down", icon: <ShoppingCart /> },
    { title: "Average Order", value: "$36.67", change: "+8.7%", trend: "up", icon: <TrendingUp /> },
    { title: "Conversion Rate", value: "3.2%", change: "+0.5%", trend: "up", icon: <TrendingUp /> },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <div>
            <Typography variant="h4" gutterBottom>
              Sales Report
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Detailed sales analytics and performance metrics
            </Typography>
          </div>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <MenuItem value="7days">Last 7 Days</MenuItem>
              <MenuItem value="30days">Last 30 Days</MenuItem>
              <MenuItem value="90days">Last 90 Days</MenuItem>
              <MenuItem value="1year">Last Year</MenuItem>
            </Select>
          </FormControl>
        </Box>

      {/* Stats Cards */}
<Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    gap: 3,
    mb: 3
  }}
>
  {salesStats.map((stat, index) => (
    <Card
      key={index}
      sx={{
        flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)", md: "1 1 calc(25% - 18px)" }
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <Typography variant="h4">{stat.value}</Typography>
            <Typography variant="body2" color="text.secondary">
              {stat.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              {stat.trend === "up" ? (
                <TrendingUp sx={{ color: "success.main", fontSize: 16, mr: 0.5 }} />
              ) : (
                <TrendingDown sx={{ color: "error.main", fontSize: 16, mr: 0.5 }} />
              )}
              <Typography
                variant="caption"
                color={stat.trend === "up" ? "success.main" : "error.main"}
              >
                {stat.change}
              </Typography>
            </Box>
          </div>
          <Box sx={{ color: "primary.main" }}>{stat.icon}</Box>
        </Box>
      </CardContent>
    </Card>
  ))}
</Box>

{/* Chart & Table Section */}
<Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    gap: 3
  }}
>
  <Paper
    sx={{
      flex: { xs: "1 1 100%", lg: "1 1 calc(66.66% - 12px)" },
      p: 3
    }}
  >
    <Typography variant="h6" gutterBottom>
      Sales & Orders Trend
    </Typography>
    <Box sx={{ height: 400 }}>
      <Line data={salesData} options={{ responsive: true, maintainAspectRatio: false }} />
    </Box>
  </Paper>

  <Paper
    sx={{
      flex: { xs: "1 1 100%", lg: "1 1 calc(33.33% - 12px)" },
      p: 3
    }}
  >
    <Typography variant="h6" gutterBottom>
      Top Performing Products
    </Typography>
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Sales</TableCell>
            <TableCell>Growth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topProducts.map((product, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="body2">{product.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{product.sales}</Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color={product.growth.startsWith("+") ? "success.main" : "error.main"}
                >
                  {product.growth}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
</Box>

      </Box>
    </motion.div>
  )
}

export default SalesReport
