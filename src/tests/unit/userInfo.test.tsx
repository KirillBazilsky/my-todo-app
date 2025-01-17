import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, act } from "@testing-library/react";
import { getUser } from "@/client/api/user";
import { useSession } from "next-auth/react";
import UserInfo from "@/app/user/components/UserInfo";

// Мокаем необходимые модули
jest.mock("@/client/api/user", () => ({
  getUser: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

beforeAll(() => {
  window.history.pushState({}, "", window.location.href);
});

describe("UserInfo", () => {
  it("should display loading message when session is loading", () => {
    // Мокаем сессию в состоянии загрузки
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "loading",
    });

    render(<UserInfo />);

    // Проверяем, что отображается сообщение о загрузке
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display not logged in message when no session is available", () => {
    // Мокаем сессию как неактивную (пользователь не залогинен)
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "authenticated",
    });

    render(<UserInfo />);

    // Проверяем, что отображается сообщение о том, что пользователь не залогинен
    expect(screen.getByText("You are not logged in.")).toBeInTheDocument();
  });

  it("should display user info when user is logged in and data is fetched", async () => {
    // Мокаем данные пользователя
    const mockUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    };
    // Мокаем ответ от getUser
    (getUser as jest.Mock).mockResolvedValue(mockUser);
    (useSession as jest.Mock).mockReturnValue({
      data: { user: mockUser },
      status: "authenticated",
    });

    await act(async () => {
      render(<UserInfo />);
    });

    await waitFor(() => expect(getUser).toHaveBeenCalledTimes(1));

    expect(screen.getByText(/Welcome, John Doe/)).toBeInTheDocument();
    expect(screen.getByText("User info:")).toBeInTheDocument();
    expect(screen.getByText("firstName")).toBeInTheDocument();
    expect(screen.getByText("lastName")).toBeInTheDocument();
    expect(screen.getByText("email")).toBeInTheDocument();
  });

  it("should display user properties in a table", async () => {
    const mockUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    };
    (getUser as jest.Mock).mockResolvedValue(mockUser);
    (useSession as jest.Mock).mockReturnValue({
      data: { user: mockUser },
      status: "authenticated",
    });

    await act(async () => {
      render(<UserInfo />);
    });

    await waitFor(() => expect(getUser).toHaveBeenCalledTimes(2));

    expect(screen.getByText("firstName")).toBeInTheDocument();
    expect(screen.getByText("lastName")).toBeInTheDocument();
    expect(screen.getByText("email")).toBeInTheDocument();

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
  });
});
