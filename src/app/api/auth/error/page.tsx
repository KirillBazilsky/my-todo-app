"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { styles } from "./styles";
import { Suspense } from "react";

const AuthErrorPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleRedirect = () => {
    window.location.href = "/user";
  };

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.title}>Error</div>
        <p className={styles.error}>
          {error
            ? decodeURIComponent(error)
            : "An unknown authentication error occurred. Please try again."}
        </p>
        <button
          onClick={handleRedirect}
          className="btn btn-primary"
        >
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
