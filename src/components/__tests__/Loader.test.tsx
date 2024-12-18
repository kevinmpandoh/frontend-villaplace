import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "../Loader";
import "@testing-library/jest-dom";

describe("Loader Component", () => {
  test("renders the loader component", () => {
    render(<Loader />);

    const spinnerElement = screen.getByRole("presentation");
    expect(spinnerElement).toBeInTheDocument();

    expect(spinnerElement).toHaveClass("animate-spin");
    expect(spinnerElement).toHaveClass("rounded-full");
    expect(spinnerElement).toHaveClass("border-4");
    expect(spinnerElement).toHaveClass("border-solid");
    expect(spinnerElement).toHaveClass("border-primary");
    expect(spinnerElement).toHaveClass("border-t-transparent");
  });

  test("cek elemen memiliki kelas yang sesuai", () => {
    render(<Loader />);

    const loaderContainer = screen.getByRole("presentation").parentElement;
    expect(loaderContainer).toHaveClass("bg-white");
  });

  test("memastikan elemen memiliki kelas yang sesuai", () => {
    render(<Loader />);

    const loaderContainer = screen.getByRole("presentation").parentElement;
    expect(loaderContainer).toHaveClass("flex");
    expect(loaderContainer).toHaveClass("h-screen");
    expect(loaderContainer).toHaveClass("items-center");
    expect(loaderContainer).toHaveClass("justify-center");
  });
});
