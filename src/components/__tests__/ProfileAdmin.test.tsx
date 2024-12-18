import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileAdmin from "../ProfileAdmin";

describe("Komponen ProfileAdmin", () => {
  test("memastikan file gambar bisa dipilih melalui input file", () => {
    render(<ProfileAdmin />);
    
    const inputFile = screen.getByLabelText(/Unggah Foto/i, { selector: 'input' }) as HTMLInputElement;

    const file = new File(["dummy content"], "image.jpg", { type: "image/jpeg" });
    fireEvent.change(inputFile, { target: { files: [file] } });

    expect(inputFile.files?.[0].name).toBe("image.jpg");
  });

  test("menampilkan batasan ukuran dan format foto dengan benar", () => {
    render(<ProfileAdmin />);
    
    expect(screen.getByText(/Ukuran foto harus kurang dari/i)).toBeInTheDocument();
    expect(screen.getByText(/10mb/i)).toBeInTheDocument();
    expect(screen.getByText(/dan harus berformat/i)).toBeInTheDocument();
    expect(screen.getByText(/JPG, PNG, atau JPEG/i)).toBeInTheDocument();
  });
});
