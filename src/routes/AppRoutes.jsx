"use client"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Layout from "../components/Layout/Layout"
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import Dashboard from "../pages/Dashboard/Dashboard"
import Products from "../pages/Products/Products"
import AddProduct from "../pages/Products/AddProduct"
import Categories from "../pages/Products/Categories"
import Orders from "../pages/Orders/Orders"
import PendingOrders from "../pages/Orders/PendingOrders"
import Shipping from "../pages/Orders/Shipping"
import Payments from "../pages/Orders/Payments"
import Customers from "../pages/Customers/Customers"
import AddCustomer from "../pages/Customers/AddCustomer"
import Analytics from "../pages/Analytics/Analytics"
import SalesReport from "../pages/Analytics/SalesReport"
import CustomerAnalytics from "../pages/Analytics/CustomerAnalytics"
import Settings from "../pages/Settings/Settings"
import Profile from "../pages/Settings/Profile"
import Security from "../pages/Settings/Security"
import Notifications from "../pages/Settings/Notifications"
import Language from "../pages/Settings/Language"
import LoadingSpinner from "../components/Common/LoadingSpinner"
import ForgotPassword from "../pages/Auth/ForgotPassword"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return user ? children : <Navigate to="/login" />
}

const AppRoutes = () => {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      <Route path="/forgot-password" element={user ? <Navigate to="/" /> : <ForgotPassword />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/categories" element={<Categories />} />

        <Route path="orders" element={<Orders />} />
        <Route path="orders/pending" element={<PendingOrders />} />
        <Route path="orders/shipping" element={<Shipping />} />
        <Route path="orders/payments" element={<Payments />} />

        <Route path="customers" element={<Customers />} />
        <Route path="customers/add" element={<AddCustomer />} />

        <Route path="analytics" element={<Analytics />} />
        <Route path="analytics/sales" element={<SalesReport />} />
        <Route path="analytics/customers" element={<CustomerAnalytics />} />

        <Route path="settings" element={<Settings />} />
        <Route path="settings/profile" element={<Profile />} />
        <Route path="settings/security" element={<Security />} />
        <Route path="settings/notifications" element={<Notifications />} />
        <Route path="settings/language" element={<Language />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
