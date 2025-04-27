import React, { useState } from "react";
import { Modal, Upload, Select, Button } from "antd";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import pdfFile from "../../assets/Images/dashboard/Resume.pdf";
const { Option } = Select;

interface DocumentViewModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentViewModal: React.FC<DocumentViewModalProps> = ({
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
      width={1026}
    >
      {/* Header section */}
      <div className="flex justify-between items-center bg-[#4B5320] text-white px-6 py-4 rounded-t-lg">
        <div></div>
        <h2 className="text-lg font-semibold">Document 1</h2>
        <CloseCircleOutlined
          onClick={handleCancel}
          className="text-white text-xl cursor-pointer"
        />
      </div>

      {/* PDF View section */}
      <div className="p-6">
        <iframe
          src={pdfFile}
          title="PDF Viewer"
          className="w-full relative"
          style={{ height: "80vh", border: "none" }}
        />
        <Button className="text-[#043249] font-popping text-lg font-medium absolute top-14 right-14">
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
      </div>
    </Modal>
  );
};

export default DocumentViewModal;
