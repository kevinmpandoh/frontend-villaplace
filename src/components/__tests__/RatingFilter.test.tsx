import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RatingFilter from "../ui/RatingFilter";

describe("RatingFilter Component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("menampilkan label dan nilai default 'Semua'", () => {
    render(<RatingFilter value={null} onChange={mockOnChange} />);

    // Periksa label
    expect(screen.getByText("Rating Minimum")).toBeInTheDocument();

    // Periksa tombol menampilkan nilai default
    expect(screen.getByRole("button", { name: /semua/i })).toBeInTheDocument();
  });

  test("membuka dan menutup dropdown saat tombol diklik", () => {
    render(<RatingFilter value={null} onChange={mockOnChange} />);

    const dropdownButton = screen.getByRole("button", { name: /semua/i });

    // Klik tombol untuk membuka dropdown
    fireEvent.click(dropdownButton);
    expect(screen.getByText("0 Bintang")).toBeInTheDocument();
    expect(screen.getByText("1 Bintang")).toBeInTheDocument();

    // Klik tombol untuk menutup dropdown
    fireEvent.click(dropdownButton);
    expect(screen.queryByText("0 Bintang")).not.toBeInTheDocument();
  });

  test("memilih rating dan memanggil onChange dengan nilai yang benar", () => {
    render(<RatingFilter value={null} onChange={mockOnChange} />);

    const dropdownButton = screen.getByRole("button", { name: /semua/i });
    fireEvent.click(dropdownButton);

    const ratingButton = screen.getByText("3 Bintang");
    fireEvent.click(ratingButton);

    // Periksa apakah onChange dipanggil dengan nilai 3
    expect(mockOnChange).toHaveBeenCalledWith(3);

    // Dropdown ditutup setelah memilih
    expect(screen.queryByText("3 Bintang")).not.toBeInTheDocument();
  });

  test("memilih 'Semua' dan memanggil onChange dengan nilai null", () => {
    render(<RatingFilter value={3} onChange={mockOnChange} />);

    const dropdownButton = screen.getByRole("button", { name: /3 Bintang/i });
    fireEvent.click(dropdownButton);

    const semuaButton = screen.getByText("Semua");
    fireEvent.click(semuaButton);

    // Periksa apakah onChange dipanggil dengan nilai null
    expect(mockOnChange).toHaveBeenCalledWith(null);
  });

  test("menampilkan RatingStar saat nilai rating dipilih", () => {
    render(<RatingFilter value={4} onChange={mockOnChange} />);

    // Periksa apakah komponen RatingStar ditampilkan
    expect(screen.getByText("4 Bintang")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /4 bintang/i })).toBeInTheDocument();
  });
});
