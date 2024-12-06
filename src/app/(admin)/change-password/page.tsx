"use client";
import React from "react";
import ChangePassword from "@/components/Admin/ChangePassword";

const PembayaranAdmin = () => {
  return (
    <div>
      <div className="bg-white p-4 shadow-md rounded-md mb-4 mx-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex space-x-2 text-sm font-medium">
            <li>
              <a
                href="/dashboardAdmin"
                className="text-gray-500 hover:text-gray-700"
              >
                Dashboard
              </a>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <a
                href="/profile-admin"
                className="text-gray-500 hover:text-gray-700"
              >
                Pengaturan Profile
              </a>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <span className="text-gray-500"></span>
              Change Password
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex justify-between border-2 shadow-lg rounded-md items-center mb-3 bg-white p-6 m-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Pengaturan Profile</h1>
          <p>Description</p>
        </div>
      </div>

      <div className="p-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
          <h2 className="text-xl font-bold mb-6">Change Password</h2>
          <div className="border-b-2 border-gray-200 w-full md:w-[600px]"></div>
          <div className="mt-5">
            <div className="bg-white rounded-xl pl-6  border-gray-200">
              <ChangePassword />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PembayaranAdmin;
