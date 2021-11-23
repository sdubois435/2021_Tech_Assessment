import { render, screen } from "@testing-library/react";
import CountFilter from ".";
import App from "./CountFilter";

const mockOnChange = jest.fn();

describe("CountFilter", () => {
  test("default option is 10", () => {
    render(<CountFilter onChange={mockOnChange} />);
    expect(screen.getByText("10")).toBeInTheDocument;
  });
});
