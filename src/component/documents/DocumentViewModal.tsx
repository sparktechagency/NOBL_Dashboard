import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { Viewer, Worker } from "@react-pdf-viewer/core";

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
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={`http://182.252.68.227:8003/uploads/documents/file/1748098215.pdf`}
            httpHeaders={{
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/pdf",
              Accept: "application/pdf",
            }}
            enableSmoothScroll
            renderError={(error) => {
              return (
                <div className="text-red-500 flex justify-center items-center h-full bg-gray-700">
                  <h1> This PDF is not available. </h1>
                </div>
              );
            }}
          />
        </Worker>
      </div>
    </Modal>
  );
};

export default DocumentViewModal;
