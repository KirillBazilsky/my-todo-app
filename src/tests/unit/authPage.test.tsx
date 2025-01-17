import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { useSession, signOut } from "next-auth/react";
import AuthPage from "@/app/user/page";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

beforeAll(() => {
  window.history.pushState({}, "", window.location.href);
});

describe("AuthPage", () => {
  it("shows loading state", () => {
    (useSession as jest.Mock).mockReturnValue({
      status: "loading",
      data: null,
    });
    render(<AuthPage />);
    expect(screen.getByText("...Loading")).toBeInTheDocument();
  });

  it("shows sign-in form when user is not authenticated and isSignUpOpen is false", async () => {
    (useSession as jest.Mock).mockReturnValue({
      status: "unauthenticated",
      data: null,
    });
    await act(async () => {
      render(<AuthPage />);
    });
    expect(screen.getAllByText("Sign In"));
  });

  it("shows sign-up form when user is not authenticated and isSignUpOpen is true", async () => {
    (useSession as jest.Mock).mockReturnValue({
      status: "unauthenticated",
      data: null,
    });
    await act(async () => {
      render(<AuthPage />);
    });
    fireEvent.click(screen.getByText("Sign Up"));
  });

  it("calls signOut when logout button is clicked", async () => {
    (useSession as jest.Mock).mockReturnValue({
      status: "authenticated",
      data: { user: { name: "John Doe" } },
    });
    await act(async () => {
      render(<AuthPage />);
    });
    fireEvent.click(screen.getByText("Logout"));
    expect(signOut).toHaveBeenCalled();
  });

 it("disables sign in and sign up buttons when user is authenticated", async () => {
   (useSession as jest.Mock).mockReturnValue({
     status: "authenticated",
     data: { user: { name: "John Doe" } },
   });

   render(<AuthPage />);

   await waitFor(() => {
     const signInButton = screen.getByRole("button", { name: /Sign In/i });
     expect(signInButton).toHaveClass("btn-disabled");
   });

   await waitFor(() => {
     const signUpButton = screen.getByRole("button", { name: /Sign Up/i });
     expect(signUpButton).toHaveClass("btn-disabled");
   });
 });


  it("enables sign in and sign up buttons when user is not authenticated", async () => {
    (useSession as jest.Mock).mockReturnValue({
      status: "unauthenticated",
      data: null,
    });
    render(<AuthPage />);
    await waitFor(() =>{
      const signUpButton = (screen.getByRole("button", { name: /Sign Up/i }));
      expect(signUpButton).toHaveClass("btn-primary");
    }
    );
  });
});
