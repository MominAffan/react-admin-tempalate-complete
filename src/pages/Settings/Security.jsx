"use client"

import { useState } from "react"
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material"
import { Save, Security as SecurityIcon, Delete, Smartphone, Computer } from "@mui/icons-material"
import { motion } from "framer-motion"

const Security = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: true,
  })

  const [activeSessions] = useState([
    { id: 1, device: "MacBook Pro", location: "New York, NY", lastActive: "2 minutes ago", current: true },
    { id: 2, device: "iPhone 12", location: "New York, NY", lastActive: "1 hour ago", current: false },
    { id: 3, device: "Chrome Browser", location: "Los Angeles, CA", lastActive: "2 days ago", current: false },
  ])

  const handlePasswordChange = (field, value) => {
    setPasswords((prev) => ({ ...prev, [field]: value }))
  }

  const handleSecuritySettingChange = (field, value) => {
    setSecuritySettings((prev) => ({ ...prev, [field]: value }))
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    console.log("Password change requested")
    // Handle password change
  }

  const handleRevokeSession = (sessionId) => {
    console.log("Revoking session:", sessionId)
    // Handle session revocation
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Security Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Manage your account security and privacy settings
        </Typography>

      {/* Security Settings & Active Sessions */}
<Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    gap: 3,
  }}
>
  {/* Left Column - Change Password + Security Preferences */}
  <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" }, display: "flex", flexDirection: "column", gap: 3 }}>
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <SecurityIcon />
        Change Password
      </Typography>

      <form onSubmit={handlePasswordSubmit}>
        <TextField
          fullWidth
          label="Current Password"
          type="password"
          value={passwords.currentPassword}
          onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="New Password"
          type="password"
          value={passwords.newPassword}
          onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Confirm New Password"
          type="password"
          value={passwords.confirmPassword}
          onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <Button type="submit" variant="contained" startIcon={<Save />}>
          Update Password
        </Button>
      </form>
    </Paper>

    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Security Preferences
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={securitySettings.twoFactorAuth}
            onChange={(e) => handleSecuritySettingChange("twoFactorAuth", e.target.checked)}
          />
        }
        label="Two-Factor Authentication"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={securitySettings.loginNotifications}
            onChange={(e) => handleSecuritySettingChange("loginNotifications", e.target.checked)}
          />
        }
        label="Login Notifications"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={securitySettings.sessionTimeout}
            onChange={(e) => handleSecuritySettingChange("sessionTimeout", e.target.checked)}
          />
        }
        label="Automatic Session Timeout"
      />

      {!securitySettings.twoFactorAuth && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Enable two-factor authentication for enhanced security
        </Alert>
      )}
    </Paper>
  </Box>

  {/* Right Column - Active Sessions */}
  <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" } }}>
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Active Sessions
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Manage your active login sessions across devices
      </Typography>

      <List>
        {activeSessions.map((session) => (
          <ListItem key={session.id} divider>
            <Box sx={{ mr: 2 }}>{session.device.includes("iPhone") ? <Smartphone /> : <Computer />}</Box>
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {session.device}
                  {session.current && (
                    <Typography variant="caption" color="success.main">
                      (Current)
                    </Typography>
                  )}
                </Box>
              }
              secondary={
                <>
                  <Typography variant="body2">{session.location}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Last active: {session.lastActive}
                  </Typography>
                </>
              }
            />
            {!session.current && (
              <ListItemSecondaryAction>
                <IconButton edge="end" color="error" onClick={() => handleRevokeSession(session.id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  </Box>
</Box>

      </Box>
    </motion.div>
  )
}

export default Security
