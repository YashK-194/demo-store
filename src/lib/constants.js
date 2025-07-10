// Application-wide constants
export const APP_CONFIG = {
  name: "DemoStore",
  description: "Your Online Shopping Destination",
  email: "support@demostore.com",
  phone: "+1 (555) 123-4567",
  address: "123 Commerce Street, Business District, NY 10001",
};

// Admin configuration
export const ADMIN_CONFIG = {
  email: "admin@demostore.com",
  roles: {
    ADMIN: "admin",
    USER: "user",
  },
};

// Product categories
export const CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: "📱" },
  { id: "clothing", name: "Clothing", icon: "👕" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "home", name: "Home", icon: "🏠" },
  { id: "books", name: "Books", icon: "📚" },
];

// Order statuses
export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

// Product statuses
export const PRODUCT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  OUT_OF_STOCK: "out-of-stock",
};

// Hero carousel configuration
export const HERO_CAROUSEL_CONFIG = {
  MAX_PRODUCTS: 5,
  AUTO_PLAY_INTERVAL: 5000, // 5 seconds
};

// Payment statuses
export const PAYMENT_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
};

// UI Constants
export const PAGINATION = {
  PRODUCTS_PER_PAGE: 20,
  ORDERS_PER_PAGE: 10,
};

// Validation rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_CART_QUANTITY: 99,
  MAX_PRODUCT_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
};

// API endpoints and error messages
export const MESSAGES = {
  SUCCESS: {
    PRODUCT_ADDED: "Product added successfully",
    ORDER_CREATED: "Order created successfully",
    PROFILE_UPDATED: "Profile updated successfully",
  },
  ERROR: {
    NETWORK: "Network error. Please try again.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    NOT_FOUND: "Resource not found.",
    VALIDATION: "Please check your input and try again.",
  },
};
