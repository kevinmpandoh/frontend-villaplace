import Link from "next/link";
import React from "react";
import Image from "next/image";

const Navbar = () => {
    return (
        <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Image 
              src="/assets/images/logo.png" 
              alt="VillaPlace Logo" 
              width={40}
              height={40}
              className="h-12 w-12" />
            </div>
            <ul className="flex gap-10 items-center">
              <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
              <a href="/about" className="text-gray-700 hover:text-gray-900">About</a>
              <a href="/user/category" className="text-gray-700 hover:text-gray-900">Kategori</a>
              <a href="/contact" className="text-gray-700 hover:text-gray-900">Contact</a>
            </ul>
            <div className="flex items-center space-x-4">
              <Link href="/auth/registUser">
                <button className="border border-brown-500 text-brown-500 hover:text-gray-900 px-3 py-1 rounded-md">
                  Daftar
                </button>
              </Link>
              <Link href="/auth/login">
                <button className="bg-brown-500 text-white px-3 py-1 rounded-md hover:bg-brown-600">
                  + Masuk
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;