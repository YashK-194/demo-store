import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./config";

// Create new order
export const createOrder = async (orderData) => {
  try {
    // Generate order number
    const orderNumber = `ORD-${Date.now()}`;

    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      orderNumber,
      status: "pending",
      paymentStatus: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { success: true, orderId: docRef.id, orderNumber };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get user orders
export const getUserOrders = async (userId) => {
  try {
    const q = query(
      collection(db, "orders"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, orders };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get single order
export const getOrder = async (orderId) => {
  try {
    const orderDoc = await getDoc(doc(db, "orders", orderId));
    if (orderDoc.exists()) {
      return { success: true, order: { id: orderDoc.id, ...orderDoc.data() } };
    } else {
      return { success: false, error: "Order not found" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Admin functions
export const getAllOrders = async () => {
  try {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, orders };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    await updateDoc(doc(db, "orders", orderId), {
      status,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updatePaymentStatus = async (orderId, paymentStatus) => {
  try {
    await updateDoc(doc(db, "orders", orderId), {
      paymentStatus,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteOrder = async (orderId) => {
  try {
    await deleteDoc(doc(db, "orders", orderId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Listen to orders in real-time (useful for admin)
export const listenToOrders = (callback) => {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (querySnapshot) => {
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    callback(orders);
  });
};
