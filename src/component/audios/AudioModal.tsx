import {
  Button,
  Form,
  Input,
  Modal,
  Progress,
  Select,
  Upload,
  message,
} from "antd";
import {
  CloseCircleOutlined,
  DownOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  useAddAudiosMutation,
  useUpdateAudiosMutation,
} from "../../../redux/apiSlices/admin/audiosSlices";

import Swal from "sweetalert2";
import { getDuration } from "../../utils/utils";

interface AudiosModalProps {
  data: any;
  categoryData?: any[];
  isModalOpen: boolean;
  setData: React.Dispatch<React.SetStateAction<any>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AudioModal: React.FC<AudiosModalProps> = ({
  data,
  isModalOpen,
  setData,
  setIsModalOpen,
  categoryData = [],
}) => {
  const [form] = Form.useForm();
  const [addNewAudios, addResults] = useAddAudiosMutation();
  const [updateAudios, updateResults] = useUpdateAudiosMutation();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [AudiosPreview, setAudiosPreview] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [AudiosFile, setAudiosFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState({
    audio: 0,
    thumbnail: 0,
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title,
        category_id: data.category_id,
      });
      setPreviewImage(data.thumbnail_url || null);
      setAudiosPreview(data.Audios_url || null);
    } else {
      form.resetFields();
      setPreviewImage(null);
      setAudiosPreview(null);
      setThumbnailFile(null);
      setAudiosFile(null);
      setUploadProgress({ audio: 0, thumbnail: 0 });
    }
  }, [data, form]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setData(null);
  };

  const handleBeforeImageUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files for thumbnails!");
      return false;
    }
    setThumbnailFile(file);
    setPreviewImage(URL.createObjectURL(file));
    return false;
  };

  const handleBeforeAudiosUpload = (file: File) => {
    console.log(file);
    const isAudios = file.type.startsWith("audio/");
    if (!isAudios) {
      message.error("You can only upload Audios files!");
      return false;
    }
    setAudiosFile(file);
    setAudiosPreview(URL.createObjectURL(file));
    return false;
  };

  const handleSubmit = async (values: any) => {
    try {
      // console.log(values);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category_id", values.category_id);
      formData.append("duration", data?.duration);
      if (AudiosFile) {
        formData.append("audio", AudiosFile);
        // Wait for the audio duration
        const duration = await getDuration(AudiosFile);
        formData.append("duration", duration.toString());
        console.log("Audio duration:", duration);
      }

      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      const config = {
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded * 100) / (total || 1));

          if (progressEvent.target === progressEvent.currentTarget) {
            // This is for the main request progress
            setUploadProgress((prev) => ({
              ...prev,
              audio: percent,
              thumbnail: percent,
            }));
          }
        },
      };

      if (data) {
        formData.append("_method", "PUT");
        const res = await updateAudios({
          id: data.id,
          data: formData,
          ...config,
        }).unwrap();
        if (!res.status) {
          return Swal.fire({
            title: "Warning",
            text: res?.message?.thumbnail,
            icon: "error",
          });
        }
        Swal.fire({
          title: "Updated!",
          text: "Audios has been updated.",
          icon: "success",
        });
      } else {
        const res = await addNewAudios({ data: formData, ...config }).unwrap();
        if (!res.status) {
          return Swal.fire({
            title: "Warning",
            text: res?.message?.thumbnail,
            icon: "error",
          });
        }
        Swal.fire({
          title: "Added!",
          text: "Audios has been added.",
          icon: "success",
        });
      }

      successfullyDone();
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Failed to upload Audios",
        icon: "error",
      });
      console.error(err);
    } finally {
      setUploadProgress({ audio: 0, thumbnail: 0 });
    }
  };

  const successfullyDone = () => {
    setThumbnailFile(null);
    setAudiosFile(null);
    setPreviewImage(null);
    setAudiosPreview(null);
    setUploadProgress({ audio: 0, thumbnail: 0 });
    form.resetFields();
    setData(null);
    handleCancel();
  };

  React.useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title,
        category_id: data.category_id,
      });
      setPreviewImage(data.thumbnail || null);
      setAudiosPreview(data.audio || null);
    } else {
      form.resetFields();
      setPreviewImage(null);
      setAudiosPreview(null);
      setThumbnailFile(null);
      setAudiosFile(null);
      setUploadProgress({ audio: 0, thumbnail: 0 });
    }
  }, [data, form]);

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      closable={false}
      onCancel={handleCancel}
      className="!w-11/12 max-w-5xl rounded-lg !top-4 lg:!top-24"
      title={
        <div className="flex justify-between items-center bg-[#4B5320] text-white px-6 py-4 rounded-t-lg">
          <div></div>
          <h2 className="text-lg font-semibold text-center">
            {data ? "Edit Audio" : "Add a New Audio"}
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
        onFinish={handleSubmit}
        className="bg-white rounded-b-lg space-y-5 p-6 sm:p-8 lg:p-16"
      >
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Audio Upload */}
          <div className="flex-1">
            <Form.Item
              name="audio"
              rules={[{ required: !data, message: "Please upload an audio!" }]}
              label="Select Audio"
            >
              <Upload.Dragger
                showUploadList={false}
                beforeUpload={handleBeforeAudiosUpload}
                accept="audio/*"
              >
                {AudiosPreview ? (
                  <div className="flex justify-center items-center h-48 p-2">
                    <audio
                      controls
                      src={AudiosPreview}
                      className="max-w-full max-h-full object-contain rounded-md"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center h-48 p-4 cursor-pointer">
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined className="text-2xl text-gray-500 mb-2" />
                    </p>
                    <p className="text-gray-700 font-semibold">
                      Click to upload
                    </p>
                    <p className="text-gray-500 text-sm">
                      or drag audio file here
                    </p>
                  </div>
                )}
              </Upload.Dragger>
            </Form.Item>
          </div>

          {/* Thumbnail Upload */}
          <div className="flex-1">
            <Form.Item
              name="thumbnail"
              rules={[
                { required: !data, message: "Please upload a thumbnail!" },
              ]}
              label="Select Thumbnail"
            >
              <Upload.Dragger
                showUploadList={false}
                beforeUpload={handleBeforeImageUpload}
                accept="image/*"
              >
                {previewImage ? (
                  <div className="flex justify-center items-center h-48 p-2">
                    <img
                      src={previewImage}
                      alt="Thumbnail"
                      className="max-w-full max-h-full object-contain rounded-md"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center h-48 p-4 cursor-pointer">
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined className="text-2xl text-gray-500 mb-2" />
                    </p>
                    <p className="text-gray-700 font-semibold">
                      Click to upload
                    </p>
                    <p className="text-gray-500 text-sm">
                      or drag image file here
                    </p>
                  </div>
                )}
              </Upload.Dragger>
            </Form.Item>
          </div>
        </div>

        {/* Title */}
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter audio title!" }]}
        >
          <Input
            placeholder="Enter your audio title"
            size="large"
            className="!bg-[#F0F0F0] !border-none"
          />
        </Form.Item>

        {/* Category */}
        <Form.Item
          name="category_id"
          label="Category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select
            showSearch
            size="large"
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

        {/* Submit */}
        <Form.Item>
          {addResults.isLoading || updateResults.isLoading ? (
            <Progress
              percent={uploadProgress.audio}
              status="active"
              className="mt-2"
            />
          ) : (
            <Button
              style={{ backgroundColor: "#4B5320", color: "white" }}
              loading={addResults.isLoading || updateResults.isLoading}
              type="primary"
              htmlType="submit"
              className="w-full bg-[#4B5320] hover:bg-[#3d4318] text-white"
              size="large"
            >
              {data ? "Update Audio" : "Upload Audio"}
            </Button>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AudioModal;
