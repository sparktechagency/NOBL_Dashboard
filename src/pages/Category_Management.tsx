import React, { useState } from "react";
import Tags from "../component/share/Tags";

interface Props {}

const CategoryManagement: React.FC<Props> = () => {
  const [tags, setTags] = useState({
    "Video Category": ["Property", "Electric"],
    "Image Category": ["Study", "Vehicle"],
    "Documents Category": ["Law", "Notes"],
  });

  const [inputVisible, setInputVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Video Category"); // initially select Video Category

  const handleClose = (removedTag: string) => {
    setTags((prev) => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory].filter((tag) => tag !== removedTag),
    }));
  };

  const handleAddNewCategory = (newCategory: string) => {
    if (newCategory && !tags[selectedCategory].includes(newCategory)) {
      setTags((prev) => ({
        ...prev,
        [selectedCategory]: [...prev[selectedCategory], newCategory],
      }));
    }
  };

  const triggerTagInput = () => {
    setInputVisible(true);
  };

  return (
    <div className="p-4">
      <div className="w-1/3">
        <Tags
          tags={tags[selectedCategory] || []}
          handleAddNewCategory={handleAddNewCategory}
          handleClose={handleClose}
          inputVisible={inputVisible}
          setInputVisible={setInputVisible}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <button
          onClick={triggerTagInput}
          className="w-[242px] py-3 flex justify-center items-center gap-3 bg-[#4B5320] mt-12 mb-9 rounded-md text-white font-roboto font-normal text-lg"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.57143 11.4286H0V8.57143H8.57143V0H11.4286V8.57143H20V11.4286H11.4286V20H8.57143V11.4286Z"
              fill="white"
            />
          </svg>
          Add a new category
        </button>
      </div>
    </div>
  );
};

export default CategoryManagement;
