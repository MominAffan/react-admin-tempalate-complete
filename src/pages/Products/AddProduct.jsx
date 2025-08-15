"use client"

import { useState } from "react"
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
  Chip,
} from "@mui/material"
import { PhotoCamera, Save, Cancel } from "@mui/icons-material"
import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"

const AddProduct = () => {
  const { t } = useLanguage()
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    sku: "",
    tags: [],
    featured: false,
    status: "active",
  })

  const [newTag, setNewTag] = useState("")

  const categories = ["Electronics", "Clothing", "Books", "Home & Garden", "Sports", "Beauty"]

  const handleInputChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !product.tags.includes(newTag.trim())) {
      setProduct((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setProduct((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Product data:", product)
    // Handle form submission
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Add New Product
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Create a new product for your store
        </Typography>

        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
          <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    gap: 3
  }}
>
  {/* Left Section */}
  <Box sx={{ flex: { xs: "1 1 100%", md: "2 3" }, display: "flex", flexDirection: "column", gap: 2 }}>
    <TextField
      fullWidth
      label="Product Name"
      value={product.name}
      onChange={(e) => handleInputChange("name", e.target.value)}
      required
    />

    <TextField
      fullWidth
      label="Description"
      multiline
      rows={4}
      value={product.description}
      onChange={(e) => handleInputChange("description", e.target.value)}
    />

    {/* Price & Stock */}
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <TextField
        fullWidth
        label="Price"
        type="number"
        value={product.price}
        onChange={(e) => handleInputChange("price", e.target.value)}
        InputProps={{ startAdornment: "$" }}
        required
        sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" } }}
      />

      <TextField
        fullWidth
        label="Stock Quantity"
        type="number"
        value={product.stock}
        onChange={(e) => handleInputChange("stock", e.target.value)}
        required
        sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" } }}
      />
    </Box>

    {/* Category & SKU */}
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <FormControl fullWidth sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" } }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={product.category}
          onChange={(e) => handleInputChange("category", e.target.value)}
          required
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="SKU"
        value={product.sku}
        onChange={(e) => handleInputChange("sku", e.target.value)}
        required
        sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" } }}
      />
    </Box>

    {/* Tags */}
    <Box>
      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
        <TextField
          label="Add Tags"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
        />
        <Button onClick={addTag} variant="outlined">
          Add Tag
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {product.tags.map((tag) => (
          <Chip key={tag} label={tag} onDelete={() => removeTag(tag)} />
        ))}
      </Box>
    </Box>
  </Box>

  {/* Right Section */}
  <Box sx={{ flex: { xs: "1 1 100%", md: "1 3" }, display: "flex", flexDirection: "column", gap: 2 }}>
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Product Image
      </Typography>
      <Box
        sx={{
          border: "2px dashed #ccc",
          borderRadius: 1,
          p: 3,
          textAlign: "center",
        }}
      >
        <PhotoCamera sx={{ fontSize: 48, color: "text.secondary", mb: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Click to upload image
        </Typography>
        <input type="file" accept="image/*" style={{ display: "none" }} />
      </Box>
    </Paper>

    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Product Settings
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={product.featured}
            onChange={(e) => handleInputChange("featured", e.target.checked)}
          />
        }
        label="Featured Product"
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select value={product.status} onChange={(e) => handleInputChange("status", e.target.value)}>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="archived">Archived</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  </Box>

  {/* Actions */}
  <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", flex: "1 1 100%" }}>
    <Button variant="outlined" startIcon={<Cancel />}>
      Cancel
    </Button>
    <Button type="submit" variant="contained" startIcon={<Save />}>
      Save Product
    </Button>
  </Box>
</Box>

          </form>
        </Paper>
      </Box>
    </motion.div>
  )
}

export default AddProduct
