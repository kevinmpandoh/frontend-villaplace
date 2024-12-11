import React from "react";

interface ButtonAddProps {
  onClick?: () => void;
}

const ButtonAdd = ({ onClick }: ButtonAddProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 text-white bg-primary hover:bg-green-800 font-semibold rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-7 mr-10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      Tambah Pesanan
    </button>
  );
};

export default ButtonAdd;
