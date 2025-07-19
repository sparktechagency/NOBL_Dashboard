import { Button } from "antd";
import React from "react";
import Swal from "sweetalert2";
import { useDeleteCategoryMutation } from "../../../redux/apiSlices/admin/categorySlices";
import CategoryModal from "../manageCategory/CategoryModal";

interface TagsProps {
  tags: [];
  inputVisible: boolean;
  setInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Tags: React.FC<TagsProps> = ({
  tags,

  inputVisible,
  setInputVisible,
  selectedCategory,
  setSelectedCategory,
}) => {
  // console.log(tags);

  const [removeTag] = useDeleteCategoryMutation();
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  const handleRemove = (tag: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeTag(tag?.id).then((res) => {
          console.log(res);
          if (res?.data?.status) {
            Swal.fire("Deleted!", res?.data?.message, "success");
          } else {
            Swal.fire("Error!", res?.data?.message, "error");
          }
        });
      }
    });
  };

  const categoryButtons = [
    "Video Category",
    "Image Category",
    "Documents Category",
    "Audio Category",
  ];

  return (
    <div>
      {/* Category Buttons */}
      <div className="flex gap-2">
        {categoryButtons.map((cat, index) => (
          <Button
            shape="default"
            style={{
              backgroundColor: selectedCategory === cat ? "#4B5320" : "white",
              color: selectedCategory === cat ? "white" : "#4B5320",
            }}
            key={index}
            className={`!transition-all !duration-500 ${
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
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag, index) => {
          return (
            <div
              key={index}
              // closable={isClosable}
              className="mb-2 px-7 py-3 bg-[#FFFFFF] font-medium text-base rounded-3xl border-none font-popping"
            >
              <div className="flex flex-row-reverse items-center gap-6">
                <div className="flex gap-2">
                  <svg
                    onClick={() => {
                      setSelectedTag(tag);
                      setInputVisible(true);
                    }}
                    className="cursor-pointer"
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="38.0025"
                      height="38.0025"
                      rx="6"
                      fill="#E5FFEC"
                    />
                    <path
                      d="M27.71 14.0425C28.1 13.6525 28.1 13.0025 27.71 12.6325L25.37 10.2925C25 9.9025 24.35 9.9025 23.96 10.2925L22.12 12.1225L25.87 15.8725M10 24.2525V28.0025H13.75L24.81 16.9325L21.06 13.1825L10 24.2525Z"
                      fill="#23AA49"
                    />
                  </svg>
                  <svg
                    onClick={() => handleRemove(tag)}
                    className="cursor-pointer"
                    width="34"
                    height="38"
                    viewBox="0 0 34 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.00250244"
                      y="0.000976562"
                      width="34"
                      height="38"
                      rx="6"
                      fill="#FFE3E3"
                    />
                    <path
                      d="M24.0025 11.001H20.5025L19.5025 10.001H14.5025L13.5025 11.001H10.0025V13.001H24.0025M11.0025 26.001C11.0025 26.5314 11.2132 27.0401 11.5883 27.4152C11.9634 27.7903 12.4721 28.001 13.0025 28.001H21.0025C21.5329 28.001 22.0416 27.7903 22.4167 27.4152C22.7918 27.0401 23.0025 26.5314 23.0025 26.001V14.001H11.0025V26.001Z"
                      fill="#FF0000"
                    />
                  </svg>
                </div>

                {tag?.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal to add a new tag */}
      <CategoryModal
        data={selectedTag}
        setData={setSelectedTag}
        inputVisible={inputVisible}
        setInputVisible={setInputVisible}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default Tags;
