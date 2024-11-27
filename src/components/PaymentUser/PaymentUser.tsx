"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DetailPembayaran from "./DetailPembayaran";
import Modal from "../Modal";
import useFetchData from "@/hooks/useFetchData";

const PaymentUser = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalId, setCurrentModalId] = useState("");
  const [PaymentData, setPaymentData] = useState([]);

  const { data } = useFetchData("http://localhost:8000/api/pembayaran", {
    withCredentials: true,
  });

  useEffect(() => {
    if (data) {
      setPaymentData(data.data);
    }
  }, [data]);

  const toggleModal = (id: any) => {
    setCurrentModalId(id);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="mb-5 text-[#212121]">
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
              Pending
            </button>
            <button
              onClick={() => setSelectedStatus("Success")}
              className={`${
                selectedStatus === "Success"
                  ? "bg-[#B7906C]   border-[#B7906C] text-white"
                  : "text-[#5e6c84]"
              } py-1 px-2.5 rounded font-semibold border-2`}
            >
              Berhasil
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
        {PaymentData.map((item: any, index) => (
          <div key={index} className="box-3 mb-4">
            <div className="flex justify-between text-sm mb-4 items-center ">
              <div className="inline-flex items-center ">
                <p className="mr-2 ">{item.tanggal_pembayaran}</p>

                <p className="mr-2 text-form-strokedark">
                  <span className="text-sm">{item.kode_pembayaran}</span>
                </p>
              </div>
              <p
                className={`inline-flex text-green-500 bg-green-600 border border-green-600 rounded-sm bg-opacity-10 py-1 px-3 text-sm font-bold mr-2 `}
              >
                {item.status_pembayaran}
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex">
                <Image
                  src={item.pesanan.villa.foto_villa[0].url}
                  width={100}
                  height={100}
                  alt="product"
                  className="rounded-lg mr-4"
                />
                <div>
                  <p className="font-bold">{item.pesanan.villa.nama}</p>
                  <p className="text-sm text-form-strokedark mb-2">
                    Lokasi: manado
                  </p>
                  <p className="text-sm text-form-strokedark mb-2">
                    3 Hari x Rp 200.000
                  </p>
                </div>
              </div>
              <div className="border-line px-5">
                <p className="text-form-strokedark mb-3">Pembayaran</p>
                <div className="font-bold">
                  <Image
                    src="/assets/images/bri.webp"
                    width={60}
                    height={60}
                    alt="bri"
                  />
                  <p>{item.metode_pembayaran}</p>
                </div>
              </div>

              <div className="border-line px-10 justify-start">
                <p>Total Payment</p>
                <p className="font-bold">Rp {item.jumlah_pembayaran}</p>
              </div>
            </div>
            <div className="flex justify-end items-center mt-7 gap-2">
              <button
                type="button"
                onClick={() => toggleModal(item._id)}
                className="flex justify-end font-semibold text-[#089562] bg-[#089562] bg-opacity-10 border border-[#089562] hover:bg-opacity-30 rounded text-sm px-3 py-1.5 me-2 dark:bg-green-600 dark:hover:bg-green-700"
              >
                Lihat Detail
              </button>

              <Link href={`/review/1`}>
                <button
                  type="button"
                  className="flex justify-end font-semibold text-white bg-[#089562] hover:bg-green-800 rounded text-sm px-3 py-1.5 me-2 dark:bg-green-600 dark:hover:bg-green-700"
                >
                  Cara Pembayaran
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => toggleModal(null)}
          title="Detail Pembayaran"
          className="max-h-screen overflow-y-auto h-3/4"
        >
          <DetailPembayaran pembayaranId={currentModalId} />
        </Modal>
      )}
    </>
  );
};

export default PaymentUser;
