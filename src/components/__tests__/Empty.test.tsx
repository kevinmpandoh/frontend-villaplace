import { render, screen } from "@testing-library/react";
import Empty from "../Empty";  // Sesuaikan dengan path file yang tepat

describe("Empty Component", () => {
  test("renders the empty message correctly", () => {
    const message = "No data available";

    render(<Empty message={message} />);

    // Memeriksa apakah pesan ditampilkan dengan benar
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  test("renders the empty image correctly", () => {
    render(<Empty message="No data available" />);

    // Memeriksa apakah gambar dengan alt 'empty' dirender dengan benar
    const image = screen.getByAltText("empty");
    expect(image).toHaveAttribute("src", "/assets/images/Empty-pana.png");
    expect(image).toHaveAttribute("width", "200");
    expect(image).toHaveAttribute("height", "200");
  });

  test("has the correct structure and classes", () => {
    render(<Empty message="No data available" />);

    // Memeriksa apakah elemen div dengan class yang benar ada di dalam komponen
    const container = screen.getByRole("img").parentElement;
    expect(container).toHaveClass("flex items-center justify-center h-[50vh]");
    
    // Memeriksa apakah div untuk text memiliki class yang benar
    const textDiv = screen.getByText("No data available").parentElement;
    expect(textDiv).toHaveClass("text-center");
  });
});
