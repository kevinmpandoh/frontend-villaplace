"use client";

import React, { useState } from "react";
import ModalAdmin from "@/components/Admin/modalAdd";
import TableAdmin from "@/components/Admin/table-management";

const ManajemenPengguna = () => {
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  return (
    <div>
      <div className="flex justify-between border-2 rounded-xl items-center mb-3 bg-white p-6 m-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Manajemen Pengguna</h1>
          <p>Halaman untuk me manajemen segala role pengguna</p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setShowModal(true)} // Open modal when clicked
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-7 mr-10"
          >
            <p>+ Tambah Admin</p>
          </button>
        </div>
      </div>

      <div className="p-8 bg-gray-100 min-h-screen">
        <TableAdmin />
      </div>

      {/* Pass the state and setter function to ModalAdmin */}
      <ModalAdmin showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default ManajemenPengguna;
