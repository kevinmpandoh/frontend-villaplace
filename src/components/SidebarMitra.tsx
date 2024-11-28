"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  label: string;
  icon: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: 'Beranda', icon: 'fa-home', href: '/dashboardMitra' },
  { label: 'Manajemen Villa', icon: 'fa-building', href: '/manajemen-pengguna-mitra' },
  { label: 'Manajemen Ulasan', icon: 'fa-comment', href: '/ulasan-mitra' },
  { label: 'Manajemen Posting', icon: 'fa-file', href: '/posting-mitra' },
  { label: 'Transaksi', icon: 'fa-money-bill-alt', href: '/transaksi-mitra' },
];

const SidebarMitra = () => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = React.useState<string>(pathname);

  const handleClick = (href: string) => {
    setActiveItem(href);
  };

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-green-500 to-brown-500 text-white flex flex-col px-5 py-8">
      <div className="flex items-center space-x-3 mb-12">
        <div className="relative w-10 h-10">
          <Image 
            src="/assets/images/logo.png" 
            alt="Villa Place Logo" 
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <span className="text-xl font-bold">Villa Place</span>
      </div>
      
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link 
              href={item.href}
              onClick={() => handleClick(item.href)}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeItem === item.href ? 'bg-white text-green-500' : 'text-white hover:bg-green-600/20'
              }`}
            >
              <i className={`fas ${item.icon} mr-3 w-5`} />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarMitra;