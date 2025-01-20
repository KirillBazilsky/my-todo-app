import axios from "axios";
import { errorManager } from "@/client/utils/errorManager";
import { signIn } from "next-auth/react";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    await signIn("credentials", { ...credentials, redirect: false });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorManager.notify(`Login failed: ${error.response?.data?.message}`);
      throw new Error(error.response?.data?.message || "Login failed");
    }
    
    errorManager.notify("An unknown error occurred");
    throw new Error("An unknown error occurred");
  }
};
