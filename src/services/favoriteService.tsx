import axios from "axios";
const API_BASE_URL =
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/favorite` ||
  "http://localhost:8000/api/favorite";

export const getFavorites = async () => {
  const response = await axios.get(`${API_BASE_URL}/`, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteFavorite = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
