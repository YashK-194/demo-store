import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { APP_CONFIG } from "@/lib/constants";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {APP_CONFIG.name}
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: July 3, 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-gray-700 mb-4">
                By accessing and using {APP_CONFIG.name}, you accept and agree
                to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Use License
              </h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to temporarily download one copy of the
                materials on {APP_CONFIG.name}&apos;s website for personal,
                non-commercial transitory viewing only.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>This is the grant of a license, not a transfer of title</li>
                <li>
                  Under this license you may not modify or copy the materials
                </li>
                <li>
                  Use the materials for any commercial purpose or for any public
                  display
                </li>
                <li>
                  Attempt to reverse engineer any software contained on the
                  website
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Privacy Policy
              </h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our Privacy
                Policy, which also governs your use of the website, to
                understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Product Information
              </h2>
              <p className="text-gray-700 mb-4">
                We strive to provide accurate product descriptions and pricing.
                However, we do not warrant that product descriptions or other
                content is accurate, complete, reliable, current, or error-free.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Contact Information
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please
                contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  Email: {APP_CONFIG.email}
                  <br />
                  Phone: {APP_CONFIG.phone}
                  <br />
                  Address: 123 Shopping Street, Commerce City, CC 12345
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
