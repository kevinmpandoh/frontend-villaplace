import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer Component", () => {
  test("Menampilkan teks copyright yang sesuai", () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();

    // Cari elemen dengan teks "Copyright © {currentYear} VillaPlace"
    const footerText = screen.getByText(new RegExp(`Copyright © ${currentYear} VillaPlace`, "i"));
    expect(footerText).toBeInTheDocument();
  });

  test("Memiliki style yang sesuai", () => {
    render(<Footer />);
  
    const footerElement = screen.getByText(/Copyright © 2024 VillaPlace/i).parentElement;
  
    // Periksa hanya kelas penting
    expect(footerElement).toHaveClass("text-white");
    expect(footerElement).toHaveClass("text-center");
  });
  
});
