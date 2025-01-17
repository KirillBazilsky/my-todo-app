import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { register } from "@/client/api/user"; // Ensure the correct import path
import SignUpForm from "@/app/user/components/SignUpForm";

jest.mock("@/client/api/user", () => ({
  register: jest.fn(),
}));

describe("SignUpForm", () => {
  it("should render the form inputs", () => {
    render(<SignUpForm />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign Up/i })
    ).toBeInTheDocument();
  });

  it("should update form data when input fields change", () => {
    render(<SignUpForm />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });

    expect(screen.getByPlaceholderText("Email")).toHaveValue(
      "user@example.com"
    );
    expect(screen.getByPlaceholderText("Password")).toHaveValue("password123");
    expect(screen.getByPlaceholderText("First Name")).toHaveValue("John");
    expect(screen.getByPlaceholderText("Last Name")).toHaveValue("Doe");
  });

  it("should call the register function when the form is submitted", async () => {
    const mockRegister = register as jest.Mock;
    const formData = {
      email: "user@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
    };

    render(<SignUpForm />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: formData.email },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: formData.password },
    });
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: formData.firstName },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: formData.lastName },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    await waitFor(() => expect(mockRegister).toHaveBeenCalledWith(formData));
    expect(mockRegister).toHaveBeenCalledTimes(1);
  });
});
