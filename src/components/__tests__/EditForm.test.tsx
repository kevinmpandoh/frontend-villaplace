import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditForm from "../EditForm";
import axios from "axios";
import { useRouter } from "next/navigation";

jest.mock("axios");
jest.mock("next/navigation", () => ({
  useParams: jest.fn().mockReturnValue({ id: "123" }),
  useRouter: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockRouter = useRouter as jest.Mock;

describe("Komponen EditForm", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: {
        data: {
          nama: "Villa Indah",
          deskripsi: "Villa dengan pemandangan laut",
          lokasi: "Bali",
          kategori: ["Mewah", "Pantai"],
          harga: 3000000,
          fasilitas: ["Kamar 2", "K. Mandi 2", "WIFI"],
          foto_villa: [{ url: "image1.jpg", _id: "1" }],
        },
      },
    });

    mockedAxios.put.mockResolvedValue({ data: { message: "Success" } });
  });

  test("menampilkan formulir dengan data dari API", async () => {
    render(<EditForm />);
    expect(await screen.findByDisplayValue("Villa Indah")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Bali")).toBeInTheDocument();
    expect(screen.getByDisplayValue("3000000")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Villa dengan pemandangan laut")
    ).toBeInTheDocument();
    expect(screen.getByText("WIFI")).toBeInTheDocument();
  });

  test("menampilkan pesan error jika API getDataByID gagal", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));
    render(<EditForm />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  });

  test("memvalidasi kategori saat input tidak valid", async () => {
    render(<EditForm />);
    const inputKategori = screen.getByLabelText("Kategori");

    fireEvent.change(inputKategori, { target: { value: "" } });
    fireEvent.blur(inputKategori);

    expect(
      await screen.findByText("Kategori harus diisi.")
    ).toBeInTheDocument();
  });

  test("menangani penggantian gambar dengan fungsi handleReplaceImage", async () => {
    render(<EditForm />);

    const file = new File(["image"], "test.jpg", { type: "image/jpeg" });
    const inputImage = screen.getByLabelText(/Upload Galeri/i);
    fireEvent.change(inputImage, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockedAxios.put).toHaveBeenCalled();
    });
  });

  test("menampilkan error validasi angka kamar dan kamar mandi", async () => {
    render(<EditForm />);

    const inputKamar = screen.getByLabelText("Kamar");
    const inputKamarMandi = screen.getByLabelText("Kamar Mandi");

    fireEvent.change(inputKamar, { target: { value: "-1" } });
    fireEvent.change(inputKamarMandi, { target: { value: "-1" } });

    fireEvent.blur(inputKamar);
    fireEvent.blur(inputKamarMandi);

    expect(
      await screen.findByText("Jumlah kamar tidak boleh kurang dari 1.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Jumlah kamar mandi tidak boleh kurang dari 1.")
    ).toBeInTheDocument();
  });

  test("mengirimkan data yang diubah saat form dikirim", async () => {
    mockRouter.mockReturnValue({ push: jest.fn() });
    render(<EditForm />);

    fireEvent.change(screen.getByLabelText("Nama Villa"), {
      target: { value: "Villa Baru" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Update Villa/i }));

    await waitFor(() => {
      expect(mockedAxios.put).toHaveBeenCalledWith(
        "http://localhost:8000/api/villa/123",
        expect.objectContaining({
          nama: "Villa Baru",
          fasilitas: expect.arrayContaining(["Kamar 2", "K. Mandi 2", "WIFI"]),
        }),
        { withCredentials: true }
      );
    });

    expect(mockRouter().push).toHaveBeenCalledWith("/dashboard/mitra/posting");
  });
});
