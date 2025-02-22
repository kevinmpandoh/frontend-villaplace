import React from "react";
import Image from "next/image";
import RatingStar from "./RatingStar";

interface Ulasan {
  rating: number;
  komentar: string;
  createdAt: string;
  user: {
    nama: string;
    foto_profile: string;
  };
}

const BASE_URL_BACKEND =
  process.env.NEXT_PUBLIC_BASE_URL_BACKEND || "http://localhost:8000";

interface ReviewModalProps {
  ulasan: Ulasan[] | undefined;
  setIsModalReviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewModal = ({ ulasan, setIsModalReviewOpen }: ReviewModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-3/4 md:w-1/2 rounded-lg p-8 flex flex-col max-h-[80vh]">
        <h2 className="text-xl font-semibold mb-4">Ulasan Pengguna</h2>
        {/* Konten review yang bisa digulir */}
        <div className="flex-1 overflow-auto space-y-4">
          {ulasan?.map((ulasan: Ulasan, index: number) => (
            <div key={index} className="flex gap-4 items-start">
              <Image
                src={`${BASE_URL_BACKEND}/images/user-profile/${ulasan.user.foto_profile}`}
                alt="User"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="font-semibold flex gap-2 items-center justify-start">
                  <h3>{ulasan.user.nama}</h3>
                  <span className="text-xs text-gray-400">
                    {new Date(ulasan.createdAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
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

        {/* Tombol Tutup yang tetap di kanan bawah */}
        <div className="mt-4 flex justify-end">
          <button
            className="text-green-500"
            onClick={() => setIsModalReviewOpen(false)}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
