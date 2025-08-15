"use client"

import { useState, useEffect } from "react"
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, InputAdornment } from "@mui/material"
import { AttachMoney, Inventory } from "@mui/icons-material"

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
    status: "active",
    description: "",
    image: "",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (product) {
      setFormData(product)
    }
  }, [product])

  const categories = ["Electronics", "Accessories", "Clothing", "Books", "Home & Garden"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Product name is required"
    if (!formData.sku.trim()) newErrors.sku = "SKU is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required"
    if (!formData.stock || formData.stock < 0) newErrors.stock = "Valid stock quantity is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSave({
        ...formData,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
      })
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ pt: 2 }}>
      <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    gap: 3
  }}
>
  {/* Name */}
  <TextField
    fullWidth
    name="name"
    label="Product Name"
    value={formData.name}
    onChange={handleChange}
    error={!!errors.name}
    helperText={errors.name}
    required
    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
  />

  {/* SKU */}
  <TextField
    fullWidth
    name="sku"
    label="SKU"
    value={formData.sku}
    onChange={handleChange}
    error={!!errors.sku}
    helperText={errors.sku}
    required
    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
  />

  {/* Category */}
  <FormControl
    fullWidth
    error={!!errors.category}
    required
    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
  >
    <InputLabel>Category</InputLabel>
    <Select
      name="category"
      value={formData.category}
      label="Category"
      onChange={handleChange}
    >
      {categories.map((category) => (
        <MenuItem key={category} value={category}>
          {category}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  {/* Status */}
  <FormControl
    fullWidth
    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
  >
    <InputLabel>Status</InputLabel>
    <Select
      name="status"
      value={formData.status}
      label="Status"
      onChange={handleChange}
    >
      <MenuItem value="active">Active</MenuItem>
      <MenuItem value="inactive">Inactive</MenuItem>
      <MenuItem value="out_of_stock">Out of Stock</MenuItem>
    </Select>
  </FormControl>

  {/* Price */}
  <TextField
    fullWidth
    name="price"
    label="Price"
    type="number"
    value={formData.price}
    onChange={handleChange}
    error={!!errors.price}
    helperText={errors.price}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <AttachMoney />
        </InputAdornment>
      ),
    }}
    required
    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
  />

  {/* Stock */}
  <TextField
    fullWidth
    name="stock"
    label="Stock Quantity"
    type="number"
    value={formData.stock}
    onChange={handleChange}
    error={!!errors.stock}
    helperText={errors.stock}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Inventory />
        </InputAdornment>
      ),
    }}
    required
    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}
  />

  {/* Image */}
  <TextField
    fullWidth
    name="image"
    label="Image URL"
    value={formData.image}
    onChange={handleChange}
    placeholder="https://example.com/image.jpg"
    sx={{ flex: "1 1 100%" }}
  />

  {/* Description */}
  <TextField
    fullWidth
    name="description"
    label="Description"
    multiline
    rows={4}
    value={formData.description}
    onChange={handleChange}
    placeholder="Enter product description..."
    sx={{ flex: "1 1 100%" }}
  />
</Box>


      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained">
          {product ? "Update Product" : "Add Product"}
        </Button>
      </Box>
    </Box>
  )
}

export default ProductForm
