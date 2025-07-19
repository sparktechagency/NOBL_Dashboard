import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  useAddLinksMutation,
  useUpdateLinksMutation,
} from "../../../redux/apiSlices/admin/linksSlices";

import DocSvg from "./DocSvg";
import FacebookSvg from "./FacebookSvg";
import GoogleSvg from "./GoogleSvg";
import OthersSvg from "./OthersSvg";
import Swal from "sweetalert2";
import YoutubeSvg from "./YoutubeSvg";

const SelectionData = [
  {
    value: "Google Drive",
    label: (
      <div className="flex gap-7 items-center">
        <GoogleSvg />
        <p>Google Drive</p>
      </div>
    ),
  },
  // Add other options here if needed
  {
    value: "Google Docs",
    label: (
      <div className="flex gap-7 items-center">
        <DocSvg />
        <p>Google Docs</p>
      </div>
    ),
  },
  {
    value: "Facebook",
    label: (
      <div className="flex gap-7 items-center">
        <FacebookSvg />
        <p>Facebook</p>
      </div>
    ),
  },
  {
    value: "Youtube",
    label: (
      <div className="flex gap-7 items-center">
        <YoutubeSvg />
        <p>Youtube</p>
      </div>
    ),
  },
  {
    value: "Others",
    label: (
      <div className="flex gap-7 items-center">
        <OthersSvg />
        <p>Others</p>
      </div>
    ),
  },
];

interface VideoModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: any;
  setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
}

const ManageModel: React.FC<VideoModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  selectedItem,
  setSelectedItem,
}) => {
  const [form] = Form.useForm();
  const [addLink, { isLoading: addLoading }] = useAddLinksMutation();
  const [updateLinks, { isLoading: updateLoading }] = useUpdateLinksMutation();
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    if (selectedItem) {
      form.setFieldsValue({
        linkType: selectedItem.link_type,
        link: selectedItem.link,
        thumbnail: selectedItem.thumbnail ? [selectedItem.thumbnail] : [],
      });
      setThumbnail(selectedItem.thumbnail || null); // Set thumbnail if available
    } else {
      form.resetFields();
      setThumbnail(null);
    }
  }, [selectedItem, form]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    form.resetFields();
    setThumbnail(null);
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

  const handleSubmit = async (values: any) => {
    // console.log(values);

    try {
      const fromData = new FormData();
      if (thumbnail) {
        fromData.append("thumbnail", thumbnail); // Append thumbnail file if available
      }
      fromData.append("link_type", values.linkType);
      fromData.append("link", values.link);
      if (selectedItem) {
        fromData.append("_method", "PUT"); // Indicate update method for backend
        // If you need to send the thumbnail as a file, you can append it here
        const res = await updateLinks({
          id: selectedItem.id,
          data: fromData,
        }).unwrap();
        // console.log(res);
        if (res.status) {
          Swal.fire({
            title: "Success",
            text: "Link added successfully",
            icon: "success",
          });
          form.resetFields();
          setThumbnail(null);
        } else {
          return Swal.fire({
            title: "Warning",
            text:
              res.message?.link ||
              res.message?.thumbnail ||
              "Failed to update link",
            icon: "error",
          });
        }
      } else {
        const res = await addLink(fromData).unwrap();
        if (res.status) {
          Swal.fire({
            title: "Success",
            text: "Link added successfully",
            icon: "success",
          });
          form.resetFields();
          setThumbnail(null);
        } else {
          return Swal.fire({
            title: "Warning",
            text:
              res.message?.link ||
              res.message?.thumbnail ||
              "Failed to add link",
            icon: "error",
          });
        }
      }
      handleCancel();
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to submit link",
        icon: "error",
      });
    }
  };

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      closable={false}
      onCancel={handleCancel}
      className="rounded-lg"
      width={1026}
      title={
        <div className="flex justify-between bg-[#4B5320] text-white px-6 py-4 rounded-t-lg">
          <div></div>
          <h2 className="text-lg font-semibold">
            {selectedItem ? "Update Link" : "Add New Link"}
          </h2>
          <CloseCircleOutlined
            onClick={handleCancel}
            className="text-white text-xl cursor-pointer"
          />
        </div>
      }
    >
      <div className="bg-white rounded-b-lg space-y-5 p-16">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ linkType: "Google Drive", link: "" }}
        >
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
            name="linkType"
            label="Link Type"
            rules={[{ required: true, message: "Please select a link type!" }]}
          >
            <Select
              placeholder="Select category"
              className="w-full bg-[#F0F0F0]"
              size="large"
              defaultValue={selectedItem?.link_type || "Google Drive"}
              options={SelectionData}
            />
          </Form.Item>

          <Form.Item
            name="link"
            label="Link"
            rules={[
              {
                type: "url",
                required: true,
                message: "Please provide a link!",
              },
            ]}
          >
            <Input
              placeholder="Paste link"
              className="py-4 border-none bg-[#F0F0F0]"
            />
          </Form.Item>

          <Button
            style={{
              backgroundColor: "#4B5320",
              color: "white",
              height: 50,
            }}
            loading={addLoading || updateLoading}
            type="primary"
            htmlType="submit"
            className="w-full bg-[#4B5320] hover:bg-[#3d4318] text-white mt-4"
            size="large"
          >
            {selectedItem ? "Update" : "Upload"}
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

export default ManageModel;
