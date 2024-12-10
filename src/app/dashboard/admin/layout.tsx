"use client";
import React, { useState, useEffect } from "react";
import SidebarAdmin from "@/components/Sidebar/SidebarAdmin";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

export default function AdminLayout({
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
          <SidebarAdmin />
          <main className="lg:ml-64 min-h-screen">{children}</main>
          <div className="lg:ml-64">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
