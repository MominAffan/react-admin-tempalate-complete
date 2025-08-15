"use client"

import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Typography,
  Box,
} from "@mui/material"
import { ShoppingCart } from "@mui/icons-material"
import { motion } from "framer-motion"

const RecentOrders = () => {
  const recentOrders = [
    {
      id: "#12345",
      customer: "John Doe",
      amount: "$125.99",
      status: "delivered",
      time: "2 hours ago",
    },
    {
      id: "#12346",
      customer: "Jane Smith",
      amount: "$89.50",
      status: "shipped",
      time: "4 hours ago",
    },
    {
      id: "#12347",
      customer: "Mike Johnson",
      amount: "$234.75",
      status: "processing",
      time: "6 hours ago",
    },
    {
      id: "#12348",
      customer: "Sarah Wilson",
      amount: "$67.25",
      status: "pending",
      time: "8 hours ago",
    },
    {
      id: "#12349",
      customer: "Tom Brown",
      amount: "$156.80",
      status: "cancelled",
      time: "1 day ago",
    },
  ]

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

  return (
    <Card sx={{ height: 400 }}>
      <CardHeader title="Recent Orders" subheader="Latest customer orders" />
      <CardContent sx={{ p: 0, height: "calc(100% - 80px)", overflow: "auto" }}>
        <List>
          {recentOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    <ShoppingCart />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="subtitle2">{order.id}</Typography>
                      <Typography variant="subtitle2" color="primary">
                        {order.amount}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.5 }}>
                      <Typography variant="body2" color="text.secondary">
                        {order.customer}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Chip label={order.status} size="small" color={getStatusColor(order.status)} />
                        <Typography variant="caption" color="text.secondary">
                          {order.time}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            </motion.div>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default RecentOrders
