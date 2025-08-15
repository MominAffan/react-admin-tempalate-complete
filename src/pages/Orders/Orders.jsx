"use client"

import { useState, useMemo } from "react"
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
} from "@mui/material"
import { Search, GetApp, Visibility, LocalShipping } from "@mui/icons-material"
import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"
import DataTable from "../../components/Common/DataTable"

const Orders = () => {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  // Sample orders data
  const [orders, setOrders] = useState([
    {
      id: 12345,
      customer: "John Doe",
      email: "john@example.com",
      total: 125.99,
      status: "delivered",
      items: 3,
      date: "2024-01-15",
      shippingAddress: "123 Main St, New York, NY 10001",
      paymentMethod: "Credit Card",
      products: [
        { name: "Wireless Headphones", quantity: 1, price: 99.99 },
        { name: "USB-C Cable", quantity: 2, price: 13.0 },
      ],
    },
    {
      id: 12346,
      customer: "Jane Smith",
      email: "jane@example.com",
      total: 89.5,
      status: "shipped",
      items: 2,
      date: "2024-01-14",
      shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
      paymentMethod: "PayPal",
      products: [
        { name: "Phone Case", quantity: 1, price: 24.99 },
        { name: "Laptop Stand", quantity: 1, price: 49.99 },
      ],
    },
    {
      id: 12347,
      customer: "Mike Johnson",
      email: "mike@example.com",
      total: 234.75,
      status: "processing",
      items: 1,
      date: "2024-01-13",
      shippingAddress: "789 Pine St, Chicago, IL 60601",
      paymentMethod: "Credit Card",
      products: [{ name: "Smart Watch", quantity: 1, price: 199.99 }],
    },
    {
      id: 12348,
      customer: "Sarah Wilson",
      email: "sarah@example.com",
      total: 67.25,
      status: "pending",
      items: 4,
      date: "2024-01-12",
      shippingAddress: "321 Elm St, Miami, FL 33101",
      paymentMethod: "Credit Card",
      products: [
        { name: "USB-C Cable", quantity: 3, price: 19.99 },
        { name: "Phone Case", quantity: 1, price: 24.99 },
      ],
    },
    {
      id: 12349,
      customer: "Tom Brown",
      email: "tom@example.com",
      total: 156.8,
      status: "cancelled",
      items: 2,
      date: "2024-01-11",
      shippingAddress: "654 Maple Dr, Seattle, WA 98101",
      paymentMethod: "PayPal",
      products: [
        { name: "Wireless Headphones", quantity: 1, price: 99.99 },
        { name: "Laptop Stand", quantity: 1, price: 49.99 },
      ],
    },
  ])

  const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"]

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toString().includes(searchTerm) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = !statusFilter || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [orders, searchTerm, statusFilter])

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "success"
      case "shipped":
        return "info"
      case "processing":
        return "warning"
      case "pending":
        return "default"
      case "cancelled":
        return "error"
      default:
        return "default"
    }
  }

  const columns = [
    { field: "id", headerName: "Order ID", width: 120 },
    { field: "customer", headerName: "Customer", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    {
      field: "total",
      headerName: "Total",
      width: 120,
      renderCell: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: "items",
      headerName: "Items",
      width: 80,
      renderCell: (params) => <Chip label={params.value} size="small" variant="outlined" />,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => <Chip label={params.value} color={getStatusColor(params.value)} size="small" />,
    },
    { field: "date", headerName: "Date", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" onClick={() => handleView(params.row)}>
            <Visibility />
          </IconButton>
          <IconButton size="small" onClick={() => handleUpdateStatus(params.row)}>
            <LocalShipping />
          </IconButton>
        </Box>
      ),
    },
  ]

  const handleView = (order) => {
    setSelectedOrder(order)
    setIsViewOpen(true)
  }

  const handleUpdateStatus = (order) => {
    const statusFlow = {
      pending: "processing",
      processing: "shipped",
      shipped: "delivered",
    }

    if (statusFlow[order.status]) {
      setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status: statusFlow[order.status] } : o)))
    }
  }

  const handleExport = () => {
    const csvContent = [
      ["Order ID", "Customer", "Email", "Total", "Status", "Date"],
      ...filteredOrders.map((o) => [o.id, o.customer, o.email, o.total, o.status, o.date]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "orders.csv"
    a.click()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              {t("orders")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track and manage customer orders
            </Typography>
          </Box>
        </Box>

        {/* Filters and Search */}
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <TextField
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="">All Status</MenuItem>
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="outlined" startIcon={<GetApp />} onClick={handleExport}>
            Export
          </Button>
        </Box>

        {/* Data Table */}
        <DataTable rows={filteredOrders} columns={columns} loading={false} pageSize={10} checkboxSelection />

        {/* Order Details Dialog */}
        <Dialog open={isViewOpen} onClose={() => setIsViewOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Order Details - #{selectedOrder?.id}</DialogTitle>
          <DialogContent>
            {selectedOrder && (
              <Box sx={{ pt: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Customer Information
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Name:</strong> {selectedOrder.customer}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Email:</strong> {selectedOrder.email}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Shipping Address:</strong> {selectedOrder.shippingAddress}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Order Information
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Order Date:</strong> {selectedOrder.date}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Status:</strong>{" "}
                      <Chip label={selectedOrder.status} color={getStatusColor(selectedOrder.status)} size="small" />
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Order Items
                </Typography>
                {selectedOrder.products.map((product, index) => (
                  <Box key={index} sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
                    <Typography variant="body2">
                      {product.name} x {product.quantity}
                    </Typography>
                    <Typography variant="body2">${product.price.toFixed(2)}</Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">${selectedOrder.total.toFixed(2)}</Typography>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsViewOpen(false)}>Close</Button>
            {selectedOrder && selectedOrder.status !== "delivered" && selectedOrder.status !== "cancelled" && (
              <Button
                variant="contained"
                onClick={() => {
                  handleUpdateStatus(selectedOrder)
                  setIsViewOpen(false)
                }}
              >
                Update Status
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </motion.div>
  )
}

export default Orders
