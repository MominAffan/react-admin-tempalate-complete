"use client";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  LinearProgress,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

const CustomerAnalytics = () => {
  const { t } = useLanguage();

  const customerSegmentData = [
    { name: "New Customers", value: 35, color: "#3f51b5" },
    { name: "Returning", value: 45, color: "#4caf50" },
    { name: "VIP", value: 20, color: "#ff9800" },
  ];

  const customerGrowthData = [
    { month: "Jan", newCustomers: 120, totalCustomers: 1200 },
    { month: "Feb", newCustomers: 150, totalCustomers: 1350 },
    { month: "Mar", newCustomers: 180, totalCustomers: 1530 },
    { month: "Apr", newCustomers: 200, totalCustomers: 1730 },
    { month: "May", newCustomers: 220, totalCustomers: 1950 },
    { month: "Jun", newCustomers: 250, totalCustomers: 2200 },
  ];

  const topCustomers = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      orders: 45,
      spent: "$12,450",
      status: "VIP",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      orders: 38,
      spent: "$9,800",
      status: "VIP",
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike@example.com",
      orders: 32,
      spent: "$8,200",
      status: "Regular",
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily@example.com",
      orders: 28,
      spent: "$7,100",
      status: "Regular",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@example.com",
      orders: 25,
      spent: "$6,500",
      status: "Regular",
    },
  ];

  const customerRetentionData = [
    { period: "0-30 days", retention: 85 },
    { period: "31-60 days", retention: 72 },
    { period: "61-90 days", retention: 58 },
    { period: "91-180 days", retention: 45 },
    { period: "180+ days", retention: 32 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box >
        <Typography variant="h4" gutterBottom>
          Customer Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Detailed insights into customer behavior and engagement patterns.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {/* Customer Segments */}
          <Box sx={{ flex: "1 1 500px", minWidth: "300px" }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Customer Segments
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerSegmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {customerSegmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>

          {/* Customer Growth */}
          <Box sx={{ flex: "1 1 500px", minWidth: "300px" }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Customer Growth Trend
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={customerGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="newCustomers"
                      stroke="#3f51b5"
                      name="New Customers"
                    />
                    <Line
                      type="monotone"
                      dataKey="totalCustomers"
                      stroke="#4caf50"
                      name="Total Customers"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>

          {/* Customer Retention */}
          <Box sx={{ flex: "1 1 500px", minWidth: "300px" }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Customer Retention Rate
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {customerRetentionData.map((item, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2">{item.period}</Typography>
                        <Typography variant="body2">
                          {item.retention}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={item.retention}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Top Customers */}
          <Box sx={{ flex: "1 1 500px", minWidth: "300px" }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Top Customers
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell align="right">Orders</TableCell>
                        <TableCell align="right">Spent</TableCell>
                        <TableCell align="center">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar sx={{ width: 32, height: 32, mr: 2 }}>
                                {customer.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" fontWeight="medium">
                                  {customer.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {customer.email}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell align="right">{customer.orders}</TableCell>
                          <TableCell align="right">{customer.spent}</TableCell>
                          <TableCell align="center">
                            <Chip
                              label={customer.status}
                              size="small"
                              color={
                                customer.status === "VIP"
                                  ? "primary"
                                  : "default"
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default CustomerAnalytics;
