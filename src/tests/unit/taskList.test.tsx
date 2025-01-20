import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getTasks, updateTaskStatus, deleteTask } from "@/client/api/tasks";
import { TaskStatus } from "@prisma/client";
import TaskList from "@/app/components/tasks/TaskList";

jest.mock("@/client/api/tasks", () => ({
  getTasks: jest.fn(),
  updateTaskStatus: jest.fn(),
  deleteTask: jest.fn(),
}));

const getTasksMock = getTasks as jest.Mock;
const updateTaskStatusMock = updateTaskStatus as jest.Mock;
const deleteTaskMock = deleteTask as jest.Mock;

describe("TaskList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", async () => {
    getTasksMock.mockResolvedValueOnce([]);

    render(<TaskList />);

    await waitFor(() =>
      expect(screen.getByText(/loading tasks/i)).toBeInTheDocument()
    );
  });

  test("renders no tasks message when no tasks are available", async () => {
    getTasksMock.mockResolvedValueOnce([]);

    render(<TaskList />);

    await waitFor(() =>
      expect(screen.getByText(/no tasks/i)).toBeInTheDocument()
    );
  });

  test("renders task list and handles status change", async () => {
    const tasks = [
      { id: 1, title: "Test Task 1", status: TaskStatus.IN_PROGRESS },
      { id: 2, title: "Test Task 2", status: TaskStatus.PAUSED },
    ];

    getTasksMock.mockResolvedValueOnce(tasks);

    render(<TaskList />);

    await waitFor(() =>
      expect(screen.getByText("Test Task 1")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("Test Task 2")).toBeInTheDocument()
    );

    const selectElements = screen.getAllByRole("combobox");
    userEvent.selectOptions(selectElements[0], TaskStatus.COMPLETED);

    await waitFor(() =>
      expect(updateTaskStatusMock).toHaveBeenCalledWith(1, TaskStatus.COMPLETED)
    );
  });

  test("deletes a task when delete button is clicked", async () => {
    const tasks = [
      { id: 1, title: "Test Task 1", status: TaskStatus.IN_PROGRESS },
    ];

    getTasksMock.mockResolvedValueOnce(tasks);
    deleteTaskMock.mockResolvedValueOnce({});

    render(<TaskList />);

    await waitFor(() =>
      expect(screen.getByText("Test Task 1")).toBeInTheDocument()
    );

    const deleteButton = screen.getByText("Delete");
    userEvent.click(deleteButton);

    await waitFor(() => expect(deleteTaskMock).toHaveBeenCalledWith(1));
    await waitFor(() =>
      expect(screen.queryByText("Test Task 1")).not.toBeInTheDocument()
    );
  });
});
