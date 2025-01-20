import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { login } from "@/client/api/auth";
import SignInForm from "@/app/components/auth/SignInForm";
import { useRouter } from "next/navigation";

jest.mock("@/client/api/auth", () => ({
  login: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

beforeAll(() => {
  window.location = { reload: jest.fn() } as unknown as Location;
});

describe("SignInForm", () => {
  it("should render the form inputs", () => {
    const mockRouter = {
      push: jest.fn(),
      query: {},
      pathname: "/sign-in",
    };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<SignInForm />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign In/i })
    ).toBeInTheDocument();
  });

  it("should update form data when input fields change", () => {
    render(<SignInForm />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "user@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    expect(screen.getByPlaceholderText("Email")).toHaveValue(
      "user@example.com"
    );
    expect(screen.getByPlaceholderText("Password")).toHaveValue("password123");
  });

  it("should call the login function when the form is submitted", async () => {
    const mockLogin = login as jest.Mock;
    const formData = {
      email: "user@example.com",
      password: "password123",
    };

    render(<SignInForm />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: formData.email },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: formData.password },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith(formData));
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});
