import * as Yup from "yup";
import emailValidator from "email-validator";

const validationSchemaBooking = Yup.object().shape({
  fullName: Yup.string().required("Nama lengkap diperlukan"),
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email diperlukan")
    .test("valid-email", "Email tidak valid", (value) => {
      if (!value) return false; // Tangani nilai kosong
      return emailValidator.validate(value); // Validasi email
    }),
  guests: Yup.number()
    .min(1, "Minimal 1 tamu")
    .required("Jumlah tamu diperlukan"),
  notes: Yup.string().max(255, "Maksimal 255 karakter"),
  checkInDate: Yup.date().required("Tanggal masuk diperlukan"),
  checkOutDate: Yup.date().required("Tanggal keluar diperlukan"),
});

export default validationSchemaBooking;
