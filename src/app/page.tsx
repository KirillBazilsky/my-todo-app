"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SessionStatus } from "@/client/types/session";

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === SessionStatus.AUTHENTICATED) {
      router.push("/tasks");
    }

    if (status === SessionStatus.UNAUTHENTICATED) router.push("/sign-in");
  }, [router, session]);

  return (
    <div className="flex-wrapper">
      <p>Loading...</p>
    </div>
  );
};

export default HomePage;
