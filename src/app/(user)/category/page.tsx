"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

interface VillaProps {
  villaId: string;
  name: string;
  location: string;
  price: number;
  imageUrl: string;
  numBedrooms: string;
  numBathrooms: string;
}

const VillaCard = ({
  villaId,
  name,
  location,
  price,
  imageUrl,
  numBedrooms,
  numBathrooms,
}: VillaProps) => {
  return (
    <Link href={`/category/${villaId}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex cursor-pointer">
        {/* Image Section */}
        <div className="relative h-40 sm:w-1/3 md:w-2/3">
          <Image
            src={imageUrl}
            alt={name}
            layout="fill"
            className="object-cover w-full h-full lg:p-2 rounded-md"
          />
        </div>

        {/* Information Section */}
        <div className="p-4 w-2/3 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-green-600 text-lg font-bold">
              Rp. {price.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center text-gray-600 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{location}</span>
          </div>

          <div className="flex mt-2 space-x-4 text-gray-600">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>{numBedrooms}</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>{numBathrooms}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Category = () => {
  const [searchQuery, setSearchQuery] = useState("Villa");
  const villas = [
    {
      villaId: "1",
      name: "Villa Aguh",
      location: "Bogor",
      price: 3000000,
      imageUrl: "/assets/images/villa-gitah.png",
      numBedrooms: "3 kamar",
      numBathrooms: "2 kamar",
    },
    {
      villaId: "2",
      name: "Villa Gamuh",
      location: "Bogor",
      price: 3000000,
      imageUrl: "/assets/images/villa-gitah.png",
      numBedrooms: "3 kamar",
      numBathrooms: "2 kamar",
    },
    {
      villaId: "3",
      name: "Villa Aguh",
      location: "Bogor",
      price: 3000000,
      imageUrl: "/assets/images/villa-bandung.png",
      numBedrooms: "3 kamar",
      numBathrooms: "2 kamar",
    },
    {
      villaId: "4",
      name: "Villa Gamuh",
      location: "Bogor",
      price: 3000000,
      imageUrl: "/assets/images/villa-bandung.png",
      numBedrooms: "3 kamar",
      numBathrooms: "2 kamar",
    },
    {
      villaId: "5",
      name: "Villa Aguh",
      location: "Bogor",
      price: 3000000,
      imageUrl: "/assets/images/villa-gitah.png",
      numBedrooms: "3 kamar",
      numBathrooms: "2 kamar",
    },
    {
      villaId: "6",
      name: "Villa Gamuh",
      location: "Bogor",
      price: 3000000,
      imageUrl: "/assets/images/villa-gitah.png",
      numBedrooms: "3 kamar",
      numBathrooms: "2 kamar",
    },
    {
      villaId: "7",
      name: "Villa Aguh",
      location: "Bogor",
      price: 3000000,
      imageUrl: "/assets/images/villa-bandung.png",
      numBedrooms: "3 kamar",
      numBathrooms: "2 kamar",
    },
    {
      villaId: "8",
      name: "Villa Gamuh",
      location: "Bogor",
      price: 3000000,
      imageUrl: "/assets/images/villa-bandung.png",
      numBedrooms: "3 kamar",
      numBathrooms: "2 kamar",
    },
    {
      villaId: "9",
      name: "Villa Aguh",
      location: "Bogor",
      price: 3000000,
      imageUrl: "/assets/images/villa-bandung.png",
      numBedrooms: "3 kamar",
      numBathrooms: "2 kamar",
    },
    {
      villaId: "10",
      name: "Villa Gamuh",
      location: "Bogor",
      price: 3000000,
      imageUrl: "/assets/images/villa-bandung.png",
      numBedrooms: "3 kamar",
      numBathrooms: "2 kamar",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
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

        {/* Grid untuk Villas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 sm:gap-6 md:gap-x-20 md:gap-y-10">
          {villas.map((villa, index) => (
            <VillaCard
              key={index}
              villaId={villa.villaId}
              name={villa.name}
              location={villa.location}
              price={villa.price}
              imageUrl={villa.imageUrl}
              numBedrooms={villa.numBedrooms}
              numBathrooms={villa.numBathrooms}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
