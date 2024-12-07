"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import useFetchBooking from "@/hooks/useFetchBooking";
import TableBookingOwner from "@/components/BookingOwner/TableBookingOwner";
import Booking from "@/types/Booking";
import DetailBooking from "@/components/BookingOwner/DetailBooking";
import ButtonAdd from "@/components/BookingOwner/ButtonAdd";
import AddBooking from "@/components/BookingOwner/AddBooking";

const PesananAdmin = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = React.useState(false);
  const [currentModalId, setCurrentModalId] = useState("");
  const [dataBooking, setDataBooking] = useState<Booking[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredData, setFilteredData] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [detailBooking, setDetailBooking] = useState<any>();

  const { handleGetBookingById, handleGetBookingByOwner } = useFetchBooking();

  useEffect(() => {
    const fetchData = async () => {
      let query = `limit=5&page=${currentPage}`;

      const data = await handleGetBookingByOwner(query);
      if (data && data.data) {
        let filteredData = data.data.filter((item: Booking) => {
          const matchesSearch =
            // item.user.nama.toLowerCase().includes(search.toLowerCase()) ||
            item.catatan.toLowerCase().includes(search.toLowerCase()) ||
            item.villa.nama.toLowerCase().includes(search.toLowerCase());

          const matchesStatus =
            selectedStatus === "All" || item.status === selectedStatus;

          return matchesSearch && matchesStatus; // Gabungkan filter search dan status
        });

        setDataBooking(filteredData);
        setPagination(data.pagination);
      } else {
        setDataBooking([]);
        setPagination(null);
      }
    };

    fetchData();
  }, [currentPage, search, selectedStatus]);

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

  useEffect(() => {
    if (selectedStatus === "All") {
      setFilteredData(dataBooking);
    } else {
      setFilteredData(
        dataBooking.filter((item) => item.status === selectedStatus)
      );
    }
  }, [selectedStatus, dataBooking]);

  const toggleModal = (id: any) => {
    setCurrentModalId(id);
    setIsModalOpen(!isModalOpen);
  };

  const toggleModalAdd = () => {
    setIsModalAddOpen(!isModalAddOpen);
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

  const handleAddBooking = () => {
    setIsModalAddOpen(false);
  };

  return (
    <div>
      <div className="bg-white p-4 shadow-md rounded-md mb-4 mx-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex space-x-2 text-sm font-medium">
            <li>
              <a
                href="/dashboardAdmin"
                className="text-gray-500 hover:text-gray-700"
              >
                Dashboard
              </a>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <a
                href="/pesanan-admin"
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
          <p>Description</p>
        </div>
        <div>
          <ButtonAdd onClick={toggleModalAdd} />
        </div>
      </div>

      <div className="p-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
          <h2 className="text-xl font-bold mb-6">Pesanan</h2>
          <div className="border-b-2 border-gray-200 w-full md:w-[600px]"></div>
          <div className="mt-5">
            <TableBookingOwner
              filteredData={filteredData}
              search={search}
              selectedStatus={selectedStatus}
              pagination={pagination}
              handleCurrentPage={handleCurrentPage}
              handleSearch={handleSearch}
              toggleModal={toggleModal}
              handleSelectStatus={handleSelectStatus}
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => toggleModal(null)}
          title="Detail Pesanan"
          className="max-h-screen overflow-y-auto h-3/4"
        >
          <DetailBooking detailBooking={detailBooking} />
        </Modal>
      )}

      {isModalAddOpen && (
        <Modal
          onClose={() => toggleModalAdd()}
          title="Tambah Pesanan"
          className="max-h-screen max-w-lg overflow-y-auto h-2/3"
        >
          <AddBooking handleAddBooking={handleAddBooking} />
        </Modal>
      )}
    </div>
  );
};

export default PesananAdmin;
