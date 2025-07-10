"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Star,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getHeroCarouselProducts } from "@/lib/firebase";

const HeroSection = () => {
  const [heroProducts, setHeroProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHeroProducts = async () => {
      try {
        const result = await getHeroCarouselProducts();
        if (result.success) {
          setHeroProducts(result.products);
        }
      } catch (error) {
        console.error("Error loading hero carousel products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHeroProducts();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (heroProducts.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroProducts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroProducts.length) % heroProducts.length
    );
  };

  const getCurrentProduct = () => {
    if (heroProducts.length === 0) {
      return {
        name: "Premium Headphones",
        price: 99.99,
        image:
          "https://images.unsplash.com/photo-1560472355-a9a6b043b95d?w=600&h=400&fit=crop",
        rating: 5,
        reviewCount: 234,
        id: "default",
      };
    }
    return heroProducts[currentSlide];
  };

  const currentProduct = getCurrentProduct();

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  Trusted by 10,000+ customers
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover Amazing
                <span className="text-blue-600 block">Products</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Shop the latest electronics, fashion, toys, and tools. Quality
                products with fast shipping and unbeatable prices.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="#featured"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
              >
                View Featured
                <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                  1M+
                </div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                  50K+
                </div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                  99%
                </div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Carousel */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-white p-8 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="relative">
                  <Image
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    width={600}
                    height={400}
                    className="w-full h-64 lg:h-80 object-cover rounded-lg"
                  />

                  {/* Carousel Navigation */}
                  {heroProducts.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                      >
                        <ChevronLeft className="h-5 w-5 text-gray-700" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                      >
                        <ChevronRight className="h-5 w-5 text-gray-700" />
                      </button>
                    </>
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      {currentProduct.name}
                    </span>
                    <span className="text-blue-600 font-bold">
                      ${currentProduct.price}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < (currentProduct.rating || 5)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-gray-500 text-sm ml-2">
                      ({currentProduct.reviewCount || 234} reviews)
                    </span>
                  </div>

                  {/* Product Link */}
                  {currentProduct.id !== "default" && (
                    <Link
                      href={`/products/${currentProduct.id}`}
                      className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                    >
                      View Product
                    </Link>
                  )}
                </div>
              </div>

              {/* Carousel Indicators */}
              {heroProducts.length > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                  {heroProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentSlide
                          ? "bg-blue-600"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Background decorations */}
            <div className="absolute top-0 right-0 -z-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
