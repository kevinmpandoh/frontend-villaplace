import React from "react";

const ChangePassword = () => {
  return (
    <form action="">
      <div className="max-w-2xl mt-20 mx-auto">
        <div className="flex justify-between mb-10">
          <label
            htmlFor="current-password"
            className="text-lg font-semibold text-black dark:text-white"
          >
            Password Lama
          </label>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="current-password"
          />
        </div>
        <div className="flex justify-between mb-10">
          <label
            htmlFor="new-password"
            className="text-lg font-semibold text-black dark:text-white"
          >
            Password Baru
          </label>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="new-password"
          />
        </div>
        <div className="flex justify-between mb-10">
          <label
            htmlFor="confirm-password"
            className="text-lg font-semibold text-black dark:text-white"
          >
            Konfirmasi Password
          </label>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="confirm-password"
          />
        </div>
        <div className="flex justify-end items-end">
          <button
            type="button"
            className=" flex justify-end focus:outline-none text-white bg-[#089562] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Edit Password
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
