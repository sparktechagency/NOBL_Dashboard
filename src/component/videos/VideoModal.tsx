import React from "react";
import { Modal, Upload, Select, Button } from "antd";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Input from "antd/es/input/Input";

const { Option } = Select;

interface VideoModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpload = () => {
    // TODO: handle file and category submission
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      closable={false}
      onCancel={handleCancel}
      className="rounded-lg"
      width={600}
    >
      <div className="flex justify-between items-center bg-[#4B5320] text-white px-6 py-4 rounded-t-lg">
        <h2 className="text-lg font-semibold">Add a new Photo</h2>
        <CloseCircleOutlined
          onClick={handleCancel}
          className="text-white text-xl cursor-pointer"
        />
      </div>

      <div className="px-6 py-6 bg-white rounded-b-lg space-y-5">
        <div className="flex justify-between">
          <Upload.Dragger
            name="file"
            accept="video/*"
            multiple={false}
            className="border border-dashed rounded-md"
          >
            <div className="flex justify-center items-center ">
              <p className="ant-upload-drag-icon p-1 border rounded-lg w-[162px]">
                <UploadOutlined
                  style={{
                    fontSize: "18px",
                    color: "#697B8C",
                    paddingRight: "10px",
                  }}
                />
                Click to upload
              </p>
            </div>
            <p className="text-gray-600">
              Click or drag a file in this area to upload
            </p>
          </Upload.Dragger>
          <div className="bg-slate-400">
            <h1>hello ther </h1>
          </div>
        </div>
        {/* Catagory input fild*/}
        <div className="space-y-2">
          <div>
            <label className="font-semibold font-roboto text-base text-[#000000]">
              Title
            </label>
            <Input
              placeholder="Enter your video title"
              className="p-2 border-none bg-[#F0F0F0]"
            />
          </div>
          <div>
            <label className="font-semibold font-roboto text-base text-black">
              Category
            </label>
            <Select
              placeholder="Select category"
              className="w-full bg-[#F0F0F0]"
              size="large"
            >
              <Option value="nature">Nature</Option>
              <Option value="technology">Technology</Option>
              <Option value="people">People</Option>
            </Select>
          </div>
        </div>
        <Button
          type="primary"
          className="w-full bg-[#4B5320] hover:bg-[#3d4318] text-white mt-4"
          size="large"
          onClick={handleUpload}
        >
          Upload
        </Button>
      </div>
    </Modal>
  );
};

export default VideoModal;
