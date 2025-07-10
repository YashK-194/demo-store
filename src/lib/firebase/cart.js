import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./config";

// Get user cart
export const getUserCart = async (userId) => {
  try {
    const cartDoc = await getDoc(doc(db, "cart", userId));
    if (cartDoc.exists()) {
      return { success: true, cart: cartDoc.data() };
    } else {
      // Create empty cart if doesn't exist
      await setDoc(doc(db, "cart", userId), { items: [] });
      return { success: true, cart: { items: [] } };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Add item to cart
export const addToCart = async (userId, item) => {
  try {
    const cartRef = doc(db, "cart", userId);
    const cartDoc = await getDoc(cartRef);

    if (cartDoc.exists()) {
      const cartData = cartDoc.data();
      const existingItem = cartData.items.find(
        (i) => i.productId === item.productId
      );

      if (existingItem) {
        // Update quantity if item exists
        const updatedItems = cartData.items.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
        await updateDoc(cartRef, { items: updatedItems });
      } else {
        // Add new item
        await updateDoc(cartRef, {
          items: arrayUnion({ ...item, addedAt: new Date() }),
        });
      }
    } else {
      // Create cart with first item
      await setDoc(cartRef, {
        items: [{ ...item, addedAt: new Date() }],
      });
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Remove item from cart
export const removeFromCart = async (userId, productId) => {
  try {
    const cartRef = doc(db, "cart", userId);
    const cartDoc = await getDoc(cartRef);

    if (cartDoc.exists()) {
      const cartData = cartDoc.data();
      const updatedItems = cartData.items.filter(
        (item) => item.productId !== productId
      );
      await updateDoc(cartRef, { items: updatedItems });
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update item quantity
export const updateCartItemQuantity = async (userId, productId, quantity) => {
  try {
    const cartRef = doc(db, "cart", userId);
    const cartDoc = await getDoc(cartRef);

    if (cartDoc.exists()) {
      const cartData = cartDoc.data();
      const updatedItems = cartData.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      await updateDoc(cartRef, { items: updatedItems });
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Clear cart
export const clearCart = async (userId) => {
  try {
    await updateDoc(doc(db, "cart", userId), { items: [] });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
