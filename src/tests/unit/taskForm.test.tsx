import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createTask } from "@/client/api/tasks";
import TaskForm from "@/app/components/tasks/TaskForm";
import { useRouter } from "next/navigation";

jest.mock("@/client/api/tasks", () => ({
  createTask: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

beforeAll(() => {
  window.location = { reload: jest.fn() } as unknown as Location;
});

describe("TaskForm Component", () => {
  it("should render form elements", () => {
    render(<TaskForm />);
    expect(screen.getByPlaceholderText("Enter task title")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  it("should handle form submission and call createTask", async () => {
    const mockRouter = {
      push: jest.fn(),
      query: {},
      pathname: "/sign-in",
    };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    (createTask as jest.Mock).mockResolvedValueOnce({});
    
    render(<TaskForm />);

    const input = screen.getByPlaceholderText(
      "Enter task title"
    ) as HTMLInputElement;
    const button = screen.getByText("Add Task");

    fireEvent.change(input, { target: { value: "New Task" } });

    fireEvent.click(button);

    await waitFor(() => expect(createTask).toHaveBeenCalledWith("New Task"));

    await waitFor(() => expect(input.value).toBe(""));
  });
});
