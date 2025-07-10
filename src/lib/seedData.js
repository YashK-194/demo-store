// Run this script to seed your Firestore database with sample data
// You can run this from your Firebase console or create a temporary page to execute it

import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "./firebase/config";

export const seedDatabase = async () => {
  console.log("Starting database seeding...");

  try {
    // Seed Categories
    const categories = [
      {
        name: "Electronics",
        slug: "electronics",
        description: "Latest gadgets and electronic devices",
        image:
          "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
        isActive: true,
        sortOrder: 1,
      },
      {
        name: "Clothing",
        slug: "clothing",
        description: "Fashion and apparel for all seasons",
        image:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
        isActive: true,
        sortOrder: 2,
      },
      {
        name: "Sports",
        slug: "sports",
        description: "Sports equipment and fitness gear",
        image:
          "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",
        isActive: true,
        sortOrder: 3,
      },
      {
        name: "Home",
        slug: "home",
        description: "Home decor and kitchen essentials",
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
        isActive: true,
        sortOrder: 4,
      },
      {
        name: "Books",
        slug: "books",
        description: "Books, magazines, and educational materials",
        image:
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
        isActive: true,
        sortOrder: 5,
      },
    ];

    for (const category of categories) {
      await addDoc(collection(db, "categories"), category);
    }
    console.log("Categories seeded successfully");

    // Seed Products
    const products = [
      {
        name: "Wireless Bluetooth Headphones",
        description:
          "Premium quality wireless headphones with noise cancellation and 30-hour battery life.",
        price: 299.99,
        originalPrice: 399.99,
        category: "Electronics",
        subcategory: "Audio",
        sku: "WH001",
        stock: 25,
        status: "active",
        images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600",
        ],
        tags: ["wireless", "bluetooth", "headphones", "audio", "music"],
        rating: 4.5,
        reviewCount: 128,
        featured: true,
        searchKeywords: [
          "wireless",
          "bluetooth",
          "headphones",
          "audio",
          "music",
          "electronics",
        ],
      },
      {
        name: "Smartphone Pro Max",
        description:
          "Latest flagship smartphone with advanced camera system and 5G connectivity.",
        price: 999.99,
        category: "Electronics",
        subcategory: "Mobile",
        sku: "SP002",
        stock: 15,
        status: "active",
        images: [
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
          "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600",
        ],
        tags: ["smartphone", "mobile", "5g", "camera", "ios"],
        rating: 4.8,
        reviewCount: 245,
        featured: true,
        searchKeywords: [
          "smartphone",
          "mobile",
          "phone",
          "5g",
          "camera",
          "electronics",
        ],
      },
      {
        name: "Classic Cotton T-Shirt",
        description:
          "Comfortable 100% cotton t-shirt available in multiple colors and sizes.",
        price: 24.99,
        category: "Clothing",
        subcategory: "Tops",
        sku: "TS003",
        stock: 50,
        status: "active",
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
          "https://images.unsplash.com/photo-1583743814966-8936f37f4430?w=600",
        ],
        tags: ["t-shirt", "cotton", "casual", "comfortable", "basic"],
        rating: 4.2,
        reviewCount: 89,
        featured: false,
        searchKeywords: [
          "t-shirt",
          "shirt",
          "cotton",
          "clothing",
          "casual",
          "basic",
        ],
      },
      {
        name: "Professional Running Shoes",
        description:
          "High-performance running shoes with advanced cushioning and breathable design.",
        price: 149.99,
        originalPrice: 199.99,
        category: "Sports",
        subcategory: "Footwear",
        sku: "RS004",
        stock: 30,
        status: "active",
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600",
        ],
        tags: ["running", "shoes", "sports", "fitness", "athletic"],
        rating: 4.6,
        reviewCount: 156,
        featured: true,
        searchKeywords: [
          "running",
          "shoes",
          "sports",
          "fitness",
          "athletic",
          "footwear",
        ],
      },
      {
        name: "Automatic Coffee Maker",
        description:
          "Programmable coffee maker with built-in grinder and thermal carafe.",
        price: 199.99,
        category: "Home",
        subcategory: "Kitchen",
        sku: "CM005",
        stock: 20,
        status: "active",
        images: [
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600",
        ],
        tags: ["coffee", "maker", "kitchen", "appliance", "automatic"],
        rating: 4.4,
        reviewCount: 73,
        featured: false,
        searchKeywords: [
          "coffee",
          "maker",
          "kitchen",
          "appliance",
          "automatic",
          "home",
        ],
      },
      {
        name: "Fiction Bestseller Collection",
        description: "Collection of top 10 fiction bestsellers from this year.",
        price: 89.99,
        originalPrice: 129.99,
        category: "Books",
        subcategory: "Fiction",
        sku: "BC006",
        stock: 40,
        status: "active",
        images: [
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
        ],
        tags: ["books", "fiction", "bestseller", "collection", "reading"],
        rating: 4.7,
        reviewCount: 92,
        featured: true,
        searchKeywords: [
          "books",
          "fiction",
          "bestseller",
          "collection",
          "reading",
          "literature",
        ],
      },
      {
        name: "Yoga Mat Premium",
        description:
          "Extra thick yoga mat with superior grip and eco-friendly materials.",
        price: 49.99,
        category: "Sports",
        subcategory: "Fitness",
        sku: "YM007",
        stock: 35,
        status: "active",
        images: [
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600",
          "https://images.unsplash.com/photo-1506629905607-c794b53ba8a4?w=600",
        ],
        tags: ["yoga", "mat", "fitness", "exercise", "wellness"],
        rating: 4.3,
        reviewCount: 67,
        featured: false,
        searchKeywords: [
          "yoga",
          "mat",
          "fitness",
          "exercise",
          "wellness",
          "sports",
        ],
      },
      {
        name: "Smart Watch Series 5",
        description:
          "Advanced smartwatch with health monitoring and GPS tracking.",
        price: 399.99,
        category: "Electronics",
        subcategory: "Wearables",
        sku: "SW008",
        stock: 18,
        status: "active",
        images: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
          "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600",
        ],
        tags: ["smartwatch", "wearable", "fitness", "gps", "health"],
        rating: 4.5,
        reviewCount: 134,
        featured: true,
        searchKeywords: [
          "smartwatch",
          "watch",
          "wearable",
          "fitness",
          "gps",
          "health",
          "electronics",
        ],
      },
    ];

    for (const product of products) {
      const productData = {
        ...product,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await addDoc(collection(db, "products"), productData);
    }
    console.log("Products seeded successfully");

    // Create admin user document (you'll need to manually create the auth user first)
    const adminData = {
      personalInfo: {
        name: "Admin User",
        email: "admin@demostore.com",
        phone: "+1234567890",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      addresses: {
        shipping: null,
        billing: null,
      },
      preferences: {
        newsletter: false,
        notifications: true,
      },
      role: "admin",
    };

    // You'll need to replace 'ADMIN_USER_ID' with actual admin user ID after creating the auth account
    // await setDoc(doc(db, 'users', 'ADMIN_USER_ID'), adminData);

    console.log("Database seeding completed successfully!");
    return { success: true, message: "Database seeded successfully" };
  } catch (error) {
    console.error("Error seeding database:", error);
    return { success: false, error: error.message };
  }
};

// Sample order for testing (create after you have users)
export const createSampleOrder = async (userId) => {
  const sampleOrder = {
    userId: userId,
    orderNumber: `ORD-${Date.now()}`,
    status: "pending",
    items: [
      {
        productId: "product_id_here", // Replace with actual product ID
        name: "Wireless Bluetooth Headphones",
        price: 299.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
      },
    ],
    totals: {
      subtotal: 299.99,
      tax: 24.0,
      shipping: 9.99,
      total: 333.98,
    },
    shippingAddress: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA",
    },
    billingAddress: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA",
    },
    paymentMethod: "credit_card",
    paymentStatus: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const docRef = await addDoc(collection(db, "orders"), sampleOrder);
    console.log("Sample order created with ID: ", docRef.id);
    return { success: true, orderId: docRef.id };
  } catch (error) {
    console.error("Error creating sample order:", error);
    return { success: false, error: error.message };
  }
};
