"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Box, Card, CardContent, TextField, Button, Typography, Alert, InputAdornment } from "@mui/material"
import { Email, LockReset, ArrowBack } from "@mui/icons-material"
import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"

const ForgotPassword = () => {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError("Email is required")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSuccess(true)
    } catch (err) {
      setError("Failed to send reset email. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  }

  if (success) {
    return (
      <Box className="auth-container">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={cardVariants}>
            <Card className="auth-card">
              <CardContent>
                <Box className="auth-header">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                    <Email sx={{ fontSize: 48, color: "success.main", mb: 2 }} />
                  </motion.div>
                  <Typography variant="h4" className="auth-title">
                    Check Your Email
                  </Typography>
                  <Typography variant="body2" className="auth-subtitle">
                    We've sent a password reset link to {email}
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "center", mt: 3 }}>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button variant="outlined" startIcon={<ArrowBack />}>
                      Back to Login
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Box>
    )
  }

  return (
    <Box className="auth-container">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={cardVariants}>
          <Card className="auth-card">
            <CardContent>
              <Box className="auth-header">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                  <LockReset sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                </motion.div>
                <Typography variant="h4" className="auth-title">
                  Reset Password
                </Typography>
                <Typography variant="body2" className="auth-subtitle">
                  Enter your email address and we'll send you a link to reset your password.
                </Typography>
              </Box>

              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="auth-form">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    label={t("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </motion.div>

                <Box sx={{ textAlign: "center", mt: 3 }}>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button variant="text" startIcon={<ArrowBack />}>
                      Back to Login
                    </Button>
                  </Link>
                </Box>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Box>
  )
}

export default ForgotPassword
