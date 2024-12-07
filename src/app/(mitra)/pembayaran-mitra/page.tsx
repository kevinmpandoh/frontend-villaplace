"use client";
import React, { useState, useEffect } from "react";
import TablePayment from "@/components/Payment/PaymentMitra/TablePayment";
import Modal from "@/components/Modal";
import DetailPayment from "@/components/Payment/DetailPayment";
import useFetchPayment from "@/hooks/useFetchPayment";

// Types
import Payment from "@/types/Payment";

const PembayaranAdmin = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentModalId, setCurrentModalId] = useState("");
  const [dataPayment, setDataPayment] = useState<Payment[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredData, setFilteredData] = useState<Payment[]>([]);
  const [search, setSearch] = useState("");

  const { handleGetAllPaymentOwner } = useFetchPayment();

  useEffect(() => {
    const fetchData = async () => {
      let query = `limit=2&page=${currentPage}`;
      if (search) {
        query += `&searchQuery=${search}`;
      }

      const data = await handleGetAllPaymentOwner(query);
      if (data && data.data) {
        let filteredData = data.data;

        // Filter by status di frontend jika selectedStatus bukan "All"
        if (selectedStatus !== "All") {
          filteredData = filteredData.filter(
            (item: any) => item.status_pembayaran === selectedStatus
          );
        }

        setDataPayment(filteredData);
        setPagination(data.pagination);
      } else {
        setDataPayment([]);
        setPagination(null);
      }
    };

    fetchData();
  }, [currentPage, search, selectedStatus]);

  useEffect(() => {
    if (selectedStatus === "All") {
      setFilteredData(dataPayment);
    } else {
      setFilteredData(
        dataPayment.filter((item) => item.status_pembayaran === selectedStatus)
      );
    }
  }, [selectedStatus, dataPayment]);

  const toggleModal = (id: any) => {
    setCurrentModalId(id);
    setIsModalOpen(!isModalOpen);
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
                href="/pembayaran-admin"
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
              Pembayaran
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex justify-between border-2 shadow-lg rounded-md items-center mb-3 bg-white p-6 m-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Manajemen Pembayaran</h1>
          <p>Description</p>
        </div>
      </div>

      <div className="p-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
          <h2 className="text-xl font-bold mb-6">Pembayaran</h2>
          <div className="border-b-2 border-gray-200 w-full md:w-[600px]"></div>
          <div className="mt-5">
            <TablePayment
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
          title="Detail Pembayaran"
          className="max-h-screen overflow-y-auto h-3/4"
        >
          <DetailPayment paymentId={currentModalId} />
        </Modal>
      )}
    </>
  );
};

export default PembayaranAdmin;
