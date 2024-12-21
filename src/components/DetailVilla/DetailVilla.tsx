"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import useFetchData from "@/hooks/useFetchData";
import SkeletonDetailVilla from "./SkeletonDetailVilla";
import ImageModal from "./ImageModal";
import axios from "axios";
import RatingStar from "./RatingStar";
import ContactButtons from "./ContactButtons";
import Fasilitas from "./Fasilitas";
import ReviewModal from "./ReviewModal";
import ReviewSummary from "./ReviewSummary";
import UserReview from "./UserReview";
import VillaImage from "./VillaImage";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface DetailVillaProps {
  villaId: string;
  token: { name: string; value: string }[];
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
  const router = useRouter();

  const tokenAdmin = token.filter((cookie) => cookie.name === "tokenAdmin");
  const tokenUser = token.filter((cookie) => cookie.name === "tokenUser");
  const tokenOwner = token.filter((cookie) => cookie.name === "tokenOwner");

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      token = token.filter((cookie) => cookie.name === "tokenUser");

      if (!token.length) return;
      try {
        const response = await axios.get(
          `http://localhost:8000/api/favorite/villa/${villaId}`,
          {
            withCredentials: true,
          }
        );
        // response.data.data && setIsFavorited(true);
        setIsFavorited(response.data.data);
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };

    fetchFavoriteStatus();
  }, [villaId, token]);

  const handleFavoriteClick = async () => {
    if (!detailVilla) return;

    if (!tokenUser.length && !tokenOwner.length && !tokenAdmin.length) {
      Swal.fire({
        title: "Login Diperlukan",
        text: "Silakan login terlebih dahulu untuk menambahkan villa ke favorit.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    if (tokenOwner.length || tokenAdmin.length) {
      Swal.fire({
        title: "Tambahkan ke Favorit",
        text: "Anda tidak dapat menambahkan villa ke favorit sebagai pemilik atau admin.",
        icon: "warning",
        confirmButtonText: "OK",
      });
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
        Swal.fire({
          title: "Berhasil",
          text: "Villa telah dihapus dari favorit.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        await axios.post(
          "http://localhost:8000/api/favorite",
          { villa: detailVilla._id },
          {
            withCredentials: true,
          }
        );
        setIsFavorited(true);
        Swal.fire({
          title: "Berhasil",
          text: "Villa telah ditambahkan ke favorit.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  const handleBookingClick = () => {
    if (!detailVilla) return;

    if (!tokenUser.length && !tokenOwner.length && !tokenAdmin.length) {
      Swal.fire({
        title: "Login Diperlukan",
        text: "Silakan login terlebih dahulu untuk memesan villa.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    console.log(tokenOwner, tokenAdmin, "tokenOwner, tokenAdmin");

    if (tokenOwner.length || tokenAdmin.length) {
      Swal.fire({
        title: "Pesan Villa",
        text: "Anda tidak dapat memesan villa sebagai pemilik atau admin.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    router.push(`/category/${detailVilla._id}/booking`);
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
              <VillaImage
                foto_villa={detailVilla.foto_villa}
                openModal={openModal}
              />
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
                <div className="flex mb-4 items-end gap-1">
                  <div className="text-3xl font-bold text-primary">
                    Rp {detailVilla.harga.toLocaleString("id-ID")}
                  </div>
                  <span className="tracking-wide text-gray-600">/malam</span>
                </div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">Deskripsi</h2>
                  <p className="text-gray-700">{detailVilla.deskripsi}</p>
                </div>

                <div className="mb-10">
                  <Fasilitas fasilitas={detailVilla.fasilitas} />
                </div>

                <div className="flex gap-5">
                  <button
                    onClick={handleBookingClick}
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
                  </button>

                  <button
                    onClick={handleFavoriteClick}
                    className={`h-12 px-2 w-28 bg-gray-100 rounded-lg flex items-center justify-center gap-1 text-primary hover:bg-gray-200`}
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
            <div className="flex flex-col-reverse justify-center items-start md:flex-row mt-10">
              <UserReview
                {...detailVilla}
                setIsModalReviewOpen={setIsModalReviewOpen}
              />
              <ReviewSummary
                averageRating={detailVilla.averageRating}
                commentCount={detailVilla.commentCount}
                starPercentage={detailVilla?.starPercentage}
              />
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
        <ReviewModal
          ulasan={detailVilla?.ulasan}
          setIsModalReviewOpen={setIsModalReviewOpen}
        />
      )}
    </>
  );
};

export default DetailVilla;
