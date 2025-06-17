import { Search } from "lucide-react";

interface props {
  onSearch: (query: string) => void;
}
const SearchBar = ({ onSearch }: props) => {
  return (
    <div>
      <form
        className="m-auto  flex items-center w-1/2 md:w-1/3 my-3 justify-between  rounded-md"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          onChange={(e) => onSearch(e.target.value)}
          type="text"
          placeholder="Search tasks..."
          className="bg-transparent  outline-0 border-1 border-white w-full py-2 px-4 rounded-3xl   transition-all duration-200"
        />
        <button className=" -translate-x-8 text-white ">
          <Search className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
