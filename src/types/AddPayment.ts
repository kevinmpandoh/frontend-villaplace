export default interface AddPayment {
  nama_pembayar: string;
  email_pembayar: string;
  kode_pembayaran: string;
  jumlah_pembayaran: number;
  status_pembayaran: string;
  pdf_url: string;
  tanggal_pembayaran: Date;
  nomor_va: string;
  expiry_time: Date;
  pesanan: string;
  metode_pembayaran: string;
  bank: string;
}
