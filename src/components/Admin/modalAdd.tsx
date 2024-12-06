import React from "react";
import Swal from "sweetalert2";
import { useFetchAdmin } from "../../hooks/useFetchAdmin";
import { useFormik } from "formik";
import * as Yup from "yup";

const ModalAdmin = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { handleCreateAdmin } = useFetchAdmin();

  // Form validation schema
  const validationSchema = Yup.object({
    nama: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      nama: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleCreateAdmin(values)
        .then(() => {
          Swal.fire("Success", "Admin added successfully!", "success").then(() => {
            setShowModal(false);
            resetForm(); // Reset form values after submission
            window.location.reload(); // Reload the page after success
          });
        })
        .catch((error) => {
          Swal.fire("Error", error.message, "error");
        });
    },
  });

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Add New Admin</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formik.values.nama}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-4 bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5
                  ${
                    formik.touched.nama && formik.errors.nama
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                />
                {formik.touched.nama && formik.errors.nama && (
                  <div className="text-red-500 text-sm">{formik.errors.nama}</div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-4 bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5
                  ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-4 bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5
                  ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm">{formik.errors.password}</div>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex items-center font-semibold text-white bg-[#666666] hover:bg-gray-800 rounded text-sm px-3 py-2 dark:bg-gray-600 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center font-semibold text-white bg-[#089562] hover:bg-green-800 rounded text-sm px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700"
                >
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalAdmin;
