import * as Yup from "yup";

const validationSchemaChangePassword = Yup.object({
  currentPassword: Yup.string().required("Password lama wajib diisi"),
  newPassword: Yup.string()
    .min(8, "Password baru minimal 8 karakter")
    .required("Password baru wajib diisi"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword"), undefined],
      "Konfirmasi password tidak cocok"
    )
    .required("Konfirmasi password wajib diisi"),
});

export default validationSchemaChangePassword;
