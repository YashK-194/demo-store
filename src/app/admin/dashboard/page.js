"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ShoppingBag,
  Package,
  BarChart3,
  LogOut,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Filter,
  Search,
  Calendar,
  AlertTriangle,
  Save,
  X,
  Check,
  Star,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { cn } from "@/lib/utils";
import AdminRoute from "@/components/AdminRoute";
import {
  addProduct,
  deleteProduct,
  addToHeroCarousel,
  removeFromHeroCarousel,
} from "@/lib/firebase/products";
import {
  CATEGORIES,
  PRODUCT_STATUS,
  HERO_CAROUSEL_CONFIG,
} from "@/lib/constants";
import Toast from "@/components/Toast";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    sku: "",
    description: "",
    image: "",
    status: PRODUCT_STATUS.ACTIVE,
    featured: false,
    heroCarousel: false,
    tags: [],
    originalPrice: "",
    rating: 0,
    reviewCount: 0,
  });
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [addProductError, setAddProductError] = useState("");
  const [toast, setToast] = useState(null);
  const [deletingProducts, setDeletingProducts] = useState(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Generate SKU automatically
  const generateSKU = (name, category) => {
    const namePrefix = name
      .replace(/[^A-Za-z0-9]/g, "")
      .substring(0, 3)
      .toUpperCase();
    const categoryPrefix = category.substring(0, 2).toUpperCase();
    const randomSuffix = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `${categoryPrefix}-${namePrefix}-${randomSuffix}`;
  };

  const {
    isAdminLoggedIn,
    adminUser,
    orders,
    products,
    ordersLoading,
    productsLoading,
    logout,
  } = useAdmin();

  const router = useRouter();

  useEffect(() => {
    if (!isAdminLoggedIn) {
      router.push("/admin");
    } else {
      setLoading(false);
    }
  }, [isAdminLoggedIn, router]);

  // Calculate analytics from current data
  const getAnalytics = () => {
    const totalOrders = orders.length;
    const totalRevenue = orders
      .filter((order) => order.status === "completed")
      .reduce((sum, order) => sum + order.total, 0);

    const ordersByStatus = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    const topProducts = products
      .filter((product) => product.status === "active")
      .sort((a, b) => (b.stock || 0) - (a.stock || 0))
      .slice(0, 5);

    const lowStockProducts = products.filter(
      (product) => (product.stock || 0) < 10
    );

    return {
      totalOrders,
      totalRevenue,
      totalProducts: products.length,
      activeProducts: products.filter((p) => p.status === "active").length,
      ordersByStatus,
      topProducts,
      lowStockProducts,
    };
  };

  const analytics = getAnalytics();

  const handleAddProduct = async () => {
    // Reset error state
    setAddProductError("");

    // Validate required fields
    if (!newProduct.name.trim()) {
      setAddProductError("Product name is required");
      return;
    }
    if (!newProduct.category) {
      setAddProductError("Category is required");
      return;
    }
    if (!newProduct.price || parseFloat(newProduct.price) <= 0) {
      setAddProductError("Valid price is required");
      return;
    }
    if (!newProduct.stock || parseInt(newProduct.stock) < 0) {
      setAddProductError("Valid stock quantity is required");
      return;
    }
    if (!newProduct.sku.trim()) {
      setAddProductError("SKU is required");
      return;
    }
    if (!newProduct.description.trim()) {
      setAddProductError("Description is required");
      return;
    }
    if (!newProduct.image.trim()) {
      setAddProductError("Image URL is required");
      return;
    }

    setIsAddingProduct(true);

    try {
      // Prepare product data for Firebase
      const productData = {
        name: newProduct.name.trim(),
        category: newProduct.category,
        price: parseFloat(newProduct.price),
        originalPrice: newProduct.originalPrice
          ? parseFloat(newProduct.originalPrice)
          : parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        sku: newProduct.sku.trim().toUpperCase(),
        description: newProduct.description.trim(),
        image: newProduct.image.trim(),
        status: newProduct.status,
        featured: newProduct.featured,
        tags:
          newProduct.tags.length > 0
            ? newProduct.tags
            : [newProduct.category.toLowerCase()],
        rating: 0,
        reviewCount: 0,
      };

      const result = await addProduct(productData);

      if (result.success) {
        // Add to hero carousel if requested
        if (newProduct.heroCarousel) {
          const heroResult = await addToHeroCarousel(result.id);
          if (!heroResult.success) {
            console.warn("Failed to add to hero carousel:", heroResult.error);
            // Still show success for product creation
          }
        }

        // Reset form
        setNewProduct({
          name: "",
          category: "",
          price: "",
          stock: "",
          sku: "",
          description: "",
          image: "",
          status: PRODUCT_STATUS.ACTIVE,
          featured: false,
          heroCarousel: false,
          tags: [],
          originalPrice: "",
          rating: 0,
          reviewCount: 0,
        });

        // Close modal
        setShowAddProduct(false);

        // Show success toast
        setToast({
          message: `Product "${newProduct.name}" added successfully!${
            newProduct.heroCarousel ? " Added to hero carousel." : ""
          }`,
          type: "success",
        });

        // Refresh products list (if you have a refresh function)
        // refreshProducts();
      } else {
        setAddProductError(result.error || "Failed to add product");
      }
    } catch (error) {
      setAddProductError("An unexpected error occurred");
      console.error("Error adding product:", error);
    } finally {
      setIsAddingProduct(false);
    }
  };

  const handleUpdateProduct = (productId, updatedData) => {
    // TODO: Integrate with Firebase updateProduct service
    console.log("Update product functionality needs Firebase integration");
    alert("Product management requires Firebase integration. Coming soon!");
    setEditingProduct(null);
  };

  const handleStatusChange = (orderId, newStatus) => {
    // TODO: Integrate with Firebase updateOrderStatus service
    console.log("Order status update functionality needs Firebase integration");
    alert("Order management requires Firebase integration. Coming soon!");
  };

  const handleDeleteOrder = (orderId) => {
    // TODO: Integrate with Firebase deleteOrder service
    console.log("Delete order functionality needs Firebase integration");
    alert("Order management requires Firebase integration. Coming soon!");
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // Add to deleting set to show loading state
      setDeletingProducts((prev) => new Set(prev).add(productId));

      const result = await deleteProduct(productId);

      if (result.success) {
        // Show success toast
        setToast({
          message: "Product deleted successfully!",
          type: "success",
        });

        // Close confirmation modal
        setShowDeleteConfirm(null);

        // Optionally refresh the products list or remove from local state
        // The AdminContext should handle this automatically if using real-time listeners
      } else {
        setToast({
          message: `Failed to delete product: ${result.error}`,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setToast({
        message: `Error deleting product: ${error.message}`,
        type: "error",
      });
    } finally {
      // Remove from deleting set
      setDeletingProducts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const confirmDeleteProduct = (product) => {
    setShowDeleteConfirm(product);
  };

  const handleHeroCarouselToggle = async (product) => {
    try {
      setDeletingProducts((prev) => new Set(prev).add(product.id));

      let result;
      if (product.heroCarousel === true) {
        result = await removeFromHeroCarousel(product.id);
      } else {
        result = await addToHeroCarousel(product.id);
      }

      if (result.success) {
        setToast({
          message: `Product ${
            product.heroCarousel === true ? "removed from" : "added to"
          } hero carousel successfully!`,
          type: "success",
        });
      } else {
        setToast({
          message: `Failed to ${
            product.heroCarousel === true ? "remove from" : "add to"
          } hero carousel: ${result.error}`,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error toggling hero carousel:", error);
      setToast({
        message: `Error: ${error.message}`,
        type: "error",
      });
    } finally {
      setDeletingProducts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/admin");
  };

  // Mock data - replace with Firebase data
  const stats = {
    totalOrders: 1247,
    totalProducts: 156,
    totalRevenue: 89420,
    activeUsers: 892,
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "products", label: "Products", icon: Package },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminRoute>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="bg-slate-800 text-white p-2 rounded-lg">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    DemoStore Admin
                  </h1>
                  <p className="text-sm text-slate-600">
                    Welcome back, {adminUser?.name}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64">
              <nav className="bg-white rounded-lg shadow-sm p-4">
                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                        activeTab === tab.id
                          ? "bg-slate-800 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      )}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">Total Orders</p>
                          <p className="text-2xl font-bold text-slate-900">
                            {analytics.totalOrders}
                          </p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full">
                          <ShoppingBag className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">
                            Total Products
                          </p>
                          <p className="text-2xl font-bold text-slate-900">
                            {analytics.totalProducts}
                          </p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                          <Package className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">
                            Total Revenue
                          </p>
                          <p className="text-2xl font-bold text-slate-900">
                            ₹{analytics.totalRevenue.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-full">
                          <DollarSign className="h-6 w-6 text-yellow-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">
                            Active Products
                          </p>
                          <p className="text-2xl font-bold text-slate-900">
                            {analytics.activeProducts}
                          </p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-full">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b border-slate-200">
                      <h3 className="text-lg font-semibold text-slate-900">
                        Recent Orders
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {orders.slice(0, 3).map((order) => (
                          <div
                            key={order.id}
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-slate-900">
                                {order.id}
                              </p>
                              <p className="text-sm text-slate-600">
                                {order.customer}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-slate-900">
                                ₹{order.total}
                              </p>
                              <span
                                className={cn(
                                  "px-2 py-1 rounded-full text-xs font-medium",
                                  getStatusColor(order.status)
                                )}
                              >
                                {order.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b border-slate-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold text-slate-900">
                          All Orders
                        </h3>
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <input
                              type="text"
                              placeholder="Search orders..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                            />
                          </div>
                          <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                          >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="shipped">Shipped</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900">
                            <Download className="h-4 w-4" />
                            <span>Export</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Order ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                          {filteredOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50">
                              <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">
                                {order.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="font-medium text-slate-900">
                                    {order.customer}
                                  </div>
                                  <div className="text-sm text-slate-500">
                                    {order.email}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-slate-900">
                                {order.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">
                                ₹{order.total}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <select
                                  value={order.status}
                                  onChange={(e) =>
                                    handleStatusChange(order.id, e.target.value)
                                  }
                                  className={cn(
                                    "px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-slate-500",
                                    getStatusColor(order.status)
                                  )}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="completed">Completed</option>
                                  <option value="shipped">Shipped</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <button
                                    className="text-slate-600 hover:text-slate-900"
                                    title="View Details"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteOrder(order.id)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Delete Order"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "products" && (
                <div className="space-y-6">
                  {/* Add Product Modal */}
                  {showAddProduct && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-200">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">
                              Add New Product
                            </h3>
                            <button
                              onClick={() => {
                                setShowAddProduct(false);
                                setAddProductError("");
                              }}
                              className="text-slate-500 hover:text-slate-700"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        <div className="p-6 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Product Name
                            </label>
                            <input
                              type="text"
                              value={newProduct.name}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  name: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                              placeholder="Enter product name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Category
                            </label>
                            <select
                              value={newProduct.category}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  category: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                            >
                              <option value="">Select category</option>
                              {CATEGORIES.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.icon} {category.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">
                                Price (₹)
                              </label>
                              <input
                                type="number"
                                value={newProduct.price}
                                onChange={(e) =>
                                  setNewProduct({
                                    ...newProduct,
                                    price: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="0.00"
                                step="0.01"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">
                                Stock
                              </label>
                              <input
                                type="number"
                                value={newProduct.stock}
                                onChange={(e) =>
                                  setNewProduct({
                                    ...newProduct,
                                    stock: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              SKU
                            </label>
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                value={newProduct.sku}
                                onChange={(e) =>
                                  setNewProduct({
                                    ...newProduct,
                                    sku: e.target.value,
                                  })
                                }
                                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="Enter SKU"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (newProduct.name && newProduct.category) {
                                    setNewProduct({
                                      ...newProduct,
                                      sku: generateSKU(
                                        newProduct.name,
                                        newProduct.category
                                      ),
                                    });
                                  }
                                }}
                                className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 text-sm font-medium"
                                disabled={
                                  !newProduct.name || !newProduct.category
                                }
                              >
                                Auto
                              </button>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                              Click &quot;Auto&quot; to generate SKU (requires name and
                              category)
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Description
                            </label>
                            <textarea
                              value={newProduct.description}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  description: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                              placeholder="Enter product description"
                              rows="3"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Image URL
                            </label>
                            <input
                              type="url"
                              value={newProduct.image}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  image: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                              placeholder="Enter image URL"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">
                                Original Price (₹)
                              </label>
                              <input
                                type="number"
                                value={newProduct.originalPrice}
                                onChange={(e) =>
                                  setNewProduct({
                                    ...newProduct,
                                    originalPrice: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="0.00"
                                step="0.01"
                              />
                              <p className="text-xs text-slate-500 mt-1">
                                Leave empty to use regular price
                              </p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">
                                Status
                              </label>
                              <select
                                value={newProduct.status}
                                onChange={(e) =>
                                  setNewProduct({
                                    ...newProduct,
                                    status: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                              >
                                <option value={PRODUCT_STATUS.ACTIVE}>
                                  Active
                                </option>
                                <option value={PRODUCT_STATUS.INACTIVE}>
                                  Inactive
                                </option>
                                <option value="out_of_stock">
                                  Out of Stock
                                </option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Tags (comma-separated)
                            </label>
                            <input
                              type="text"
                              value={newProduct.tags.join(", ")}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  tags: e.target.value
                                    .split(",")
                                    .map((tag) => tag.trim())
                                    .filter((tag) => tag),
                                })
                              }
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                              placeholder="e.g., wireless, electronics, popular"
                            />
                          </div>
                          <div>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={newProduct.featured}
                                onChange={(e) =>
                                  setNewProduct({
                                    ...newProduct,
                                    featured: e.target.checked,
                                  })
                                }
                                className="w-4 h-4 text-slate-600 border-slate-300 rounded focus:ring-slate-500"
                              />
                              <span className="text-sm font-medium text-slate-700">
                                Featured Product
                              </span>
                            </label>
                            <p className="text-xs text-slate-500 mt-1">
                              Featured products appear on the homepage
                            </p>
                          </div>
                          <div>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={newProduct.heroCarousel}
                                onChange={(e) =>
                                  setNewProduct({
                                    ...newProduct,
                                    heroCarousel: e.target.checked,
                                  })
                                }
                                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                              />
                              <span className="text-sm font-medium text-slate-700">
                                Hero Carousel
                              </span>
                            </label>
                            <p className="text-xs text-slate-500 mt-1">
                              Add to hero carousel (max{" "}
                              {HERO_CAROUSEL_CONFIG.MAX_PRODUCTS} products)
                            </p>
                          </div>
                          {addProductError && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                              <p className="text-sm text-red-600">
                                {addProductError}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="p-6 border-t border-slate-200 flex items-center justify-end space-x-3">
                          <button
                            onClick={() => {
                              setShowAddProduct(false);
                              setAddProductError("");
                            }}
                            className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
                            disabled={isAddingProduct}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddProduct}
                            disabled={isAddingProduct}
                            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isAddingProduct ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                <span>Adding...</span>
                              </>
                            ) : (
                              <>
                                <Save className="h-4 w-4" />
                                <span>Add Product</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b border-slate-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold text-slate-900">
                          Product Management
                        </h3>
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <input
                              type="text"
                              placeholder="Search products..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                            />
                          </div>
                          <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                          >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="out-of-stock">Out of Stock</option>
                          </select>
                          <button
                            onClick={() => setShowAddProduct(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add Product</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Product
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              SKU
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Stock
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                          {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                    <Image
                                      className="h-10 w-10 rounded-lg object-cover"
                                      src={
                                        product.image ||
                                        "/api/placeholder/40/40"
                                      }
                                      alt={product.name}
                                      width={40}
                                      height={40}
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="font-medium text-slate-900">
                                      {product.name}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                                {product.sku}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                                {product.category}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">
                                ₹{product.price}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <span
                                    className={cn(
                                      "font-medium",
                                      product.stock > 10
                                        ? "text-green-600"
                                        : product.stock > 0
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                    )}
                                  >
                                    {product.stock}
                                  </span>
                                  {product.stock < 10 && (
                                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={cn(
                                    "px-2 py-1 rounded-full text-xs font-medium",
                                    getStatusColor(product.status)
                                  )}
                                >
                                  {product.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <button
                                    className="text-slate-600 hover:text-slate-900"
                                    title="View Details"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => setEditingProduct(product)}
                                    className="text-slate-600 hover:text-slate-900"
                                    title="Edit Product"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleHeroCarouselToggle(product)
                                    }
                                    disabled={deletingProducts.has(product.id)}
                                    className={cn(
                                      "disabled:opacity-50 disabled:cursor-not-allowed",
                                      product.heroCarousel === true
                                        ? "text-yellow-500 hover:text-yellow-600"
                                        : "text-slate-400 hover:text-yellow-500"
                                    )}
                                    title={
                                      product.heroCarousel === true
                                        ? "Remove from Hero Carousel"
                                        : "Add to Hero Carousel"
                                    }
                                  >
                                    {deletingProducts.has(product.id) ? (
                                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-500 border-t-transparent"></div>
                                    ) : (
                                      <Star
                                        className={cn(
                                          "h-4 w-4",
                                          product.heroCarousel === true &&
                                            "fill-current"
                                        )}
                                      />
                                    )}
                                  </button>
                                  <button
                                    onClick={() =>
                                      confirmDeleteProduct(product)
                                    }
                                    disabled={deletingProducts.has(product.id)}
                                    className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Delete Product"
                                  >
                                    {deletingProducts.has(product.id) ? (
                                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent"></div>
                                    ) : (
                                      <Trash2 className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Low Stock Alert */}
                  {analytics.lowStockProducts.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                        <h4 className="font-medium text-yellow-800">
                          Low Stock Alert
                        </h4>
                      </div>
                      <p className="text-yellow-700 mt-1">
                        {analytics.lowStockProducts.length} product(s) are
                        running low on stock:
                      </p>
                      <div className="mt-2 space-y-1">
                        {analytics.lowStockProducts.map((product) => (
                          <div
                            key={product.id}
                            className="text-sm text-yellow-700"
                          >
                            • {product.name} (Stock: {product.stock})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="space-y-6">
                  {/* Analytics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">
                            Pending Orders
                          </p>
                          <p className="text-2xl font-bold text-slate-900">
                            {analytics.ordersByStatus.pending || 0}
                          </p>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-full">
                          <ShoppingBag className="h-6 w-6 text-yellow-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">
                            Completed Orders
                          </p>
                          <p className="text-2xl font-bold text-slate-900">
                            {analytics.ordersByStatus.completed || 0}
                          </p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                          <Check className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">
                            Shipped Orders
                          </p>
                          <p className="text-2xl font-bold text-slate-900">
                            {analytics.ordersByStatus.shipped || 0}
                          </p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Package className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">
                            Low Stock Items
                          </p>
                          <p className="text-2xl font-bold text-slate-900">
                            {analytics.lowStockProducts.length}
                          </p>
                        </div>
                        <div className="bg-red-100 p-3 rounded-full">
                          <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">
                        Top Products by Stock
                      </h3>
                      <div className="space-y-4">
                        {analytics.topProducts
                          .slice(0, 5)
                          .map((product, index) => (
                            <div
                              key={product.id}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="bg-slate-100 text-slate-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                                  {index + 1}
                                </div>
                                <div>
                                  <span className="font-medium text-slate-900">
                                    {product.name}
                                  </span>
                                  <div className="text-xs text-slate-500">
                                    {product.category}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium text-slate-900">
                                  ₹{product.price}
                                </div>
                                <div className="text-xs text-slate-500">
                                  Stock: {product.stock}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">
                        Order Status Distribution
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(analytics.ordersByStatus).map(
                          ([status, count]) => (
                            <div
                              key={status}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center space-x-3">
                                <span
                                  className={cn(
                                    "px-2 py-1 rounded-full text-xs font-medium",
                                    getStatusColor(status)
                                  )}
                                >
                                  {status}
                                </span>
                              </div>
                              <span className="font-medium text-slate-900">
                                {count} orders
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {orders.slice(0, 5).map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={cn(
                                "w-3 h-3 rounded-full",
                                order.status === "completed"
                                  ? "bg-green-500"
                                  : order.status === "pending"
                                  ? "bg-yellow-500"
                                  : order.status === "shipped"
                                  ? "bg-blue-500"
                                  : "bg-red-500"
                              )}
                            ></div>
                            <div>
                              <p className="font-medium text-slate-900">
                                Order {order.id}
                              </p>
                              <p className="text-sm text-slate-600">
                                {order.customer} • {order.date}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-slate-900">
                              ₹{order.total}
                            </p>
                            <p className="text-sm text-slate-600 capitalize">
                              {order.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Revenue & Sales Analytics
                    </h3>
                    <div className="h-80 bg-slate-50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500">
                          Advanced charts will be displayed here
                        </p>
                        <p className="text-sm text-slate-400 mt-2">
                          Integration with Firebase Analytics coming soon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Delete Product
                  </h3>
                  <p className="text-sm text-gray-500">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold">
                    {showDeleteConfirm.name}
                  </span>
                  ?
                </p>
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>SKU:</strong> {showDeleteConfirm.sku}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Category:</strong> {showDeleteConfirm.category}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Price:</strong> ${showDeleteConfirm.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={deletingProducts.has(showDeleteConfirm.id)}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProduct(showDeleteConfirm.id)}
                  disabled={deletingProducts.has(showDeleteConfirm.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingProducts.has(showDeleteConfirm.id) ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      <span>Delete Product</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </AdminRoute>
  );
};

export default AdminDashboard;
