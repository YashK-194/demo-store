import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AdminProvider } from "@/context/AdminContext";
import { AuthProvider } from "@/context/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DemoStore - Your Online Shopping Destination",
  description:
    "Shop the latest electronics, fashion, toys, and tools at unbeatable prices with fast shipping.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <AdminProvider>
            <CartProvider>
              <Navigation />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </CartProvider>
          </AdminProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
