import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />

      {/* Demo Notice */}
      <div className="bg-gray-800 border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm mb-3">
            This is a demo e-commerce website.
            <Link
              href="/admin"
              className="text-blue-400 hover:text-blue-300 underline ml-1 transition-colors"
            >
              Visit the admin panel
            </Link>{" "}
            to explore management features.
          </p>
        </div>
      </div>
    </div>
  );
}
