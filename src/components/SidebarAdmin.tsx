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
  { label: 'Beranda', icon: 'fa-home', href: '/dashboardAdmin' },
  { label: 'Manajemen Pengguna', icon: 'fa-building', href: '/manajemen-pengguna-admin' },
  { label: 'Manajemen Ulasan', icon: 'fa-comment', href: '/ulasan-admin' },
  { label: 'Manajemen Posting', icon: 'fa-file', href: '/posting-admin' },
  { label: 'Transaksi', icon: 'fa-money-bill-alt', href: '/transaksi-admin' },
];

const SidebarAdmin = () => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = React.useState<string>(pathname);

  const handleClick = (href: string) => {
    setActiveItem(href);
  };

  return (
    <>
      <nav className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-green-500 to-brown-500 text-white flex flex-col py-8">
        <div className="flex items-center space-x-3 mb-12 px-5">
          <div className="relative w-10 h-10">
            <Image 
              src="/assets/images/logo.png" 
              alt="Villa Place Logo" 
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <span className="text-xl font-bold">Villa Place</span>
        </div>
        
        <ul className="space-y-4 pr-5">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link 
                href={item.href}
                onClick={() => handleClick(item.href)}
                className={`flex items-center px-4 py-4 rounded-r-xl transition-colors ${
                  activeItem === item.href ? 'bg-white text-green-500 font-semibold' : 'text-white hover:bg-black/10'
                }`}
              >
                <i className={`fas ${item.icon} mr-1 w-5`} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      
      <div className="ml-64 flex justify-between border-b shadow-md items-center mb-10 bg-white p-6">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <div className="flex items-center space-x-6">
          <Link href="/dashboardAdmin">
            <button className="text-gray-600 font-semibold hover:text-gray-800">
              Pengaturan
            </button>
          </Link>
          <Link href="/auth/login">
            <button className="text-gray-600 font-semibold hover:text-gray-800">
              Keluar
            </button>
          </Link>
          <div className="relative w-10 h-10">
            <Image 
              src="/assets/images/profile-default.png"
              alt="Profile Admin" 
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;