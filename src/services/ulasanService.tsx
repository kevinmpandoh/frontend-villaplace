import { AddUlasan } from "@/types/Ulasan";
import axios from "axios";

const API_BASE_URL =
  `${process.env.NEXT_PUBLIC_API_BASE_URL}` || "http://localhost:8000/api";

export const getUlasan = async () => {
  const response = await axios.get(`${API_BASE_URL}/ulasan`, {
    withCredentials: true,
  });
  return response.data;
};

export const getUlasanUser = async () => {
  const response = await axios.get(`${API_BASE_URL}/ulasan/user`, {
    withCredentials: true,
  });
  return response.data;
};

export const postUlasan = async (data: AddUlasan) => {
  const response = await axios.post(`${API_BASE_URL}/ulasan`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteUlasan = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/ulasan/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
