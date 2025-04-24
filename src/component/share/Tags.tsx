import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Tag } from "antd";
import type { InputRef } from "antd";
import CategoryModal from "../manageCategory/CategoryModal";

interface TagsProps {
  tags: string[];
  handleAddNewCategory: (newCategory: string) => void;
  handleClose: (removedTag: string) => void;
  inputVisible: boolean; // Passed from parent to control input visibility
  setInputVisible: React.Dispatch<React.SetStateAction<boolean>>; // To close the input from child
}

const Tags: React.FC<TagsProps> = ({
  tags,
  handleAddNewCategory,
  handleClose,
  inputVisible,
  setInputVisible,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [activedClass, setActivedClass] = useState();
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible && inputRef.current) {
      inputRef.current.focus(); // Focus on the input when it's visible
    }
  }, [inputVisible]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const catagoryButton = [
    {
      id: 1,
      name: "Video Category",
    },
    {
      id: 2,
      name: "Image Category",
    },
    {
      id: 3,
      name: "Documents Category",
    },
  ];

  return (
    <div>
      {/* Category button stard */}
      <div className="flex  gap-2">
        {catagoryButton.map((item) => (
          <Button
            className={` ${activedClass == item.id ? "bg-[#4B5320] text-white": "bg-white text-black"}  px-16  py-7 mb-11 border-none text-xl font-medium font-roboto`}
            type="default"
            htmlType="submit"
            onClick={()=> setActivedClass(item.id)}
          >
           {item.name}
          </Button>
        ))}
      </div>
      {/* Category button  end*/}
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
      <CategoryModal
        inputVisible={inputVisible}
        setInputVisible={setInputVisible}
        handleAddNewCategory={handleAddNewCategory}
      />
    </div>
  );
};

export default Tags;
