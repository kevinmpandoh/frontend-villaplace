"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import DetailBooking from "@/components/BookingAdmin/DetailBooking";
import EditBooking from "@/components/BookingAdmin/EditBooking";
import useFetchBooking from "@/hooks/useFetchBooking";
import Swal from "sweetalert2";
import TableBookingAdmin from "@/components/BookingAdmin/TableBookingAdmin";
import Booking from "@/types/Booking";
import Link from "next/link";

const PesananAdmin = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = React.useState(false);
  const [currentModalId, setCurrentModalId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredData, setFilteredData] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [detailBooking, setDetailBooking] = useState<Booking>();
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const {
    handleUpdateBooking,
    handleGetBookingById,
    handleGetAllBooking,
    handleDeleteBooking,
  } = useFetchBooking();

  useEffect(() => {
    const fetchData = async () => {
      const query = `status=${selectedStatus}`;
      const itemsPerPage = 5;

      const data = await handleGetAllBooking(query);
      if (data && data.data) {
        const filteredData = data.data.filter((data: Booking) => {
          const searchKeyword = search.toLowerCase();

          const nama_villa = data.villa.nama?.toLowerCase() || "";
          const lokasi = data.villa.lokasi?.toLowerCase() || "";
          const nama_user = data.user?.nama?.toLowerCase() || "";
          const email_user = data.user?.email?.toLowerCase() || "";

          return (
            nama_villa.includes(searchKeyword) ||
            nama_user.includes(searchKeyword) ||
            email_user.includes(searchKeyword) ||
            lokasi.includes(searchKeyword)
          );
        });

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filteredData.slice(
          indexOfFirstItem,
          indexOfLastItem
        );

        const totalPages = Math.ceil(filteredData.length / itemsPerPage);

        setFilteredData(currentItems);
        setTotalItems(filteredData.length);
        setTotalPages(totalPages);
      } else {
        setTotalItems(0);
        setTotalPages(0);
      }
    };

    fetchData();
  }, [selectedStatus, search, currentPage]);

  useEffect(() => {
    if (currentModalId) {
      const fetchData = async () => {
        const data = await handleGetBookingById(currentModalId);
        if (data) {
          setDetailBooking(data.data);
        }
      };

      fetchData();
    }
  }, [currentModalId]);

  const toggleModal = (id: string) => {
    setCurrentModalId(id);
    setIsModalOpen(!isModalOpen);
  };

  const toggleModalEdit = (id: string) => {
    setCurrentModalId(id);
    setIsModalEditOpen(!isModalEditOpen);
  };

  const handleSubmit = (id: string, updatedBooking: Booking) => {
    handleUpdateBooking(id, updatedBooking);
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Pembayaran berhasil diubah",
    });
    setFilteredData((prevData) =>
      prevData.map((item) => (item._id === id ? updatedBooking : item))
    );
    toggleModalEdit("");
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteBooking(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } else {
        Swal.fire("Cancelled", "Your file is safe :)", "error");
      }
    });

    setFilteredData((prevData) => prevData.filter((item) => item._id !== id));
  };

  const handleCurrentPage = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  const handleSearch = (keyword: string) => {
    setSearch(keyword);
  };

  const handleSelectStatus = (selectedStatus: string) => {
    setSelectedStatus(selectedStatus);
  };
  return (
    <>
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
              <a
                href="/dashboard/admin/pesanan"
                className="text-gray-500 hover:text-gray-700"
              >
                Transaksi
              </a>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <span className="text-gray-500"></span>
              Pesanan
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex justify-between border-2 shadow-lg rounded-md items-center mb-3 bg-white p-6 m-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Manajemen Pesanan</h1>
          <p>Halaman untuk memanajemen pesanan</p>
        </div>
      </div>

      <div className="p-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
          <h2 className="text-xl font-bold mb-6">Pesanan</h2>
          <div className="border-b-2 border-gray-200 w-full md:w-[600px]"></div>
          <div className="mt-5">
            <TableBookingAdmin
              filteredData={filteredData}
              search={search}
              selectedStatus={selectedStatus}
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              handleCurrentPage={handleCurrentPage}
              handleSearch={handleSearch}
              handleSelectStatus={handleSelectStatus}
              handleDelete={handleDelete}
              toggleModal={toggleModal}
              toggleModalEdit={toggleModalEdit}
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => toggleModal("")}
          title="Detail Pesanan"
          className="max-h-screen overflow-y-auto h-1/2"
        >
          {detailBooking && <DetailBooking detailBooking={detailBooking} />}
        </Modal>
      )}

      {isModalEditOpen && (
        <Modal
          onClose={() => toggleModalEdit("")}
          title="Edit Pesanan"
          className="max-h-screen max-w-lg overflow-y-auto h-3/2"
        >
          <EditBooking bookingId={currentModalId} onEdit={handleSubmit} />
        </Modal>
      )}
    </>
  );
};

export default PesananAdmin;
