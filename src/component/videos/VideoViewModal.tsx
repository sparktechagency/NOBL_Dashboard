import React, { useRef, useState } from "react";
import { Modal, Upload, Select, Button, Input } from "antd";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import video from "../../assets/Images/dashboard/video.mp4";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
const { Option } = Select;

interface VideoViewModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoViewModal: React.FC<VideoViewModalProps> = ({
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

  // video control
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
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
        <h2 className="text-lg font-semibold">Training Video Part 1</h2>
        <CloseCircleOutlined
          onClick={handleCancel}
          className="text-white text-xl cursor-pointer"
        />
      </div>
      <div className=" bg-white rounded-b-lg space-y-5 px-16 py-7">
        <h1 className="text-black text-lg font-roboto font-medium">Video</h1>
        <div className="flex justify-between rounded-lg">
          {/* Video */}
          <div className="relative w-full videoStyle flex justify-center items-center ">
            <video
              ref={videoRef}
              src={video}
              style={{ width: "100%", maxWidth: "600px" }}
            />
            <Button
              shape="circle"
              size="large"
              onClick={togglePlay}
              className="bg-white opacity-65 absolute top-[50%] left-[50%] z-10"
              style={{
                transform: "translate(-50%, -50%)",
              }}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </Button>
          </div>
          {/* Thumbnail */}
          <div className="space-y-4 flex-1 text-center ">
            <p className="font-roboto font-normal text-sm text-black text-start pl-8 pb-2">
              Select Thumbnail
            </p>
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
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default VideoViewModal;
