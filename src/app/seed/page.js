"use client";

import { useState } from "react";
import { seedDatabase } from "@/lib/seedData";

const SeedPage = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [result, setResult] = useState(null);

  const handleSeed = async () => {
    setIsSeeding(true);
    const result = await seedDatabase();
    setResult(result);
    setIsSeeding(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Database Seeding
        </h1>

        <div className="mb-4">
          <p className="text-gray-600 mb-4">
            This will populate your Firestore database with sample products,
            categories, and test data.
          </p>

          <button
            onClick={handleSeed}
            disabled={isSeeding}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSeeding ? "Seeding Database..." : "Seed Database"}
          </button>
        </div>

        {result && (
          <div
            className={`p-4 rounded-lg ${
              result.success
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {result.success ? result.message : result.error}
          </div>
        )}

        <div className="mt-6 text-sm text-gray-500">
          <p>
            <strong>Note:</strong> Only run this once to avoid duplicate data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeedPage;
