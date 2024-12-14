import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  handleCurrentPage: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  handleCurrentPage,
}: PaginationProps) => {
  const generatePageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxPagesToShow / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (startPage > 1) pages.push(1, "...");
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (endPage < totalPages) pages.push("...", totalPages);
    }

    return pages;
  };

  const pages = generatePageNumbers();
  const startItem = (currentPage - 1) * 5 + 1;
  const endItem = Math.min(currentPage * 5, totalItems);

  return (
    <>
      <div className="mt-10 flex justify-between items-center">
        {/* Menampilkan jumlah data */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Menampilkan {startItem} - {endItem} dari {totalItems} data
        </p>

        <div className="flex items-center justify-end space-x-2">
          <button
            className={`text-black px-2.5 py-3 rounded hover:bg-gray-100 ${
              currentPage === 1 &&
              "cursor-not-allowed text-gray-400 hover:bg-white"
            }`}
            onClick={() => handleCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg
              className="w-[16px] h-[16px] dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m15 19-7-7 7-7"
              />
            </svg>
          </button>
          {pages.map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2 py-1 text-gray-500 text-2xl">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => handleCurrentPage(Number(page))}
                className={`border-2 px-2.5 py-1 rounded ${
                  page === currentPage
                    ? "border-primary text-primary"
                    : "text-black"
                }`}
              >
                {page}
              </button>
            )
          )}
          <button
            onClick={() => handleCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`text-black px-2.5 py-3 rounded hover:bg-gray-100 ${
              currentPage === totalPages &&
              "cursor-not-allowed text-gray-400 hover:bg-white"
            }`}
          >
            <svg
              className="w-[16px] h-[16px] dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="m9 5 7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
