import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "../Loader";
import "@testing-library/jest-dom";

describe("Loader Component", () => {
  test("renders the loader component", () => {
    render(<Loader />);

    // Verifikasi elemen loader
    const loaderElement = screen.getByTestId("loader-spinner");
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass("animate-spin rounded-full border-4 border-solid border-primary border-t-transparent");
  });

  test("container memiliki kelas yang sesuai", () => {
    render(<Loader />);

    // Verifikasi elemen container
    const containerElement = screen.getByTestId("loader-container");
    expect(containerElement).toHaveClass("flex h-screen items-center justify-center bg-white");
  });
});
