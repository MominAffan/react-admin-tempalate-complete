"use client"

import { useState, useMemo } from "react"
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material"
import { Search, Add, GetApp, Edit, Delete, Visibility } from "@mui/icons-material"
import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"
import DataTable from "../../components/Common/DataTable"
import ProductForm from "../../components/Products/ProductForm"

const Products = () => {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [filterAnchorEl, setFilterAnchorEl] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)

  // Sample product data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 99.99,
      stock: 45,
      status: "active",
      sku: "WH-001",
      image: "/wireless-headphones.png",
      description: "High-quality wireless headphones with noise cancellation",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Electronics",
      price: 199.99,
      stock: 23,
      status: "active",
      sku: "SW-002",
      image: "/smartwatch-lifestyle.png",
      description: "Advanced smartwatch with health monitoring",
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      name: "Laptop Stand",
      category: "Accessories",
      price: 49.99,
      stock: 67,
      status: "active",
      sku: "LS-003",
      image: "/laptop-stand.png",
      description: "Adjustable aluminum laptop stand",
      createdAt: "2024-01-08",
    },
    {
      id: 4,
      name: "USB-C Cable",
      category: "Accessories",
      price: 19.99,
      stock: 156,
      status: "active",
      sku: "UC-004",
      image: "/usb-cable.png",
      description: "High-speed USB-C charging cable",
      createdAt: "2024-01-05",
    },
    {
      id: 5,
      name: "Phone Case",
      category: "Accessories",
      price: 24.99,
      stock: 0,
      status: "out_of_stock",
      sku: "PC-005",
      image: "/colorful-phone-case-display.png",
      description: "Protective phone case with multiple colors",
      createdAt: "2024-01-03",
    },
  ])

  const categories = ["Electronics", "Accessories", "Clothing", "Books", "Home & Garden"]
  const statuses = ["active", "inactive", "out_of_stock"]

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !categoryFilter || product.category === categoryFilter
      const matchesStatus = !statusFilter || product.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [products, searchTerm, categoryFilter, statusFilter])

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 80,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <img
            src={params.value || "/placeholder.svg"}
            alt={params.row.name}
            style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4 }}
          />
        </Box>
      ),
    },
    { field: "name", headerName: "Product Name", flex: 1, minWidth: 200 },
    { field: "sku", headerName: "SKU", width: 120 },
    { field: "category", headerName: "Category", width: 130 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => `$${params.value}`,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value > 20 ? "success" : params.value > 0 ? "warning" : "error"}
          size="small"
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value.replace("_", " ")}
          color={params.value === "active" ? "success" : params.value === "inactive" ? "default" : "error"}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" onClick={() => handleView(params.row)}>
            <Visibility />
          </IconButton>
          <IconButton size="small" onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>
          <IconButton size="small" onClick={() => handleDelete(params.row.id)} color="error">
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ]

  const handleView = (product) => {
    setSelectedProduct(product)
    setIsViewOpen(true)
  }

  const handleEdit = (product) => {
    setSelectedProduct(product)
    setIsFormOpen(true)
  }

  const handleDelete = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setIsFormOpen(true)
  }

  const handleSaveProduct = (productData) => {
    if (selectedProduct) {
      // Update existing product
      setProducts((prev) => prev.map((p) => (p.id === selectedProduct.id ? { ...p, ...productData } : p)))
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: Math.max(...products.map((p) => p.id)) + 1,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setProducts((prev) => [...prev, newProduct])
    }
    setIsFormOpen(false)
  }

  const handleExport = () => {
    const csvContent = [
      ["Name", "SKU", "Category", "Price", "Stock", "Status"],
      ...filteredProducts.map((p) => [p.name, p.sku, p.category, p.price, p.stock, p.status]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "products.csv"
    a.click()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              {t("products")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your product inventory and catalog
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<Add />} onClick={handleAddProduct}>
            Add Product
          </Button>
        </Box>

        {/* Filters and Search */}
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <TextField
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select value={categoryFilter} label="Category" onChange={(e) => setCategoryFilter(e.target.value)}>
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="">All Status</MenuItem>
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status.replace("_", " ")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="outlined" startIcon={<GetApp />} onClick={handleExport}>
            Export
          </Button>
        </Box>

        {/* Data Table */}
        <DataTable rows={filteredProducts} columns={columns} loading={false} pageSize={10} checkboxSelection />

        {/* Product Form Dialog */}
        <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>{selectedProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogContent>
            <ProductForm product={selectedProduct} onSave={handleSaveProduct} onCancel={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>

        {/* Product View Dialog */}
        <Dialog open={isViewOpen} onClose={() => setIsViewOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Product Details</DialogTitle>
          <DialogContent>
            {selectedProduct && (
              <Box sx={{ pt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <img
                      src={selectedProduct.image || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      style={{ width: "100%", borderRadius: 8 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h6" gutterBottom>
                      {selectedProduct.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      SKU: {selectedProduct.sku}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Category: {selectedProduct.category}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Price: ${selectedProduct.price}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Stock: {selectedProduct.stock}
                    </Typography>
                    <Chip
                      label={selectedProduct.status.replace("_", " ")}
                      color={
                        selectedProduct.status === "active"
                          ? "success"
                          : selectedProduct.status === "inactive"
                            ? "default"
                            : "error"
                      }
                      sx={{ mt: 1 }}
                    />
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      {selectedProduct.description}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsViewOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </motion.div>
  )
}

export default Products
