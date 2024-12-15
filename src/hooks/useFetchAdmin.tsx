import { useState } from "react";
import {
  updateAdmin,
  changePassword,
  createAdmin,
  deleteAdmin,
  getDashboardData,
} from "../services/adminService";
import { Admin } from "../types/Admin";
import Swal from "sweetalert2";

export const useFetchAdmin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleDashboardData = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const result = await getDashboardData(query);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (data: Omit<Admin, "_id">) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await createAdmin(data);
      Swal.fire({
        title: "Berhasil!",
        text: "Admin baru berhasil dibuat.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setSuccess(true);
      return result;
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal membuat admin");
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Gagal membuat admin",
        icon: "error",
        confirmButtonText: "OK",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateAdmin = async (id: string, data: Omit<Admin, "_id">) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await updateAdmin(id, data);
      Swal.fire({
        title: "Berhasil!",
        text: "Profil Anda berhasil diperbarui.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setSuccess(true);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    setLoading(true);
    try {
      await changePassword(data);
      setSuccess(true);
    } catch (err: any) {
      if (err.errors) {
        setError(err.errors);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await deleteAdmin(id);

      Swal.fire({
        title: "Berhasil!",
        text: "Admin berhasil dihapus.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setSuccess(true);
      return response;
    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err.message || "Gagal menghapus admin.",
        icon: "error",
        confirmButtonText: "OK",
      });

      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleDashboardData,
    handleCreateAdmin,
    handleUpdateAdmin,
    handleChangePassword,
    handleDeleteAdmin,
    loading,
    error,
    success,
  };
};
