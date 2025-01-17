"use client";

import React from "react"; 
import { login } from "@/client/api/auth";
import { ChangeEvent, FormEvent, useState } from "react";

const SignInForm = () => {
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
  };

  return (
    <form onSubmit={handleSignIn} className="form flex-wrapper">
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
