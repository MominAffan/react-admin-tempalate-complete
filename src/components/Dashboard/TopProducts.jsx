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
  LinearProgress,
} from "@mui/material"
import { motion } from "framer-motion"

const TopProducts = () => {
  const topProducts = [
    {
      name: "Wireless Headphones",
      sales: 245,
      revenue: "$12,250",
      image: "/wireless-headphones.png",
      progress: 85,
    },
    {
      name: "Smart Watch",
      sales: 189,
      revenue: "$9,450",
      image: "/smartwatch-lifestyle.png",
      progress: 72,
    },
    {
      name: "Laptop Stand",
      sales: 156,
      revenue: "$7,800",
      image: "/laptop-stand.png",
      progress: 60,
    },
    {
      name: "USB-C Cable",
      sales: 134,
      revenue: "$2,680",
      image: "/usb-cable.png",
      progress: 45,
    },
    {
      name: "Phone Case",
      sales: 98,
      revenue: "$1,960",
      image: "/colorful-phone-case-display.png",
      progress: 35,
    },
  ]

  return (
    <Card sx={{ height: 400 }}>
      <CardHeader title="Top Products" subheader="Best selling products this month" />
      <CardContent sx={{ p: 0, height: "calc(100% - 80px)", overflow: "auto" }}>
        <List>
          {topProducts.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={product.image} sx={{ width: 40, height: 40 }} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography variant="subtitle2">{product.name}</Typography>
                      <Typography variant="subtitle2" color="primary">
                        {product.revenue}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          {product.sales} sales
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {product.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={product.progress}
                        sx={{
                          height: 4,
                          borderRadius: 2,
                          backgroundColor: "grey.200",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 2,
                          },
                        }}
                      />
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

export default TopProducts
