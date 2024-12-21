import Payment from "../Payment";

export interface TablePaymentProps {
  search: string;
  filteredData: Payment[];
  selectedStatus: string;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  handleCurrentPage: (currentPage: number) => void;
  handleSearch: (keyword: string) => void;
  handleSelectStatus: (selectedStatus: string) => void;
  toggleModal: (id: string) => void;
}

export interface TablePaymentAdminProps {
  search: string;
  filteredData: Payment[];
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
