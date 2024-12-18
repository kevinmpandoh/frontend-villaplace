import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { Input } from "../ui/input";

describe("Input Component", () => {
  test("renders input field dengan default props", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base"
    );
  });

  test("renders input dengan placeholder", () => {
    render(<Input placeholder="Enter your name" />);
    const input = screen.getByPlaceholderText("Enter your name");

    expect(input).toBeInTheDocument();
  });

  test("renders input dengan type custom", () => {
    render(<Input type="password" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "password");
  });

  test("renders input dengan className custom", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("custom-class");
  });

  test("memperbarui nilai input", () => {
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");

    fireEvent.change(input, { target: { value: "Hello World" } });
    expect(input).toHaveValue("Hello World");
  });

  test("menonaktifkan input", () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText("Disabled input");

    expect(input).toBeDisabled();
    expect(input).toHaveClass("disabled:cursor-not-allowed disabled:opacity-50");
  });

  test("teruskan ref ke elemen input", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
