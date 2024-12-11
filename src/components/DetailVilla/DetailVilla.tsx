"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import SkeletonDetailVilla from "./SkeletonDetailVilla";
import ImageModal from "./ImageModal";
import axios from "axios";
import RatingStar from "./RatingStar";
import distributePercentages from "@/utils/distributedPercentage";
import ContactButtons from "./ContactButtons";

interface DetailVillaProps {
  villaId: string;
  token: string | null; // Token bisa null jika tidak ada
}

interface Villa {
  _id: string;
  nama: string;
  lokasi: string;
  deskripsi: string;
  foto_villa: { url: string }[];
  pemilik_villa: {
    nama: string;
    email: string;
    no_telepon: string;
    foto_profile: string;
  };
  averageRating: number;
  commentCount: number;
  harga: number;
  fasilitas: string[];
  ulasan: {
    user: {
      nama: string;
      foto_profile: string;
    };
    komentar: string;
  }[];
  starPercentage: number[];
}

const DetailVilla: React.FC<DetailVillaProps> = ({ villaId, token }) => {
  const [detailVilla, setDetailVilla] = useState<Villa | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalReviewOpen, setIsModalReviewOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const rawStarCounts = [
    detailVilla?.starPercentage[4] ?? 1, // 5-star
    detailVilla?.starPercentage[3] ?? 1, // 4-star
    detailVilla?.starPercentage[2] ?? 1, // 3-star
    detailVilla?.starPercentage[1] ?? 1, // 2-star
    detailVilla?.starPercentage[0] ?? 1, // 1-star
  ];

  const adjustedPercentages = distributePercentages(rawStarCounts);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (!token) return;
      try {
        const response = await axios.get(
          `http://localhost:8000/api/favorite/villa/${villaId}`,
          {
            withCredentials: true,
          }
        );
        response.data.data && setIsFavorited(true);
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };

    fetchFavoriteStatus();
  }, [villaId, token]);

  const handleFavoriteClick = async () => {
    if (!detailVilla) return;

    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    try {
      if (isFavorited) {
        await axios.delete(
          `http://localhost:8000/api/favorite/detail/${detailVilla._id}`,
          {
            withCredentials: true,
          }
        );
        setIsFavorited(false);
      } else {
        await axios.post(
          "http://localhost:8000/api/favorite",
          { villa: detailVilla._id },
          {
            withCredentials: true,
          }
        );
        setIsFavorited(true);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data, error, loading } = useFetchData(
    `http://localhost:8000/api/villa/${villaId}`,
    {
      withCredentials: true,
    }
  );

  useEffect(() => {
    if (data) {
      setDetailVilla(data.data);
    }
  }, [data]);

  const nextImage = () => {
    if (detailVilla?.foto_villa) {
      setSelectedImageIndex(
        (prevIndex) => (prevIndex + 1) % detailVilla.foto_villa.length
      );
    }
  };

  const prevImage = () => {
    if (detailVilla?.foto_villa) {
      setSelectedImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + detailVilla.foto_villa.length) %
          detailVilla.foto_villa.length
      );
    }
  };

  return (
    <>
      {loading && (
        // Skeleton Detail Villa
        <SkeletonDetailVilla />
      )}
      {error && <p>Error</p>}
      {detailVilla && (
        <div className="max-w-7xl mx-auto p-4">
          <div className="rounded-lg bg-white px-10 pt-12">
            <div className="grid  grid-cols-1 md:grid-cols-2 gap-10 ">
              <div>
                <div>
                  <Image
                    src={
                      detailVilla?.foto_villa?.[0]?.url ||
                      "/assets/images/default-villa.jpg"
                    }
                    alt="Hero Image"
                    className="w-full h-auto object-contain rounded-lg"
                    onClick={() => {
                      if (detailVilla.foto_villa.length > 0) {
                        openModal(0);
                      }
                    }}
                    onError={(e) =>
                      (e.currentTarget.src = "/assets/images/default-villa.jpg")
                    }
                    loading="lazy"
                    width={600}
                    height={400}
                  />
                </div>
                <div className="flex space-x-4 mt-4 overflow-x-auto scrollbar-hide">
                  {detailVilla.foto_villa
                    .slice(0, 4)
                    .map((foto: any, index: number) => (
                      <Image
                        key={index}
                        src={foto.url || "/assets/images/villa-gitah.png"}
                        alt={`Villa Image ${index}`}
                        onClick={() => openModal(index)}
                        onError={(e) =>
                          (e.currentTarget.src =
                            "/assets/images/default-villa.png")
                        }
                        className={`w-20 h-20 bg-gray-100 rounded-lg object-cover `}
                        loading="lazy"
                        width={100}
                        height={100}
                      />
                    ))}
                  {detailVilla.foto_villa.length > 4 && (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                      +{detailVilla.foto_villa.length - 4} Lainnya
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <div className="flex items-center mb-2">
                    <Image
                      src={`http://localhost:8000/images/user-profile/${detailVilla.pemilik_villa.foto_profile}`}
                      alt={detailVilla.pemilik_villa.foto_profile}
                      className="w-6 h-6 rounded-full object-cover"
                      width={20}
                      height={20}
                    />
                    <span className="ml-2 text-sm font-semibold">
                      {detailVilla.pemilik_villa.nama}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold ">{detailVilla.nama}</h1>
                  <div className="flex space-x-2 mb-2">
                    <span className="text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-700 text-xs font-semibold">
                      {detailVilla.lokasi}
                    </span>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <RatingStar rating={detailVilla.averageRating} />
                  <span className="text-sm text-gray-500 mr-2">
                    ({detailVilla.averageRating.toFixed(1)} / 5)
                  </span>
                  <span>{detailVilla.commentCount} Ulasan</span>
                </div>

                <div className="text-3xl font-bold mb-4 text-primary">
                  Rp {detailVilla.harga.toLocaleString("id-ID")}
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">Deskripsi</h2>
                  <p className="text-gray-700">{detailVilla.deskripsi}</p>
                </div>

                <div className="mb-10">
                  <h2 className="text-lg font-semibold mb-2">Fasilitas</h2>
                  <div className="flex space-x-2 flex-wrap gap-2">
                    {/* Fasilitas */}
                    {detailVilla.fasilitas.map((fasilitas: any, index: any) => (
                      <span
                        key={index}
                        className={`inline-block capitalize py-1 px-3 text-xs md:text-sm font-semibold rounded-full bg-[#B7906C]/10 text-[#B7906C]`}
                      >
                        {fasilitas}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-5">
                  <Link
                    href={`${villaId}/booking`}
                    className="w-full bg-primary hover:bg-green-800 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 mb-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    <span>Pesan Sekarang</span>
                  </Link>
                  {/* Add tu favorite button nya gambar love  */}
                  <button
                    onClick={handleFavoriteClick}
                    className={`h-12 px-2 w-28 bg-gray-100 rounded-lg flex items-center justify-center gap-1 text-primary`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={isFavorited ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    <span className="font-semibold">
                      {isFavorited ? "Hapus" : "Simpan"}
                    </span>
                  </button>
                </div>

                <ContactButtons
                  ownerEmail={detailVilla.pemilik_villa.email}
                  ownerPhone={detailVilla.pemilik_villa.no_telepon}
                />
              </div>
            </div>
            <div className="flex flex-col-reverse justify-center items-start md:flex-row mt-20">
              <div className="w-full ">
                <h3 className="text-xl flex items-center font-semibold">
                  Ulasan Pengguna ({detailVilla.commentCount}){" "}
                  <span className="text-yellow-500 pl-2">
                    <RatingStar rating={detailVilla.averageRating} />
                  </span>
                </h3>
                {detailVilla.ulasan.slice(0, 3).map((data: any, index: any) => (
                  <div className="mt-4 flex gap-4 items-start" key={index}>
                    <Image
                      src={`http://localhost:8000/images/user-profile/${data.user.foto_profile}`}
                      alt="User"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold flex gap-2 items-center justify-center">
                        <h3>{data.user.nama}</h3>
                        <span className="text-xs text-gray-400">
                          {new Date(data.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                          {/* {data.createdAt} */}
                        </span>
                      </div>
                      <div>
                        <RatingStar rating={data.rating} />
                      </div>

                      <p>{data.komentar}</p>
                    </div>
                  </div>
                ))}
                {detailVilla.ulasan.length > 2 && (
                  <button
                    className="text-green-500 mt-6 underline"
                    onClick={() => setIsModalReviewOpen(true)}
                  >
                    Lihat semua ulasan
                  </button>
                )}
              </div>
              <div className="flex md:w-2/3 w-full mb-8 justify-center items-center">
                <div className="border-2 p-6 rounded-lg  w-full ">
                  <h2 className="text-xl font-semibold mb-4 text-center">
                    Rating & Ulasan
                  </h2>
                  <div className="flex justify-center flex-col items-center mb-4">
                    <span className=" text-gray-700 text-lg">
                      {detailVilla.averageRating.toFixed(1)} dari 5
                    </span>
                  </div>
                  <p className="text-center text-gray-500 mb-6">
                    {detailVilla.commentCount} ulasan dari pengguna
                  </p>
                  <div className="space-y-2">
                    {adjustedPercentages.map((percentage, index) => (
                      <div className="flex items-center" key={5 - index}>
                        <span className="w-1/4 text-gray-700">
                          {5 - index} star
                        </span>
                        <div className="w-3/4 bg-gray-200 rounded-full h-2.5 mr-2">
                          <div
                            className="bg-[#B7906C] h-2.5 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="w-1/12 text-gray-700">
                          {percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal */}
      {isModalOpen && detailVilla?.foto_villa && (
        <ImageModal
          isOpen={isModalOpen}
          images={detailVilla.foto_villa}
          selectedImageIndex={selectedImageIndex}
          onClose={closeModal}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}

      {/* Modal Review */}
      {isModalReviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-3/4 md:w-1/2 rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-4">Ulasan Pengguna</h2>
            <div className="space-y-4">
              {detailVilla?.ulasan.map((ulasan: any, index: any) => (
                <div key={index} className="flex gap-4 items-start">
                  <Image
                    src={`http://localhost:8000/images/user-profile/${ulasan.user.foto_profile}`}
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold flex gap-2 items-center justify-center">
                      <h3>{ulasan.user.nama}</h3>
                      <span className="text-xs text-gray-400">
                        {new Date(ulasan.createdAt).toLocaleDateString(
                          "id-ID",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div>
                      <RatingStar rating={ulasan.rating} />
                    </div>

                    <p>{ulasan.komentar}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="text-green-500 mt-6"
              onClick={() => setIsModalReviewOpen(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailVilla;
