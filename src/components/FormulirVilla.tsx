// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// const VillaForm = () => {
//   const [gallery, setGallery] = useState<string[]>([]);

//   const handleGalleryUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       const updatedGallery = [...gallery];
//       for (let i = 0; i < files.length; i++) {
//         updatedGallery.push(URL.createObjectURL(files[i]));
//       }
//       setGallery(updatedGallery);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-8 bg-white border shadow-xl rounded-md my-16">
//       <h1 className="text-2xl font-bold mb-6 text-center">Formulir Villa</h1>

//       <form>
//         <div className="mb-4">
//           <label htmlFor="villaName" className="block text-sm font-medium mb-2">
//             Nama Villa
//           </label>
//           <input
//             type="text"
//             id="villaName"
//             className="w-full border rounded p-2"
//           />
//         </div>
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label
//               htmlFor="location"
//               className="block text-sm font-medium mb-2"
//             >
//               Lokasi
//             </label>
//             <input
//               type="text"
//               id="location"
//               className="w-full border rounded p-2"
//             />
//           </div>
//           <div>
//             <label htmlFor="price" className="block text-sm font-medium mb-2">
//               Harga
//             </label>
//             <input
//               type="text"
//               id="price"
//               className="w-full border rounded p-2"
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label htmlFor="phone" className="block text-sm font-medium mb-2">
//               Nomor Telepon
//             </label>
//             <input
//               type="text"
//               id="phone"
//               className="w-full border rounded p-2"
//             />
//           </div>

//           {/* Fasilitas */}
//           <div>
//             <label
//               htmlFor="facilities"
//               className="block text-sm font-medium mb-2"
//             >
//               Jumlah Fasilitas
//             </label>
//             <div className="flex space-x-2">
//               <input
//                 type="number"
//                 placeholder="Kamar"
//                 className="w-full border rounded p-2"
//               />
//               <input
//                 type="number"
//                 placeholder="Kamar mandi"
//                 className="w-full border rounded p-2"
//               />
//               <input
//                 type="number"
//                 placeholder="Orang"
//                 className="w-full border rounded p-2"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Deskripsi */}
//         <div className="mb-4">
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium mb-2"
//           >
//             Deskripsi
//           </label>
//           <textarea
//             id="description"
//             className="w-full border rounded p-2"
//           ></textarea>
//         </div>

//         {/* Upload Thumbnail */}
//         {/* <div className="mb-4">
//           <label htmlFor="thumbnail" className="block text-sm font-medium mb-2">
//             Upload Thumbnail
//           </label>
//           <input
//             type="file"
//             id="thumbnail"
//             className="w-full border rounded p-2"
//           />
//         </div> */}

//         <div className="mb-4">
//           <label htmlFor="category" className="block text-sm font-medium mb-2">
//             Kategori
//           </label>
//           <input
//             type="text"
//             id="category"
//             className="w-full border rounded p-2"
//           />
//         </div>

//         {/* Upload Gallery */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Upload Galeri
//           </label>
//           <div className="flex space-x-4">
//             {gallery.map((url, index) => (
//               <div key={index} className="relative w-24 h-24">
//                 <Image
//                   src={url}
//                   alt={`Gallery image ${index + 1}`}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-md"
//                 />
//               </div>
//             ))}
//             <label
//               htmlFor="gallery-upload"
//               className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 cursor-pointer rounded-md"
//             >
//               +
//               <input
//                 id="gallery-upload"
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleGalleryUpload}
//                 className="hidden"
//               />
//             </label>
//           </div>
//         </div>
//       </form>
//       {/* Submit Button */}
//       <div className="mt-6">
//         <Link href="/">
//           {" "}
//           {/* Ganti aja nanti yaaa */}
//           <button
//             type="submit"
//             className="w-full bg-green-500 text-white p-3 rounded"
//           >
//             Unggah
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default VillaForm;

//! default

// "use client";
// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2"; // Import SweetAlert2
// const VillaForm = () => {
//   const [villaData, setVillaData] = useState({
//     namaVilla: "",
//     deskripsi: "",
//     lokasi: "",
//     kategori: [],
//     fasilitas: [],
//     harga: "",
//     foto_villa: null, // to store the selected photo
//   });

//   const [message, setMessage] = useState("");
//   const [villaId, setVillaId] = useState<string | null>(null); // to store the villa's ID after creation

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setVillaData({ ...villaData, [name]: value });
//   };

//   const handleArrayChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: "kategori" | "fasilitas"
//   ) => {
//     const value = e.target.value;
//     setVillaData((prevData) => ({
//       ...prevData,
//       [field]: value.split(",").map((item) => item.trim()),
//     }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setVillaData((prevData) => ({
//         ...prevData,
//         photo: file,
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       // Create the villa
//       const response = await axios.post(
//         "http://localhost:8000/api/villa",
//         {
//           nama: villaData.namaVilla,
//           deskripsi: villaData.deskripsi,
//           lokasi: villaData.lokasi,
//           kategori: villaData.kategori,
//           fasilitas: villaData.fasilitas,
//           harga: parseInt(villaData.harga),
//         },
//         { withCredentials: true }
//       );

//       setVillaId(response.data.id); // Store the villa ID after creation
//       // Success message and redirect
//       Swal.fire({
//         icon: "success",
//         title: "Villa Created!",
//         text: "Your villa has been successfully created.",
//       }).then(() => {
//         window.location.href = "/posting-mitra"; // Redirect to postingVilla page
//       });

//       // After creating the villa, upload the photo if selected
//       if (villaData.foto_villa && villaId) {
//         const formData = new FormData();
//         formData.append("photo", villaData.foto_villa);

//         await axios.post(
//           `http://localhost:8000/api/villa/${villaId}/upload-villa`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//             withCredentials: true,
//           }
//         );
//         setMessage("Villa dan foto berhasil dibuat!");
//       }

//       console.log(response.data);
//     } catch (error: any) {
//       Swal.fire({
//         icon: "error",
//         title: "Error Creating Villa",
//         text: error.response?.data?.message || error.message,
//       });
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Create Villa</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Nama Villa</label>
//           <input
//             type="text"
//             name="namaVilla"
//             value={villaData.namaVilla}
//             onChange={handleChange}
//             className="border rounded w-full p-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Deskripsi</label>
//           <textarea
//             name="deskripsi"
//             value={villaData.deskripsi}
//             onChange={handleChange}
//             className="border rounded w-full p-2"
//             required
//           ></textarea>
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Lokasi</label>
//           <input
//             type="text"
//             name="lokasi"
//             value={villaData.lokasi}
//             onChange={handleChange}
//             className="border rounded w-full p-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">
//             Kategori (pisahkan dengan koma)
//           </label>
//           <input
//             type="text"
//             name="kategori"
//             onChange={(e) => handleArrayChange(e, "kategori")}
//             className="border rounded w-full p-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">
//             Fasilitas (pisahkan dengan koma)
//           </label>
//           <input
//             type="text"
//             name="fasilitas"
//             onChange={(e) => handleArrayChange(e, "fasilitas")}
//             className="border rounded w-full p-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Harga</label>
//           <input
//             type="number"
//             name="harga"
//             value={villaData.harga}
//             onChange={handleChange}
//             className="border rounded w-full p-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Upload Foto Villa</label>
//           <input
//             type="file"
//             name="photo"
//             onChange={handleFileChange}
//             className="border rounded w-full p-2"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded"
//         >
//           Submit
//         </button>
//       </form>
//       {message && <p className="mt-4 text-green-500">{message}</p>}
//     </div>
//   );
// };

// export default VillaForm;

//! edit
// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";

// const EditVillaForm = () => {
//   const router = useRouter();
//   const { villaId } = router.query; // Dapatkan villaId dari URL

//   const [villaData, setVillaData] = useState({
//     namaVilla: "",
//     deskripsi: "",
//     lokasi: "",
//     kategori: [],
//     fasilitas: [],
//     harga: "",
//     foto_villa: null,
//   });

//   const [message, setMessage] = useState("");

//   // Fetch villa data for editing
//   useEffect(() => {
//     const fetchVillaData = async () => {
//       if (villaId) {
//         try {
//           const response = await axios.get(
//             `http://localhost:8000/api/villa/${villaId}`,
//             { withCredentials: true }
//           );
//           const data = response.data;
//           setVillaData({
//             namaVilla: data.nama,
//             deskripsi: data.deskripsi,
//             lokasi: data.lokasi,
//             kategori: data.kategori.join(", "),
//             fasilitas: data.fasilitas.join(", "),
//             harga: data.harga.toString(),
//             foto_villa: null, // Foto tidak di-load di awal
//           });
//         } catch (error) {
//           setMessage("Gagal mengambil data villa.");
//         }
//       }
//     };

//     fetchVillaData();
//   }, [villaId]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setVillaData({ ...villaData, [name]: value });
//   };

//   const handleArrayChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: "kategori" | "fasilitas"
//   ) => {
//     const value = e.target.value;
//     setVillaData((prevData) => ({
//       ...prevData,
//       [field]: value.split(",").map((item) => item.trim()),
//     }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setVillaData((prevData) => ({
//         ...prevData,
//         foto_villa: file,
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       // Update villa data
//       await axios.put(
//         `http://localhost:8000/api/villa/${villaId}`,
//         {
//           nama: villaData.namaVilla,
//           deskripsi: villaData.deskripsi,
//           lokasi: villaData.lokasi,
//           kategori: villaData.kategori,
//           fasilitas: villaData.fasilitas,
//           harga: parseInt(villaData.harga),
//         },
//         { withCredentials: true }
//       );

//       // Upload photo if updated
//       if (villaData.foto_villa) {
//         const formData = new FormData();
//         formData.append("photo", villaData.foto_villa);

//         await axios.post(
//           `http://localhost:8000/api/villa/${villaId}/upload-villa`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//             withCredentials: true,
//           }
//         );
//       }

//       setMessage("Villa berhasil diperbarui!");
//       router.push("/"); // Redirect setelah edit
//     } catch (error: any) {
//       setMessage(
//         "Terjadi kesalahan: " + error.response?.data?.message || error.message
//       );
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Edit Villa</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Nama Villa</label>
//           <input
//             type="text"
//             name="namaVilla"
//             value={villaData.namaVilla}
//             onChange={handleChange}
//             className="border rounded w-full p-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Deskripsi</label>
//           <textarea
//             name="deskripsi"
//             value={villaData.deskripsi}
//             onChange={handleChange}
//             className="border rounded w-full p-2"
//             required
//           ></textarea>
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Lokasi</label>
//           <input
//             type="text"
//             name="lokasi"
//             value={villaData.lokasi}
//             onChange={handleChange}
//             className="border rounded w-full p-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">
//             Kategori (pisahkan dengan koma)
//           </label>
//           <input
//             type="text"
//             name="kategori"
//             value={villaData.kategori}
//             onChange={(e) => handleArrayChange(e, "kategori")}
//             className="border rounded w-full p-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">
//             Fasilitas (pisahkan dengan koma)
//           </label>
//           <input
//             type="text"
//             name="fasilitas"
//             value={villaData.fasilitas}
//             onChange={(e) => handleArrayChange(e, "fasilitas")}
//             className="border rounded w-full p-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Harga</label>
//           <input
//             type="number"
//             name="harga"
//             value={villaData.harga}
//             onChange={handleChange}
//             className="border rounded w-full p-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Upload Foto Villa</label>
//           <input
//             type="file"
//             name="photo"
//             onChange={handleFileChange}
//             className="border rounded w-full p-2"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded"
//         >
//           Submit
//         </button>
//       </form>
//       {message && <p className="mt-4 text-green-500">{message}</p>}
//     </div>
//   );
// };

// export default EditVillaForm;

// "use client";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";

// interface Villa {
//   _id: string;
//   nama: string;
//   fasilitas: string[];
//   harga: number;
//   lokasi: string;
//   kategori: string;
//   status: string;
//   foto_villa?: { url: string }[];
// }

// const EditVilla = () => {
//   const router = useRouter();
//   const { villaId } = router.query; // Ambil ID villa dari parameter URL
//   const [villaData, setVillaData] = useState<Villa | null>(null);

//   useEffect(() => {
//     const fetchVillaData = async () => {
//       if (!villaId) return;

//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/villa/${villaId}`,
//           { withCredentials: true }
//         );
//         setVillaData(response.data.data); // Simpan data villa ke state
//       } catch (error) {
//         console.error("Error fetching villa data:", error);
//       }
//     };

//     fetchVillaData();
//   }, [villaId]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await axios.put(
//         `http://localhost:8000/api/villa/${villaId}`,
//         villaData,
//         { withCredentials: true }
//       );
//       console.log("Data berhasil diperbarui:", response.data);
//       alert("Data villa berhasil diperbarui!");
//       router.push("/postingMitra"); // Kembali ke halaman daftar
//     } catch (error) {
//       console.error("Error updating villa data:", error);
//       alert("Gagal memperbarui data villa.");
//     }
//   };

//   if (!villaData) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-5">Edit Villa</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="nama" className="block text-sm font-medium">
//             Nama Villa
//           </label>
//           <input
//             type="text"
//             id="nama"
//             value={villaData.nama}
//             onChange={(e) =>
//               setVillaData({ ...villaData, nama: e.target.value })
//             }
//             className="block w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="harga" className="block text-sm font-medium">
//             Harga
//           </label>
//           <input
//             type="number"
//             id="harga"
//             value={villaData.harga}
//             onChange={(e) =>
//               setVillaData({ ...villaData, harga: Number(e.target.value) })
//             }
//             className="block w-full p-2 border rounded"
//             required
//           />
//         </div>
//         {/* Tambahkan input untuk field lainnya */}
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//         >
//           Update Villa
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditVilla;

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import axios from "axios";
// import Swal from "sweetalert2";

// const VillaForm = () => {
//   const [gallery, setGallery] = useState<string[]>([]);
//   const [villaData, setVillaData] = useState({
//     namaVilla: "",
//     lokasi: "",
//     harga: "",
//     kategori: [],
//     fasilitas: [],
//     deskripsi: "",
//   });

//   const handleGalleryUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       const updatedGallery = [...gallery];
//       for (let i = 0; i < files.length; i++) {
//         updatedGallery.push(URL.createObjectURL(files[i]));
//       }
//       setGallery(updatedGallery);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setVillaData({ ...villaData, [name]: value });
//   };

//   const handleArrayChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: "kategori" | "fasilitas"
//   ) => {
//     const value = e.target.value;
//     setVillaData((prevData) => ({
//       ...prevData,
//       [field]: value.split(",").map((item) => item.trim()),
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/villa",
//         {
//           nama: villaData.namaVilla,
//           lokasi: villaData.lokasi,
//           harga: parseInt(villaData.harga),
//           // noTelepon: villaData.noTelepon,
//           fasilitas: villaData.fasilitas,
//           deskripsi: villaData.deskripsi,
//           // kategori: villaData.kategori.split(",").map((item) => item.trim()),
//           kategori: villaData.kategori,
//         },
//         { withCredentials: true }
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Villa Created!",
//         text: "Your villa has been successfully created.",
//       }).then(() => {
//         window.location.href = "/posting-mitra"; // Redirect to posting page
//       });
//     } catch (error: any) {
//       Swal.fire({
//         icon: "error",
//         title: "Error Creating Villa",
//         text: error.response?.data?.message || error.message,
//       });
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-8 bg-white border shadow-xl rounded-md my-16">
//       <h1 className="text-2xl font-bold mb-6 text-center">Formulir Villa</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="namaVilla" className="block text-sm font-medium mb-2">
//             Nama Villa
//           </label>
//           <input
//             type="text"
//             name="namaVilla"
//             id="namaVilla"
//             value={villaData.namaVilla}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             required
//           />
//         </div>
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label htmlFor="lokasi" className="block text-sm font-medium mb-2">
//               Lokasi
//             </label>
//             <input
//               type="text"
//               name="lokasi"
//               id="lokasi"
//               value={villaData.lokasi}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="harga" className="block text-sm font-medium mb-2">
//               Harga
//             </label>
//             <input
//               type="number"
//               name="harga"
//               id="harga"
//               value={villaData.harga}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//               required
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium">
//               Fasilitas (pisahkan dengan koma)
//             </label>
//             <input
//               type="text"
//               name="fasilitas"
//               onChange={(e) => handleArrayChange(e, "fasilitas")}
//               className="border rounded w-full p-2"
//               required
//             />
//           </div>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="deskripsi" className="block text-sm font-medium mb-2">
//             Deskripsi
//           </label>
//           <textarea
//             name="deskripsi"
//             id="deskripsi"
//             value={villaData.deskripsi}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             required
//           ></textarea>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="kategori" className="block text-sm font-medium mb-2">
//             Kategori
//           </label>
//           <input
//             type="text"
//             name="kategori"
//             id="kategori"
//             value={villaData.kategori}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Upload Galeri
//           </label>
//           <div className="flex space-x-4">
//             {gallery.map((url, index) => (
//               <div key={index} className="relative w-24 h-24">
//                 <Image
//                   src={url}
//                   alt={`Gallery image ${index + 1}`}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-md"
//                 />
//               </div>
//             ))}
//             <label
//               htmlFor="gallery-upload"
//               className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 cursor-pointer rounded-md"
//             >
//               +
//               <input
//                 id="gallery-upload"
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleGalleryUpload}
//                 className="hidden"
//               />
//             </label>
//           </div>
//         </div>
//         <div className="mt-6">
//           <button
//             type="submit"
//             className="w-full bg-green-500 text-white p-3 rounded"
//           >
//             Unggah
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default VillaForm;
//! bismilah

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";

const VillaForm = () => {
  const [gallery, setGallery] = useState<File[]>([]);
  const [villaData, setVillaData] = useState({
    namaVilla: "",
    lokasi: "",
    harga: "",
    kategori: [],
    fasilitas: [],
    deskripsi: "",
  });

  const handleGalleryUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setGallery(Array.from(files));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setVillaData({ ...villaData, [name]: value });
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "kategori" | "fasilitas"
  ) => {
    const value = e.target.value;
    setVillaData((prevData) => ({
      ...prevData,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const uploadGallery = async (villaId: string) => {
    try {
      const formData = new FormData();
      gallery.forEach((file) => {
        formData.append("images", file);
      });

      await axios.post(
        `http://localhost:8000/api/villa/${villaId}/upload-villa`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Foto Villa Diunggah!",
        text: "Semua foto villa telah berhasil diunggah.",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal Mengunggah Foto",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      gallery.forEach((file) => {
        formData.append("images", file);
      });

      await axios.post(
        `http://localhost:8000/api/villa/${villaId}/upload-villa`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      const response = await axios.post(
        "http://localhost:8000/api/villa",
        {
          nama: villaData.namaVilla,
          lokasi: villaData.lokasi,
          harga: parseInt(villaData.harga),
          fasilitas: villaData.fasilitas,
          deskripsi: villaData.deskripsi,
          kategori: villaData.kategori,
        },
        { withCredentials: true }
      );

      const villaId = response.data?.villaId; // Pastikan API mengembalikan villaId
      if (villaId && gallery.length > 0) {
        await uploadGallery(villaId); // Upload gallery jika ada file
      }

      Swal.fire({
        icon: "success",
        title: "Villa Created!",
        text: "Your villa has been successfully created.",
      }).then(() => {
        window.location.href = "/posting-mitra"; // Redirect to posting page
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error Creating Villa",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white border shadow-xl rounded-md my-16">
      <h1 className="text-2xl font-bold mb-6 text-center">Formulir Villa</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="namaVilla" className="block text-sm font-medium mb-2">
            Nama Villa
          </label>
          <input
            type="text"
            name="namaVilla"
            id="namaVilla"
            value={villaData.namaVilla}
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
              value={villaData.lokasi}
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
              value={villaData.harga}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">
              Fasilitas (pisahkan dengan koma)
            </label>
            <input
              type="text"
              name="fasilitas"
              onChange={(e) => handleArrayChange(e, "fasilitas")}
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
            value={villaData.deskripsi}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="kategori" className="block text-sm font-medium mb-2">
            Kategori
          </label>
          <input
            type="text"
            name="kategori"
            id="kategori"
            value={villaData.kategori}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Galeri
          </label>
          <div className="flex space-x-4">
            {gallery.map((file, index) => (
              <div key={index} className="relative w-24 h-24">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`Gallery image ${index + 1}`}
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
                accept="image/*"
                onChange={handleGalleryUpload}
                className="hidden"
                required
              />
            </label>
          </div>
        </div>
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
