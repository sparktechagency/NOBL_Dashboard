import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { CloseCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

interface DocumentViewModalProps {
  selectedItem: any;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
}

const DocumentViewModal: React.FC<DocumentViewModalProps> = ({
  isModalOpen,
  selectedItem,
  setIsModalOpen,
  setSelectedItem,
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // console.log("Selected Item in DocumentViewModal:", selectedItem);

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      closable={false}
      onCancel={handleCancel}
      className="rounded-lg"
      width={1026}
      style={{ top: "2%" }}
      title={
        <div className="flex justify-between items-center bg-[#4B5320] text-white px-6 py-4 rounded-t-lg">
          <div></div>
          <h2 className="text-lg font-semibold">
            {selectedItem?.title || "Document"}
          </h2>
          <CloseCircleOutlined
            onClick={handleCancel}
            className="text-white text-xl cursor-pointer"
          />
        </div>
      }
    >
      <div className="p-6" style={{ height: "90vh" }}>
        <iframe
          src={selectedItem?.file}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </Modal>
  );
};

export default DocumentViewModal;
