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
  Menu,
  MenuItem,
} from "@mui/material"
import { MoreVert, Visibility, Edit, LocalShipping } from "@mui/icons-material"
import { motion } from "framer-motion"

const PendingOrders = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const [orders] = useState([
    { id: "#12345", customer: "John Doe", date: "2024-01-15", amount: "$125.99", items: 3, status: "pending" },
    { id: "#12346", customer: "Jane Smith", date: "2024-01-15", amount: "$89.50", items: 2, status: "pending" },
    { id: "#12347", customer: "Mike Johnson", date: "2024-01-14", amount: "$234.75", items: 5, status: "pending" },
    { id: "#12348", customer: "Sarah Wilson", date: "2024-01-14", amount: "$67.25", items: 1, status: "pending" },
  ])

  const handleMenuClick = (event, order) => {
    setAnchorEl(event.currentTarget)
    setSelectedOrder(order)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedOrder(null)
  }

  const handleStatusChange = (newStatus) => {
    console.log(`Changing order ${selectedOrder.id} to ${newStatus}`)
    handleMenuClose()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Pending Orders
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Orders awaiting processing and fulfillment
        </Typography>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Typography variant="subtitle2" color="primary">
                        {order.id}
                      </Typography>
                    </TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{order.amount}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label="Pending" color="warning" size="small" />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                      <IconButton size="small" onClick={(e) => handleMenuClick(e, order)}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => handleStatusChange("processing")}>
            <Edit sx={{ mr: 1 }} />
            Mark as Processing
          </MenuItem>
          <MenuItem onClick={() => handleStatusChange("shipped")}>
            <LocalShipping sx={{ mr: 1 }} />
            Mark as Shipped
          </MenuItem>
        </Menu>
      </Box>
    </motion.div>
  )
}

export default PendingOrders
