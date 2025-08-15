"use client"

import { useState, useMemo } from "react"
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Avatar,
  Divider,
} from "@mui/material"
import { Search, Add, GetApp, Visibility, Email } from "@mui/icons-material"
import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"
import DataTable from "../../components/Common/DataTable"

const Customers = () => {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  // Sample customers data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      totalOrders: 12,
      totalSpent: 1250.99,
      status: "active",
      joinDate: "2023-06-15",
      lastOrder: "2024-01-15",
      address: "123 Main St, New York, NY 10001",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 234-5678",
      totalOrders: 8,
      totalSpent: 890.5,
      status: "active",
      joinDate: "2023-08-22",
      lastOrder: "2024-01-14",
      address: "456 Oak Ave, Los Angeles, CA 90210",
      avatar: "JS",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 (555) 345-6789",
      totalOrders: 15,
      totalSpent: 2340.75,
      status: "active",
      joinDate: "2023-03-10",
      lastOrder: "2024-01-13",
      address: "789 Pine St, Chicago, IL 60601",
      avatar: "MJ",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 (555) 456-7890",
      totalOrders: 5,
      totalSpent: 567.25,
      status: "inactive",
      joinDate: "2023-11-05",
      lastOrder: "2024-01-12",
      address: "321 Elm St, Miami, FL 33101",
      avatar: "SW",
    },
    {
      id: 5,
      name: "Tom Brown",
      email: "tom@example.com",
      phone: "+1 (555) 567-8901",
      totalOrders: 3,
      totalSpent: 156.8,
      status: "active",
      joinDate: "2023-12-01",
      lastOrder: "2024-01-11",
      address: "654 Maple Dr, Seattle, WA 98101",
      avatar: "TB",
    },
  ])

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      return matchesSearch
    })
  }, [customers, searchTerm])

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 80,
      renderCell: (params) => <Avatar sx={{ bgcolor: "primary.main" }}>{params.row.avatar}</Avatar>,
    },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "totalOrders",
      headerName: "Orders",
      width: 100,
      renderCell: (params) => <Chip label={params.value} size="small" variant="outlined" />,
    },
    {
      field: "totalSpent",
      headerName: "Total Spent",
      width: 120,
      renderCell: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <Chip label={params.value} color={params.value === "active" ? "success" : "default"} size="small" />
      ),
    },
    { field: "joinDate", headerName: "Join Date", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" onClick={() => handleView(params.row)}>
            <Visibility />
          </IconButton>
          <IconButton size="small" onClick={() => handleEmail(params.row)}>
            <Email />
          </IconButton>
        </Box>
      ),
    },
  ]

  const handleView = (customer) => {
    setSelectedCustomer(customer)
    setIsViewOpen(true)
  }

  const handleEmail = (customer) => {
    window.open(`mailto:${customer.email}`, "_blank")
  }

  const handleExport = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Total Orders", "Total Spent", "Status", "Join Date"],
      ...filteredCustomers.map((c) => [c.name, c.email, c.phone, c.totalOrders, c.totalSpent, c.status, c.joinDate]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "customers.csv"
    a.click()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              {t("customers")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your customer relationships and data
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<Add />}>
            Add Customer
          </Button>
        </Box>

        {/* Search and Export */}
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <TextField
            placeholder="Search customers..."
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

          <Button variant="outlined" startIcon={<GetApp />} onClick={handleExport}>
            Export
          </Button>
        </Box>

        {/* Data Table */}
        <DataTable rows={filteredCustomers} columns={columns} loading={false} pageSize={10} checkboxSelection />

        {/* Customer Details Dialog */}
        <Dialog open={isViewOpen} onClose={() => setIsViewOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Customer Details</DialogTitle>
          <DialogContent>
            {selectedCustomer && (
              <Box sx={{ pt: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Avatar sx={{ bgcolor: "primary.main", width: 64, height: 64, mr: 2, fontSize: "1.5rem" }}>
                    {selectedCustomer.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{selectedCustomer.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Customer since {selectedCustomer.joinDate}
                    </Typography>
                    <Chip
                      label={selectedCustomer.status}
                      color={selectedCustomer.status === "active" ? "success" : "default"}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      Contact Information
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Email:</strong> {selectedCustomer.email}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Phone:</strong> {selectedCustomer.phone}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Address:</strong> {selectedCustomer.address}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: "center", p: 2, bgcolor: "primary.light", borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.contrastText" }}>
                        {selectedCustomer.totalOrders}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "primary.contrastText" }}>
                        Total Orders
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: "center", p: 2, bgcolor: "success.light", borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: "success.contrastText" }}>
                        ${selectedCustomer.totalSpent.toFixed(0)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "success.contrastText" }}>
                        Total Spent
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Last Order:</strong> {selectedCustomer.lastOrder}
                  </Typography>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsViewOpen(false)}>Close</Button>
            {selectedCustomer && (
              <Button variant="contained" startIcon={<Email />} onClick={() => handleEmail(selectedCustomer)}>
                Send Email
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </motion.div>
  )
}

export default Customers
