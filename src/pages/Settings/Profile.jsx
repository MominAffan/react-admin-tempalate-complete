"use client";

import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material";
import { PhotoCamera, Save, Cancel } from "@mui/icons-material";
import { motion } from "framer-motion";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corp",
    position: "Store Manager",
    bio: "Experienced e-commerce professional with 5+ years in retail management.",
    website: "https://johndoe.com",
    location: "New York, NY",
  });

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profile);
    // Handle form submission
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Profile Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Manage your personal information and preferences
        </Typography>

        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              sx={{ width: 80, height: 80, mr: 2 }}
              src="/abstract-profile.png"
            />
            <Box>
              <Typography variant="h6">Profile Picture</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Upload a new profile picture
              </Typography>
              <IconButton color="primary" component="label">
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleSubmit}>
            {/* Profile Form */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
              }}
            >
              <TextField
                fullWidth
                label="First Name"
                value={profile.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
              />

              <TextField
                fullWidth
                label="Last Name"
                value={profile.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
              />

              <TextField
                fullWidth
                label="Email"
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
              />

              <TextField
                fullWidth
                label="Phone"
                value={profile.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
              />

              <TextField
                fullWidth
                label="Company"
                value={profile.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
              />

              <TextField
                fullWidth
                label="Position"
                value={profile.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
              />

              <TextField
                fullWidth
                label="Bio"
                multiline
                rows={3}
                value={profile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                sx={{ flex: "1 1 100%" }}
              />

              <TextField
                fullWidth
                label="Website"
                value={profile.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
              />

              <TextField
                fullWidth
                label="Location"
                value={profile.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
              />
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                mt: 3,
              }}
            >
              <Button variant="outlined" startIcon={<Cancel />}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" startIcon={<Save />}>
                Save Changes
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default Profile;
