"use client"

import { Card, CardContent, Box, Typography, Avatar } from "@mui/material"
import { TrendingUp, TrendingDown } from "@mui/icons-material"
import { motion } from "framer-motion"

const StatsCard = ({ title, value, change, trend, icon, color = "primary" }) => {
  const isPositive = trend === "up"

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card
        sx={{
          height: "100%",
          background: `linear-gradient(135deg, ${color === "primary" ? "#1976d2" : color === "secondary" ? "#dc004e" : color === "success" ? "#2e7d32" : "#ed6c02"} 0%, ${color === "primary" ? "#1565c0" : color === "secondary" ? "#9a0036" : color === "success" ? "#1b5e20" : "#e65100"} 100%)`,
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                {title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {value}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                {isPositive ? (
                  <TrendingUp sx={{ fontSize: 16, color: "#4caf50" }} />
                ) : (
                  <TrendingDown sx={{ fontSize: 16, color: "#f44336" }} />
                )}
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {Math.abs(change)}% {isPositive ? "increase" : "decrease"}
                </Typography>
              </Box>
            </Box>
            <Avatar
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.2)",
                width: 56,
                height: 56,
              }}
            >
              {icon}
            </Avatar>
          </Box>
        </CardContent>

        {/* Decorative background elements */}
        <Box
          sx={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 80,
            height: 80,
            borderRadius: "50%",
            bgcolor: "rgba(255, 255, 255, 0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: 100,
            height: 100,
            borderRadius: "50%",
            bgcolor: "rgba(255, 255, 255, 0.05)",
          }}
        />
      </Card>
    </motion.div>
  )
}

export default StatsCard
