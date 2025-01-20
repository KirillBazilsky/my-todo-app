"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const SessionNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    if (session) {
      await signOut({
        redirect: false,
      });
      router.push("/sign-in");
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-end fixed w-screen">
      <ul className="flex space-x-4">
        <li>
          {session ? (
            <p
              onClick={handleLogout}
              className={
                isActive("/sign-in")
                  ? "text-lg font-bold underline cursor-pointer"
                  : "text-lg hover:underline cursor-pointer"
              }
            >
              Logout
            </p>
          ) : (
            <Link
              href="/sign-in"
              className={
                isActive("/sign-in")
                  ? "text-lg font-bold underline"
                  : "text-lg hover:underline"
              }
            >
              Sign in
            </Link>
          )}
        </li>
        <p>/</p>
        <li>
          {session ? (
            <Link
              href="/tasks"
              className={
                isActive("/tasks")
                  ? "text-lg font-bold underline"
                  : "text-lg hover:underline"
              }
            >
              Tasks
            </Link>
          ) : (
            <Link
              href="/sign-up"
              className={
                isActive("/sign-up")
                  ? "text-lg font-bold underline"
                  : "text-lg hover:underline"
              }
            >
              Sign up
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default SessionNav;
