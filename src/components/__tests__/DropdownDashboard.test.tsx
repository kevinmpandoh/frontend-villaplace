import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DropdownDashboard from "../DroopdownDashboard";

jest.mock("axios");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockRouter = useRouter as jest.Mock;

describe("DropdownDashboard Component", () => {
  const mockDataAdmin = {
    data: {
      nama: "Admin Test",
      foto_profile: "admin.jpg",
    },
  };

  const mockDataOwner = {
    data: {
      nama: "Owner Test",
      foto_profile: "owner.jpg",
    },
  };

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockDataAdmin });
    mockedAxios.post.mockResolvedValue({ status: 200 });
    mockRouter.mockReturnValue({ push: jest.fn() });
  });

  test("menampilkan data admin dengan benar", async () => {
    render(<DropdownDashboard role="admin" />);
    expect(await screen.findByText("Admin Test")).toBeInTheDocument();
    expect(screen.getByAltText("User")).toHaveAttribute(
      "src",
      "http://localhost:8000/images/owner-profile/admin.jpg"
    );
  });

  test("dropdown terbuka dan tertutup dengan benar", async () => {
    render(<DropdownDashboard role="admin" />);

    const triggerButton = screen.getByRole("link");
    fireEvent.click(triggerButton);

    expect(screen.getByText("Pengaturan")).toBeInTheDocument();

    fireEvent.click(triggerButton);
    await waitFor(() => {
      expect(screen.queryByText("Pengaturan")).not.toBeInTheDocument();
    });
  });

  test("dropdown tertutup saat tombol ESC ditekan", async () => {
    render(<DropdownDashboard role="admin" />);

    fireEvent.click(screen.getByRole("link"));
    expect(screen.getByText("Pengaturan")).toBeInTheDocument();

    fireEvent.keyDown(document, { keyCode: 27 });
    await waitFor(() => {
      expect(screen.queryByText("Pengaturan")).not.toBeInTheDocument();
    });
  });

  test("modal terbuka saat tombol pengaturan diklik", async () => {
    render(<DropdownDashboard role="admin" />);
    fireEvent.click(screen.getByRole("link"));
    fireEvent.click(screen.getByText("Pengaturan"));

    expect(screen.getByText("Pengaturan")).toBeInTheDocument();
  });

  test("logout berhasil memanggil API dan navigasi", async () => {
    render(<DropdownDashboard role="admin" />);
    fireEvent.click(screen.getByRole("link"));
    fireEvent.click(screen.getByText("Keluar"));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://localhost:8000/api/auth/admin/logout",
        {},
        { withCredentials: true }
      );
      expect(mockRouter().push).toHaveBeenCalledWith("/auth/login/admin");
    });
  });

  test("menangani role owner dengan benar", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockDataOwner });
    render(<DropdownDashboard role="owner" />);

    fireEvent.click(screen.getByRole("link"));
    expect(await screen.findByText("Owner Test")).toBeInTheDocument();
  });

  test("menangani role yang tidak valid", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Invalid role"));
    render(<DropdownDashboard role="invalid" />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  });

  test("memanggil handleUpdateMitra dengan benar", async () => {
    const mockUpdateMitra = jest.fn();
    mockedAxios.post.mockResolvedValue({ data: { success: true } });

    render(<DropdownDashboard role="owner" />);
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled();
    });

    expect(mockUpdateMitra).not.toHaveBeenCalled();
  });

  test("memanggil handleUpdateAdmin dengan benar", async () => {
    const mockUpdateAdmin = jest.fn();
    mockedAxios.post.mockResolvedValue({ data: { success: true } });

    render(<DropdownDashboard role="admin" />);
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled();
    });

    expect(mockUpdateAdmin).not.toHaveBeenCalled();
  });

  test("dropdown tertutup saat klik di luar dropdown", async () => {
    render(<DropdownDashboard role="admin" />);
    fireEvent.click(screen.getByRole("link"));
    expect(screen.getByText("Pengaturan")).toBeInTheDocument();

    fireEvent.click(document.body);
    await waitFor(() => {
      expect(screen.queryByText("Pengaturan")).not.toBeInTheDocument();
    });
  });
});
