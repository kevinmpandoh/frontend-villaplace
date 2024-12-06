import React from "react";

interface StatusPaymentProps {
  selectedStatus: string;
  handleSelectStatus: any;
}

const StatusPayment = ({
  selectedStatus,
  handleSelectStatus,
}: StatusPaymentProps) => {
  return (
    <div className="flex mb-4 items-start sm:items-center">
      <div className="mr-4">
        <p className="font-semibold">Status</p>
      </div>
      <div className="w-full items-center flex flex-wrap gap-2">
        <button
          onClick={() => handleSelectStatus("All")}
          className={`${
            selectedStatus === "All"
              ? "bg-[#B7906C]   border-[#B7906C] text-white"
              : "text-[#5e6c84]"
          } py-1 px-2.5 rounded font-semibold border-2`}
        >
          Semua
        </button>
        <button
          onClick={() => handleSelectStatus("pending")}
          className={`${
            selectedStatus === "pending"
              ? "bg-[#B7906C]   border-[#B7906C] text-white"
              : "text-[#5e6c84]"
          } py-1 px-2.5 rounded font-semibold border-2`}
        >
          Pending
        </button>
        <button
          onClick={() => handleSelectStatus("success")}
          className={`${
            selectedStatus === "success"
              ? "bg-[#B7906C]   border-[#B7906C] text-white"
              : "text-[#5e6c84]"
          } py-1 px-2.5 rounded font-semibold border-2`}
        >
          Berhasil
        </button>
        <button
          onClick={() => handleSelectStatus("failed")}
          className={`${
            selectedStatus === "failed"
              ? "bg-[#B7906C]   border-[#B7906C] text-white"
              : "text-[#5e6c84]"
          } py-1 px-2.5 rounded font-semibold border-2`}
        >
          Dibatalkan
        </button>
      </div>
    </div>
  );
};

export default StatusPayment;