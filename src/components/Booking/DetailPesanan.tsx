import React, { useState, useEffect } from "react";
import Image from "next/image";
import useFetchData from "@/hooks/useFetchData";

interface DetailPesananProps {
  pesananId: string;
}

const DetailPesanan: React.FC<DetailPesananProps> = ({ pesananId }) => {
  const { data } = useFetchData(
    `http://localhost:8000/api/pesanan/${pesananId}`,
    {
      withCredentials: true,
    }
  );

  return (
    <div>
      <div className="p-5 border-b-2 border-y-meta-9">
        <div className="flex justify-between mb-2">
          <p>Status</p>
          <p
            className={`inline-flex text-yellow-600 bg-yellow-600 border border-yellow-600 rounded-sm bg-opacity-10 py-1 px-3 text-sm font-bold `}
          >
            {data?.data.status}
          </p>
        </div>
        <div className="flex justify-between">
          <p>Tanggal Pemesanan</p>
          <p className="font-semibold">
            {new Date(data?.data.createdAt).toLocaleDateString("id-ID")}
          </p>
        </div>
      </div>
      <div className="p-5 border-b-2 border-y-meta-9">
        <h3 className=" font-semibold mb-3 text-lg">Villa</h3>
        <div className="flex gap-10 mt-5">
          <Image
            src={data?.data.villa.foto_villa[0]?.url || "/villa.jpg"}
            width={200}
            height={200}
            className="rounded-md"
            alt={"Foto Villa"}
          ></Image>
          <div>
            <div className="flex mb-2">
              <p className="w-40">Nama Villa</p>
              <span className="mr-3">:</span>
              <p className="font-semibold">{data?.data.villa.nama}</p>
            </div>
            <div className="flex mb-2">
              <p className="w-40">Lokasi</p>
              <span className="mr-3">:</span>
              <p className="font-semibold">Manado</p>
            </div>
            <div className="flex mb-2">
              <p className="w-40">Kategori</p>
              <span className="mr-3">:</span>
              <p className="font-semibold">{data?.data.villa.kategori}</p>
            </div>
            <div className="flex mb-2">
              <p className="w-40">Fasilitas</p>
              <span className="mr-3">:</span>
              <p className="font-semibold">{data?.data.villa.fasilitas}</p>
            </div>
            <div className="flex mb-2">
              <p className="w-40">Harga</p>
              <span className="mr-3">:</span>
              <p className="font-bold text-lg text-[#089562]">
                {data?.data.villa.harga}
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
          <p className="font-semibold">{data?.data.jumlah_orang} Orang</p>
        </div>
        <div className="flex mb-2">
          <p className="w-1/3">Tanggal Masuk</p>
          <span className="mr-3">:</span>
          <p className="font-semibold">
            {new Date(data?.data.tanggal_mulai).toLocaleDateString("id-ID")}
          </p>
        </div>
        <div className="flex mb-2">
          <p className="w-1/3">Tanggal Keluar</p>
          <span className="mr-3">:</span>
          <p className="font-semibold">
            {new Date(data?.data.tanggal_selesai).toLocaleDateString("id-ID")}
          </p>
        </div>
        <div className="flex mb-2">
          <p className="w-1/3">Jumlah Hari</p>
          <span className="mr-3">:</span>
          <p className="font-semibold">3 Hari</p>
        </div>
        <div className="flex mb-2">
          <p className="w-1/3">Catatan</p>
          <span className="mr-3">:</span>
          <p className="font-semibold">{data?.data.catatan || "-"}</p>
        </div>
      </div>

      <div className="p-5 border-gray-200">
        <h3 className="font-semibold mb-3 text-lg">Pembayaran</h3>
        <div className="flex justify-between mt-4 mb-2">
          <p>Harga Villa</p>
          <p>
            Rp
            {data?.data.villa.harga}
          </p>
        </div>
        <div className="flex justify-between">
          <p>Total Lama Sewa</p>
          <p>3 Hari</p>
        </div>
        <div className="flex justify-between mt-4 border-t border-y-meta-9">
          <p className="mt-2 text-lg font-bold">Total Pembayaran</p>
          <p className="font-bold text-lg mt-2">
            Rp
            {data?.data.harga}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailPesanan;
