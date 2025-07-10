"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Here you would integrate with Stripe
    setTimeout(() => {
      alert(
        "Checkout functionality can be added using RazerPay on real website"
      );
      setIsCheckingOut(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Cart Items
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium self-start sm:self-auto"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 border border-gray-200 rounded-lg"
                    >
                      {/* Product Image and Info */}
                      <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                        <div className="flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 capitalize mt-1">
                            {item.category.replace("-", " ")}
                          </p>
                          <p className="text-lg font-semibold text-gray-900 mt-1">
                            ₹{item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Controls and Actions */}
                      <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                        <div className="flex items-center space-x-2 border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            className="p-2 hover:bg-gray-50 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 sm:w-12 text-center font-medium text-sm sm:text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-gray-50 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-600 hover:text-red-800 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                        >
                          <Trash2 className="h-4 w-5 sm:h-5 sm:w-5" />
                        </button>

                        <div className="text-right">
                          <p className="text-base sm:text-lg font-semibold text-gray-900">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="flex justify-between items-center">
              <Link
                href="/products"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base py-2"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">
                    ₹{(totalPrice * 0.08).toFixed(2)}
                  </span>
                </div>

                <div className="border-t pt-3 sm:pt-4">
                  <div className="flex justify-between text-base sm:text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{(totalPrice * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full mt-4 sm:mt-6 bg-blue-600 text-white py-3 sm:py-4 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base min-h-[48px]"
              >
                {isCheckingOut ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Proceed to Checkout</span>
                  </>
                )}
              </button>

              {/* Security Info */}
              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs sm:text-sm text-gray-500">
                  🔒 Secure checkout with SSL encryption
                </p>
              </div>

              {/* Payment Methods */}
              <div className="mt-3 sm:mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">We accept</p>
                <div className="flex justify-center space-x-2">
                  <div className="text-xl sm:text-2xl">💳</div>
                  <div className="text-xl sm:text-2xl">🏧</div>
                  <div className="text-xl sm:text-2xl">📱</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
