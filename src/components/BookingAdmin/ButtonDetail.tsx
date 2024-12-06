import React from "react";

interface ButtonDetailProps {
  onClick: () => void;
}

const ButtonDetail: React.FC<ButtonDetailProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center me-2 "
    >
      <svg
        className="w-4 h-4 text-white dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default ButtonDetail;
