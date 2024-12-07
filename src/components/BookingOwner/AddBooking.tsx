import React, { useState, useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { calculateRentalDays } from "@/utils/calculateDays";

interface AddBookingProps {
  handleAddBooking: () => void;
}

const AddBooking = ({ handleAddBooking }: AddBookingProps) => {
  const today = new Date().toISOString().split("T")[0]; // Mendapatkan tanggal hari ini dalam format YYYY-MM-DD
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [rentalDays, setRentalDays] = useState(0);

  // const response = await axios.get(
  //   `http://localhost:8000/api/villa/${villaId}/booked-dates`,
  //   {
  //     withCredentials: true,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    guests: 1,
    checkInDate: "",
    checkOutDate: "",
    notes: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "checkInDate" || name === "checkOutDate") {
      const res = calculateRentalDays(
        name === "checkInDate" ? value : formData.checkInDate,
        name === "checkOutDate" ? value : formData.checkOutDate
      );

      setRentalDays(res);
    }
  };

  // Fungsi untuk membuat daftar tanggal yang tidak tersedia
  // const getDisabledDates = (): Set<string> => {
  //   const disabledDates = new Set<string>();
  //   bookingDate.forEach(({ tanggal_mulai, tanggal_selesai }) => {
  //     let currentDate = new Date(tanggal_mulai);
  //     const endDate = new Date(tanggal_selesai);

  //     // Tambahkan setiap tanggal dalam rentang ke dalam `disabledDates`
  //     while (currentDate <= endDate) {
  //       disabledDates.add(currentDate.toISOString().split("T")[0]);
  //       currentDate.setDate(currentDate.getDate() + 1);
  //     }
  //   });
  //   return disabledDates;
  // };

  // const disabledDates = getDisabledDates();
  return (
    <>
      <div className="p-2 mb-4">
        <div className="grid grid-cols-1 gap-4 mb-4 ">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="fullName"
              //   value={formData.fullName}
              //   onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              //   value={formData.email}
              //   onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tanggal Masuk
            </label>

            <DatePicker
              selected={checkInDate}
              // onChange={(date) => {
              //   if (date) {
              //     setCheckInDate(date);
              //     setCheckOutDate(null);

              //     handleChange({
              //       target: {
              //         name: "checkInDate",
              //         value: date.toISOString(),
              //       },
              //     });
              //   }
              // }}
              minDate={new Date()}
              // excludeDates={[...disabledDates].map((date) => new Date(date))}
              className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary "
              placeholderText="Pilih tanggal masuk"
              calendarClassName="bg-white border rounded-lg shadow-lg p-4"
              // dayClassName={(date) =>
              //   disabledDates.has(date.toISOString().split("T")[0])
              //     ? "text-gray-500 cursor-not-allowed"
              //     : "text-gray-900 hover:bg-green-200 rounded-full"
              // }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tanggal Keluar
            </label>
            <DatePicker
              selected={checkOutDate}
              // onChange={(date) => {
              //   setCheckOutDate(date);
              //   handleChange({
              //     target: {
              //       name: "checkOutDate",
              //       value: date?.toISOString(),
              //     } as any,
              //   });
              // }}
              minDate={
                checkInDate
                  ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
                  : new Date()
              }
              // excludeDates={[...disabledDates].map((date) => new Date(date))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              placeholderText="Pilih tanggal keluar"
            />
          </div>
        </div>
        <div className="w-full items-center gap-5">
          <label className="block text-sm font-medium text-gray-700">
            Jumlah Orang
          </label>
          <input
            type="number"
            name="guests"
            //   value={formData.guests}
            //   onChange={handleChange}
            className="mt-1 block border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            required
          />
        </div>
      </div>
      <div className="flex justify-end mt-4 w-full">
        <button
          onClick={handleAddBooking}
          className="px-4 py-2 w-full bg-primary text-white rounded-md hover:bg-green-700"
        >
          Tambah Pesanan
        </button>
      </div>
    </>
  );
};

export default AddBooking;
