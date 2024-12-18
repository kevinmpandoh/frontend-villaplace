import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer Component", () => {
  test("Menampilkan teks yang sesuai", () => {
    render(<Footer />);
    
    // Cari elemen dengan teks "Copyright © 2024 VillaPlace"
    const footerText = screen.getByText(/Copyright © 2024 VillaPlace/i);
    expect(footerText).toBeInTheDocument();
  });

  test("Menggunakan style yang sesuai", () => {
    render(<Footer />);
    
    const footerElement = screen.getByText(/VillaPlace/i);
    expect(footerElement).toHaveClass("text-white", "bg-brown-500", "py-5", "text-center");
  });
});
