"use client";

import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { Save, Cancel, Person } from "@mui/icons-material";
import { motion } from "framer-motion";

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    company: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    preferences: {
      newsletter: false,
      smsNotifications: false,
      emailNotifications: true,
    },
    status: "active",
  });

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setCustomer((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setCustomer((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Customer data:", customer);
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
          Add New Customer
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Create a new customer profile
        </Typography>

        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Person />
              Personal Information
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mb: 3,
              }}
            >
              {/* First Name */}
              <TextField
                fullWidth
                label="First Name"
                value={customer.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" } }}
              />

              {/* Last Name */}
              <TextField
                fullWidth
                label="Last Name"
                value={customer.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" } }}
              />

              {/* Email */}
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={customer.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" } }}
              />

              {/* Phone */}
              <TextField
                fullWidth
                label="Phone"
                value={customer.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" } }}
              />

              {/* Date of Birth */}
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                value={customer.dateOfBirth}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" } }}
              />

              {/* Gender */}
              <FormControl
                fullWidth
                sx={{
                  flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" },
                  minWidth: 200,
                }}
              >
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  value={customer.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                  <MenuItem value="prefer_not_to_say">
                    Prefer not to say
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Company */}
              <TextField
                fullWidth
                label="Company (Optional)"
                value={customer.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                sx={{ flex: "1 1 100%" }}
              />
            </Box>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>
              Address Information
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mb: 3,
              }}
            >
              {/* Street Address */}
              <TextField
                fullWidth
                label="Street Address"
                value={customer.address.street}
                onChange={(e) =>
                  handleInputChange("address.street", e.target.value)
                }
                sx={{ flex: "1 1 100%" }}
              />

              {/* City */}
              <TextField
                fullWidth
                label="City"
                value={customer.address.city}
                onChange={(e) =>
                  handleInputChange("address.city", e.target.value)
                }
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" } }}
              />

              {/* State/Province */}
              <TextField
                fullWidth
                label="State/Province"
                value={customer.address.state}
                onChange={(e) =>
                  handleInputChange("address.state", e.target.value)
                }
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" } }}
              />

              {/* ZIP/Postal Code */}
              <TextField
                fullWidth
                label="ZIP/Postal Code"
                value={customer.address.zipCode}
                onChange={(e) =>
                  handleInputChange("address.zipCode", e.target.value)
                }
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" } }}
              />

              {/* Country */}
              <TextField
                fullWidth
                label="Country"
                value={customer.address.country}
                onChange={(e) =>
                  handleInputChange("address.country", e.target.value)
                }
                sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" } }}
              />
            </Box>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>
              Preferences & Settings
            </Typography>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={customer.preferences.newsletter}
                      onChange={(e) =>
                        handleInputChange(
                          "preferences.newsletter",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Newsletter Subscription"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={customer.preferences.smsNotifications}
                      onChange={(e) =>
                        handleInputChange(
                          "preferences.smsNotifications",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="SMS Notifications"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={customer.preferences.emailNotifications}
                      onChange={(e) =>
                        handleInputChange(
                          "preferences.emailNotifications",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Email Notifications"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Account Status</InputLabel>
                  <Select
                    value={customer.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    <MenuItem value="suspended">Suspended</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button variant="outlined" startIcon={<Cancel />}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" startIcon={<Save />}>
                Save Customer
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default AddCustomer;
