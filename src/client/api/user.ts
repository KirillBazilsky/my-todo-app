import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import { errorManager } from "../utils/errorManager";

export const getUser = async() => {
    const {data: session} = await useSession();

    if (!session || !session.user?.id) {
      return
    }

    const response = await axios.get("/api/user");

    return response.data
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