import axios from "axios";
import { signIn } from "next-auth/react";
import { errorManager } from "@/client/utils/errorManager";
import { useEffect, useState } from "react";
import { IUser } from "@/client/interfaces/user";

export function useUser() {
  const [user, setUser] = useState<IUser | null>(null);
  const [status, setStatus] = useState<string>("loading");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get("/api/user"); 
        setUser(response.data);
        setStatus("authenticated");
      } catch (error) {
        setStatus("unauthenticated");
        errorManager.notify(`Error fetching user data: ${error}`);
      }
    }

    fetchUserData();
  }, []);

  return { user, status };
}

export const register = async (user: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  try {
    const response = await axios.post(
      "/api/register",
      {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      const result = await signIn("credentials", {
        redirect: false,
        email: user.email,
        password: user.password,
      });

      if (result?.error) {
        errorManager.notify(`Login failed: ${result.error}`);
      }
    }
  } catch (error) {
    errorManager.notify(`Registration failed: ${error}`);
  }
};