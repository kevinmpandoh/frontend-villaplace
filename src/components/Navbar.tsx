import Link from "next/link";
import React from "react";
import Image from "next/image";
import DropdownUser from "./DroopdownUser";
import { cookies } from "next/headers";

const Navbar: React.FC = async () => {
  const cookieStore = await cookies();
  const tokenUser = cookieStore.get("tokenUser");

  return (
    <nav className="bg-white shadow sticky top-0 left-0 right-0 z-50">
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
          <ul className="flex gap-10 items-center ">
            <li>
              <Link
                href="/"
                className="text-[#606060] hover:text-[#111111] font-semibold"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-[#606060] hover:text-[#111111] font-semibold"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/user/category"
                className="text-[#606060] hover:text-[#111111] font-semibold"
              >
                Kategori
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-[#606060] hover:text-[#111111] font-semibold"
              >
                Contact
              </Link>
            </li>
          </ul>

          {tokenUser ? (
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
