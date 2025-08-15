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
  TextField,
  InputAdornment,
} from "@mui/material"
import { Search, Visibility, TrackChanges } from "@mui/icons-material"
import { motion } from "framer-motion"

const Shipping = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const [shipments] = useState([
    {
      id: "#SH001",
      orderId: "#12345",
      customer: "John Doe",
      carrier: "FedEx",
      tracking: "1234567890",
      status: "in_transit",
      estimatedDelivery: "2024-01-18",
    },
    {
      id: "#SH002",
      orderId: "#12346",
      customer: "Jane Smith",
      carrier: "UPS",
      tracking: "1Z999AA1234567890",
      status: "delivered",
      estimatedDelivery: "2024-01-16",
    },
    {
      id: "#SH003",
      orderId: "#12347",
      customer: "Mike Johnson",
      carrier: "DHL",
      tracking: "1234567890",
      status: "shipped",
      estimatedDelivery: "2024-01-19",
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case "shipped":
        return "info"
      case "in_transit":
        return "warning"
      case "delivered":
        return "success"
      default:
        return "default"
    }
  }

  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.tracking.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Shipping Management
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Track and manage order shipments
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            placeholder="Search by customer, order ID, or tracking number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 400 }}
          />
        </Box>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Shipment ID</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Carrier</TableCell>
                  <TableCell>Tracking Number</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Est. Delivery</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredShipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell>
                      <Typography variant="subtitle2" color="primary">
                        {shipment.id}
                      </Typography>
                    </TableCell>
                    <TableCell>{shipment.orderId}</TableCell>
                    <TableCell>{shipment.customer}</TableCell>
                    <TableCell>{shipment.carrier}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                        {shipment.tracking}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={shipment.status.replace("_", " ")}
                        color={getStatusColor(shipment.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{shipment.estimatedDelivery}</TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small">
                        <TrackChanges />
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

export default Shipping
