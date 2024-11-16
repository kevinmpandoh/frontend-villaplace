"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const RegisFormMitra = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi password
    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak sama");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/owner/register",
        {
          nama: formData.nama,
          email: formData.email,
          no_telepon: formData.phone,
          password: formData.password,
        }
      );

      if (res.status === 201) {
        router.push("/auth/login");
      }
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };
  return (
    <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center">Daftar sebagai Mitra</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nama Lengkap
        </label>
        <input
          type="text"
          placeholder="Nama Lengkap"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
          value={formData.nama}
          onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          No Telepon
        </label>
        <input
          type="text"
          placeholder="No Telepon"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Konfirmasi Password
        </label>
        <input
          type="password"
          placeholder="Konfirmasi Password"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          required
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Daftar
      </button>
    </form>
  );
};

export default RegisFormMitra;
