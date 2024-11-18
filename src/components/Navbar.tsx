"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DropdownUser from "./DroopdownUser";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [tokenUser, setTokenUser] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

    // Cek token saat pertama kali komponen di-mount
    checkToken();

    // Interval untuk memeriksa perubahan token secara berkala
    const intervalId = setInterval(() => {
      setIsLoading(true);
      checkToken();
    }, 1000); // Periksa setiap 3 detik

    // Bersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className="bg-white shadow sticky z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-[5rem]">
          {/* Logo Section */}
          <div className="flex items-center ">
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

          {/* Navigation Links */}
          <ul className="links flex gap-10 items-center ">
            <li>
              <Link href={"/"}
                className={currentPath === "/" ? "text-[#111111] font-bold" : "text-[#606060] hover:text-[#111111] font-semibold"}
              >
                Home
              </Link>
            </li>
            <li>
              <Link href={"/user/about"}
                className={currentPath === "/user/about" ? "text-[#111111] font-bold" : "text-[#606060] hover:text-[#111111] font-semibold"}>
                About
              </Link>
            </li>
            <li>
              <Link href={"/user/category"}
                className={currentPath === "/user/category" ? "text-[#111111] font-bold" : "text-[#606060] hover:text-[#111111] font-semibold"}
              >
                Kategori
              </Link>
            </li>
            <li>
              <Link href={"/user/contact"}
                className={currentPath === "/user/contact" ? "text-[#111111] font-bold" : "text-[#606060] hover:text-[#111111] font-semibold"}
              >
                Contact
              </Link>
            </li>
          </ul>

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
            <div className="flex items-center space-x-4">
              <Link href="/auth/registUser">
                <button className="border border-[#B7906C] text-[#C59E6C] hover:text-gray-900 px-4 py-1 rounded-md">
                  Daftar
                </button>
              </Link>
              <Link href="/auth/login">
                <button className="bg-[#B7906C] text-white px-3 py-1 rounded-md hover:bg-[#9e7850]">
                  + Masuk
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
