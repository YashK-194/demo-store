"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import LoadingSpinner from "./LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { isAdminLoggedIn, loading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdminLoggedIn) {
      router.push("/admin");
    }
  }, [isAdminLoggedIn, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Access Denied
          </h2>
          <p className="text-slate-600 mb-4">
            You need to be logged in as an admin to access this page.
          </p>
          <button
            onClick={() => router.push("/admin")}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
