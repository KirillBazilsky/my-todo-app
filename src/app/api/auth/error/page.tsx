"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const AuthErrorPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
//
  const handleRedirect = () => {
    window.location.href = "/user";
  };

  return (
    <div className="flex-wrapper h-lvh bg-gray-100">
      <div className="bg-white p-2 rounded-lg shadow-md min-w-80 text-center">
        <div className="text-red-500 text-2xl font-bold mb-4">Error</div>
        <p className="text-gray-700 text-lg mb-6">
          {error
            ? decodeURIComponent(error)
            : "An unknown authentication error occurred. Please try again."}
        </p>
        <button onClick={handleRedirect} className="btn btn-primary">
          Go back to Login
        </button>
      </div>
    </div>
  );
};

const SuspendedErrorPage = () => (
  <Suspense fallback={<div>...Loading</div>}>
    <AuthErrorPage />
  </Suspense>
);

export default SuspendedErrorPage;
