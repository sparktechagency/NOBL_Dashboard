import {
  CloseCircleOutlined,
  DownOutlined,
  UploadOutlined,
} from "@ant-design/icons";
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
      console.log(values);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category_id", values.category_id);

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
              Audios: percent,
              thumbnail: percent,
            }));
          }
        },
      };

      if (data) {
        formData.append("_method", "PUT");
        await updateAudios({ id: data.id, data: formData, ...config }).unwrap();
        Swal.fire({
          title: "Updated!",
          text: "Audios has been updated.",
          icon: "success",
        });
      } else {
        const res = await addNewAudios({ data: formData, ...config }).unwrap();
        console.log(res);
        Swal.fire({
          title: "Added!",
          text: "Audios has been added.",
          icon: "success",
        });
      }

      handleCancel();
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Failed to upload Audios",
        icon: "error",
      });
      console.error(err);
    } finally {
      setThumbnailFile(null);
      setAudiosFile(null);
      setPreviewImage(null);
      setAudiosPreview(null);
      setUploadProgress({ audio: 0, thumbnail: 0 });
      form.resetFields();
      setData(null);
    }
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
      className="rounded-lg"
      width={1026}
      title={
        <div className="flex justify-between items-center bg-[#4B5320] text-white px-6 py-4 rounded-t-lg">
          <div></div>
          <h2 className="text-lg font-semibold">
            {data ? "Edit Audios" : "Add a new Audios"}
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
        className="bg-white rounded-b-lg space-y-5 p-16"
      >
        <div className="flex justify-between gap-8">
          <div className="flex-1">
            <Form.Item
              name="audio"
              rules={[{ required: !data, message: "Please upload a Audios!" }]}
              label={
                <p className="font-roboto font-normal text-sm text-black text-start">
                  Select Audios
                </p>
              }
            >
              <Upload.Dragger
                showUploadList={false}
                beforeUpload={handleBeforeAudiosUpload}
                accept="audio/*"
              >
                {AudiosPreview ? (
                  <div className="flex flex-col justify-center cursor-pointer">
                    <audio
                      controls
                      className="max-w-full max-h-40 object-contain border rounded-md"
                      src={AudiosPreview}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col justify-center cursor-pointer h-40 items-center">
                    <p className="ant-upload-drag-icon p-1 rounded-lg w-[162px]">
                      <UploadOutlined
                        style={{
                          fontSize: "18px",
                          color: "#697B8C",
                          paddingRight: "10px",
                        }}
                      />
                      Click to upload
                    </p>
                    <p className="text-gray-600">
                      Click or drag a Audios file in this area to upload
                    </p>
                  </div>
                )}
              </Upload.Dragger>
            </Form.Item>
          </div>

          <div className="flex-1">
            <Form.Item
              name="thumbnail"
              rules={[
                { required: !data, message: "Please upload a thumbnail!" },
              ]}
              label={
                <p className="font-roboto font-normal text-sm text-black text-start">
                  Select Thumbnail
                </p>
              }
            >
              <Upload.Dragger
                showUploadList={false}
                beforeUpload={handleBeforeImageUpload}
                accept="image/*"
              >
                {previewImage ? (
                  <div className="flex flex-col justify-center cursor-pointer">
                    <img
                      src={previewImage}
                      alt="Thumbnail preview"
                      className="max-w-full max-h-40 object-contain border rounded-md"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col justify-center cursor-pointer h-40 items-center">
                    <p className="ant-upload-drag-icon p-1 rounded-lg w-[162px]">
                      <UploadOutlined
                        style={{
                          fontSize: "18px",
                          color: "#697B8C",
                          paddingRight: "10px",
                        }}
                      />
                      Click to upload
                    </p>
                    <p className="text-gray-600">
                      Click or drag a photo file in this area to upload
                    </p>
                  </div>
                )}
              </Upload.Dragger>
            </Form.Item>
          </div>
        </div>

        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter Audios title!" }]}
        >
          <Input
            placeholder="Enter your Audios title"
            className="p-2 border-none bg-[#F0F0F0]"
          />
        </Form.Item>

        <Form.Item
          name="category_id"
          label="Category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select
            showSearch
            style={{ width: 363, height: 50 }}
            className="border border-gray-300 rounded-md"
            placeholder="Select a category"
            optionFilterProp="children"
            suffixIcon={<DownOutlined style={{ color: "black" }} />}
            defaultValue={categoryData?.id}
            options={
              categoryData?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []
            }
          />
        </Form.Item>

        <Form.Item>
          {addResults.isLoading || updateResults.isLoading ? (
            <Progress
              percent={uploadProgress.audio}
              status="active"
              className="mt-2"
            />
          ) : (
            <Button
              loading={addResults.isLoading || updateResults.isLoading}
              type="primary"
              htmlType="submit"
              className="w-full bg-[#4B5320] hover:bg-[#3d4318] text-white"
              size="large"
            >
              {data ? "Update Audios" : "Upload Audios"}
            </Button>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AudioModal;
