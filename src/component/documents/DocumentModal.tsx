import {
  CloseCircleOutlined,
  DownOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Form, Modal, Select, Upload, message } from "antd";
import React, { useState } from "react";
import {
  useAddDocumentsMutation,
  useUpdateDocumentsMutation,
} from "../../../redux/apiSlices/admin/documentsSlices";

import Input from "antd/es/input/Input";
import Swal from "sweetalert2";

interface DocumentModalProps {
  selectedItem: any;
  categoryData: any[];
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
}

const DocumentModal: React.FC<DocumentModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  categoryData = [],
  selectedItem,
  setSelectedItem,
}) => {
  const [form] = Form.useForm();
  const [AddDocument, { isLoading: documentLoading }] =
    useAddDocumentsMutation();
  const [updateDocument, { isLoading: updateDocumentLoading }] =
    useUpdateDocumentsMutation();
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleFileChange = (info: any) => {
    const file = info.file.originFileObj;
    if (file.type !== "application/pdf") {
      message.error("Only PDF files are allowed!");
      return;
    }
    setFile(file);
  };

  const handleThumbnailChange = (info: any) => {
    const file = info.file.originFileObj;
    if (!file.type.startsWith("image/")) {
      Swal.fire({
        title: "Error",
        text: "Only image files are allowed for thumbnail!",
        icon: "error",
      });
      return;
    }
    setThumbnail(file);
  };

  const handleUpload = async (values: any) => {
    if (!file || !thumbnail) {
      Swal.fire({
        title: "Error",
        text: "Please upload both a document file and a thumbnail.",
        icon: "error",
      });
      return;
    }
    const formData = new FormData();
    // Append files and other form data

    console.log(values);

    formData.append("file", values?.file?.file?.originFileObj);
    formData.append("thumbnail", values?.thumbnail?.file?.originFileObj);
    formData.append("title", values.title);
    formData.append("category_id", values.category_id);
    formData.append("document_type", ".pdf");
    try {
      if (selectedItem) {
        // Update existing document
        formData.append("_method", "PUT");
        const res = await updateDocument({
          id: selectedItem.id,
          data: formData,
        }).unwrap();
        // console.log(res);
        if (res.status === false) {
          Swal.fire({
            title: "Error",
            text: "Failed to update document.",
            icon: "error",
          });
          return;
        }
        Swal.fire({
          title: "Success",
          text: "Document updated successfully!",
          icon: "success",
        });
        handleCancel();
      } else {
        const res = await AddDocument(formData).unwrap();
        console.log(res);

        if (res.status === false) {
          Swal.fire({
            title: "Error",
            text: "Failed to upload document.",
            icon: "error",
          });
          return;
        }

        Swal.fire({
          title: "Success",
          text: "Document uploaded successfully!",
          icon: "success",
        });
        handleCancel();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to upload document.",
        icon: "error",
      });

      // console.error("Upload failed:", error);
    } finally {
      handleCancel();
    }
  };

  React.useEffect(() => {
    if (selectedItem) {
      form.setFieldsValue({
        title: selectedItem.title,
        category_id: selectedItem.category_id,
        thumbnail: selectedItem.thumbnail,
        file: selectedItem.file,
      });
      setFile(selectedItem.file ? selectedItem.file : null);
      setThumbnail(selectedItem.thumbnail ? selectedItem.thumbnail : null);
    } else {
      form.resetFields();
    }
  }, [selectedItem, form]);

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      closable={false}
      onCancel={handleCancel}
      className="rounded-lg"
      // style={{ top: "2%" }}
      width={1026}
      title={
        <div className="flex justify-between items-center bg-[#4B5320] text-white px-6 py-4 rounded-t-lg">
          <div></div>
          <h2 className="text-lg font-semibold">
            {selectedItem ? "Update Document" : "Add a New Document"}
          </h2>
          <CloseCircleOutlined
            onClick={handleCancel}
            className="text-white text-xl cursor-pointer"
          />
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        className="px-6 py-6 bg-white rounded-b-lg space-y-5"
        onFinish={handleUpload}
      >
        <Form.Item
          name="title"
          label="Title"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter a title.",
            },
          ]}
        >
          <Input
            style={{ width: "100%", height: 50 }}
            placeholder="Enter document title"
          />
        </Form.Item>

        <Form.Item
          name="category_id"
          label="Category"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please select a category.",
            },
          ]}
        >
          <Select
            style={{ width: "100%", height: 50 }}
            className="border border-gray-300 rounded-md"
            showSearch
            placeholder="Select a category"
            optionFilterProp="children"
            suffixIcon={<DownOutlined />}
            options={
              categoryData?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
          />
        </Form.Item>

        <Form.Item
          name="thumbnail"
          label="Thumbnail"
          rules={[
            {
              required: true,
              message: "Please upload a thumbnail.",
            },
          ]}
        >
          {selectedItem?.thumbnail ? (
            <div className="flex justify-center items-center mb-4">
              <img
                src={selectedItem.thumbnail}
                alt="Thumbnail Preview"
                className="rounded-lg"
                style={{ maxHeight: "200px", objectFit: "contain" }}
              />
            </div>
          ) : null}
          <Upload.Dragger
            name="thumbnail"
            accept="image/*"
            multiple={false}
            maxCount={1} // Limit to one file
            customRequest={({ file }) => setThumbnail(file as File)}
            onChange={handleThumbnailChange}
          >
            <p className="ant-upload-drag-icon !text-gray-300">
              <UploadOutlined />
            </p>
            <p className="text-gray-400">
              Click or drag an image to upload a thumbnail.
            </p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item
          name="file"
          label="Document File"
          rules={[
            {
              required: true,
              message: "Please upload a PDF file.",
            },
          ]}
        >
          {selectedItem?.file ? (
            <div className="mb-4">
              <a
                href={selectedItem.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View PDF Document
              </a>
            </div>
          ) : null}
          <Upload.Dragger
            name="file"
            accept="application/pdf"
            multiple={false}
            maxCount={1} // Limit to one file
            customRequest={({ file }) => setFile(file as File)}
            onChange={handleFileChange}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="text-gray-400">Click or drag a PDF file to upload.</p>
          </Upload.Dragger>
        </Form.Item>

        <Button
          style={{
            backgroundColor: "#4B5320",
            color: "white",
            height: 50,
          }}
          loading={documentLoading || updateDocumentLoading}
          type="primary"
          className="w-full bg-[#4B5320] text-white mt-4"
          size="large"
          htmlType="submit"
        >
          {selectedItem ? "Update" : "Upload"}
        </Button>
      </Form>
    </Modal>
  );
};

export default DocumentModal;
