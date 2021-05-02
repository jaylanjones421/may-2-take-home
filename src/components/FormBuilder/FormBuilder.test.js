import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FormBuilder from "./FormBuilder.js";

describe("FormBuilder Component", () => {
  const mockProps = {
    data: [
      {
        tag: "input",
        name: "first_name",
        type: "text",
        human_label: "First Name",
      },
    ],
    submitAction: jest.fn(),
  };
  it("renders container, fields, and submit button", () => {
    const { getByTestId } = render(<FormBuilder {...mockProps} />);

    expect(getByTestId("form-container")).toBeInTheDocument();
    expect(getByTestId("field-container")).toBeInTheDocument();
    expect(getByTestId("form-submit")).toBeInTheDocument();
  });
  it("does not fire action onClick of submit with empty values", () => {
    const { getByTestId } = render(<FormBuilder {...mockProps} />);
    fireEvent.click(getByTestId("form-submit"));
    expect(mockProps.submitAction).not.toBeCalled();
  });

  it("fires action onClick of submit with values filled", () => {
    const { getByTestId } = render(<FormBuilder {...mockProps} />);
    fireEvent.change(getByTestId("first_name-input"), {
      target: { value: "name" },
    });
    fireEvent.click(getByTestId("form-submit"));

    expect(mockProps.submitAction).toBeCalled();
  });
});
