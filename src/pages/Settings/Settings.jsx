"use client"

import { Box, Typography } from "@mui/material"
import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"

const Settings = () => {
  const { t } = useLanguage()

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          {t("settings")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your settings here.
        </Typography>
      </Box>
    </motion.div>
  )
}

export default Settings
