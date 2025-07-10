"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Star, ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

const ProductModal = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        size: selectedSize,
        color: selectedColor,
      },
      quantity
    );
    onClose();
  };

  const images = product.images || [product.image];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="flex space-x-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? "border-blue-500"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Product Title and Rating */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {product.name}
                  </h1>
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 rounded-full transition-colors ${
                      isWishlisted
                        ? "text-red-500 bg-red-50"
                        : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                    }`}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>

                <p className="text-gray-600 capitalize mb-2">
                  {product.category.replace("-", " ")}
                </p>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating || 4.5)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-semibold">
                      Save {product.discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* Product Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description ||
                    "High-quality product with excellent features and design."}
                </p>
              </div>

              {/* Size Selection */}
              {product.sizes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Size
                  </h3>
                  <div className="flex space-x-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                          selectedSize === size
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Color
                  </h3>
                  <div className="flex space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                          selectedColor === color
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Quantity
                  </h3>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-50 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>
                    Add to Cart - ₹{(product.price * quantity).toFixed(2)}
                  </span>
                </button>
              </div>

              {/* Additional Info */}
              <div className="space-y-2 text-sm text-gray-600">
                <p>✓ Free shipping on orders over ₹2000</p>
                <p>✓ 30-day return policy</p>
                <p>✓ 2-year warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
