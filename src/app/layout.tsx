"use client";

import React from "react";
import { GlobalStateProvider } from "@/client/context/GlobalStateContext";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { styles } from "./styles.layout";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import GlobalErrorModal from "./component/Error/Error";


export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <GlobalStateProvider>
      <html lang="en">
        <body className={styles.layout}>
          <SessionProvider>
            <GlobalErrorModal />
            <nav className={styles.nav}>
              <ul className={styles.navList}>
                <li>
                  <Link
                    href="/user"
                    className={
                      isActive("/user") ? styles.navItemActive : styles.navItem
                    }
                  >
                    User
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tasks"
                    className={
                      isActive("/tasks") ? styles.navItemActive : styles.navItem
                    }
                  >
                    Tasks
                  </Link>
                </li>
              </ul>
            </nav>
            <main className={styles.main}>{children}</main>
          </SessionProvider>
        </body>
      </html>
    </GlobalStateProvider>
  );
}
