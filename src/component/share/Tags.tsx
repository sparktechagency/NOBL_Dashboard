import React, { useState, useRef, useEffect } from "react";
import { Button, Tag } from "antd";
import type { InputRef } from "antd";
import CategoryModal from "../manageCategory/CategoryModal";

interface TagsProps {
  tags: string[];
  handleAddNewCategory: (newCategory: string) => void;
  handleClose: (removedTag: string) => void;
  inputVisible: boolean;
  setInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Tags: React.FC<TagsProps> = ({
  tags,
  handleAddNewCategory,
  handleClose,
  inputVisible,
  setInputVisible,
  selectedCategory,
  setSelectedCategory,
}) => {
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputVisible]);

  const categoryButtons = [
    "Video Category",
    "Image Category",
    "Documents Category",
  ];

  return (
    <div>
      {/* Category Buttons */}
      <div className="flex gap-2">
        {categoryButtons.map((cat, index) => (
          <Button
            key={index}
            className={` ${
              selectedCategory === cat
                ? "bg-[#4B5320] text-white"
                : "bg-white text-black"
            }  px-16 py-7 mb-11 border-none text-xl font-medium font-roboto`}
            type="default"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Tags List */}
      {tags.map((tag, index) => (
        <Tag
          key={index}
          closable
          onClose={() => handleClose(tag)}
          className="mb-2 px-7 py-2 bg-[#FFFFFF] font-medium text-base rounded-full font-popping"
        >
          {tag}
        </Tag>
      ))}

      {/* Modal to add a new tag */}
      <CategoryModal
        inputVisible={inputVisible}
        setInputVisible={setInputVisible}
        handleAddNewCategory={handleAddNewCategory}
      />
    </div>
  );
};

export default Tags;
