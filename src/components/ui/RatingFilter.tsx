import { useState } from 'react';
import RatingStar from '../DetailVilla/RatingStar';

interface RatingOption {
  value: number | "";
  label: string;
}

interface RatingFilterProps {
  value: number | null;
  onChange: (value: number | null) => void;
}
const RatingFilter = ({ value, onChange }: RatingFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const ratings: RatingOption[] = [
    { value: "", label: "Semua" },
    { value: 0, label: "0 Bintang" },
    { value: 1, label: "1 Bintang" },
    { value: 2, label: "2 Bintang" },
    { value: 3, label: "3 Bintang" },
    { value: 4, label: "4 Bintang" },
    { value: 5, label: "5 Bintang" }
  ];

  const getDisplayValue = () => {
    if (value === null) return "Semua";
    return `${value} Bintang`;
  };

  return (
    <div className="space-y-2 relative">
      <label className="block text-md font-semibold">Rating Minimum</label>
      <button
        type="button"
        aria-expanded={isOpen}
        className="w-full px-3 py-2 border rounded bg-white text-left flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          {value !== null && <RatingStar rating={value} data-testid="selected-rating" />}
          {getDisplayValue()}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg"
        >
          {ratings.map((rating) => (
            <button
              key={rating.value}
              className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                onChange(rating.value === "" ? null : rating.value);
                setIsOpen(false);
              }}
            >
              {rating.value !== "" && <RatingStar rating={rating.value} />}
              {rating.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RatingFilter;