"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";
import Image from "next/image";
interface Villa {
  nama: string;
  deskripsi: string;
  lokasi: string;
  kategori: string[];
  // fasilitas: string[];
  harga: number;
  kamar: number; // Ubah ke number
  kamar_mandi: number; // Ubah ke number
  foto_villa: string[];
}

const VillaForm = () => {
  const [villa, setVilla] = useState<Villa>({
    nama: "",
    deskripsi: "",
    lokasi: "",
    kategori: [],
    // fasilitas: [],
    harga: 0,
    kamar: 0,
    kamar_mandi: 0,
    foto_villa: [],
  });
  // const [images, setImages] = useState<{ file: File; timestamp: number }[]>([]);
  const { id } = useParams();

  // const handleChange = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;

  //   setVilla((prevData) => ({
  //     ...prevData,
  //     [name]:
  //       name === "harga" || name === "kamar" || name === "kamar_mandi"
  //         ? Number(value) // Konversi ke number
  //         : value,
  //   }));
  // };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setVilla((prevData) => {
      const updatedData = {
        ...prevData,
        [name]:
          name === "harga" || name === "kamar" || name === "kamar_mandi"
            ? Number(value)
            : value,
      };

      console.log("Updated field:", name, "=>", value); // Debugging
      console.log("Updated villa state:", updatedData); // Debugging
      return updatedData;
    });
  };

  //!
  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "kategori"
  ) => {
    const value = e.target.value;
    setVilla((prevData) => ({
      ...prevData,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };
  // const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const files = Array.from(e.target.files).map((file) => ({
  //       file,
  //       timestamp: Date.now(),
  //     }));
  //     setImages((prevImages) => [...prevImages, ...files]);
  //   }
  // };
  useEffect(() => {
    const getDataByID = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/villa/${id}`,
          { withCredentials: true }
        );

        const data = response.data.data;
        // setVilla(data); // Sinkronkan seluruh data ke state villa
        // console.log(response, "VILLA ID");
        setVilla({
          ...data,
          kamar: Number(data.kamar), // Pastikan tipe number
          kamar_mandi: Number(data.kamar_mandi), // Pastikan tipe number
        });
      } catch (error) {
        console.error(error);
      }
    };

    getDataByID();
  }, [id]);

  //! muncul 0 kamar
  // useEffect(() => {
  //   const getDataByID = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8000/api/villa/${id}`,
  //         { withCredentials: true }
  //       );

  //       const data = response.data.data;
  //       setVilla(data); // Sinkronkan data dari API ke state villa
  //       console.log("Villa data fetched:", data); // Debugging
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   getDataByID();
  // }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // let fasilitas = [];
    // fasilitas.push("Kamar " + villa.kamar, "K. Mandi" + villa.kamar_mandi);

    const updatedVilla = {
      ...villa,
      fasilitas: [
        `Kamar ${villa.kamar}`, // Tambahkan data kamar
        `K. Mandi ${villa.kamar_mandi}`, // Tambahkan data kamar mandi
      ],
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/api/villa/${id}`,
        updatedVilla, // Kirim seluruh state villa
        { withCredentials: true }
      );
      const villaData = response.data.data;
      const villaId = villaData._id;

      // Upload Images
      // const imageFormData = new FormData();
      // images.forEach((image) => {
      //   imageFormData.append("foto_villa", image.file);
      // });

      // await axios.post(
      //   `http://localhost:8000/api/villa/${villaId}/upload-villa`,
      //   imageFormData,
      //   {
      //     withCredentials: true,
      //     headers: { "Content-Type": "multipart/form-data" },
      //   }
      // );
      // console.log(response, "VILLA");

      Swal.fire({
        icon: "success",
        title: "Villa Updated!",
        text: "Your villa has been successfully updated.",
      }).then(() => {
        window.location.href = "/posting-admin";
      });
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error Updating Villa",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white border shadow-xl rounded-md my-16">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Edit Formulir Villa admin
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="namaVilla" className="block text-sm font-medium mb-2">
            Nama Villa
          </label>
          <input
            type="text"
            name="nama"
            id="namaVilla"
            value={villa.nama}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="lokasi" className="block text-sm font-medium mb-2">
              Lokasi
            </label>
            <input
              type="text"
              name="lokasi"
              id="lokasi"
              value={villa.lokasi}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="harga" className="block text-sm font-medium mb-2">
              Harga
            </label>
            <input
              type="number"
              name="harga"
              id="harga"
              value={villa.harga}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Kamar</label>
            <input
              type="number"
              name="kamar"
              value={villa.kamar}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Kamar Mandi</label>
            <input
              type="number"
              name="kamar_mandi"
              value={villa.kamar_mandi}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="deskripsi" className="block text-sm font-medium mb-2">
            Deskripsi
          </label>
          <textarea
            name="deskripsi"
            id="deskripsi"
            value={villa.deskripsi}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="kategori" className="block text-sm font-medium mb-2">
            Kategori (pisahkan dengan koma)
          </label>
          <input
            type="text"
            name="kategori"
            id="kategori"
            onChange={(e) => handleArrayChange(e, "kategori")}
            className="w-full border rounded p-2"
            value={villa.kategori}
            required
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-sm font-medium">Upload Galeri</label>
          <div className="flex space-x-4">
            {images.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                <Image
                  src={URL.createObjectURL(img.file)}
                  alt={`Preview ${index + 1}`}
                  value={villa.foto_villa}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            ))}
            <label
              htmlFor="gallery-upload"
              className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 cursor-pointer rounded-md"
            >
              +
              <input
                id="gallery-upload"
                type="file"
                multiple
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                required
              />
            </label>
          </div>
        </div> */}

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded"
          >
            Unggah
          </button>
        </div>
      </form>
    </div>
  );
};

export default VillaForm;

//!
