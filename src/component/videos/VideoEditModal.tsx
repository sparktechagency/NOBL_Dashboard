import React, { useRef, useState } from "react";
import { Modal, Upload, Select, Button } from "antd";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Input from "antd/es/input/Input";
import { FaPause, FaPlay } from "react-icons/fa";
import video from "../../assets/Images/dashboard/video.mp4";

const { Option } = Select;

interface VideoEditModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoEditModal: React.FC<VideoEditModalProps> = ({
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
    return false;
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

  const categories = [
    "All",
    "Welcome to NOBL",
    "Introduction",
    "Key to success in this industry",
    "Door approach / Pitch",
    "Transitioning",
    "Building Value",
    "Qualify Questions",
    "Buying Atmosphere",
    "Amply Value",
    "Drop Price / Compare Price",
    "Closing Lines",
    "Area Management",
    "How to use your IPad Resources",
    "PayScale’s",
    "Binder",
    "Slicks",
    "Career Progress Sheets",
    "Agreements Examples",
    "BASAFASA Information",
    "Blitz Trips",
    "Incentives",
    "Playbook",
  ];

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
        <div></div>
        <h2 className="text-lg font-semibold">Add a new video</h2>
        <CloseCircleOutlined
          onClick={handleCancel}
          className="text-white text-xl cursor-pointer"
        />
      </div>

      <div className=" bg-white rounded-b-lg space-y-5 p-16">
        <div className="flex justify-between">
          {/* Video */}
          <div className="relative w-full videoStyle flex justify-center flex-1 items-center ">
            <video
              ref={videoRef}
              src={video}
              className="w-full max-w-[600px] "
              style={{ width: "100%", maxWidth: "600px" }}
            />
            <Button className="text-[#043249] font-popping text-lg font-medium absolute top-2 right-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.71 4.04104C18.1 3.65104 18.1 3.00104 17.71 2.63104L15.37 0.291035C15 -0.0989648 14.35 -0.0989648 13.96 0.291035L12.12 2.12104L15.87 5.87104M0 14.251V18.001H3.75L14.81 6.93104L11.06 3.18104L0 14.251Z"
                  fill="#043249"
                />
              </svg>
              Edit
            </Button>
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
              {categories?.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
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

export default VideoEditModal;
