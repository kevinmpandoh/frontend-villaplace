import Booking from "@/types/Booking";
import axios from "axios";
import AddBooking from "@/types/AddBooking";
const API_BASE_URL =
  `${process.env.NEXT_PUBLIC_API_BASE_URL}` || "http://localhost:8000/api";

export const getPesanan = async (query: string) => {
  const response = await axios.get(`${API_BASE_URL}/pesnaan?${query}`, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getPesananById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/pesanan/${id}`, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getPesananByOwner = async (query: string) => {
  const response = await axios.get(`${API_BASE_URL}/pesanan/owner?${query}`, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getPesananUser = async () => {
  const response = await axios.get(`${API_BASE_URL}/pesanan/user`, {
    withCredentials: true,
  });

  return response.data;
};

export const createPesanan = async (data: AddBooking) => {
  const response = await axios.post(`${API_BASE_URL}/pesanan`, data, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const createPesananOwner = async (data: AddBooking) => {
  const response = await axios.post(
    `${API_BASE_URL}/pesanan/createPesananOwner`,
    data,
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const updatePesanan = async (id: string, data: Booking) => {
  const response = await axios.put(`${API_BASE_URL}/pesanan/${id}`, data, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const deletePesanan = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/pesanan/${id}`, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
