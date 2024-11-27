"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import DetailPesanan from "./DetailPesanan";
import Review from "./Review";
import Modal from "../Modal";
import useFetchData from "@/hooks/useFetchData";

const Booking = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalId, setCurrentModalId] = useState("");
  const [isModalReviewOpen, setIsModalReviewOpen] = useState(false);
  const [BookingData, setBookingData] = useState([]);

  const { data } = useFetchData("http://localhost:8000/api/pesanan", {
    withCredentials: true,
  });

  useEffect(() => {
    if (data) {
      setBookingData(data.data);
    }
  }, [data]);

  const toggleModal = (id: any) => {
    setCurrentModalId(id);
    setIsModalOpen(!isModalOpen);
  };

  const toggleModalReview = (id: any) => {
    setCurrentModalId(id);
    setIsModalReviewOpen(!isModalReviewOpen);
  };
  return (
    <>
      <div className=" mb-5 ">
        <div className="flex mb-4 items-center">
          <div className="mr-4">
            <p className="font-semibold">Status</p>
          </div>
          <div className="w-full items-center space-x-2">
            <button
              onClick={() => setSelectedStatus("All")}
              className={`${
                selectedStatus === "All"
                  ? "bg-[#B7906C]   border-[#B7906C] text-white"
                  : "text-[#5e6c84]"
              } py-1 px-2.5 rounded font-semibold border-2`}
            >
              Semua
            </button>
            <button
              onClick={() => setSelectedStatus("Pending")}
              className={`${
                selectedStatus === "Pending"
                  ? "bg-[#B7906C]   border-[#B7906C] text-white"
                  : "text-[#5e6c84]"
              } py-1 px-2.5 rounded font-semibold border-2`}
            >
              Belum Bayar
            </button>
            <button
              onClick={() => setSelectedStatus("Success")}
              className={`${
                selectedStatus === "Success"
                  ? "bg-[#B7906C]   border-[#B7906C] text-white"
                  : "text-[#5e6c84]"
              } py-1 px-2.5 rounded font-semibold border-2`}
            >
              Berlangsung
            </button>
            <button
              onClick={() => setSelectedStatus("Completed")}
              className={`${
                selectedStatus === "Completed"
                  ? "bg-[#B7906C]   border-[#B7906C] text-white"
                  : "text-[#5e6c84]"
              } py-1 px-2.5 rounded font-semibold border-2`}
            >
              Selesai
            </button>
            <button
              onClick={() => setSelectedStatus("Canceled")}
              className={`${
                selectedStatus === "Canceled"
                  ? "bg-[#B7906C]   border-[#B7906C] text-white"
                  : "text-[#5e6c84]"
              } py-1 px-2.5 rounded font-semibold border-2`}
            >
              Dibatalkan
            </button>
          </div>
        </div>
        {BookingData.map((item: any, index) => (
          <div key={index} className="box-3 mb-4">
            <div className="flex  justify-between mb-4 items-center">
              <div className="inline-flex items-center text-sm font-semibold">
                <p className="mr-2">Tanggal Pemesanan :</p>
                <p>{item.createdAt}</p>
              </div>
              <p
                className={`inline-flex text-yellow-600 bg-yellow-600 border border-yellow-600 rounded-sm bg-opacity-10 py-1 px-3 text-sm font-bold`}
              >
                {item.status}
              </p>
            </div>
            <div className="flex">
              <div className="item-content">
                <div className="flex">
                  <Image
                    src={item.villa.foto_villa[0].url}
                    width={150}
                    height={150}
                    alt="product"
                    className="rounded-lg mr-4"
                  />
                  <div>
                    <p className="font-bold text-xl">{item.villa.nama}</p>
                    <p className="text-sm text-form-strokedark mb-2">
                      Lokasi: {item.villa.lokasi}
                    </p>
                    <p className="text-sm text-form-strokedark mb-2">
                      3 Hari x Rp {item.villa.harga}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between w-1/3 ">
                <div className="flex flex-col justify-end items-end ">
                  <p className="text-form-strokedark">Total Pembayaran</p>
                  <p className="font-bold text-lg">Rp {item.harga}</p>
                </div>
                <div className="flex justify-end items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleModal(item._id)}
                    className="flex justify-end font-semibold text-[#089562] bg-[#089562] bg-opacity-10 border border-[#089562] hover:bg-opacity-30 rounded text-sm px-3 py-1.5 me-2 dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    Lihat Detail
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleModalReview(item._id)}
                    className="flex justify-end font-semibold text-white bg-[#089562] hover:bg-green-800 rounded text-sm px-3 py-1.5 dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    Review Villa
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => toggleModal(null)}
          title="Detail Pesanan Villa"
          className="max-h-screen overflow-y-auto h-3/4"
        >
          <DetailPesanan pesananId={currentModalId} />
        </Modal>
      )}
      {isModalReviewOpen && (
        <Modal
          onClose={() => toggleModalReview(null)}
          title="Beri Ulasan Villa"
          className="max-w-md"
        >
          <Review villaId={currentModalId} />
        </Modal>
      )}
    </>
  );
};

export default Booking;
