import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useGlobalState } from "@/client/context/GlobalStateContext";
import GlobalErrorModal from "@/app/components/error/Error";

jest.mock("@/client/context/GlobalStateContext", () => ({
  useGlobalState: jest.fn(),
}));

describe("GlobalErrorModal", () => {
  it("should render the error modal when an error is provided", () => {
    (useGlobalState as jest.Mock).mockReturnValue({
      error: "Something went wrong!",
      clearError: jest.fn(),
    });

    render(<GlobalErrorModal />);

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Close/i })).toBeInTheDocument();
  });

  it("should call clearError when Close button is clicked", () => {
    const clearErrorMock = jest.fn();

    (useGlobalState as jest.Mock).mockReturnValue({
      error: "Something went wrong!",
      clearError: clearErrorMock,
    });

    render(<GlobalErrorModal />);

    fireEvent.click(screen.getByRole("button", { name: /Close/i }));

    expect(clearErrorMock).toHaveBeenCalledTimes(1);
  });
});
