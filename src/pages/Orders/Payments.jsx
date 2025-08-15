"use client"

import { useState } from "react"
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Grid,
  Card,
  CardContent,
} from "@mui/material"
import { Visibility, Receipt, CreditCard, AccountBalance, PaymentOutlined } from "@mui/icons-material"
import { motion } from "framer-motion"

const Payments = () => {
  const [payments] = useState([
    {
      id: "#PAY001",
      orderId: "#12345",
      customer: "John Doe",
      amount: "$125.99",
      method: "Credit Card",
      status: "completed",
      date: "2024-01-15",
      transactionId: "txn_1234567890",
    },
    {
      id: "#PAY002",
      orderId: "#12346",
      customer: "Jane Smith",
      amount: "$89.50",
      method: "PayPal",
      status: "pending",
      date: "2024-01-15",
      transactionId: "txn_0987654321",
    },
    {
      id: "#PAY003",
      orderId: "#12347",
      customer: "Mike Johnson",
      amount: "$234.75",
      method: "Bank Transfer",
      status: "failed",
      date: "2024-01-14",
      transactionId: "txn_1122334455",
    },
  ])

  const paymentStats = [
    { title: "Total Revenue", value: "$12,450", icon: <PaymentOutlined />, color: "primary" },
    { title: "Pending Payments", value: "$1,250", icon: <CreditCard />, color: "warning" },
    { title: "Failed Payments", value: "$450", icon: <AccountBalance />, color: "error" },
    { title: "Completed Today", value: "$2,100", icon: <Receipt />, color: "success" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success"
      case "pending":
        return "warning"
      case "failed":
        return "error"
      default:
        return "default"
    }
  }

  const getMethodIcon = (method) => {
    switch (method.toLowerCase()) {
      case "credit card":
        return <CreditCard />
      case "paypal":
        return <PaymentOutlined />
      case "bank transfer":
        return <AccountBalance />
      default:
        return <Receipt />
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Payment Management
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Monitor and manage payment transactions
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          {paymentStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <Typography variant="h4" color={`${stat.color}.main`}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.title}
                      </Typography>
                    </div>
                    <Box sx={{ color: `${stat.color}.main` }}>{stat.icon}</Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Payment ID</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Method</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <Typography variant="subtitle2" color="primary">
                        {payment.id}
                      </Typography>
                    </TableCell>
                    <TableCell>{payment.orderId}</TableCell>
                    <TableCell>{payment.customer}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{payment.amount}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {getMethodIcon(payment.method)}
                        {payment.method}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={payment.status} color={getStatusColor(payment.status)} size="small" />
                    </TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small">
                        <Receipt />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </motion.div>
  )
}

export default Payments
