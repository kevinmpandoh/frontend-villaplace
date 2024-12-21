"use client";

import Image from "next/image";
import Link from "next/link";
import { VillaProps } from "@/types/Villa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faHouse,
  faLocationDot
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
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={nama}
            layout="fill"
            className="w-full h-full object-cover rounded-top-md"
          />
        </div>
        <div className="px-4 py-3">
          <h3 className="text-xl font-semibold">{nama}</h3>
          <div className="flex items-center mt-2">
            <FontAwesomeIcon 
              icon={faLocationDot} 
              className="text-gray-500" 
            />
            <span className="ml-2 text-gray-600">{lokasi}</span>
          </div>

          <div className="flex flex-col justify-between mt-3">
            <div className="flex items-center">
              <div className="flex items-center">
                <FontAwesomeIcon 
                  className="mr-2" icon={faHouse} 
                />
                <span className="ml-1">{fasilitas[0]}</span>
              </div>
              <div className="flex items-center ml-4">
                <FontAwesomeIcon 
                  className="mr-2" icon={faBath} 
                />
                <span className="ml-1">{fasilitas[1]}</span>
              </div>
            </div>
              <div className="flex items-center mt-2">
                <RatingStar rating={averageRating || 0} />
                  <span className="ml-2">
                    {averageRating ? `${averageRating.toFixed(1)} | ${commentCount} review` : "0.0 | 0 review"}
                  </span>
              </div>
            <hr className="w-full h-[2px] bg-gray-200 mt-3" />
            <p className=" text-green-600 font-semibold items-center flex flex-col mt-3 text-xl">
              Rp. {harga.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      </Link>
    );
  };
  

export default VillaCard;
