"use client"

import { useState } from "react"
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
} from "@mui/material"
import { Add, Edit, Delete, Visibility } from "@mui/icons-material"
import { motion } from "framer-motion"

const Categories = () => {
  const [open, setOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [categories] = useState([
    { id: 1, name: "Electronics", description: "Electronic devices and gadgets", products: 245, status: "active" },
    { id: 2, name: "Clothing", description: "Fashion and apparel", products: 189, status: "active" },
    { id: 3, name: "Books", description: "Books and literature", products: 156, status: "active" },
    { id: 4, name: "Home & Garden", description: "Home improvement and gardening", products: 134, status: "active" },
    { id: 5, name: "Sports", description: "Sports equipment and accessories", products: 98, status: "inactive" },
  ])

  const handleEdit = (category) => {
    setEditingCategory(category)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditingCategory(null)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <div>
            <Typography variant="h4" gutterBottom>
              Product Categories
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your product categories and organization
            </Typography>
          </div>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
            Add Category
          </Button>
        </Box>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Products</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <Typography variant="subtitle2">{category.name}</Typography>
                    </TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>{category.products}</TableCell>
                    <TableCell>
                      <Chip
                        label={category.status}
                        color={category.status === "active" ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleEdit(category)}>
                        <Edit />
                      </IconButton>
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Category Name"
              defaultValue={editingCategory?.name || ""}
              sx={{ mb: 2, mt: 1 }}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              defaultValue={editingCategory?.description || ""}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained">{editingCategory ? "Update" : "Create"}</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </motion.div>
  )
}

export default Categories
