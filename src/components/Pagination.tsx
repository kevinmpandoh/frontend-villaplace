import React from "react";

interface PaginationProps {
  pagination: {
    currentPage: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
  handleCurrentPage: any;
}

const Pagination = ({ pagination, handleCurrentPage }: PaginationProps) => {
  const startItem = (pagination.currentPage - 1) * pagination.limit + 1;
  const endItem = Math.min(
    pagination.currentPage * pagination.limit,
    pagination.totalItems
  );
  return (
    <>
      <div className="mt-10 flex justify-between items-center">
        {/* Menampilkan jumlah data */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Menampilkan {startItem} - {endItem} dari {pagination.totalItems} data
        </p>

        <div className="flex items-center justify-end space-x-2 ">
          <button
            className={`text-black px-2.5 py-3 rounded hover:bg-gray-100 ${
              pagination?.currentPage === 1 &&
              "cursor-not-allowed text-gray-400 hover:bg-white"
            } `}
            onClick={() =>
              handleCurrentPage((prev: any) => Math.max(prev - 1, 1))
            }
            disabled={pagination?.currentPage === 1}
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
          {[...Array(pagination?.totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handleCurrentPage(i + 1)}
              className={`border-2 px-2.5 py-1 rounded ${
                i + 1 === pagination?.currentPage
                  ? "border-primary text-primary"
                  : "text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handleCurrentPage((prev: any) => Math.min(prev + 1))}
            disabled={pagination?.currentPage === pagination?.totalPages}
            className={`text-black px-2.5 py-3 rounded hover:bg-gray-100 ${
              pagination?.currentPage === pagination?.totalPages &&
              "cursor-not-allowed text-gray-400 hover:bg-white"
            }`}
          >
            <svg
              className="w-[16px] h-[16px]  dark:text-white"
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
