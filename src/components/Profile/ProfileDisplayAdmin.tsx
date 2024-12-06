import React from "react";
import Link from "next/link";

interface ProfileDisplayProps {
  adminData: {
    nama: string;
    email: string;
  };
  onEdit: () => void;
}

const ProfileDisplayAdmin: React.FC<ProfileDisplayProps> = ({
  adminData,
  onEdit,
}) => (
  <div className="md:w-[60%] w-full">
    <div className="max-w-2xl mt-10 mx-auto">
      <div>
        {/* Nama Lengkap */}
        <div className="flex mb-8">
          <span className="text-md w-1/2 font-semibold text-black dark:text-white">
            Nama Lengkap
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            : {adminData.nama}
          </span>
        </div>

        {/* Email */}
        <div className="flex mb-8">
          <span className="text-md w-1/2 font-semibold text-black dark:text-white">
            Email
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            : {adminData.email}
          </span>
        </div>

        {/* Edit Profile Button */}
        <div className="flex mr-10 justify-end items-end space-x-4">
          <Link href="/change-password">
            <span className="flex items-center font-semibold text-white bg-brown-500 hover:bg-brown-600 rounded text-sm px-3 py-2 dark:bg-brown-600 dark:hover:bg-brown-500">
              Change Password
            </span>
          </Link>

          <button
            onClick={onEdit}
            className="flex items-center font-semibold text-white bg-[#089562] hover:bg-green-800 rounded text-sm px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileDisplayAdmin;
