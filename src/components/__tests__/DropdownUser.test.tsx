import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import axios from "axios";
import { useRouter } from "next/navigation";
import DropdownUser from "../DroopdownUser";

jest.mock("axios");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockRouter = useRouter as jest.Mock;

describe("DropdownUser Component", () => {
  const mockUserData = {
    data: {
      nama: "User Test",
      foto_profile: "user.jpg",
    },
  };

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockUserData });
    mockedAxios.post.mockResolvedValue({ status: 200 });
    mockRouter.mockReturnValue({ push: jest.fn() });
  });

  test("menampilkan data pengguna dengan benar", async () => {
    render(<DropdownUser />);

    expect(await screen.findByText("User Test")).toBeInTheDocument();
    const image = screen.getByAltText("User");
    expect(image).toHaveAttribute(
      "src",
      "http://localhost:8000/images/user-profile/user.jpg"
    );
  });

  test("dropdown terbuka saat di klik", async () => {
    render(<DropdownUser />);
    const triggerButton = screen.getByRole("link");

    fireEvent.click(triggerButton);

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Pesanan Saya")).toBeInTheDocument();
    expect(screen.getByText("Keluar")).toBeInTheDocument();
  });

  test("dropdown tertutup saat klik di luar dropdown", async () => {
    render(<DropdownUser />);
    const triggerButton = screen.getByRole("link");

    fireEvent.click(triggerButton);
    expect(screen.getByText("Profile")).toBeInTheDocument();

    fireEvent.click(document.body);
    await waitFor(() => {
      expect(screen.queryByText("Profile")).not.toBeInTheDocument();
    });
  });

  test("navigasi ke halaman profil saat link diklik", async () => {
    render(<DropdownUser />);
    const triggerButton = screen.getByRole("link");

    fireEvent.click(triggerButton);
    const profileLink = screen.getByText("Profile");
    expect(profileLink).toHaveAttribute("href", "/user/profile");
  });

  test("navigasi ke halaman pesanan saat link diklik", async () => {
    render(<DropdownUser />);
    const triggerButton = screen.getByRole("link");

    fireEvent.click(triggerButton);
    const bookingLink = screen.getByText("Pesanan Saya");
    expect(bookingLink).toHaveAttribute("href", "/user/bookings");
  });

  test("logout berhasil dan menavigasi ke halaman login", async () => {
    render(<DropdownUser />);
    const triggerButton = screen.getByRole("link");

    fireEvent.click(triggerButton);
    const logoutButton = screen.getByText("Keluar");
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://localhost:8000/api/auth/user/logout",
        {},
        { withCredentials: true }
      );
      expect(mockRouter().push).toHaveBeenCalledWith("/auth/login");
    });
  });

  test("menangani error saat logout gagal", async () => {
    mockedAxios.post.mockRejectedValue(new Error("Logout Error"));
    render(<DropdownUser />);
    const triggerButton = screen.getByRole("link");

    fireEvent.click(triggerButton);
    const logoutButton = screen.getByText("Keluar");
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Error logging out:",
        new Error("Logout Error")
      );
    });
  });
});
