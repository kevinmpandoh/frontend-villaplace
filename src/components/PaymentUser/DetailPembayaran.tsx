import useFetchData from "@/hooks/useFetchData";
import React from "react";

interface DetailPembayaranProps {
  pembayaranId: string;
}

const DetailPembayaran: React.FC<DetailPembayaranProps> = ({
  pembayaranId,
}) => {
  const { data } = useFetchData(
    `http://localhost:8000/api/pembayaran/${pembayaranId}`,
    {
      withCredentials: true,
    }
  );

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9 ">
        <div className="border-b-2 border-y-meta-9 mb-4">
          <div className="flex justify-between mb-2">
            <p>Status</p>
            <p
              className={`inline-flex text-yellow-600 bg-yellow-600 border border-yellow-600 rounded-sm bg-opacity-10 py-1 px-3 text-sm font-bold `}
            >
              Menunggu Pembayaran
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Order ID</p>
            <p className="font-semibold">#{data?.data.kode_pembayaran}</p>
          </div>
          <div className="flex justify-between mb-4">
            <p>Tanggal Pembayaran</p>
            <p className="font-semibold">{data?.data.tanggal_pembayaran}</p>
          </div>
        </div>

        <h2 className="mb-5 font-bold text-xl">Detail Pemesan</h2>
        <div className="flex flex-col gap-7.5">
          <div className="flex flex-row gap-5.5 ">
            <div className="w-full sm:w-1/3">
              <label
                className="mb-2 block text-sm font-medium text-black dark:text-white"
                htmlFor="fullName"
              >
                Nama Lengkap
              </label>
              <div className="relative font-bold">
                <h3>{data?.data.pesanan.nama_pembayar}</h3>
              </div>
            </div>

            <div className="w-full sm:w-1/2">
              <label
                className="mb-2 block text-sm font-medium text-black dark:text-white"
                htmlFor="email"
              >
                Email
              </label>

              <h3 className="font-bold">{data?.data.pesanan.email_pembayar}</h3>
            </div>
          </div>
        </div>
        <hr className="mt-10" />
        <h2 className="mb-5 mt-10 font-bold text-xl">Pembayaran</h2>
        <div className="flex flex-col gap-7.5 ">
          <div className="p-5 border-b-2 border-y-meta-9">
            <div className="flex mb-2">
              <p className="w-1/3">Metode Pembayaran</p>
              <span className="mr-3">:</span>
              <p className="font-semibold">{data?.data.metode_pembayaran}</p>
            </div>
            <div className="flex mb-2">
              <p className="w-1/3">Tipe Pembayaran</p>
              <span className="mr-3">:</span>
              <p className="font-semibold">BRI</p>
            </div>
            <div className="flex mb-2">
              <p className="w-1/3">Nomor Virtual Account</p>
              <span className="mr-3">:</span>
              <p className="font-semibold">{data?.data.va_number || "-"}</p>
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-800 uppercase bg-[#089562] bg-opacity-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Deskripsi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Harga
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Periode
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b-2 text-black dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-semibold  whitespace-nowrap dark:text-white"
                  >
                    {data?.data.pesanan.villa.nama}
                  </th>
                  <td className="px-6 py-4">
                    Rp {data?.data.pesanan.villa.harga}
                  </td>
                  <td className="px-6 py-4">3 Hari</td>
                  <td className="px-6 py-4 font-semibold">
                    Rp {data?.data.jumlah_pembayaran}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="p-5 border-b-2 flex flex-col justify-center items-end">
              <div className="flex justify-between w-1/3  mb-2">
                <p className=" ">Sub Total</p>
                <p className="font-semibold ">Rp 900.000</p>
              </div>
              <div className="flex justify-between w-1/3  mb-2">
                <p className=" "> Biaya Layanan</p>
                <p className="font-semibold ">Rp. 2.000</p>
              </div>
            </div>
            <div className="p-5 flex flex-col justify-end items-end">
              <div className=" mb-2">
                <p className="font-semibold text-md ">Total Pembayaran</p>
                <p className="font-bold text-2xl text-[#089562]">Rp 902.000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPembayaran;
