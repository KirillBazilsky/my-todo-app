"use client";

import "@/global.css";
import React from "react";
import { GlobalStateProvider } from "@/client/context/GlobalStateContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import GlobalErrorModal from "@/app/components/error/Error";
import SessionNav from "@/app/components/SessionNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SessionProvider>
      <GlobalStateProvider>
        <html lang="en" data-tailwind="true">
          <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <GlobalErrorModal />
            <SessionNav />
            <main className="flex-1">{children}</main>
          </body>
        </html>
      </GlobalStateProvider>
    </SessionProvider>
  );
}
