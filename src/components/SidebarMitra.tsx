"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBuilding,
  faComment,
  faFile,
  faMoneyBillAlt,
  faBars,
  faGear,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface MenuItem {
  label: string;
  icon: JSX.Element;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: 'Beranda', icon: <FontAwesomeIcon icon={faHome} />, href: '/dashboardMitra' },
  { label: 'Manajemen Pengguna', icon: <FontAwesomeIcon icon={faBuilding} />, href: '/manajemen-pengguna-mitra' },
  { label: 'Manajemen Ulasan', icon: <FontAwesomeIcon icon={faComment} />, href: '/ulasan-mitra' },
  { label: 'Manajemen Posting', icon: <FontAwesomeIcon icon={faFile} />, href: '/posting-mitra' },
  { label: 'Transaksi', icon: <FontAwesomeIcon icon={faMoneyBillAlt} />, href: '/transaksi-mitra' },
];

const ProfileSection = ({ onClose, isMobile = false }: { onClose?: () => void; isMobile?: boolean }) => (
  <div className={`flex items-center ${isMobile ? 'flex-col space-y-4' : 'space-x-6'}`}>
    <Link href="/dashboardMitra" className={`${isMobile ? 'w-full pr-6' : ''}`}>
      <button 
        onClick={onClose}
        className={`text-gray-600 font-semibold flex items-center space-x-2
          ${isMobile ? 'w-full text-white px-4 py-2 hover:bg-black/10 rounded-r-xl' : ''}`}
      >
        <FontAwesomeIcon icon={faGear} className={isMobile ? "w-5 text-white" : "hidden"} />
        <span>Pengaturan</span>
      </button>
    </Link>
    <Link href="/auth/login" className={`${isMobile ? 'w-full pr-6' : ''}`}>
      <button 
        onClick={onClose}
        className={`text-gray-600 font-semibold flex items-center space-x-2
          ${isMobile ? 'w-full text-white px-4 py-2 hover:bg-black/10 rounded-r-xl' : ''}`}
      >
        <FontAwesomeIcon icon={faSignOut} className={isMobile ? "w-5 text-white" : "hidden"} />
        <span>Keluar</span>
      </button>
    </Link>
    <div className="relative w-10 h-10">
      <Image
        src="/assets/images/profile-default.png"
        alt="Profile Mitra"
        width={40}
        height={40}
        className="rounded-full"
      />
    </div>
  </div>
);

const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Header Sidebar */}
      <div className="px-5 py-8">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10">
            <Image
              src="/assets/images/logo.png"
              alt="Villa Place Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <span className="text-xl font-bold text-white">Villa Place</span>
        </div>
      </div>

      {/* Menu Content Sidebar */}
      <div className="flex-1 py-4">
        <ul className="space-y-4 pr-6">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={onClose}
                className={`flex items-center px-4 py-4 rounded-r-xl transition-colors ${
                  pathname === item.href ? 'bg-white text-green-500 font-semibold' : 'text-white hover:bg-black/10'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Sidebar */}
      <div className="pb-10 mt-auto">
        <div className="lg:hidden">
          <Separator className="my-7 bg-white" />
          <ProfileSection onClose={onClose} isMobile={true} />
        </div>
      </div>
    </div>
  );
};

const SidebarMitra = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <Image
            src="/assets/images/logo.png"
            alt="Villa Place Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold">Villa Place</span>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-80 p-0 bg-gradient-to-b from-green-500 to-brown-500 overflow-y-auto"
          >
            <SidebarContent onClose={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-green-500 to-brown-500 overflow-y-auto">
        <SidebarContent />
      </nav>

      {/* Desktop Content Header */}
      <div className="hidden lg:flex lg:ml-64 justify-between border-b shadow-md items-center mb-10 bg-white p-6">
        <h1 className="text-2xl font-bold">Dashboard Mitra</h1>
        <ProfileSection />
      </div>
    </>
  );
};

export default SidebarMitra;