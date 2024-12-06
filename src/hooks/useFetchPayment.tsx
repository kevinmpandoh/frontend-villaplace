import {
  getAllPayment,
  getAllPaymentOwner,
  getPaymentById,
  createPembayaran,
  deletePayment,
  updatePayment,
} from "@/services/paymentService";
import React, { useState } from "react";

const useFetchPayment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleGetAllPayment = async (query: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await getAllPayment(query);
      setError(null);
      setLoading(false);
      setSuccess(true);

      return response;
    } catch (err) {
      setError(err as Error);
    }
  };

  const handleGetPaymentById = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await getPaymentById(id);
      setError(null);
      setLoading(false);
      setSuccess(true);

      return response;
    } catch (err) {
      setError(err as Error);
    }
  };

  const handleGetAllPaymentOwner = async (query: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await getAllPaymentOwner(query);
      setError(null);
      setLoading(false);
      setSuccess(true);

      return response;
    } catch (err) {
      setError(err as Error);
    }
  };

  const handleCreatePayment = async (dataPayment: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await createPembayaran(dataPayment);
      setSuccess(true);

      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePayment = async (id: string, dataPayment: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const result = await updatePayment(id, dataPayment);
      setSuccess(true);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePayment = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await deletePayment(id);
      setSuccess(true);

      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleGetAllPayment,
    handleGetAllPaymentOwner,
    handleGetPaymentById,
    handleCreatePayment,
    handleUpdatePayment,
    handleDeletePayment,
    loading,
    error,
    success,
  };
};

export default useFetchPayment;
