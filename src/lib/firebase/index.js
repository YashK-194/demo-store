// Main Firebase exports - convenient single import point
export { auth, db, analytics } from "./config";

// Auth services
export {
  signUpUser,
  signInUser,
  signOutUser,
  resetPassword,
  getUserData,
  onAuthStateChange,
} from "./auth";

// Product services
export {
  getProducts,
  getProduct,
  searchProducts,
  getFeaturedProducts,
  getCategories,
  addProduct,
  updateProduct,
  deleteProduct,
  listenToProducts,
  getHeroCarouselProducts,
  addToHeroCarousel,
  removeFromHeroCarousel,
  listenToHeroCarouselProducts,
} from "./products";

// Order services
export {
  createOrder,
  getUserOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
  listenToOrders,
} from "./orders";

// Cart services
export {
  getUserCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from "./cart";
