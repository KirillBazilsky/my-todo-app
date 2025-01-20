"use client";

import React from "react";
import { useUser } from "@/client/api/user";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();
  const { user, status } = useUser();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      <h4>Welcome, {`${user?.firstName} ${user?.lastName}`  }</h4>
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
