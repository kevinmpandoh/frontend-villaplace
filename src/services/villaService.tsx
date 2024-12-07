import axios from "axios";
const API_BASE_URL = "http://localhost:8000/api";

export const getVillas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/villa`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const getVillaById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/villa/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const getVillaByOwner = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/villa/owner`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const createVilla = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/villa`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const updateVilla = async (id: string, data: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/villa/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteVilla = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/villa/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};
