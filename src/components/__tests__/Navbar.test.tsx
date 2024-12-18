import { render, screen, fireEvent, act } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import "@testing-library/jest-dom";
import { usePathname } from "next/navigation";

// Mock Next.js dependencies
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock("next/image", () => {
  return ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />;
});

jest.mock("../DroopdownUser", () => () => <div>Mock DropdownUser</div>);

// Mock komponen AuthButtons
jest.mock("../DroopdownUser", () => () => <div>Mock DropdownUser</div>);

const mockToken = (name: string) => [{ name, value: "tokenValue" }];

describe("Navbar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("menampilkan link Home dengan kondisi aktif", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    render(<Navbar token={[]} />);
    const homeLink = screen.getByText("Home");
    expect(homeLink).toHaveClass("text-[#111111] font-bold");
  });

  // Test untuk Link About aktif
  test("menampilkan link About dengan kondisi aktif", () => {
    (usePathname as jest.Mock).mockReturnValue("/about");
    render(<Navbar token={[]} />);
    const aboutLink = screen.getByText("About");
    expect(aboutLink).toHaveClass("text-[#111111] font-bold");
  });

  // Test untuk Link Category aktif
  test("menampilkan link Category dengan kondisi aktif", () => {
    (usePathname as jest.Mock).mockReturnValue("/category");
    render(<Navbar token={[]} />);
    const categoryLink = screen.getByText("Category");
    expect(categoryLink).toHaveClass("text-[#111111] font-bold");
  });

  // Test untuk Link Contact aktif
  test("menampilkan link Contact dengan kondisi aktif", () => {
    (usePathname as jest.Mock).mockReturnValue("/contact");
    render(<Navbar token={[]} />);
    const contactLink = screen.getByText("Contact");
    expect(contactLink).toHaveClass("text-[#111111] font-bold");
  });

  test("menampilkan progress bar", () => {
    render(<Navbar token={[]} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    render(<Navbar token={[]} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  test("menampilkan DropdownUser jika tokenUser ada", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    act(() => {
        jest.runAllTimers();
      }
    );
    const tokenUser = mockToken("tokenUser");
    render(<Navbar token={tokenUser} />);
    expect(screen.getByText("Mock DropdownUser")).toBeInTheDocument();
  });

  test("menampilkan Dashboard jika tokenAdmin ada", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    const tokenAdmin = mockToken("tokenAdmin");
    act(() => {
        jest.runAllTimers();
      }
    );
    render(<Navbar token={tokenAdmin} />);
    const dashboardButton = screen.getByRole("button", { name: /Dashboard/i });
    expect(dashboardButton).toBeInTheDocument();
    expect(dashboardButton).toHaveClass("text-primary hover:bg-green-100");
  });

  test("menampilkan Dashboard jika tokenOwner ada", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    const tokenOwner = mockToken("tokenOwner");
    act(() => {
        jest.runAllTimers();
    })
    render(<Navbar token={tokenOwner} />);
    const dashboardButton = screen.getByRole("button", { name: /Dashboard/i });
    expect(dashboardButton).toBeInTheDocument();
    expect(dashboardButton).toHaveClass("text-primary hover:bg-green-100");
  });

  test("menampilkan AuthButtons jika tidak ada token", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    render(<Navbar token={[]} />);
    act(() => {
        jest.runAllTimers();
    })
    const signUpButton = screen.getByRole("button", { name: /Sign Up/i });
    const loginButton = screen.getByRole("button", { name: /Login/i });
    expect(signUpButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test("opens sidebar when menu button is clicked", () => {
    render(<Navbar token={[]} />);
    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeInTheDocument();
    fireEvent.click(menuButton);
    expect(screen.getByText("Villa Place")).toBeInTheDocument();
  });
});
