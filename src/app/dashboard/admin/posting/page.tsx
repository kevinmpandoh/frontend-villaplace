"use client";

import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import ButtonEdit from "@/components/Payment/ButtonEdit";
import ButtonDelete from "@/components/BookingAdmin/ButtonDelete";
import Modal from "@/components/Modal";

interface Villa {
  _id: string;
  nama: string;
  fasilitas: string[];
  harga: number;
  lokasi: string;
  kategori: string;
  status: string;
  foto_villa?: { url: string }[]; // Opsional jika properti ini bisa null/undefined
}
const API_BASE_URL =
  `${process.env.NEXT_PUBLIC_API_BASE_URL}` || "http://localhost:8000/api";

const PostingAdmin = () => {
  const [villa, setVilla] = useState<Villa[]>([]);
  const [status, setStatus] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>(""); // State baru untuk input pencarian

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 10 item per halaman

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = status
          ? `${API_BASE_URL}/villa/admin?show${status}=true`
          : `${API_BASE_URL}/villa/admin`;
        const response = await axios.get(url, {
          withCredentials: true,
        });
        setVilla(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [status]);

  const filteredVilla = villa.filter((data) => {
    const searchKeyword = searchInput.toLowerCase();

    const nama = data.nama?.toLowerCase() || "";
    const fasilitas = data.fasilitas?.join(", ").toLowerCase() || "";
    const harga = data.harga?.toString() || "";
    const lokasi = data.lokasi?.toLowerCase() || "";
    const kategori = Array.isArray(data.kategori)
      ? data.kategori.join(", ").toLowerCase() // Jika kategori adalah array, gabungkan menjadi string
      : data.kategori?.toLowerCase() || ""; // Jika kategori adalah string, lakukan toLowerCase
    const status = data.status?.toLowerCase() || "";

    return (
      nama.includes(searchKeyword) ||
      fasilitas.includes(searchKeyword) ||
      harga.includes(searchKeyword) ||
      lokasi.includes(searchKeyword) ||
      kategori.includes(searchKeyword) ||
      status.includes(searchKeyword)
    );
  });

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVilla.slice(indexOfFirstItem, indexOfLastItem);
  // const totalPages = Math.ceil(filteredVilla.length / itemsPerPage); (NYALAKAN BILA MENGGUNAKAN PAGINATION)

  const [showModal, setShowModal] = useState(false);
  const [selectedVillaId, setSelectedVillaId] = useState<string | null>(null);

  // Fungsi untuk menghapus data villa
  const deleteData = async (id: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/villa/${id}`, {
        withCredentials: true,
      });
      console.log(response);

      // Menampilkan SweetAlert jika data berhasil dihapus
      Swal.fire({
        title: "Berhasil",
        text: "Data berhasil dihapus!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Memperbarui daftar villa setelah data berhasil dihapus
      setVilla((prevData) => prevData.filter((villa) => villa._id !== id));
    } catch (err) {
      console.error("Error deleting villa:", err);

      // Menampilkan SweetAlert jika terjadi kesalahan
      Swal.fire({
        title: "Gagal",
        text: "Gagal menghapus data.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDelete = (id: string) => {
    // Menampilkan SweetAlert konfirmasi sebelum menghapus
    Swal.fire({
      title: "Anda yakin?",
      text: "Data ini akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData(id); // Menghapus data jika dikonfirmasi
      }
    });
  };
  const handleChangeStatus = async (id: string, status: string) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/villa/${id}/change-status`,
        { status }, // Mengirim status baru dalam body request
        { withCredentials: true }
      );
      console.log(response.data);

      // Menampilkan notifikasi sukses
      Swal.fire({
        title: "Berhasil",
        text: "Status berhasil diperbarui!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Memperbarui status villa secara lokal
      setVilla((prevData) =>
        prevData.map((villa) =>
          villa._id === id ? { ...villa, status } : villa
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);

      // Menampilkan notifikasi kesalahan
      Swal.fire({
        title: "Gagal",
        text: "Gagal memperbarui status.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <div>
        <div className="bg-white p-4 shadow-md rounded-md mb-4 mx-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex space-x-2 text-sm font-medium">
              <li>
                <Link
                  href="/dashboard/admin"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <span className="text-gray-500">/</span>
              </li>
              <li>
                <span className="text-gray-500"></span>
                Manajemen Posting
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex justify-between border-2 shadow-lg rounded-md items-center mb-3 bg-white p-6 m-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Manajemen Posting</h1>
            <p>Halaman untuk memanajemen posting villa</p>
          </div>
        </div>

        {/* MANAJEMEN POSTING ADMIN */}
        <div className="p-8">
          <div className="bg-white border-2 rounded-xl shadow-lg p-6 border-gray-200">
            <h2 className="text-xl font-bold mb-6">Posting</h2>
            <div className="border-b-2 border-gray-200 w-full md:w-[600px]"></div>

            <div className="mt-2">
              <div className="bg-white rounded-xl border-gray-200">
                {/* Input Pencarian */}
                <div className="flex flex-col lg:flex-row justify-between pt-4">
                  <form className="lg:w-100 mb-5">
                    <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search here..."
                        required
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Search
                      </button>
                    </div>
                  </form>

                  {/* Tombol Filter */}
                  <div className="mb-5">
                    <button
                      onClick={() => setStatus("")}
                      className="mr-2 px-4 py-2 bg-slate-800 hover:bg-slate-500 rounded text-white"
                    >
                      All
                    </button>
                    <button
                      onClick={() => setStatus("Pending")}
                      className="mr-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded text-white"
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => setStatus("Success")}
                      className="mr-2 px-4 py-2 bg-green-700 hover:bg-green-500 rounded text-white"
                    >
                      Success
                    </button>
                    <button
                      onClick={() => setStatus("Rejected")}
                      className="px-4 py-2 bg-red-600 hover:bg-red-400 rounded text-white"
                    >
                      Rejected
                    </button>
                  </div>
                </div>

                {/* Tabel Posting */}
                <div className="bg-white rounded-lg shadow-lg">
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-emerald-600 text-white dark:bg-meta-4 text-left">
                          <th className="min-w-[20px] py-4 px-4 font-semibold text-gray-50 dark:text-white">
                            No
                          </th>
                          <th className="min-w-[220px] py-4 px-2 font-semibold text-gray-50 dark:text-white">
                            Villa
                          </th>
                          <th className="min-w-[120px] py-4 px-3 font-semibold text-gray-50 dark:text-white">
                            Fasilitas
                          </th>
                          <th className="min-w-[120px] py-4 px-3 font-semibold text-gray-50 dark:text-white">
                            Lokasi
                          </th>
                          <th className="min-w-[20px] py-4 font-semibold text-gray-50 dark:text-white">
                            Kategori
                          </th>
                          <th className="min-w-[20px] py-4 px-2 font-semibold text-gray-50 dark:text-white">
                            Status
                          </th>
                          <th className="min-w-[120px] py-4 px-4 font-semibold text-gray-50 dark:text-white">
                            Action
                          </th>
                          <th className="min-w-[120px] py-4 px-3 font-semibold text-gray-50 dark:text-white">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.length === 0 ? (
                          <tr>
                            <td colSpan={10} className="p-3 text-center">
                              Data tidak tersedia
                            </td>
                          </tr>
                        ) : (
                          currentItems.map((data, index) => (
                            <tr
                              key={data._id}
                              className="border-t border-gray-300 hover:bg-gray-50"
                            >
                              <td className="p-3 text-center border-gray-300">
                                {indexOfFirstItem + index + 1}
                              </td>
                              <td className="py-10 px-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                                <div>
                                  <Image
                                    src={
                                      data.foto_villa?.[0]?.url ||
                                      "/default-image.png"
                                    }
                                    alt="Gambar Villa"
                                    width={70}
                                    height={60}
                                    objectFit="cover"
                                    layout="responsive"
                                    className="mx-auto"
                                  />
                                </div>
                                <div className="flex flex-col justify-center">
                                  <div className="flex text-sm text-gray-800 dark:text-white">
                                    {data.nama}
                                  </div>
                                  <div className="flex text-sm font-semibold text-gray-800 dark:text-white">
                                    {data.harga}
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 text-sm">
                                {data.fasilitas.join(", ")}
                              </td>
                              <td className="p-3 text-sm">{data.lokasi}</td>
                              <td className="text-sm">{data.kategori}</td>
                              <td className="text-center">
                                <span
                                  className={`px-4 py-1.5 rounded-full text-center items-center text-white ${
                                    data.status === "pending"
                                      ? "bg-yellow-500 font-semibold"
                                      : data.status === "success"
                                      ? "bg-green-500 font-semibold"
                                      : "bg-red-500 font-semibold"
                                  }`}
                                >
                                  {data.status}
                                </span>
                              </td>
                              <td className="p-3 text-center justify-center gap-5">
                                <ButtonEdit
                                  onClick={() =>
                                    (window.location.href = `/dashboard/admin/posting/editVilla/${data._id}`)
                                  }
                                />
                                <ButtonDelete
                                  onClick={() => {
                                    return confirm(
                                      "Anda yakin ingin menghapus data?"
                                    )
                                      ? handleDelete(data._id)
                                      : "";
                                  }}
                                />
                              </td>
                              <td className="p-3 text-center justify-center gap-5 border-r ">
                                {/* Tombol untuk mengubah status */}
                                <div className="flex flex-col gap-4">
                                  <button
                                    className="px-4 py-1 border-2 border-brown-500 hover:bg-[#B7906C] hover:text-white rounded"
                                    onClick={() => {
                                      setShowModal(true);
                                      setSelectedVillaId(data._id);
                                    }}
                                  >
                                    <p className="text-sm">Ubah Status</p>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                    {showModal && (
                      <Modal
                        title="Ubah Status Villa"
                        onClose={() => setShowModal(false)}
                        className="max-w-md max-h-min"
                      >
                        <div className="flex flex-col gap-4">
                          <button
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            onClick={() => {
                              if (selectedVillaId)
                                handleChangeStatus(selectedVillaId, "success");
                              setShowModal(false);
                            }}
                          >
                            Success
                          </button>
                          <button
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            onClick={() => {
                              if (selectedVillaId)
                                handleChangeStatus(selectedVillaId, "pending");
                              setShowModal(false);
                            }}
                          >
                            Pending
                          </button>
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => {
                              if (selectedVillaId)
                                handleChangeStatus(selectedVillaId, "rejected");
                              setShowModal(false);
                            }}
                          >
                            Rejected
                          </button>
                        </div>
                      </Modal>
                    )}
                  </div>

                  {/* Pagination Controls */}
                  <div className="w-full border-gray-200 mt-8">
                    <div className="flex justify-center py-2">
                      <div className="flex space-x-1 sm:space-x-2">
                        {/* Previous Button */}
                        <button
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                          className="p-1.5 sm:p-2 text-sm sm:text-md bg-brown-500 text-white rounded disabled:bg-gray-300"
                        >
                          Previous
                        </button>

                        <div className="flex space-x-1">
                          {(() => {
                            const pages: JSX.Element[] = [];
                            const totalPages = Math.ceil(
                              filteredVilla.length / itemsPerPage
                            );

                            // Fungsi untuk menambahkan nomor halaman
                            const pushPage = (pageNum: number) => {
                              pages.push(
                                <button
                                  key={pageNum}
                                  onClick={() => setCurrentPage(pageNum)}
                                  className={`py-1 px-2.5 sm:py-2 sm:px-4 sm:text-md rounded ${
                                    currentPage === pageNum
                                      ? "bg-green-500 text-white"
                                      : "bg-white text-brown-500 border border-brown-500"
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            };

                            // Fungsi untuk menambahkan ellipsis
                            const pushEllipsis = (key: string) => {
                              pages.push(
                                <button
                                  key={key}
                                  className="py-1 px-1.5 sm:py-2 sm:px-3 text-sm sm:text-md rounded bg-white text-brown-500 border border-brown-500"
                                  disabled
                                >
                                  ...
                                </button>
                              );
                            };

                            // Selalu tampilkan halaman pertama
                            pushPage(1);

                            if (totalPages <= 5) {
                              // Ubah dari 7 ke 5 untuk mobile
                              // Jika total halaman 5 atau kurang, tampilkan semua
                              for (let i = 2; i < totalPages; i++) {
                                pushPage(i);
                              }
                            } else {
                              // Logika untuk halaman dengan ellipsis
                              if (currentPage > 3) {
                                pushEllipsis("start");
                              }
                              // Tampilkan halaman di sekitar halaman saat ini
                              let start = Math.max(2, currentPage - 1);
                              let end = Math.min(
                                totalPages - 1,
                                currentPage + 1
                              );

                              if (currentPage <= 3) {
                                end = 4;
                              }
                              if (currentPage >= totalPages - 2) {
                                start = totalPages - 3;
                              }

                              for (let i = start; i <= end; i++) {
                                pushPage(i);
                              }

                              if (currentPage < totalPages - 2) {
                                pushEllipsis("end");
                              }
                            }

                            // Selalu tampilkan halaman terakhir jika lebih dari 1 halaman
                            if (totalPages > 1) {
                              pushPage(totalPages);
                            }

                            return pages;
                          })()}
                        </div>

                        {/* Next Button */}
                        <button
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(
                                prev + 1,
                                Math.ceil(filteredVilla.length / itemsPerPage)
                              )
                            )
                          }
                          disabled={
                            currentPage ===
                            Math.ceil(filteredVilla.length / itemsPerPage)
                          }
                          className="p-1.5 sm:p-2 text-sm sm:text-md bg-brown-500 text-white rounded disabled:bg-gray-300"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8"></div>
    </>
  );
};

export default PostingAdmin;
// !
