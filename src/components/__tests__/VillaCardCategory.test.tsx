import { render, screen } from "@testing-library/react";
import VillaCard from "../VillaCardCategory"; // Pastikan path sesuai
import { VillaProps } from "@/types/Villa";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/image", () => ({ src, alt }: any) => (
  <img src={src} alt={alt} />
));
jest.mock("../DetailVilla/RatingStar", () => ({ rating }: any) => (
  <div data-testid="rating-star">{rating}</div>
));

describe("VillaCardCategory Component", () => {
  const mockVilla: VillaProps = {
    _id: "123",
    nama: "Villa Indah",
    lokasi: "Bali",
    fasilitas: ["2 Kamar Tidur", "1 Kamar Mandi"],
    harga: 2500000,
    foto_villa: [
      {
        url: "villa.jpg",
        _id: "456",
        __v: 0,
        filepath: "villa.jpg",
        villa: "Villa Bagus",
        name: "villa.jpg",
      },
    ],
    averageRating: 4.5,
    commentCount: 10,
    deskripsi: "Villa mewah dengan pemandangan laut",
    status: "Tersedia",
    kategori: ["Mewah", "Pantai"],
  };

  test("menampilkan gambar villa dengan benar", () => {
    render(<VillaCard {...mockVilla} />);
    const imageElement = screen.getByAltText("Villa Indah");
    expect(imageElement).toHaveAttribute("src", "villa.jpg");
  });

  test("menampilkan informasi villa dengan benar", () => {
    render(<VillaCard {...mockVilla} />);

    expect(screen.getByText("Villa Indah")).toBeInTheDocument();
    expect(screen.getByText("Rp. 2,500,000")).toBeInTheDocument();
    expect(screen.getByText("Bali")).toBeInTheDocument();
  });

  test("menampilkan fasilitas villa dengan benar", () => {
    render(<VillaCard {...mockVilla} />);

    expect(screen.getByText("2 Kamar Tidur")).toBeInTheDocument();
    expect(screen.getByText("1 Kamar Mandi")).toBeInTheDocument();
  });

  test("menampilkan rating villa dengan benar", () => {
    render(<VillaCard {...mockVilla} />);

    expect(screen.getByTestId("rating-star")).toHaveTextContent("4.5");
    expect(screen.getByText("4.5 | 10 review")).toBeInTheDocument();
  });

  test("menampilkan default gambar jika foto villa tidak ada", () => {
    const villaWithoutImage = { ...mockVilla, foto_villa: [] };
    render(<VillaCard {...villaWithoutImage} />);

    const imageElement = screen.getByAltText("Villa Indah");
    expect(imageElement).toHaveAttribute("src", "/default-image.png");
  });

  test("menavigasi ke halaman kategori dengan id villa yang sesuai", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<VillaCard {...mockVilla} />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/category/123");
  });
});
