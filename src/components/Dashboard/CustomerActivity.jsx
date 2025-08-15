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
  Typography,
  Box,
} from "@mui/material"
import { PersonAdd, ShoppingCart, Star, AccountCircle } from "@mui/icons-material"
import { motion } from "framer-motion"

const CustomerActivity = () => {
  const activities = [
    {
      type: "new_customer",
      customer: "Alice Johnson",
      action: "joined the platform",
      time: "5 minutes ago",
      icon: <PersonAdd />,
      color: "success",
    },
    {
      type: "purchase",
      customer: "Bob Smith",
      action: "purchased Wireless Headphones",
      time: "12 minutes ago",
      icon: <ShoppingCart />,
      color: "primary",
    },
    {
      type: "review",
      customer: "Carol Davis",
      action: "left a 5-star review",
      time: "25 minutes ago",
      icon: <Star />,
      color: "warning",
    },
    {
      type: "profile",
      customer: "David Wilson",
      action: "updated profile information",
      time: "1 hour ago",
      icon: <AccountCircle />,
      color: "info",
    },
    {
      type: "purchase",
      customer: "Eva Brown",
      action: "purchased Smart Watch",
      time: "2 hours ago",
      icon: <ShoppingCart />,
      color: "primary",
    },
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case "new_customer":
        return <PersonAdd />
      case "purchase":
        return <ShoppingCart />
      case "review":
        return <Star />
      case "profile":
        return <AccountCircle />
      default:
        return <AccountCircle />
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case "new_customer":
        return "success"
      case "purchase":
        return "primary"
      case "review":
        return "warning"
      case "profile":
        return "info"
      default:
        return "default"
    }
  }

  return (
    <Card sx={{ height: 400 }}>
      <CardHeader title="Customer Activity" subheader="Recent customer interactions" />
      <CardContent sx={{ p: 0, height: "calc(100% - 80px)", overflow: "auto" }}>
        <List>
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: `${activity.color}.main` }}>{getActivityIcon(activity.type)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      {activity.customer}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {activity.action}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
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

export default CustomerActivity
