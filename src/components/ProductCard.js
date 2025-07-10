"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";

const ProductCard = ({ product, onQuickView }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const { addToCart } = useCart();

  // Helper function to get category display name
  const getCategoryDisplayName = (categoryId) => {
    const category = CATEGORIES.find((cat) => cat.id === categoryId);
    if (category) {
      return category.name;
    }
    // For old format or unknown categories, format the string
    return categoryId
      .replace("-", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 block"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="aspect-square bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className={cn(
              "w-full h-full object-cover transition-all duration-300 group-hover:scale-105",
              imageLoading ? "blur-sm" : "blur-0"
            )}
            onLoad={() => setImageLoading(false)}
          />
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </div>

        {/* Overlay Actions */}
        <div className="absolute inset-0 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <button
              onClick={handleQuickView}
              className="bg-white text-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              title="Quick View"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={handleWishlist}
              className={cn(
                "p-2 rounded-full shadow-lg transition-colors",
                isWishlisted
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              )}
              title="Add to Wishlist"
            >
              <Heart
                className={cn("h-4 w-4", isWishlisted && "fill-current")}
              />
            </button>
          </div>
        </div>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
          {getCategoryDisplayName(product.category)}
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            title="Add to Cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
