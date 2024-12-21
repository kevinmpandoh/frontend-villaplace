interface SearchInputProps {
  search: string;
  handleSearch: (keyword: string) => void;
}

const SearchInput = ({ search, handleSearch }: SearchInputProps) => {
  return (
    <div className="max-w-md w-full">
      <div className="w-full max-w-sm">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-700 placeholder-gray-400"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchInput;
