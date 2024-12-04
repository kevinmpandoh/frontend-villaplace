"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faComments,
  faFileAlt,
  faMoneyBillWave,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

interface SubItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  icon: JSX.Element;
  href?: string; // Optional for parent items with subItems
  subItems?: SubItem[];
}

const menuItems: MenuItem[] = [
  { label: "Beranda", icon: <FontAwesomeIcon icon={faHome} />, href: "/dashboardAdmin" },
  {
    label: "Manajemen Pengguna",
    icon: <FontAwesomeIcon icon={faUsers} />,
    subItems: [
      { label: "Admin", href: "/manajemen-pengguna-admin" },
      { label: "Mitra", href: "/manajemen-pengguna-admin/mitra" },
      { label: "User", href: "/manajemen-pengguna-admin/user" },
    ],
  },
  { label: "Manajemen Ulasan", icon: <FontAwesomeIcon icon={faComments} />, href: "/ulasan-admin" },
  { label: "Manajemen Posting", icon: <FontAwesomeIcon icon={faFileAlt} />, href: "/posting-admin" },
  {
    label: "Transaksi",
    icon: <FontAwesomeIcon icon={faMoneyBillWave} />,
    subItems: [
      { label: "Pesanan", href: "/pesanan-admin" },
      { label: "Pembayaran", href: "/pembayaran-admin" },
    ],
  },
];

const SidebarAdmin = () => {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = React.useState<Record<string, boolean>>({});

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isParentActive = (subItems?: SubItem[]): boolean => {
    return subItems ? subItems.some((subItem) => subItem.href === pathname) : false;
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
          {menuItems.map((item) => {
            const isActive = item.href === pathname || isParentActive(item.subItems);

            return (
              <li key={item.label}>
                <div className="flex items-center justify-between">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-4 rounded-r-xl transition-colors w-full ${
                        isActive ? "bg-white text-green-500 font-semibold" : "text-white hover:bg-black/10"
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={`flex items-center px-4 py-4 rounded-r-xl transition-colors w-full text-left ${
                        isActive ? "bg-white text-green-500 font-semibold" : "text-white hover:bg-black/10"
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                      <span className="ml-auto">
                        {openSubmenus[item.label] ? (
                          <FontAwesomeIcon icon={faChevronUp} />
                        ) : (
                          <FontAwesomeIcon icon={faChevronDown} />
                        )}
                      </span>
                    </button>
                  )}
                </div>
                {openSubmenus[item.label] && item.subItems && (
                  <ul className="pl-8 space-y-2 mt-2">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.label}>
                        <Link
                          href={subItem.href}
                          className={`block px-4 py-2 rounded-lg transition-colors ${
                            pathname === subItem.href ? "bg-white/85 text-green-600 font-semibold" : "text-white hover:bg-black/10"
                            }`}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="ml-64 flex justify-between border-b shadow-md items-center mb-10 bg-white p-6">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <div className="flex items-center space-x-6">
          <Link href="/dashboardAdmin">
            <button className="text-gray-600 font-semibold hover:text-gray-800">Pengaturan</button>
          </Link>
          <Link href="/auth/login/admin">
            <button className="text-gray-600 font-semibold hover:text-gray-800">Keluar</button>
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
