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
  useAddVideoMutation,
  useUpdateVideoMutation,
} from "../../../redux/apiSlices/admin/videosSlices";

import Swal from "sweetalert2";
import { getDuration } from "../../utils/utils";

interface VideoModalProps {
  data: any;
  categoryData?: any[];
  isModalOpen: boolean;
  setData: React.Dispatch<React.SetStateAction<any>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoModal: React.FC<VideoModalProps> = ({
  data,
  isModalOpen,
  setData,
  setIsModalOpen,
  categoryData = [],
}) => {
  const [form] = Form.useForm();
  const [addNewVideo, addResults] = useAddVideoMutation();
  const [updateVideo, updateResults] = useUpdateVideoMutation();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState({
    video: 0,
    thumbnail: 0,
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title,
        duration: data?.duration,
        category_id: data.category_id,
      });
      setPreviewImage(data.thumbnail_url || null);
      setVideoPreview(data.video_url || null);
    } else {
      form.resetFields();
      setPreviewImage(null);
      setVideoPreview(null);
      setThumbnailFile(null);
      setVideoFile(null);
      setUploadProgress({ video: 0, thumbnail: 0 });
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

  const handleBeforeVideoUpload = (file: File) => {
    const isVideo = file.type.startsWith("video/");
    if (!isVideo) {
      message.error("You can only upload video files!");
      return false;
    }
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    return false;
  };

  // console.log(data)

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category_id", values.category_id);
      formData.append("duration", data?.duration);

      if (videoFile) {
        // console.log("HIt")
        formData.append("video", videoFile);
        // Wait for the audio duration
        const duration = await getDuration(videoFile);
        formData.append("duration", duration.toString());
        // console.log("Audio duration:", duration);
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
              video: percent,
              thumbnail: percent,
            }));
          }
        },
      };

      if (data) {
        formData.append("_method", "PUT");
        const res = await updateVideo({
          id: data.id,
          data: formData,
          ...config,
        }).unwrap();
        // console.log(res);
        if (!res.status) {
          return Swal.fire({
            title: "Warning",
            text: res?.message?.thumbnail,
            icon: "error",
          });
        }
        Swal.fire({
          title: "Updated!",
          text: "Video has been updated.",
          icon: "success",
        });
      } else {
        const res = await addNewVideo({ data: formData, ...config }).unwrap();
        if (!res.status) {
          return Swal.fire({
            title: "Warning",
            text: res?.message?.thumbnail,
            icon: "error",
          });
        }
        Swal.fire({
          title: "Added!",
          text: "Video has been added.",
          icon: "success",
        });
      }

      successfulDone();
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Failed to upload video",
        icon: "error",
      });
      console.error(err);
    } finally {
      setUploadProgress({ video: 0, thumbnail: 0 });
    }
  };

  const successfulDone = () => {
    setThumbnailFile(null);
    setVideoFile(null);
    setPreviewImage(null);
    setVideoPreview(null);
    setUploadProgress({ video: 0, thumbnail: 0 });
    form.resetFields();
    setData(null);
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title,
        category_id: data.category_id,
      });
      setPreviewImage(data.thumbnail || null);
      setVideoPreview(data.video || null);
    } else {
      form.resetFields();
      setPreviewImage(null);
      setVideoPreview(null);
      setThumbnailFile(null);
      setVideoFile(null);
      setUploadProgress({ video: 0, thumbnail: 0 });
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
            {data ? "Edit Video" : "Add a new video"}
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
              name="video"
              rules={[{ required: !data, message: "Please upload a video!" }]}
              label={
                <p className="font-roboto font-normal text-sm text-black text-start">
                  Select Video
                </p>
              }
            >
              <Upload.Dragger
                showUploadList={false}
                beforeUpload={handleBeforeVideoUpload}
                accept="video/*"
              >
                {videoPreview ? (
                  <div className="flex flex-col justify-center cursor-pointer">
                    <video
                      controls
                      className="max-w-full max-h-40 object-contain border rounded-md"
                      src={videoPreview}
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
                      Click or drag a video file in this area to upload
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
          rules={[{ required: true, message: "Please enter video title!" }]}
        >
          <Input
            placeholder="Enter your video title"
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
              percent={uploadProgress.video}
              status="active"
              className="mt-2"
            />
          ) : (
            <Button
              style={{
                backgroundColor: "#4B5320",
                color: "white",
                height: 50,
              }}
              loading={addResults.isLoading || updateResults.isLoading}
              type="primary"
              htmlType="submit"
              className="w-full bg-[#4B5320] hover:bg-[#3d4318] text-white"
              size="large"
            >
              {data ? "Update Video" : "Upload Video"}
            </Button>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VideoModal;
