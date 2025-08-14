// To use these icons, you'll need to install the lucide-react library:
// npm install lucide-react
import { Plus, Search } from "lucide-react";

import UserModal from "../component/Users/UserModal";
import UserTable from "../component/Users/UserTable";
import { useState } from "react";

function Users() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="py-10">
      {/* Header section with responsive flex layout */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-5 mb-10">
        {/* Search bar - full width on small screens */}
        <div className="flex w-full md:w-auto">
          <input
            type="search"
            className="w-full md:w-80 lg:w-96 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#4b5320]"
            placeholder="Search for user..."
            value={search}
            onChange={handleSearch}
          />
          <button className="bg-[#4b5320] p-3 rounded-r-md">
            <Search className="text-white" size={24} />
          </button>
        </div>

        {/* Add member button - full width on small screens */}
        <button
          onClick={showModal}
          className="font-semibold flex items-center justify-center gap-3 text-base text-white bg-[#4b5320] py-3 px-6 rounded-md w-full md:w-auto hover:bg-opacity-90 transition-colors"
        >
          <Plus size={20} />
          Add member
        </button>
      </div>

      {/* User modal and table */}
      <UserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <UserTable search={search} />
    </div>
  );
}

export default Users;
