import { Button, Form, Image, Modal, Select, Upload } from "antd";
import {
  CloseCircleOutlined,
  DownOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import {
  useAddPhotosMutation,
  useUpdatePhotosMutation,
} from "../../../redux/apiSlices/admin/photosSlices";

import Swal from "sweetalert2";

interface PhotoAddModalProps {
  data: any;
  isModalOpen: boolean;
  categoryData?: any[];
  setData: React.Dispatch<React.SetStateAction<any>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PhotoAddModal: React.FC<PhotoAddModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  data,
  setData,
  categoryData = [],
}) => {
  const [addPhoto, { isLoading: addLoading }] = useAddPhotosMutation();
  const [updatePhoto, { isLoading: updateLoading }] = useUpdatePhotosMutation();
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    data?.photo_url || null
  );

  const handleCancel = () => {
    setIsModalOpen(false);
    setData(null);
    form.resetFields();
    setFile(null);
    setPreviewImage(null);
  };

  const handleUpload = async () => {
    try {
      const values = await form.validateFields();
      if (!file) {
        Swal.fire(
          "Warning",
          "Please upload a photo before submitting",
          "error"
        );
        return;
      }

      const { categoryId } = values;

      const formData = new FormData();
      if (file) {
        formData.append("photo", file);
      }
      formData.append("category_id", categoryId || "");
      formData.append("_method", data ? "PUT" : "POST");

      if (data) {
        // Update photo
        const res = await updatePhoto({
          id: data.id,
          data: formData,
        }).unwrap();
        console.log(res);
        if (res?.status) {
          Swal.fire("Updated!", "Photo has been updated.", "success");
          setFile(null);
          handleCancel();
        } else {
          return Swal.fire({
            title: "Warning",
            text: res.message?.photo || "Failed to add photo",
            icon: "error",
          });
        }
      } else {
        // Add new photo
        const res = await addPhoto(formData).unwrap();
        console.log(res);
        if (res.status) {
          setFile(null);
          handleCancel();
          Swal.fire("Added!", "Photo has been added.", "success");
        } else {
          return Swal.fire({
            title: "Warning",
            text: res.message?.photo || "Failed to add photo",
            icon: "error",
          });
        }
      }
    } catch (error) {
      return Swal.fire("warning", "Failed to upload photo", "error");
    }
  };

  const handleBeforeUpload = (file: File) => {
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    setFile(file);
    return false; // Prevent automatic upload
  };

  React.useEffect(() => {
    if (data) {
      form.setFieldsValue({
        categoryId: data.category_id,
      });
      setPreviewImage(data.photo);
    } else {
      form.resetFields();
      setPreviewImage(null);
    }
  }, [data, form]);

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      closable={false}
      onCancel={handleCancel}
      title={
        <div className="flex justify-between items-center bg-[#4B5320] text-white px-6 py-4 !rounded-t-lg">
          <h2 className="text-lg font-semibold">
            {data ? "Update Photo" : "Add a new Photo"}
          </h2>
          <CloseCircleOutlined
            onClick={handleCancel}
            className="text-white text-xl cursor-pointer"
          />
        </div>
      }
      width={600}
    >
      <div className="px-6 py-6 bg-white rounded-b-lg space-y-5">
        <Form
          form={form}
          layout="vertical"
          initialValues={{ categoryId: categoryData[0]?.id || null }}
        >
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select
              showSearch
              style={{ width: 363, height: 50 }}
              className="border  !w-full border-gray-300 rounded-md"
              placeholder="Select a category"
              optionFilterProp="children"
              suffixIcon={<DownOutlined style={{ color: "black" }} />}
              options={
                categoryData?.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
            />
          </Form.Item>

          <Form.Item label="Photo" required>
            {previewImage && (
              <div className="mb-4 w-full flex justify-center">
                <Image
                  src={previewImage}
                  alt="Preview"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            )}
            <Upload.Dragger
              name="file"
              beforeUpload={handleBeforeUpload}
              className=" rounded-md"
              showUploadList={false}
            >
              <UploadOutlined
                style={{
                  fontSize: "18px",

                  color: "#697B8C",
                  paddingRight: "10px",
                }}
              />
              Click to upload
              <p className="text-gray-600">
                Click or drag a file in this area to upload
              </p>
            </Upload.Dragger>
          </Form.Item>

          <Button
            style={{
              backgroundColor: "#4B5320",
              color: "white",
              height: 50,
            }}
            loading={addLoading || updateLoading}
            type="primary"
            className="w-full bg-[#4B5320] hover:bg-[#3d4318] text-white mt-4"
            size="large"
            onClick={handleUpload}
          >
            {data ? "Update" : "Upload"}
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

export default PhotoAddModal;
