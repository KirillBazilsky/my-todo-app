import React, { FC, ReactNode } from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { useUser } from "@/client/api/user";
import { SessionProvider } from "next-auth/react";
import UserInfo from "@/app/user/components/UserInfo";
import { Session } from "next-auth";

interface IMockSessionProviderProps {
  session: Session | null;
  children: ReactNode;
}

jest.mock("@/client/api/user", () => ({
  useUser: jest.fn(),
}));

const MockSessionProvider: FC<IMockSessionProviderProps> = ({
  session,
  children,
}) => <SessionProvider session={session}>{children}</SessionProvider>;

describe("UserInfo", () => {
  it("should display a loading message when session is loading", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      status: "loading",
    });

    render(
      <MockSessionProvider session={null}>
        <UserInfo />
      </MockSessionProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display a not-logged-in message when no user is available", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      status: "authenticated",
    });

    render(
      <MockSessionProvider session={null}>
        <UserInfo />
      </MockSessionProvider>
    );

    expect(screen.getByText("You are not logged in.")).toBeInTheDocument();
  });

  it("should display user info when user is logged in", async () => {
    const mockUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    };

    const mockSession = {
      user: mockUser,
      expires: "2100-01-01T00:00:00.000Z",
    };

    (useUser as jest.Mock).mockReturnValue({
      user: mockUser,
      status: "authenticated",
    });

    render(
      <MockSessionProvider session={mockSession}>
        <UserInfo />
      </MockSessionProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Welcome, John Doe/)).toBeInTheDocument();
      expect(screen.getByText("User info:")).toBeInTheDocument();
    });

    expect(screen.getByText("firstName")).toBeInTheDocument();
    expect(screen.getByText("lastName")).toBeInTheDocument();
    expect(screen.getByText("email")).toBeInTheDocument();

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
  });
});
