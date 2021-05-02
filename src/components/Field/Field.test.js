import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Field from "./Field.js";

describe("Field Component", () => {
  const mockProps = {
    data: { name: "name", type: "text", value: "howdy", human_label: "Name" },
    action: jest.fn(),
  };
  it("renders label and input", () => {
    const { getByTestId } = render(<Field {...mockProps} />);

    expect(getByTestId("field-label")).toBeInTheDocument();
    expect(getByTestId("name-input")).toBeInTheDocument();
  });
  it("fires action onChange", () => {
    const { getByTestId } = render(<Field {...mockProps} />);
    fireEvent.change(getByTestId("name-input"), { target: { value: "test" } });
    expect(mockProps.action).toBeCalled();
  });
});
