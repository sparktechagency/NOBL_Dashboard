import React, { useState } from "react";
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

  //   th
  const fileList = [
    {
      uid: -1,
      name: "xxx.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      thumbUrl:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: -2,
      name: "yyy.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      thumbUrl:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ];

  const props = {
    action: "//jsonplaceholder.typicode.com/posts/",
    listType: "picture",
    defaultFileList: [...fileList],
  };

  const props2 = {
    action: "//jsonplaceholder.typicode.com/posts/",
    listType: "picture",
    defaultFileList: [...fileList],
    className: "upload-list-inline",
  };
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Called before upload
  const handleBeforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      alert("Please upload an image file.");
      return false;
    }

    // Create a preview URL and save to state
    setPreviewImage(URL.createObjectURL(file));
    return false; // prevents auto upload
  };


  return (
    <Modal
      open={isModalOpen}
      footer={null}
      closable={false}
      onCancel={handleCancel}
      className="rounded-lg "
      width={1026}
    >
      <div className="flex justify-between items-center bg-[#4B5320] text-white px-6 py-4 rounded-t-lg">
        <h2 className="text-lg font-semibold">Add a new Photo</h2>
        <CloseCircleOutlined
          onClick={handleCancel}
          className="text-white text-xl cursor-pointer"
        />
      </div>

      <div className=" bg-white rounded-b-lg space-y-5 p-16">
        <div className="flex justify-between">
          <Upload.Dragger
            name="file"
            accept="video/*"
            multiple={false}
            className="border border-dashed rounded-md p-16"
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
          {/* Thumbnail */}
          <div className="space-y-4 flex-1 text-center ">
            <p className="font-roboto font-normal text-sm text-black text-start pl-8 pb-2">Select Thumbnail</p>
            <Upload
              showUploadList={false}
              beforeUpload={handleBeforeUpload}
              accept="image/*"
            >
              <div className="flex justify-center  cursor-pointer bg-[#F2F4F5] w-[396px]">
                <p className="ant-upload-drag-icon  p-1 border rounded-lg w-[162px] text-black">
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
            </Upload>

            {/* Image Preview Section */}
            {previewImage && (
              <div className="flex justify-start ml-8">
                <img
                  src={previewImage}
                  alt="Thumbnail preview"
                  className="max-w-[200px] max-h-[150px] object-contain border rounded-md"
                />
              </div>
            )}
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
