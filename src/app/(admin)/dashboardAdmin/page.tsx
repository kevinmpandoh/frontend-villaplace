// page.tsx
import React from 'react';
import Image from 'next/image';
import { Users, Building2, Wallet, Image as ImageIcon } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, bgColor }) => (
  <div className={`${bgColor} rounded-xl p-6`}>
    <div className="flex flex-col">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-gray-700 mb-1">{title}</h3>
      <p className="text-4xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold">Admin Beranda</h1>
        <div className="flex items-center space-x-6">
          <button className="text-gray-600 hover:text-gray-800">Pengaturan</button>
          <button className="text-gray-600 hover:text-gray-800">Keluar</button>
          <div className="relative w-8 h-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <StatCard
          icon={<Users className="w-8 h-8 text-gray-600" />}
          title="Total Pengguna"
          value="20"
          bgColor="bg-green-50"
        />
        <StatCard
          icon={<Building2 className="w-8 h-8 text-gray-600" />}
          title="Total Mitra"
          value="20"
          bgColor="bg-orange-50"
        />
        <StatCard
          icon={<Wallet className="w-8 h-8 text-gray-600" />}
          title="Total Transaksi"
          value="20"
          bgColor="bg-purple-50"
        />
        <StatCard
          icon={<ImageIcon className="w-8 h-8 text-gray-600" />}
          title="Total Postingan"
          value="20"
          bgColor="bg-blue-50"
        />
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold mb-6">Chart Transaksi</h2>
        <div className="h-[400px] w-full bg-gray-50 rounded-xl flex items-center justify-center">
          <p className="text-gray-500">Area untuk grafik transaksi</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;