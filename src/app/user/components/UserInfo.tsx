"use client";

import React from "react";
import { getUser } from "@/client/api/user";
import { IUser } from "@/client/interfaces/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserInfo() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<IUser | null>(null);

  const fetchUser = async () => {
    const userData = await getUser();
    setUser(userData);
  };

  useEffect(() => {
    if (status === "authenticated" && session) {
      fetchUser();
    }
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      <h4>Welcome, {`${user?.firstName} ${user?.lastName}`}</h4>
      <p className="text-center text-xl font-bold">User info:</p>
      <table className="table">
        <thead>
          <tr className="table-row">
            {user
              ? Object.keys(user).map((prop) => <td key={prop}>{prop}</td>)
              : null}
          </tr>
        </thead>
        <tbody>
          <tr className="table-row">
            {user
              ? Object.values(user).map((prop, index) => (
                  <td key={`${prop}-${index}`}>{prop}</td>
                ))
              : null}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
