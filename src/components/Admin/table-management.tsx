"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { User } from "@/types/User";
import { Mitra } from "@/types/Mitra";
import { Admin } from "@/types/Admin";
import useFetchData from "../../hooks/useFetchData";
import { useFetchAdmin } from "../../hooks/useFetchAdmin";
import { useFetchUser } from "../../hooks/useFetchUser";
import { useFetchMitra } from "../../hooks/useFetchMitra";
import Swal from "sweetalert2";

const TableAdmin = () => {
  const [selectedStatus, setSelectedStatus] = useState("user");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState<User[]>([]);
  const [mitraList, setMitraList] = useState<Mitra[]>([]);
  const [adminList, setAdminList] = useState<Admin[]>([]);
  const { data: userData, loading: userLoading } = useFetchData(
    `http://localhost:8000/api/user?searchQuery=${searchTerm}`,
    { withCredentials: true }
  );
  const { data: mitraData, loading: mitraLoading } = useFetchData(
    `http://localhost:8000/api/owner?searchQuery=${searchTerm}`,
    { withCredentials: true }
  );
  const { data: adminData, loading: adminLoading } = useFetchData(
    `http://localhost:8000/api/admin?searchQuery=${searchTerm}`,
    { withCredentials: true }
  );

  const { handleDeleteAdmin } = useFetchAdmin();
  const { handleDeleteUser } = useFetchUser();
  const { handleDeleteMitra } = useFetchMitra();

  React.useEffect(() => {
    if (userData) setUserList(userData.data);
    if (mitraData) setMitraList(mitraData.data);
    if (adminData) setAdminList(adminData.data);
  }, [userData, mitraData, adminData]);

  const handleDelete = (userId: string, type: string, userName: string) => {
    Swal.fire({
      title: `Are you sure you want to delete ${userName}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        if (type === "user") {
          handleDeleteUser(userId).finally(() => {
            setLoading(false);
            setUserList((prevList) =>
              prevList.filter((user) => user._id !== userId)
            ); // Remove user from userList
          });
        } else if (type === "mitra") {
          handleDeleteMitra(userId).finally(() => {
            setLoading(false);
            setMitraList((prevList) =>
              prevList.filter((mitra) => mitra._id !== userId)
            ); // Remove mitra from mitraList
          });
        } else if (type === "admin") {
          handleDeleteAdmin(userId).finally(() => {
            setLoading(false);
            setAdminList((prevList) =>
              prevList.filter((admin) => admin._id !== userId)
            ); // Remove admin from adminList
          });
        }
        Swal.fire("Deleted!", `${userName} has been deleted.`, "success");
      }
    });
  };

  const renderTable = () => {
    let data: User[] | Mitra[] | Admin[] = [];
    let title = "";

    if (selectedStatus === "user") {
      data = userList;
      title = "Pengguna";
    } else if (selectedStatus === "mitra") {
      data = mitraList;
      title = "Mitra";
    } else if (selectedStatus === "admin") {
      data = adminList;
      title = "Admin";
    }

    if (userLoading || mitraLoading || adminLoading) {
      return <div className="text-center">Loading...</div>;
    }

    const filteredData = data.filter((item) =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg  shadow-lg">
          <thead className="bg-brown-500 text-white">
            <tr>
              <th className="p-3 text-center border border-gray-300">No</th>
              <th className="p-3 text-center border border-gray-300">Nama</th>
              <th className="p-3 text-center border border-gray-300">Email</th>
              <th className="p-3 text-center border border-gray-300">
                No Telepon
              </th>
              <th className="p-3 text-center border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((user, idx) => (
                <tr key={idx} className="border border-gray-300">
                  <td className="p-3 border text-center border-gray-300">
                    {indexOfFirstItem + idx + 1}
                  </td>
                  <td className="p-3 border border-gray-300">{user.nama}</td>
                  <td className="p-3 border border-gray-300">{user.email}</td>
                  <td className="p-3 border border-gray-300">
                    {user.no_telepon ? user.no_telepon : "-"}
                  </td>
                  <td className="p-3 border text-center border-gray-300">
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() =>
                        handleDelete(user._id, selectedStatus, user.nama)
                      }
                      disabled={loading} // Disable button when loading
                    >
                      {loading ? (
                        "Deleting..."
                      ) : (
                        <FontAwesomeIcon icon={faTrash} className="w-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-3 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4 items-center">
          <div className="flex space-x-2">
            <button
              className="p-2 bg-gray-200 rounded"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="flex space-x-1">
              {Array.from(
                { length: Math.ceil(filteredData.length / itemsPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`p-2 rounded ${
                      currentPage === i + 1
                        ? "bg-brown-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
            <button
              className="p-2 bg-gray-200 rounded"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage * itemsPerPage >= filteredData.length}
            >
              Next
            </button>
          </div>{" "}
        </div>
      </div>
    );
  };
  return (
    
        <div className="bg-white rounded-xl p-6  border-gray-200">
          
          <div className="mb-5 flex items-center space-x-6">
            <label
              htmlFor="status"
              className="text-lg font-medium text-gray-700"
            >
              Pilih Tabel
            </label>
            <select
              id="status"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-brown-500 focus:outline-none transition duration-200 ease-in-out"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="user">Pengguna</option>
              <option value="mitra">Mitra</option>
              <option value="admin">Admin</option>
            </select>

            <input
              type="text"
              className="p-2 border rounded-lg w-64 focus:ring-2 focus:ring-brown-500 focus:outline-none focus:outline-2 focus:outline-brown-400 transition duration-200 ease-in-out"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {renderTable()}
        </div>
  );
  
};

export default TableAdmin;
