"use client"

import { useState } from "react"
import {
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { Save, Notifications as NotificationsIcon, Email, Sms } from "@mui/icons-material"
import { motion } from "framer-motion"

const Notifications = () => {
  const [settings, setSettings] = useState({
    email: {
      orderUpdates: true,
      customerMessages: true,
      lowStock: true,
      dailyReports: false,
      weeklyReports: true,
      promotions: false,
    },
    push: {
      orderUpdates: true,
      customerMessages: false,
      lowStock: true,
      systemAlerts: true,
    },
    sms: {
      orderUpdates: false,
      emergencyAlerts: true,
      lowStock: false,
    },
    frequency: {
      dailyDigest: "morning",
      weeklyReport: "monday",
      monthlyReport: "first",
    },
  })

  const handleSettingChange = (category, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }))
  }

  const handleSave = () => {
    console.log("Notification settings saved:", settings)
    // Handle save
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Notification Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Configure how and when you receive notifications
        </Typography>

    {/* Notification Settings */}
<Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    gap: 3,
  }}
>
  {/* Email Notifications */}
  <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" } }}>
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Email />
        Email Notifications
      </Typography>

      {[
        { key: "orderUpdates", label: "Order Updates" },
        { key: "customerMessages", label: "Customer Messages" },
        { key: "lowStock", label: "Low Stock Alerts" },
        { key: "dailyReports", label: "Daily Reports" },
        { key: "weeklyReports", label: "Weekly Reports" },
        { key: "promotions", label: "Promotions & Updates" },
      ].map((item, i) => (
        <FormControlLabel
          key={item.key}
          control={
            <Switch
              checked={settings.email[item.key]}
              onChange={(e) => handleSettingChange("email", item.key, e.target.checked)}
            />
          }
          label={item.label}
          sx={{ mb: i !== 5 ? 1 : 0 }}
        />
      ))}
    </Paper>
  </Box>

  {/* Push & SMS Notifications */}
  <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" }, display: "flex", flexDirection: "column", gap: 3 }}>
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <NotificationsIcon />
        Push Notifications
      </Typography>

      {[
        { key: "orderUpdates", label: "Order Updates" },
        { key: "customerMessages", label: "Customer Messages" },
        { key: "lowStock", label: "Low Stock Alerts" },
        { key: "systemAlerts", label: "System Alerts" },
      ].map((item, i) => (
        <FormControlLabel
          key={item.key}
          control={
            <Switch
              checked={settings.push[item.key]}
              onChange={(e) => handleSettingChange("push", item.key, e.target.checked)}
            />
          }
          label={item.label}
          sx={{ mb: i !== 3 ? 1 : 0 }}
        />
      ))}
    </Paper>

    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Sms />
        SMS Notifications
      </Typography>

      {[
        { key: "orderUpdates", label: "Order Updates" },
        { key: "emergencyAlerts", label: "Emergency Alerts" },
        { key: "lowStock", label: "Low Stock Alerts" },
      ].map((item, i) => (
        <FormControlLabel
          key={item.key}
          control={
            <Switch
              checked={settings.sms[item.key]}
              onChange={(e) => handleSettingChange("sms", item.key, e.target.checked)}
            />
          }
          label={item.label}
          sx={{ mb: i !== 2 ? 1 : 0 }}
        />
      ))}
    </Paper>
  </Box>

  {/* Notification Frequency */}
  <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" } }}>
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Notification Frequency
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel shrink>Daily Digest</InputLabel>
        <Select
          value={settings.frequency.dailyDigest}
          onChange={(e) => handleSettingChange("frequency", "dailyDigest", e.target.value)}
        >
          <MenuItem value="morning">Morning (8:00 AM)</MenuItem>
          <MenuItem value="afternoon">Afternoon (2:00 PM)</MenuItem>
          <MenuItem value="evening">Evening (6:00 PM)</MenuItem>
          <MenuItem value="disabled">Disabled</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel shrink>Weekly Report</InputLabel>
        <Select
          value={settings.frequency.weeklyReport}
          onChange={(e) => handleSettingChange("frequency", "weeklyReport", e.target.value)}
        >
          <MenuItem value="monday">Monday</MenuItem>
          <MenuItem value="friday">Friday</MenuItem>
          <MenuItem value="sunday">Sunday</MenuItem>
          <MenuItem value="disabled">Disabled</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel shrink>Monthly Report</InputLabel>
        <Select
          value={settings.frequency.monthlyReport}
          onChange={(e) => handleSettingChange("frequency", "monthlyReport", e.target.value)}
        >
          <MenuItem value="first">First of Month</MenuItem>
          <MenuItem value="last">Last of Month</MenuItem>
          <MenuItem value="disabled">Disabled</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  </Box>
</Box>

{/* Save Button */}
<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
  <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
    Save Settings
  </Button>
</Box>

      </Box>
    </motion.div>
  )
}

export default Notifications
