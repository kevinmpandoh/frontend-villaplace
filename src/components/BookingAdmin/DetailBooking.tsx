import Booking from "@/types/Booking";
import React from "react";
import { formatDate } from "@/utils/formatDate";
import { calculateDays } from "@/utils/calculateDays";
import Image from "next/image";
import { getStatusColor, getStatusLabel } from "@/utils/getStatusLabelAndColor";

interface Props {
  detailBooking: Booking;
}

const DetailBooking = ({ detailBooking }: Props) => {
  return (
    <>
      <div className="p-5 border-b-2 border-y-meta-9">
        <div className="flex justify-between mb-2">
          <p>Status</p>
          <p
            className={`inline-flex ${getStatusColor(
              detailBooking?.status
            )} rounded-full border bg-opacity-10 py-1 px-3 text-xs font-bold `}
          >
            {getStatusLabel(detailBooking?.status)}
          </p>
        </div>
        <div className="flex justify-between">
          <p>Tanggal Pemesanan</p>
          <p className="font-semibold">
            {formatDate(detailBooking?.createdAt)}
          </p>
        </div>
      </div>
      <div className="p-5 border-b-2 border-y-meta-9">
        <h3 className=" font-semibold mb-3 text-lg">Villa</h3>
        <div className="flex flex-col md:flex-row gap-10 mt-5">
          <Image
            src={
              detailBooking?.villa.foto_villa[0]?.url ||
              "/assets/images/default-villa.jpg"
            }
            width={200}
            height={200}
            className="rounded-md"
            alt={"Foto Villa"}
          ></Image>
          <div>
            <div className="flex  mb-2">
              <p className="md:w-40 w-30 ">Nama Villa</p>
              <span className="mr-3">:</span>
              <p className="font-semibold">{detailBooking?.villa.nama}</p>
            </div>
            <div className="flex mb-2">
              <p className="md:w-40 w-30">Lokasi</p>
              <span className="mr-3">:</span>
              <p className="font-semibold">Manado</p>
            </div>
            <div className="flex mb-2">
              <p className="md:w-40 w-30">Kategori</p>
              <span className="mr-3">:</span>
              <p className="font-semibold">{detailBooking?.villa.kategori}</p>
            </div>
            <div className="flex mb-2">
              <p className="md:w-40 w-30">Fasilitas</p>
              <span className="mr-3">:</span>
              <p className="font-semibold">{detailBooking?.villa.fasilitas}</p>
            </div>
            <div className="flex mb-2">
              <p className="md:w-40 w-30">Harga</p>
              <span className="mr-3">:</span>
              <p className="font-bold text-lg text-[#089562]">
                Rp. {detailBooking?.villa.harga.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 border-b-2 border-y-meta-9">
        <h3 className="font-semibold mb-3 text-lg">Pesanan</h3>

        <div className="flex mb-2">
          <p className="w-1/3">Jumlah Orang</p>
          <span className="mr-3">:</span>
          <p className="font-semibold">{detailBooking?.jumlah_orang} Orang</p>
        </div>
        <div className="flex mb-2">
          <p className="w-1/3">Tanggal Masuk</p>
          <span className="mr-3">:</span>
          <p className="font-semibold">
            {formatDate(detailBooking?.tanggal_mulai)}
          </p>
        </div>
        <div className="flex mb-2">
          <p className="w-1/3">Tanggal Keluar</p>
          <span className="mr-3">:</span>
          <p className="font-semibold">
            {formatDate(detailBooking?.tanggal_selesai)}
          </p>
        </div>
        <div className="flex mb-2">
          <p className="w-1/3">Catatan</p>
          <span className="mr-3">:</span>
          <p className="font-semibold">{detailBooking?.catatan || "-"}</p>
        </div>
      </div>

      <div className="p-5 border-gray-200">
        <h3 className="font-semibold mb-3 text-lg">Pembayaran</h3>
        <div className="flex justify-between mt-4 mb-2">
          <p>Harga Villa</p>
          <p>Rp {detailBooking?.villa.harga.toLocaleString("id-ID")}</p>
        </div>
        <div className="flex justify-between">
          <p>Total Lama Sewa</p>
          <p>
            {calculateDays(
              detailBooking?.tanggal_mulai,
              detailBooking?.tanggal_selesai
            )}{" "}
            Hari
          </p>
        </div>
        <div className="flex justify-between mt-4 border-t border-y-meta-9">
          <p className="mt-2 text-lg font-bold">Total Pembayaran</p>
          <p className="font-bold text-lg mt-2">
            Rp {detailBooking?.harga.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </>
  );
};

export default DetailBooking;
