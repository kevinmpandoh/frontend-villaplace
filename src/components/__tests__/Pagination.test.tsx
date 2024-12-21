import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination Component", () => {
  const handleCurrentPage = jest.fn();

  test("renders '1' and '...' for page truncation", () => {
    render(
      <Pagination
        currentPage={6}
        totalPages={10}
        totalItems={50}
        handleCurrentPage={handleCurrentPage}
      />
    );
  
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
  });

  test("renders Pagination component", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalItems={25}
        handleCurrentPage={handleCurrentPage}
      />
    );

    expect(screen.getByText("Menampilkan 1 - 5 dari 25 data")).toBeInTheDocument();
  });

  test("renders nomor halaman", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        totalItems={25}
        handleCurrentPage={handleCurrentPage}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
  });

  test("matikan tombol sebelumnya ketika dihalaman pertama", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalItems={25}
        handleCurrentPage={handleCurrentPage}
      />
    );

    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  test("matikan tombol selanjutnya ketika dihalaman terakhir", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        totalItems={25}
        handleCurrentPage={handleCurrentPage}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  test("memanggil handleCurrentPage saat tombol halaman diklik", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalItems={25}
        handleCurrentPage={handleCurrentPage}
      />
    );

    const page2Button = screen.getByText("2");
    fireEvent.click(page2Button);

    expect(handleCurrentPage).toHaveBeenCalledWith(2);
  });

  test("memanggil handleCurrentPage saat tombol selanjutnya diklik", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalItems={25}
        handleCurrentPage={handleCurrentPage}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    expect(handleCurrentPage).toHaveBeenCalledWith(2);
  });

  test("memanggil handleCurrentPage saat tombol sebelumnya diklik", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        totalItems={25}
        handleCurrentPage={handleCurrentPage}
      />
    );

    const prevButton = screen.getByRole("button", { name: /previous/i });
    fireEvent.click(prevButton);

    expect(handleCurrentPage).toHaveBeenCalledWith(1); // Memastikan halaman 1 dipanggil
  });

  test("tidak memanggil handleCurrentPage ketika tombol previous diklik di halaman pertama", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalItems={25}
        handleCurrentPage={handleCurrentPage}
      />
    );
  
    const prevButton = screen.getByRole("button", { name: /previous/i });
    fireEvent.click(prevButton);
  
    expect(handleCurrentPage).not.toHaveBeenCalled(); // Memastikan tidak ada pemanggilan
  });

  test("renders '...' ketika halaman terlalu banyak", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        totalItems={50}
        handleCurrentPage={handleCurrentPage}
      />
    );

    expect(screen.getByText("...")).toBeInTheDocument();
  });
});
