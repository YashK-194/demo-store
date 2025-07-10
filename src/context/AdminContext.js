"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  getAllOrders,
  getProducts,
  listenToOrders,
  listenToProducts,
} from "@/lib/firebase";
import { ADMIN_CONFIG } from "@/lib/constants";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    // Check if admin is logged in (from localStorage)
    const adminToken = localStorage.getItem("adminToken");
    const adminData = localStorage.getItem("adminData");

    if (adminToken && adminData) {
      setIsAdminLoggedIn(true);
      setAdminUser(JSON.parse(adminData));
      loadData();
    }
    setLoading(false);
  }, []);

  // Load real data from Firebase
  const loadData = async () => {
    try {
      // Load orders
      setOrdersLoading(true);
      const ordersResult = await getAllOrders();
      if (ordersResult.success) {
        setOrders(ordersResult.orders);
      }

      // Load products
      setProductsLoading(true);
      const productsResult = await getProducts();
      if (productsResult.success) {
        setProducts(productsResult.products);
      }
    } catch (error) {
      console.error("Error loading admin data:", error);
    } finally {
      setOrdersLoading(false);
      setProductsLoading(false);
    }
  };

  // Admin login function
  const login = async (email, password) => {
    try {
      // Simple admin authentication (in production, use proper authentication)
      if (email === ADMIN_CONFIG.email && password === "admin123") {
        const adminData = {
          email,
          role: ADMIN_CONFIG.roles.ADMIN,
          name: "Admin User",
        };

        localStorage.setItem("adminToken", "admin-token");
        localStorage.setItem("adminData", JSON.stringify(adminData));

        setIsAdminLoggedIn(true);
        setAdminUser(adminData);
        await loadData();

        return { success: true };
      } else {
        return { success: false, error: "Invalid credentials" };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Admin logout function
  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    setOrders([]);
    setProducts([]);
  };

  // Real-time listeners for admin data
  useEffect(() => {
    if (isAdminLoggedIn) {
      let unsubscribeOrders = null;
      let unsubscribeProducts = null;

      try {
        // Listen to orders in real-time
        unsubscribeOrders = listenToOrders((ordersData) => {
          setOrders(ordersData);
        });

        // Listen to products in real-time
        unsubscribeProducts = listenToProducts((productsData) => {
          setProducts(productsData);
        });
      } catch (error) {
        console.error("Error setting up real-time listeners:", error);
        // Fallback to manual data loading
        loadData();
      }

      return () => {
        if (unsubscribeOrders) unsubscribeOrders();
        if (unsubscribeProducts) unsubscribeProducts();
      };
    }
  }, [isAdminLoggedIn]);

  const value = {
    isAdminLoggedIn,
    adminUser,
    loading,
    orders,
    products,
    ordersLoading,
    productsLoading,
    login,
    logout,
    loadData,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};

export { AdminProvider };
