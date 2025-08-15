"use client"

import { useState } from "react"
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
} from "@mui/material"
import { Save, Language as LanguageIcon, Translate } from "@mui/icons-material"
import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"

const Language = () => {
  const { language, setLanguage, isRTL, setIsRTL } = useLanguage()
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY")
  const [timeFormat, setTimeFormat] = useState("12")
  const [currency, setCurrency] = useState("USD")
  const [timezone, setTimezone] = useState("America/New_York")

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
  ]

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  ]

  const timezones = [
    "America/New_York",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Australia/Sydney",
  ]

  const handleSave = () => {
    console.log("Language settings saved:", {
      language,
      isRTL,
      dateFormat,
      timeFormat,
      currency,
      timezone,
    })
    // Handle save
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Language & Region
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Configure language, regional settings, and localization preferences
        </Typography>

       <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    gap: 3,
    flexDirection: { xs: "column", md: "row" }, // Column on mobile, row on desktop
  }}
>
  {/* Left Column */}
  <Box sx={{ flex: 1, minWidth: 300 }}>
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LanguageIcon />
        Language Settings
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel shrink>Interface Language</InputLabel>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          displayEmpty
        >
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span>{lang.flag}</span>
                {lang.name}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControlLabel
        control={<Switch checked={isRTL} onChange={(e) => setIsRTL(e.target.checked)} />}
        label="Right-to-Left (isRTL) Layout"
        sx={{ mb: 2 }}
      />

      <Typography variant="body2" color="text.secondary">
        Changes will be applied immediately to the interface
      </Typography>
    </Paper>

    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Regional Settings
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel shrink>Date Format</InputLabel>
        <Select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)} displayEmpty>
          <MenuItem value="MM/DD/YYYY">MM/DD/YYYY (US)</MenuItem>
          <MenuItem value="DD/MM/YYYY">DD/MM/YYYY (UK)</MenuItem>
          <MenuItem value="YYYY-MM-DD">YYYY-MM-DD (ISO)</MenuItem>
          <MenuItem value="DD.MM.YYYY">DD.MM.YYYY (DE)</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel shrink>Time Format</InputLabel>
        <Select value={timeFormat} onChange={(e) => setTimeFormat(e.target.value)} displayEmpty>
          <MenuItem value="12">12-hour (AM/PM)</MenuItem>
          <MenuItem value="24">24-hour</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel shrink>Timezone</InputLabel>
        <Select value={timezone} onChange={(e) => setTimezone(e.target.value)} displayEmpty>
          {timezones.map((tz) => (
            <MenuItem key={tz} value={tz}>
              {tz.replace("_", " ")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  </Box>

  {/* Right Column */}
  <Box sx={{ flex: 1, minWidth: 300 }}>
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Currency Settings
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel shrink>Default Currency</InputLabel>
        <Select value={currency} onChange={(e) => setCurrency(e.target.value)} displayEmpty>
          {currencies.map((curr) => (
            <MenuItem key={curr.code} value={curr.code}>
              {curr.symbol} {curr.name} ({curr.code})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="body2" color="text.secondary">
        This will be used for displaying prices and financial data
      </Typography>
    </Paper>

    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Translate />
        Translation Status
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {languages.slice(0, 4).map((lang) => (
          <Card variant="outlined" key={lang.code} sx={{ flex: "1 1 calc(50% - 8px)", minWidth: 140 }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>{lang.flag}</span>
                  <Typography variant="body2">{lang.name}</Typography>
                </Box>
                <Typography variant="caption" color="success.main">
                  100%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
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

export default Language
