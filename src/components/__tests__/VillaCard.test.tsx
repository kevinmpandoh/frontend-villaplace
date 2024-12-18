import { render, screen, fireEvent } from "@testing-library/react";
import VillaCard from "../VillaCard";  // Sesuaikan dengan path file yang tepat
import { VillaProps } from "@/types/Villa";

const mockVilla: VillaProps = {
    _id: "1",
    nama: "Villa Tropis",
    lokasi: "Bali, Indonesia",
    fasilitas: ["3 Kamar", "2 Kamar Mandi"],
    harga: 5000000,
    foto_villa: [
      {
        _id: "1",
        villa: "1", // ID villa yang terkait
        name: "villa-tropis.jpg", // Nama file gambar
        filepath: "/images/villa-tropis.jpg", // Lokasi gambar
        url: "/default-image.png", // URL gambar untuk placeholder
        __v: 0, // Versi dokumen jika menggunakan MongoDB
      },
    ],
    averageRating: 4.5,
    commentCount: 10,
    deskripsi: "Villa tropis yang terletak di Bali dengan fasilitas lengkap.",
    status: "Tersedia",
    kategori: ["Villa Tropis", "Dekat Kota"],
  };

describe("VillaCard Component", () => {
  test("renders nama, lokasi, dan fasilitas", () => {
    render(<VillaCard {...mockVilla} />);

    expect(screen.getByText("Villa Paradise")).toBeInTheDocument();

    expect(screen.getByText("Bali, Indonesia")).toBeInTheDocument();

    expect(screen.getByText("3 Bedrooms")).toBeInTheDocument();
    expect(screen.getByText("2 Bathrooms")).toBeInTheDocument();
  });

  test("renders harga villa", () => {
    render(<VillaCard {...mockVilla} />);

    // Memeriksa apakah harga villa dirender dengan benar
    expect(screen.getByText("Rp. 5,000,000")).toBeInTheDocument();
  });

  test("renders rating dan jumlah komentar", () => {
    render(<VillaCard {...mockVilla} />);

    // Memeriksa apakah rating dan jumlah komentar dirender dengan benar
    expect(screen.getByText("4.5 | 100 review")).toBeInTheDocument();
  });

  test("renders image default ketika foto_villa kosong", () => {
    const mockWithoutImage = { ...mockVilla, foto_villa: [] };
    render(<VillaCard {...mockWithoutImage} />);

    const image = screen.getByAltText("Villa Paradise");
    expect(image).toHaveAttribute("src", "/default-image.png");
  });

  test("navigasikan ke halaman kategori saat diklik", () => {
    render(<VillaCard {...mockVilla} />);

    const villaLink = screen.getByRole("link");
    expect(villaLink).toHaveAttribute("href", "/category/1");

    fireEvent.click(villaLink);
    expect(window.location.pathname).toBe("/category/1");
  });
});
