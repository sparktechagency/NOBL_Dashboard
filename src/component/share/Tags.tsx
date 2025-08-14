import CategoryModal from "../manageCategory/CategoryModal";
import React from "react";
import { Select } from "antd";
import Swal from "sweetalert2";
import { useDeleteCategoryMutation } from "../../../redux/apiSlices/admin/categorySlices";

const { Option } = Select;

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
    <div className="w-full ">
      {/* Category Dropdown */}
      <div className="mb-6 sm:mb-11">
        <Select
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
          size="large"
          className="w-full sm:w-[300px] text-lg sm:text-xl font-roboto font-medium"
          dropdownStyle={{ fontSize: "16px" }}
        >
          {categoryButtons.map((cat, index) => (
            <Option key={index} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>
      </div>

      {/* Tags List */}
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag: any, index) => (
          <div
            key={index}
            className="mb-2 px-4 sm:px-7 py-2 sm:py-3 bg-white font-medium text-sm sm:text-base rounded-3xl border-none font-popping flex items-center"
          >
            <div className="flex flex-row-reverse items-center gap-4 sm:gap-6">
              <div className="flex gap-1 sm:gap-2">
                {/* Edit Icon */}
                <svg
                  onClick={() => {
                    setSelectedTag(tag);
                    setInputVisible(true);
                  }}
                  className="cursor-pointer"
                  width="28"
                  height="28"
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
                {/* Delete Icon */}
                <svg
                  onClick={() => handleRemove(tag)}
                  className="cursor-pointer"
                  width="28"
                  height="28"
                  viewBox="0 0 34 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="34" height="38" rx="6" fill="#FFE3E3" />
                  <path
                    d="M24.0025 11.001H20.5025L19.5025 10.001H14.5025L13.5025 11.001H10.0025V13.001H24.0025M11.0025 26.001C11.0025 26.5314 11.2132 27.0401 11.5883 27.4152C11.9634 27.7903 12.4721 28.001 13.0025 28.001H21.0025C21.5329 28.001 22.0416 27.7903 22.4167 27.4152C22.7918 27.0401 23.0025 26.5314 23.0025 26.001V14.001H11.0025V26.001Z"
                    fill="#FF0000"
                  />
                </svg>
              </div>
              <span className="truncate max-w-[120px] sm:max-w-none">
                {tag?.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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
