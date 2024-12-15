import { useState } from "react";
import {
  updateMitra,
  changePassword,
  deleteMitra,
  getDashboardData,
} from "../services/mitraService";
import { Mitra } from "../types/Mitra";
import Swal from "sweetalert2";

export const useFetchMitra = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleDashboardData = async (query: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await getDashboardData(query);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMitra = async (id: string, data: Omit<Mitra, "_id">) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await updateMitra(id, data);
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
    setError(null);
    setSuccess(false);
    try {
      await changePassword(data);
      setSuccess(true);
    } catch (err: any) {
      if (err.errors) {
        setError(err.errors);
      }
      // setError(err.errors.currentPassword || "Failed to change password");
      // Swal.fire({
      //   title: "Error",
      //   text: err.errors.currentPassword || "Failed to change password",
      //   icon: "error",
      //   confirmButtonText: "OK",
      // });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMitra = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await deleteMitra(id);

      Swal.fire({
        title: "Berhasil!",
        text: "Mitra berhasil dihapus.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setSuccess(true);
      return response;
    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err.message || "Gagal menghapus mitra.",
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
    handleUpdateMitra,
    handleChangePassword,
    handleDeleteMitra,
    loading,
    error,
    success,
  };
};
