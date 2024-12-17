import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer Component", () => {
  it("renders the footer text correctly", () => {
    render(<Footer />);
    
    // Check for the text in the Footer component
    const footerText = screen.getByText(/Copyright © 2024 VillaPlace/i);
    expect(footerText).toBeInTheDocument();
  });

  it("has the correct class names for styling", () => {
    render(<Footer />);
    
    const footerElement = screen.getByText(/VillaPlace/i);
    expect(footerElement).toHaveClass("text-white", "bg-brown-500", "py-5", "text-center");
  });
});
