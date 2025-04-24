import React, { useState } from "react";
import { Plus } from "lucide-react";
import Buttons from "../component/share/Buttons";
import Tags from "../component/share/Tags";

interface Props {}

const CategoryManagement: React.FC<Props> = () => {
  const [tags, setTags] = useState<string[]>([
    "Property",
    "Electric",
    "Study",
    "Vehicle",
    "Property",
    "Electric",
    "Study",
    "Vehicle",
  ]);
  const [inputVisible, setInputVisible] = useState(false);

  // Handle tag close (removal)
  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags); // Update the tags state to remove the tag
  };

  // Handle adding new category (tag)
  const handleAddNewCategory = (newCategory: string) => {
    if (newCategory && !tags.includes(newCategory)) {
      setTags([...tags, newCategory]); // Add the new tag if it's not already in the list
    }
  };

  // Toggle the visibility of the input field in Tags component
  const triggerTagInput = () => {
    setInputVisible(true);
  };

  return (
    <div className="p-4 ">
      {/* Pass the inputVisible state and toggle function to Tags */}
      <div className="w-1/3">
        <Tags
          tags={tags}
          handleAddNewCategory={handleAddNewCategory}
          handleClose={handleClose}
          inputVisible={inputVisible}
          setInputVisible={setInputVisible}
        />
        <button
          onClick={triggerTagInput}
          className="w-[242px]  py-3 flex justify-center items-center gap-3 bg-[#4B5320] mt-12 mb-9 rounded-md text-white font-roboto font-normal text-lg"
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
