import * as Yup from "yup";

const registerValidationSchema = Yup.object().shape({
  nama: Yup.string()
    .required("Nama Lengkap wajib diisi")
    .min(3, "Nama harus lebih dari 3 karakter"),
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  no_telepon: Yup.string()
    .required("No Telepon wajib diisi")
    .matches(/^[0-9]+$/, "No Telepon hanya boleh berisi angka")
    .min(10, "No Telepon minimal 10 digit"),
  password: Yup.string()
    .required("Password wajib diisi")
    .min(8, "Password minimal 8 karakter"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Password tidak sama")
    .required("Konfirmasi Password wajib diisi"),
});

export default registerValidationSchema;
