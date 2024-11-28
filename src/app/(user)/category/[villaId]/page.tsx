"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mendefinisikan tipe Villa
interface Villa {
    villaId: string;
    name: string;
    location: string;
    phone: string;
    priceRange: string;
    mainImage: string;
    images: string[];
    numBedrooms: string;
    numBathrooms: string;
    description: string;
  }

// Misalnya, gunakan data dummy untuk sementara, atau gunakan fetch API untuk mengambil data berdasarkan villaId
const villasData: Villa[] = [
  {
    villaId: '1',
    name: 'Villa Aguh',
    location: 'Jalan jawa barat nomer 10',
    phone: '0813-0987-1234',
    priceRange: 'Rp. 500.000 - 1.000.000',
    mainImage: '/assets/images/villa-bandung.png',
    images: [
      '/assets/images/villa-bandung.png',
      '/assets/images/villa-bandung.png',
      '/assets/images/villa-bandung.png',
      '/assets/images/villa-bandung.png',
      '/assets/images/villa-bandung.png',
    ],
    numBedrooms: '3 Kamar',
    numBathrooms: '3 Kamar',
    description: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form...',
  },
  // Tambahkan data villa lainnya
];

const DetailVillaPage = ({ params }: { params: { villaId: string } }) => {
  const { villaId } = params;
  const [villa, setVilla] = useState<Villa | null>(null);

  useEffect(() => {
    if (villaId) {
      const selectedVilla = villasData.find((v) => v.villaId === villaId);
      setVilla(selectedVilla || null);
    }
  }, [villaId]);

  if (!villa) return <p>Loading...</p>; // Menampilkan loading jika data villa belum siap

  return (
    <div className="min-h-screen bg-gray-100">
      
    <div className="pb-6 bg-gray-100">
    </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[80px] bg-white rounded-lg shadow-md mb-6">
        {/* Villa Detail Header */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <Image src={villa.mainImage} alt={villa.name} width={400} height={400} className="rounded-lg object-cover" />
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold">{villa.name}</h2>
            <p className="mt-4 text-gray-600">{villa.description}</p>
            <div className="mt-4 flex items-center gap-4 text-gray-600">
              <p><strong>Lokasi:</strong> {villa.location}</p>
              <p><strong>Harga:</strong> {villa.priceRange}</p>
            </div>
            <div className="mt-4 flex items-center gap-4 text-gray-600">
              <p><strong>Telepon:</strong> {villa.phone}</p>
              <p><strong>Kamar Tidur:</strong> {villa.numBedrooms}</p>
              <p><strong>Kamar Mandi:</strong> {villa.numBathrooms}</p>
            </div>
            <div className="mt-6 flex gap-4">
              <button className="px-6 py-2 bg-[#B7906C] hover:bg-[#9e7850] text-white rounded-md">Pesan Sekarang</button>
              <button className="px-6 py-2 border border-gray-300 rounded-md">Add to Wishlist</button>
            </div>
          </div>
        </div>

        {/* Additional Images */}
        <div className="flex gap-2 mt-6">
          {villa.images.map((image, index) => (
            <Image key={index} src={image} alt={`Villa image ${index}`} width={100} height={100} className="rounded-md object-cover" />
          ))}
        </div>

        {/* Reviews */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold">Ulasan Pengguna (52) <span className="text-yellow-500 pl-2">★★★★☆</span></h3>
          {/* Example of a review */}
          <div className="mt-4 flex gap-4 items-center">
            <Image src="/assets/images/user-avatar.png" alt="User" width={40} height={40} className="rounded-full" />
            <div>
              <p className="font-semibold">Fery <span className="text-yellow-500">★★★★☆</span></p>
              <p>Tempat nya bagus dan harga terjangkau!</p>
            </div>
          </div>
          {/* Add Review Form */}
          <form className="mt-6 flex gap-4">
            <input type="text" placeholder="Tambahkan Komentar" className="flex-grow px-4 py-2 border rounded-lg" />
            <button type="submit" className="px-6 py-2 bg-[#089562] text-white rounded-md">Kirim</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailVillaPage;
