import Booking from "../Booking";

export interface TableBookingAdminProps {
  search: string;
  filteredData: Booking[];
  selectedStatus: string;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  handleCurrentPage: (currentPage: number) => void;
  handleSearch: (keyword: string) => void;
  handleSelectStatus: (selectedStatus: string) => void;
  handleDelete: (id: string) => void;
  toggleModal: (id: string) => void;
  toggleModalEdit: (id: string) => void;
}

export interface TableBookingOwnerProps {
  search: string;
  filteredData: Booking[];
  selectedStatus: string;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  handleCurrentPage: (currentPage: number) => void;
  handleSearch: (keyword: string) => void;
  handleSelectStatus: (selectedStatus: string) => void;
  toggleModal: (id: string) => void;
}
