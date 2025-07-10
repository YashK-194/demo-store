"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Users,
  Award,
  Truck,
  Shield,
} from "lucide-react";

const AboutContactPage = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert("Thank you for your message! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 2000);
  };

  const features = [
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Our dedicated team of experts carefully curates every product to ensure quality and value.",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description:
        "We stand behind every product we sell with a comprehensive quality guarantee and warranty.",
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description:
        "Quick and reliable shipping with tracking, so you get your products when you need them.",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description:
        "Your privacy and security are our top priority with encrypted transactions and data protection.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "1M+", label: "Products Sold" },
    { number: "99%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Customer Support" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About DemoStore
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted online shopping destination for quality products at
              unbeatable prices
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mt-8">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("about")}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === "about"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => setActiveTab("contact")}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === "contact"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === "about" ? (
          <div className="space-y-16">
            {/* About Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    Founded with a vision to make quality products accessible to
                    everyone, DemoStore has grown from a small startup to a
                    trusted online marketplace serving customers worldwide.
                  </p>
                  <p>
                    We believe that shopping should be convenient, affordable,
                    and enjoyable. That&apos;s why we&apos;ve carefully curated
                    our product selection to include only the best items across
                    electronics, clothing, toys, tools, and more.
                  </p>
                  <p>
                    Our commitment goes beyond just selling products. We&apos;re
                    dedicated to providing exceptional customer service,
                    competitive prices, and a seamless shopping experience that
                    keeps our customers coming back.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                  alt="Our Store"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Why Choose DemoStore?
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  We&apos;re committed to providing the best shopping experience
                  possible
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm text-center"
                  >
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-blue-600 rounded-2xl p-8 lg:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Our Impact
                </h2>
                <p className="text-blue-100 text-lg">
                  These numbers represent our commitment to excellence
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-blue-100 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Send us a message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Get in touch
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Address</h3>
                        <p className="text-gray-600">
                          123 Shopping Street
                          <br />
                          Commerce City, CC 12345
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Phone</h3>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Email</h3>
                        <p className="text-gray-600">support@demostore.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Business Hours
                        </h3>
                        <p className="text-gray-600">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 10:00 AM - 4:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        What is your return policy?
                      </h4>
                      <p className="text-gray-600">
                        We offer a 30-day return policy for all unused items in
                        original packaging.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        How long does shipping take?
                      </h4>
                      <p className="text-gray-600">
                        Standard shipping takes 3-7 business days. Express
                        shipping is 1-2 business days.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Do you ship internationally?
                      </h4>
                      <p className="text-gray-600">
                        Yes, we ship to most countries worldwide. Shipping costs
                        vary by location.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutContactPage;
