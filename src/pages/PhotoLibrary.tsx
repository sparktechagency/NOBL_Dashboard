import React, { useState } from "react";
import CategoryCard from "../component/PhotoLibary/CategoryCard";
import PhotoAddModal from "../component/PhotoLibary/PhotoAddModal";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import { DownOutlined } from "@ant-design/icons";

const PhotoLibrary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const { Option } = Select;
  return (
    <>
      <div className="flex  justify-between items-center">
        <button
          onClick={showModal}
          className="w-[252px]  py-3 flex justify-center items-center gap-3 bg-[#4B5320] my-5 mb-9 rounded-md text-white font-roboto font-normal text-lg"
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
        <div>
          <Select
            showSearch
            style={{ width: 363, height: 50 }}
            className="border border-black rounded-md"
            placeholder="Select a category"
            optionFilterProp="children"
            suffixIcon={<DownOutlined style={{ color: "black" }} />}
          >
            <Option value="payscales">PayScale’s</Option>
            <Option value="binder">Binder</Option>
            <Option value="slicks">Slicks</Option>
            <Option value="career_progress_sheets">
              Career Progress Sheets
            </Option>
            <Option value="agreements_examples">Agreements Examples</Option>
            <Option value="basafasa_information">BASAFASA Information</Option>
            <Option value="blitz_trips">Blitz Trips</Option>
            <Option value="incentives">Incentives</Option>
            <Option value="playbook">Playbook</Option>
          </Select>
        </div>
      </div>
      {/* photo Card */}
      <CategoryCard />
      {/* add new photo modal*/}
      <PhotoAddModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default PhotoLibrary;
