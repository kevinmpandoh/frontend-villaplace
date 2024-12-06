export default interface Booking {
  _id: string;
  jumlah_orang: number;
  tanggal_mulai: string;
  tanggal_selesai: string;
  status: string;
  catatan: string;
  harga: number;
  villa: {
    nama: string;
    kategori: string;
    fasilitas: string[];
    foto_villa: {
      url: string;
    }[];
    harga: number;
  };
  user: {
    nama: string;
    email: string;
    foto_profile: string;
  };
  createdAt: string;
}
