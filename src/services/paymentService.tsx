import AddPayment from "@/types/AddPayment";
import Payment from "@/types/Payment";
import axios from "axios";

const API_BASE_URL =
  `${process.env.NEXT_PUBLIC_API_BASE_URL}` || "http://localhost:8000/api";

export const getPembayaran = async () => {
  const response = await axios.get(`${API_BASE_URL}/pembayaran`, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
export const getAllPayment = async (query: string) => {
  const response = await axios.get(`${API_BASE_URL}/pembayaran?${query}`, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getAllPaymentOwner = async (query: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/pembayaran/owner?${query}`,
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const getPaymentById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/pembayaran/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const createPembayaran = async (data: AddPayment) => {
  const response = await axios.post(`${API_BASE_URL}/pembayaran`, data, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const updatePayment = async (id: string, data: Payment) => {
  const response = await axios.put(`${API_BASE_URL}/pembayaran/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deletePayment = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/pembayaran/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
