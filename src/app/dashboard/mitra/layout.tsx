"use client";
import React, { useEffect, useState } from "react";
import SidebarMitra from "@/components/Sidebar/SidebarMitra";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

export default function MitraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gray-200">
          <SidebarMitra />
          <main className="lg:ml-64 min-h-screen">{children}</main>
          <div className="lg:ml-64">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
