"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Heart,
  ArrowLeft,
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getProduct } from "@/lib/firebase";
import { cn } from "@/lib/utils";

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const loadProduct = async () => {
      if (params.id) {
        try {
          setLoading(true);
          const result = await getProduct(params.id);
          if (result.success) {
            setProduct(result.product);
          } else {
            setError(result.error || "Product not found");
          }
        } catch (err) {
          console.error("Error loading product:", err);
          setError("Failed to load product");
        } finally {
          setLoading(false);
        }
      }
    };

    loadProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Product Not Found"}
          </h1>
          <p className="text-gray-600 mb-8">
            {error
              ? "There was an error loading the product."
              : "The product you're looking for doesn't exist."}
          </p>
          <div className="space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  // Mock multiple images - using same image for demo
  const images = [product.image, product.image, product.image, product.image];

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: "John D.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent product! Exactly as described and fast shipping.",
    },
    {
      id: 2,
      name: "Sarah M.",
      rating: 4,
      date: "1 month ago",
      comment: "Good quality, though delivery took a bit longer than expected.",
    },
    {
      id: 3,
      name: "Mike R.",
      rating: 5,
      date: "3 weeks ago",
      comment: "Outstanding! Will definitely buy again.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <Link href="/products" className="text-gray-500 hover:text-gray-700">
            Products
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 capitalize">
            {product.category.replace("-", " ")}
          </span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors",
                    selectedImage === index
                      ? "border-blue-600"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            <div className="text-sm text-blue-600 uppercase tracking-wide font-medium">
              {product.category.replace("-", " ")}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-2xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.discount && (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Save {product.discount}%
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-lg text-gray-600">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                Quantity:
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={cn(
                  "p-4 border rounded-lg transition-colors",
                  isWishlisted
                    ? "bg-red-50 border-red-300 text-red-600"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                )}
              >
                <Heart
                  className={cn("h-5 w-5", isWishlisted && "fill-current")}
                />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  Free Shipping
                </p>
                <p className="text-xs text-gray-500">Orders over ₹2000</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Warranty</p>
                <p className="text-xs text-gray-500">1 year coverage</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  Easy Returns
                </p>
                <p className="text-xs text-gray-500">30 day policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors",
                    activeTab === tab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "description" && (
              <div className="prose prose-lg max-w-none">
                <h3 className="text-xl font-semibold mb-4">
                  Product Description
                </h3>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-gray-700">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium text-gray-700">SKU:</span>
                      <span className="text-gray-600">
                        #{product.id.toString().padStart(6, "0")}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium text-gray-700">
                        Category:
                      </span>
                      <span className="text-gray-600 capitalize">
                        {product.category.replace("-", " ")}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium text-gray-700">Weight:</span>
                      <span className="text-gray-600">2.5 lbs</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium text-gray-700">
                        Dimensions:
                      </span>
                      <span className="text-gray-600">
                        10&quot; x 8&quot; x 4&quot;
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium text-gray-700">
                        Material:
                      </span>
                      <span className="text-gray-600">Premium Quality</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium text-gray-700">Color:</span>
                      <span className="text-gray-600">Multiple Options</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium text-gray-700">
                        Warranty:
                      </span>
                      <span className="text-gray-600">1 Year</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium text-gray-700">
                        Made In:
                      </span>
                      <span className="text-gray-600">USA</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Write a Review
                  </button>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">
                            {review.name}
                          </span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
