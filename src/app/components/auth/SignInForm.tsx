"use client";

import React from "react"; 
import { login } from "@/client/api/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();
   const [formData, setFormData] = useState({
     email: "",
     password: "",
   });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();
    await login(formData);

    router.push("/tasks");
  };

  return (
    <form onSubmit={handleSignIn} className="form flex-wrapper max-w-96">
      <h4>Log in to your account</h4>
      <input
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="current-email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />
      <button type="submit" className="btn btn-primary w-1/3">
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
