"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import DropdownUser from "./DroopdownUser";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavbarProps {
  token: { name: string; value: string }[];
}

const Navbar = ({ token }: NavbarProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const tokenAdmin = token.filter((cookie) => cookie.name === "tokenAdmin");
  const tokenUser = token.filter((cookie) => cookie.name === "tokenUser");
  const tokenOwner = token.filter((cookie) => cookie.name === "tokenOwner");

  const currentPath = usePathname();

  useEffect(() => {
    const checkToken = () => {
      if (
        tokenAdmin.length > 0 ||
        tokenUser.length > 0 ||
        tokenOwner.length > 0
      ) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    const intervalId = setInterval(() => {
      setIsLoading(true);
      checkToken();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [tokenAdmin, tokenUser, tokenOwner]); // Hapus jika error

  const NavLinks = () => (
    <ul className="flex flex-col md:flex-row md:gap-10 gap-6">
      <li>
        <Link
          href="/"
          className={
            currentPath === "/"
              ? "text-[#111111] font-bold"
              : "text-[#606060] hover:text-[#111111] font-semibold"
          }
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className={
            currentPath === "/about"
              ? "text-[#111111] font-bold"
              : "text-[#606060] hover:text-[#111111] font-semibold"
          }
        >
          About
        </Link>
      </li>
      <li>
        <Link
          href="/category"
          className={
            currentPath === "/category"
              ? "text-[#111111] font-bold"
              : "text-[#606060] hover:text-[#111111] font-semibold"
          }
        >
          Category
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className={
            currentPath === "/contact"
              ? "text-[#111111] font-bold"
              : "text-[#606060] hover:text-[#111111] font-semibold"
          }
        >
          Contact
        </Link>
      </li>
    </ul>
  );

  const AuthButtons = () => (
    <>
      <hr className="w-full h-[2px] bg-gray-200 md:hidden" />
      <div className="flex flex-col md:flex-row w-full md:w-auto items-start md:items-center gap-4">
        <Link href="/auth/register/user" className="w-full md:w-auto">
          <button className="border-2 border-[#B7906C] text-[#B7906C] hover:text-gray-900 px-4 py-1 rounded-md w-full">
            Sign Up
          </button>
        </Link>
        <Link href="/auth/login" className="w-full md:w-auto">
          <button className="bg-[#B7906C] text-white px-4 py-1 rounded-md hover:bg-[#9e7850] w-full">
            Login
          </button>
        </Link>
      </div>
    </>
  );

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/assets/images/logo.png"
                alt="VillaPlace Logo"
                width={40}
                height={40}
                className="h-12 w-12"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <NavLinks />
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:block">
            {isLoading ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <div className="h-4 bg-gray-300 w-20 animate-pulse"></div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gray-300 animate-pulse"></div>
              </div>
            ) : tokenUser.length > 0 ? (
              <DropdownUser />
            ) : tokenAdmin.length > 0 || tokenOwner.length > 0 ? (
              <Link
                href={`/dashboard/${tokenAdmin.length > 0 ? "admin" : "mitra"}`}
              >
                <button className="text-primary hover:bg-green-100 border-2 border-primary font-semibold rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">
                  Dashboard
                </button>
              </Link>
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[300px]">
                <div className="flex flex-col gap-8 mt-8">
                  <SheetTitle className="text-3xl font-bold">
                    Villa Place
                  </SheetTitle>
                  <NavLinks />
                  {isLoading ? (
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-1">
                        <div className="h-4 bg-gray-300 w-20 animate-pulse"></div>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-gray-300 animate-pulse"></div>
                    </div>
                  ) : tokenUser.length > 0 ? (
                    <DropdownUser />
                  ) : tokenAdmin.length > 0 || tokenOwner.length > 0 ? (
                    <Link
                      href={`/dashboard/${
                        tokenAdmin.length > 0 ? "admin" : "mitra"
                      }`}
                    >
                      <button className="text-primary hover:bg-green-100 border-2 border-primary font-semibold rounded-lg text-sm px-4 py-2 text-center">
                        Dashboard
                      </button>
                    </Link>
                  ) : (
                    <AuthButtons />
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
