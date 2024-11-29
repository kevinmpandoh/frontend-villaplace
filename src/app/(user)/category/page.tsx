"use client";

import React, { useState, useMemo  } from "react";
import useFetchData from "@/hooks/useFetchData";
import VillaCard from "@/components/VillaCardCategory";
import { VillaProps } from "@/types/Villa";

const Category = () => {
  const { data } = useFetchData("http://localhost:8000/api/villa", {
    method: "GET",
    withCredentials: true,
  });

  const [searchQuery, setSearchQuery] = useState("Villa");
  const villas = useMemo(() => data?.data || [], [data]);
  const filteredVillas = useMemo(
    () =>
      villas.filter((villa) => {
        const search = searchQuery.replace(/[.,]/, "");
        const searchNumber = Number(search);
  
        return (
          villa.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
          villa.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
          villa.kategori.some((cat: string) =>
            cat.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          villa.harga === searchNumber
        );
      }),
    [villas, searchQuery]
  );
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar Section */}
        <div className="flex items-center mb-16">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 rounded-l-lg text-gray-900 border border-gray-300"
            placeholder="Cari villa..."
          />
          <button className="bg-brown-500 text-white px-6 py-4 rounded-r-lg hover:bg-brown-600">
            Cari
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-6 text-green-600">
          Hasil pencarian untuk: {searchQuery}
        </h2>

        {/* Grid for Villas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 sm:gap-6 md:gap-x-20 md:gap-y-10">
          {filteredVillas.length > 0 ? (
            filteredVillas.map((villa: VillaProps) => (
              <VillaCard
                key={villa._id}
                _id={villa._id}
                nama={villa.nama}
                deskripsi={villa.deskripsi}
                lokasi={villa.lokasi}
                fasilitas={villa.fasilitas}
                harga={villa.harga}
                foto_villa={villa.foto_villa}
                status={villa.status}
              />
            ))
          ) : (
            <p className="text-center col-span-full">Tidak ada villa yang ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  );

};

export default Category;
