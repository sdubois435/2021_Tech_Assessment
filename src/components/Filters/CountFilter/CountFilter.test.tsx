import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CountFilter from "./CountFilter";

const mockOnChange = jest.fn();

describe("CountFilter", () => {
  test("default option is 10", () => {
    render(<CountFilter onChange={mockOnChange} />);
    expect(screen.getByText("10")).toBeInTheDocument;
  });

  it("changes values when a new count is selected", async () => {
    render(<CountFilter onChange={mockOnChange} />);
    const dropdown = screen.getByTestId("ReviewCount.Dropdown").children[0]
      .children[0];

    fireEvent.mouseDown(dropdown);

    const option = screen.getByText("50");

    fireEvent.mouseDown(option);

    expect(mockOnChange).toBeCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("50");
  });
});
