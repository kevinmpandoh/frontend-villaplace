"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DropdownUser from "./DroopdownUser";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Navbar: React.FC = () => {
  const [tokenUser, setTokenUser] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);

  const currentPath = usePathname();

  useEffect(() => {
    const checkToken = () => {
      const token = Cookies.get("tokenUser");
      if (token) {
        setTokenUser(true);
      } else {
        setTokenUser(false);
      }
      setIsLoading(false);
    };

    checkToken();

    const intervalId = setInterval(() => {
      setIsLoading(true);
      checkToken();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const NavLinks = () => (
    <ul className="flex flex-col md:flex-row md:gap-10 gap-6">
      <li>
        <Link
          href={"/"}
          className={
            currentPath === "/"
              ? "text-[#111111] font-bold"
              : "text-[#606060] hover:text-[#111111] font-semibold"
          }
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href={"/about"}
          className={
            currentPath === "/about"
              ? "text-[#111111] font-bold"
              : "text-[#606060] hover:text-[#111111] font-semibold"
          }
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>
      </li>
      <li>
        <Link
          href={"/category"}
          className={
            currentPath === "/category"
              ? "text-[#111111] font-bold"
              : "text-[#606060] hover:text-[#111111] font-semibold"
          }
          onClick={() => setIsOpen(false)}
        >
          Kategori
        </Link>
      </li>
      <li>
        <Link
          href={"/contact"}
          className={
            currentPath === "/contact"
              ? "text-[#111111] font-bold"
              : "text-[#606060] hover:text-[#111111] font-semibold"
          }
          onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>
      </li>
    </ul>
  );

  const AuthButtons = () => (
    <>
      <hr className="w-full h-[1px] bg-gray-200 my-4 md:hidden" />
      <div className="flex flex-col md:flex-row w-full md:w-auto items-start md:items-center gap-4 md:space-x-4">
        <Link href="/auth/registUser" className="w-full md:w-auto">
          <button className="border border-[#B7906C] text-[#C59E6C] hover:text-gray-900 px-4 py-1 rounded-md w-full">
            Daftar
          </button>
        </Link>
        <Link href="/auth/login" className="w-full md:w-auto">
          <button className="bg-[#B7906C] text-white px-3 py-1 rounded-md hover:bg-[#9e7850] w-full">
            + Masuk
          </button>
        </Link>
      </div>
    </>
  );

  return (
    <nav className="bg-white shadow sticky z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[5rem]">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/assets/images/logo.png"
                alt="VillaPlace Logo"
                width={40}
                height={40}
                className="h-12 w-12"
              />
            </Link>
          </div>

          {/* Navigasi Section */}
          <div className="hidden md:flex items-center">
            <NavLinks />
          </div>

          {/* Auth Section */}
          <div className="hidden md:block">
            {isLoading ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <div className="h-4 bg-gray-300 w-20 animate-pulse"></div>
                </div>
                <div className="h-12 w-12 rounded-full bg-gray-300 animate-pulse"></div>
              </div>
            ) : tokenUser ? (
              <DropdownUser />
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-8 mt-8">
                  <NavLinks />
                  {isLoading ? (
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-1">
                        <div className="h-4 bg-gray-300 w-20 animate-pulse"></div>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-gray-300 animate-pulse"></div>
                    </div>
                  ) : tokenUser ? (
                    <DropdownUser />
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