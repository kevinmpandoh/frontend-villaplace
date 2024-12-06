import Link from "next/link";
import React from "react";

const ManajemenVillaMitra = () => {
  return (
    <>
      <div>
        <div className="flex justify-between border-2 rounded-md items-center mb-3 bg-white p-6 m-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Manajemen Pengguna</h1>
            <p>Desctiption</p>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/dashboardMitra">
              <button className="border rounded-lg px-3 py-2 bg-green-600 text-white font-semibold hover:text-gray-800">
                + Tambah Pengguna
              </button>
            </Link>
          </div>
        </div>

        <div className='p-8'>
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <h2 className="text-xl font-bold mb-6">Pengguna</h2>
            <div className="h-[400px] w-full bg-gray-50 rounded-xl flex items-center justify-center">
              <p className="text-gray-500">Area untuk grafik pengguna</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManajemenVillaMitra;
