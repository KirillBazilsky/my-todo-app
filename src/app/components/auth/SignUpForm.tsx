"use client";

import React from "react";
import { register } from "@/client/api/user";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();
    await register(formData);
    router.push("/tasks");
  };  

  return (
    <form onSubmit={handleSignUp} className="form flex-wrapper max-w-96">
      <h4>Create your account</h4>
      <input
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="new-email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="new-password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        autoComplete="name"
        value={formData.firstName}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        autoComplete="name"
        value={formData.lastName}
        onChange={handleInputChange}
        required
      />
      <button type="submit" className="btn btn-primary w-1/3">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
