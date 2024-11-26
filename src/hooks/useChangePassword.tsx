"use client";
import { useState } from "react";
import { changePassword } from "../services/userService";
import Swal from "sweetalert2";

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    setLoading(true);
    try {
      const response = await changePassword(data);
      Swal.fire({
        title: "Success",
        text: response.data.message || "Password successfully changed!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to change password.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleChangePassword, loading };
};
