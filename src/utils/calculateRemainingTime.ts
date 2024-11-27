import { useState, useEffect } from "react";

// const calculateRemainingTime = (
//   tanggalPembayaran: string,
//   batasWaktuJam: number
// ) => {
//   const pembayaranDate = new Date(tanggalPembayaran).getTime();
//   const batasWaktu = pembayaranDate + batasWaktuJam * 60 * 60 * 1000; // Tambahkan batas waktu
//   const sekarang = new Date().getTime();
//   const sisaWaktu = batasWaktu - sekarang;

//   if (sisaWaktu <= 0) {
//     return { isExpired: true, remaining: "Waktu habis" };
//   }

//   const hours = Math.floor(sisaWaktu / (1000 * 60 * 60));
//   const minutes = Math.floor((sisaWaktu % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((sisaWaktu % (1000 * 60)) / 1000);

//   return {
//     isExpired: false,
//     remaining: `${hours} jam ${minutes} menit ${seconds} detik`,
//   };
// };

const calculateRemainingTime = (startDate: string, durationHours: number) => {
  const start = new Date(startDate).getTime();
  const end = start + durationHours * 60 * 60 * 1000; // Tambahkan durasi dalam milidetik
  const now = new Date().getTime();
  const remaining = end - now;

  if (remaining <= 0) {
    return "Waktu habis";
  }

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  return `${hours}: ${minutes}: ${seconds}`;
};

export default calculateRemainingTime;
