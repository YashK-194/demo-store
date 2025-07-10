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
  limit,
  startAfter,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./config";

// Get all products with pagination
export const getProducts = async (
  limitCount = 50,
  lastDoc = null,
  category = null
) => {
  try {
    // Start with simple query to avoid composite index issues
    let q;

    try {
      // Try the complex query first
      q = query(
        collection(db, "products"),
        where("status", "==", "active"),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const querySnapshot = await getDocs(q);
      let products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });

      // Filter by category in application code if specified
      if (category) {
        products = products.filter((product) => product.category === category);
      }

      return {
        success: true,
        products,
        lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
      };
    } catch (indexError) {
      console.warn(
        "Complex query failed, falling back to simple query:",
        indexError
      );

      // Fallback to simple query without orderBy
      q = query(collection(db, "products"), limit(limitCount));

      const querySnapshot = await getDocs(q);
      let products = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        products.push({ id: doc.id, ...data });
      });

      // Filter by status and category in application code
      products = products.filter((product) => {
        const statusMatch = !product.status || product.status === "active";
        const categoryMatch = !category || product.category === category;
        return statusMatch && categoryMatch;
      });

      // Sort by createdAt in application code
      products.sort((a, b) => {
        const aDate = a.createdAt?.toDate?.() || new Date(0);
        const bDate = b.createdAt?.toDate?.() || new Date(0);
        return bDate - aDate;
      });

      return {
        success: true,
        products,
        lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
      };
    }
  } catch (error) {
    console.error("Error in getProducts:", error);
    return { success: false, error: error.message };
  }
};

// Get single product
export const getProduct = async (productId) => {
  try {
    const productDoc = await getDoc(doc(db, "products", productId));
    if (productDoc.exists()) {
      return {
        success: true,
        product: { id: productDoc.id, ...productDoc.data() },
      };
    } else {
      return { success: false, error: "Product not found" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Search products
export const searchProducts = async (searchTerm, category = null) => {
  try {
    let q = query(
      collection(db, "products"),
      where("status", "==", "active"),
      where(
        "searchKeywords",
        "array-contains-any",
        searchTerm.toLowerCase().split(" ")
      )
    );

    if (category) {
      q = query(q, where("category", "==", category));
    }

    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, products };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get featured products
export const getFeaturedProducts = async () => {
  try {
    // Try complex query first, then fallback to simple
    let allProducts = [];

    try {
      const q = query(
        collection(db, "products"),
        where("status", "==", "active"),
        orderBy("createdAt", "desc"),
        limit(50)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        allProducts.push({ id: doc.id, ...doc.data() });
      });
    } catch (indexError) {
      console.warn(
        "Complex query failed for featured products, using simple query:",
        indexError
      );

      // Fallback to simple query
      const q = query(collection(db, "products"), limit(50));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        allProducts.push({ id: doc.id, ...data });
      });

      // Filter by status in application code
      allProducts = allProducts.filter(
        (product) => !product.status || product.status === "active"
      );

      // Sort by createdAt in application code
      allProducts.sort((a, b) => {
        const aDate = a.createdAt?.toDate?.() || new Date(0);
        const bDate = b.createdAt?.toDate?.() || new Date(0);
        return bDate - aDate;
      });
    }

    // Filter for featured products in the application code
    const featuredProducts = allProducts
      .filter((product) => product.featured === true)
      .slice(0, 8); // Limit to 8 featured products

    return { success: true, products: featuredProducts };
  } catch (error) {
    console.error("Error in getFeaturedProducts:", error);
    return { success: false, error: error.message };
  }
};

// Get categories
export const getCategories = async () => {
  try {
    const q = query(
      collection(db, "categories"),
      where("isActive", "==", true),
      orderBy("sortOrder", "asc")
    );

    const querySnapshot = await getDocs(q);
    const categories = [];
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, categories };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Admin functions
export const addProduct = async (productData) => {
  try {
    // Add search keywords for better search
    const searchKeywords = [
      ...productData.name.toLowerCase().split(" "),
      ...productData.category.toLowerCase().split(" "),
      ...productData.tags.map((tag) => tag.toLowerCase()),
    ];

    const docRef = await addDoc(collection(db, "products"), {
      ...productData,
      searchKeywords,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateProduct = async (productId, updates) => {
  try {
    await updateDoc(doc(db, "products", productId), {
      ...updates,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, "products", productId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Listen to products in real-time (useful for admin)
export const listenToProducts = (callback) => {
  const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (querySnapshot) => {
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    callback(products);
  });
};

// Hero carousel management
export const getHeroCarouselProducts = async () => {
  try {
    const q = query(
      collection(db, "products"),
      where("heroCarousel", "==", true),
      where("status", "==", "active"),
      orderBy("heroCarouselOrder", "asc"),
      limit(5)
    );

    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, products };
  } catch (error) {
    console.error("Error getting hero carousel products:", error);

    // Fallback: get first 5 featured products
    try {
      const fallbackQuery = query(
        collection(db, "products"),
        where("featured", "==", true),
        where("status", "==", "active"),
        limit(5)
      );

      const fallbackSnapshot = await getDocs(fallbackQuery);
      const fallbackProducts = [];
      fallbackSnapshot.forEach((doc) => {
        fallbackProducts.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, products: fallbackProducts };
    } catch (fallbackError) {
      console.error("Fallback query failed:", fallbackError);
      return { success: false, error: fallbackError.message };
    }
  }
};

export const addToHeroCarousel = async (productId) => {
  try {
    // First, get current hero carousel products
    const currentHeroProducts = await getHeroCarouselProducts();

    // Check if product is already in carousel
    const isAlreadyInCarousel =
      currentHeroProducts.success &&
      currentHeroProducts.products.some((p) => p.id === productId);

    if (isAlreadyInCarousel) {
      return { success: true, message: "Product already in hero carousel" };
    }

    if (
      currentHeroProducts.success &&
      currentHeroProducts.products.length >= 5
    ) {
      // Remove the oldest product from hero carousel (first in order)
      const oldestProduct = currentHeroProducts.products[0];
      await updateDoc(doc(db, "products", oldestProduct.id), {
        heroCarousel: false,
        heroCarouselOrder: null,
        heroCarouselAddedAt: null,
      });
    }

    // Add new product to hero carousel
    const newOrder = currentHeroProducts.success
      ? Math.max(
          0,
          currentHeroProducts.products.length -
            (currentHeroProducts.products.length >= 5 ? 1 : 0)
        )
      : 0;

    await updateDoc(doc(db, "products", productId), {
      heroCarousel: true,
      heroCarouselOrder: newOrder,
      heroCarouselAddedAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error adding to hero carousel:", error);
    return { success: false, error: error.message };
  }
};

export const removeFromHeroCarousel = async (productId) => {
  try {
    await updateDoc(doc(db, "products", productId), {
      heroCarousel: false,
      heroCarouselOrder: null,
      heroCarouselAddedAt: null,
    });

    // Reorder remaining hero carousel products
    const remainingHeroProducts = await getHeroCarouselProducts();
    if (remainingHeroProducts.success) {
      const batch = [];
      remainingHeroProducts.products.forEach((product, index) => {
        batch.push(
          updateDoc(doc(db, "products", product.id), {
            heroCarouselOrder: index,
          })
        );
      });
      await Promise.all(batch);
    }

    return { success: true };
  } catch (error) {
    console.error("Error removing from hero carousel:", error);
    return { success: false, error: error.message };
  }
};

// Listen to hero carousel products in real-time
export const listenToHeroCarouselProducts = (callback) => {
  const q = query(
    collection(db, "products"),
    where("heroCarousel", "==", true),
    where("status", "==", "active"),
    orderBy("heroCarouselOrder", "asc")
  );

  return onSnapshot(q, (querySnapshot) => {
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    callback(products);
  });
};
