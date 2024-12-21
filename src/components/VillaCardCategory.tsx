"use client";

import Image from "next/image";
import Link from "next/link";
import { VillaProps } from "@/types/Villa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faLocationDot,
  faHouse
} from "@fortawesome/free-solid-svg-icons";
import RatingStar from "./DetailVilla/RatingStar";

const VillaCard = ({
    _id,
    nama,
    lokasi,
    fasilitas,
    harga,
    foto_villa,
    averageRating,
    commentCount
  }: VillaProps) => {
    const imageUrl = foto_villa?.[0]?.url || "/default-image.png";
  
    return (
      <Link href={`/category/${_id}`}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Image Section */}
          <div className="relative h-48 w-full">
            <Image
              src={imageUrl}
              alt={nama}
              layout="fill"
              className="object-cover w-full h-full rounded-top-md"
            />
          </div>
  
          {/* Information Section */}
          <div className="p-4">
            <div>
              <h3 className="text-xl font-semibold">{nama}</h3>
              <p className="text-green-600 text-lg font-bold">
                Rp. {harga.toLocaleString()}
              </p>
            </div>
  
            <div className="flex items-center text-gray-600 mt-2">
              <FontAwesomeIcon
                className="mr-2 text-gray-500" 
                icon={faLocationDot}
              />
              <span className="text-gray-600">{lokasi}</span>
            </div>
  
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between mt-2">
              {/* Bagian kiri - Fasilitas */}
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <FontAwesomeIcon 
                    className="mr-2" 
                    icon={faHouse} 
                  />
                  <span className="text-sm sm:text-base">{fasilitas[0]}</span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="mr-2" 
                    icon={faBath}
                  />
                  <span className="text-sm sm:text-base">{fasilitas[1]}</span>
                </div>
              </div>

              {/* Bagian kanan - Rating */}
              <div className="flex items-center mt-2 sm:mt-0 md:mt-2 lg:mt-0">
                <RatingStar rating={averageRating || 0} />
                <span className="ml-2 text-sm sm:text-base">
                  {averageRating ? `${averageRating.toFixed(1)} | ${commentCount} review` : "0.0 | 0 review"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };
export default VillaCard;
