import React, { useRef, useState } from "react";
import { Modal, Upload, Select, Button, Input } from "antd";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import video from "../../assets/Images/dashboard/video.mp4";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import Thumbnail from "../../assets/Images/dashboard/Thumbnail.png";
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
          <div className="relative w-full videoStyle flex justify-center flex-1 items-center ">
            <video
              ref={videoRef}
              src={video}
              className="w-full max-w-[600px] "
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
            <p className="font-popping -font-normal text-lg text-black text-start pl-8 pb-2">
              Thumbnail
            </p>

            <div className="flex justify-start ml-8">
              <img
                src={Thumbnail}
                alt="Thumbnail preview"
                className="max-w-[200px] max-h-[150px] object-contain border rounded-md"
              />
            </div>
          </div>
        </div>
        {/* Catagory input fild*/}
        <div className="space-y-2">
          <div>
            <label className="font-semibold font-roboto text-base text-[#000000]">
              Title
            </label>
            <Input
              placeholder="Training Video Part 1"
              className="p-2 border-none bg-[#F0F0F0]"
            />
          </div>
          <div>
            <Input
              placeholder="Welcome to NOBL"
              className="p-2 border-none bg-[#F0F0F0]"
            />
          </div>
        </div>
        <Button
          type="primary"
          className="w-full bg-[#4B5320] hover:bg-[#3d4318] text-white mt-4"
          size="large"
          onClick={handleUpload}
        >
          Edit
        </Button>
      </div>
    </Modal>
  );
};

export default VideoViewModal;
