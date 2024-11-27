"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useFetchData from "@/hooks/useFetchData";

interface MenuItem {
  label: string;
  icon: string;
  href: string;
  isSelected?: boolean;
}

const menuItems: MenuItem[] = [
  { label: 'Beranda', icon: 'fa-home', href: '', isSelected: false },
  { label: 'Manajemen Villa', icon: 'fa-building', href: '', isSelected: false },
  { label: 'Manajemen Ulasan', icon: 'fa-comment', href: '', isSelected: false },
  { label: 'Manajemen Posting', icon: 'fa-file', href: '', isSelected: false },
  { label: 'Transaksi', icon: 'fa-money-bill-alt', href: '', isSelected: false },
];

const SidebarAdmin: React.FC = () => {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState<string | null>(null);

  const handleClick = (item: MenuItem) => {
    setSelectedMenuItem(item.label);
  };

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-green-500 to-brown-500 text-white flex flex-col space-y-10 px-5 py-8">
      <div className="flex items-center justify-center p-2 space-x-4"> {/* Container for logo and name */}
        <img src="/assets/images/logo.png" alt="Villa Place Logo" width={40} height={40} className="h-12 w-12" /> {/* Assuming your logo is in SVG format */}
        <span className="text-xl font-bold">Villa Place</span>
      </div>
      <ul className="space-y-6">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className={`flex items-center p-2 rounded-md cursor-pointer ${
              item.label === selectedMenuItem ? 'bg-white text-green-500' : 'text-white'
            }`}
            onClick={() => handleClick(item)}
          >
            <i className={`mr-2 ${item.icon}`} />
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarAdmin;