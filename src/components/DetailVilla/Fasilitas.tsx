import {
  FaWifi,
  FaTv,
  FaSwimmingPool,
  FaUtensils,
  FaToilet,
  FaHotTub,
  FaParking,
  FaBath,
} from "react-icons/fa";
import { MdOutlineBedroomParent, MdOutlineBathroom } from "react-icons/md";
import { GiBarbecue } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";

interface FasilitasProps {
  fasilitas: string[];
}

const fasilitasIcons: Record<string, JSX.Element> = {
  kamar: <MdOutlineBedroomParent className="text-xl" />,
  "k. mandi": <FaBath className="text-xl" />,
  tv: <FaTv className="text-xl" />,
  kompor: <FaUtensils />,
  "kolam renang": <FaSwimmingPool className="text-xl" />,
  wifi: <FaWifi className="text-xl" />,
  ac: <TbAirConditioning className="text-xl" />,
  "air panas": <FaHotTub className="text-xl" />,
  "kloset duduk": <FaToilet className="text-xl" />,
  bbq: <GiBarbecue className="text-xl" />,
  parkir: <FaParking className="text-xl" />,
};

const Fasilitas = ({ fasilitas }: FasilitasProps) => {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold mb-2">Fasilitas</h2>
      <div className="flex space-x-2 flex-wrap gap-2">
        {/* Fasilitas */}
        {fasilitas.map((fasilitas: string, index: number) => {
          // Normalisasi nama fasilitas ke huruf kecil
          const normalizedFasilitas = fasilitas.toLowerCase();

          // Ekstrak nama fasilitas dan jumlahnya (jika ada)
          const match = normalizedFasilitas.match(/(.+?)\s(\d+)$/); // Contoh: "kamar 2" => ["kamar 2", "kamar", "2"]
          const fasilitasName = match ? match[1] : normalizedFasilitas; // "kamar"
          const fasilitasCount = match ? match[2] : null; // "2"

          return (
            <span
              key={index}
              className={`flex items-center space-x-2  capitalize py-2 px-4 text-xs md:text-sm font-semibold rounded-full bg-[#B7906C]/10 text-[#B7906C]`}
            >
              {/* Ikon Fasilitas */}
              {fasilitasIcons[fasilitasName] || null}
              {/* Nama dan Jumlah Fasilitas */}
              <span>
                {match ? `${fasilitasName} ${fasilitasCount}` : fasilitas}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Fasilitas;
