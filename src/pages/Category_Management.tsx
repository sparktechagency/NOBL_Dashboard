import React, { useState } from "react";

import Tags from "../component/share/Tags";
import { useGetCategoryQuery } from "../../redux/apiSlices/admin/categorySlices";

const CategoryManagement: React.FC = () => {
  const [inputVisible, setInputVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Video Category");

  const { data: categoryData } = useGetCategoryQuery({
    params: {
      type: selectedCategory,
      per_page: 500,
    },
  });

  const triggerTagInput = () => {
    setInputVisible(true);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50 mt-28">
      {/* Category List */}
      <div className="flex-1 px-3 sm:px-4 py-4 ">
        <Tags
          tags={categoryData?.data?.data || []}
          inputVisible={inputVisible}
          setInputVisible={setInputVisible}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Floating Add Icon */}
      <button
        onClick={triggerTagInput}
        className="fixed bottom-6 right-6 w-14 h-14 flex justify-center items-center rounded-full bg-[#4B5320] shadow-lg text-white hover:opacity-90 transition"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.57143 11.4286H0V8.57143H8.57143V0H11.4286V8.57143H20V11.4286H11.4286V20H8.57143V11.4286Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

export default CategoryManagement;
