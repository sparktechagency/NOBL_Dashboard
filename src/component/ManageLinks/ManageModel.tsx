import React, { useState } from "react";
import { Modal, Upload, Select, Button } from "antd";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Input from "antd/es/input/Input";

const { Option } = Select;

interface VideoModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ManageModel: React.FC<VideoModalProps> = ({
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

  const fileList = [
    {
      uid: -1,
      name: "xxx.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      thumbUrl:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: -2,
      name: "yyy.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      thumbUrl:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ];

  const props = {
    action: "//jsonplaceholder.typicode.com/posts/",
    listType: "picture",
    defaultFileList: [...fileList],
  };

  const props2 = {
    action: "//jsonplaceholder.typicode.com/posts/",
    listType: "picture",
    defaultFileList: [...fileList],
    className: "upload-list-inline",
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
      <div className="flex justify-between bg-[#4B5320] text-white px-6 py-4 rounded-t-lg">
        <div></div>
        <h2 className="text-lg font-semibold  ">Add new Link</h2>
        <CloseCircleOutlined
          onClick={handleCancel}
          className="text-white text-xl cursor-pointer "
        />
      </div>

      <div className=" bg-white rounded-b-lg space-y-5 p-16">
        <Upload.Dragger
          name="file"
          accept="image/*"
          multiple={false}
          className="rounded-md p-16"
        >
          <div className="flex justify-center items-center m-16">
            <p className="ant-upload-drag-icon p-1 border rounded-lg w-[162px]">
              <UploadOutlined
                style={{
                  fontSize: "18px",
                  color: "#697B8C",
                  paddingRight: "10px",
                }}
              />
              Click to upload
            </p>
          </div>
          <p className="text-gray-600">
            Click or drag a file in this area to upload
          </p>
        </Upload.Dragger>

        {/* Catagory input fild*/}
        <div className="space-y-2">
          <div>
            <label className="font-semibold font-roboto text-base text-[#000000]">
              Link Type
            </label>
            <Select
              placeholder="Select category"
              className="w-full bg-[#F0F0F0] py-7"
              size="large"
            >
              <Option value="nature">
                <div className="flex gap-7 items-center">
                  <svg
                    width="27"
                    height="24"
                    viewBox="0 0 27 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_102_3916)">
                      <path
                        d="M2.04124 20.5454L3.23198 22.5891C3.47941 23.0194 3.83505 23.3575 4.25261 23.6033C5.44855 22.0948 6.28105 20.9372 6.75011 20.1305C7.22612 19.3118 7.81116 18.0313 8.50521 16.2889C6.63462 16.0442 5.21712 15.9219 4.25271 15.9219C3.32705 15.9219 1.90948 16.0442 0 16.2889C0 16.7652 0.123715 17.2416 0.371145 17.6719L2.04124 20.5454Z"
                        fill="#0066DA"
                      />
                      <path
                        d="M22.7478 23.6033C23.1655 23.3575 23.5211 23.0194 23.7685 22.5892L24.2633 21.744L26.6294 17.6719C26.8722 17.2509 27.0001 16.7741 27.0005 16.2889C25.0799 16.0442 23.6649 15.9219 22.7556 15.9219C21.7784 15.9219 20.3634 16.0442 18.5107 16.2889C19.1966 18.0409 19.7739 19.3214 20.2427 20.1305C20.7155 20.9467 21.5506 22.1044 22.7478 23.6033Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M13.4997 7.68325C14.8834 6.0226 15.837 4.74208 16.3605 3.84168C16.7821 3.11665 17.246 1.95902 17.7523 0.368803C17.3347 0.122934 16.8554 0 16.3605 0H10.6388C10.144 0 9.66473 0.138341 9.24707 0.368803C9.89113 2.19259 10.4376 3.49055 10.8865 4.26267C11.3826 5.11598 12.2537 6.25617 13.4997 7.68325Z"
                        fill="#00832D"
                      />
                      <path
                        d="M18.4952 16.2881H8.50543L4.25293 23.6025C4.67037 23.8484 5.14973 23.9713 5.64459 23.9713H21.3561C21.8509 23.9713 22.3304 23.833 22.7478 23.6024L18.4952 16.2881Z"
                        fill="#2684FC"
                      />
                      <path
                        d="M13.5001 7.68348L9.24761 0.369141C8.82995 0.61501 8.47431 0.953001 8.22688 1.38332L0.371145 14.9058C0.128277 15.3268 0.000335549 15.8035 0 16.2888H8.50521L13.5001 7.68348Z"
                        fill="#00AC47"
                      />
                      <path
                        d="M22.7011 8.14462L18.7731 1.38332C18.5258 0.953001 18.1701 0.61501 17.7525 0.369141L13.5 7.68359L18.4948 16.2889H26.9846C26.9846 15.8125 26.8609 15.3362 26.6135 14.9059L22.7011 8.14462Z"
                        fill="#FFBA00"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_102_3916">
                        <rect width="27" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p> Google Drive </p>
                </div>
              </Option>
              <Option value="Google Docs">
                <div className="flex gap-7 items-center">
                  <svg
                    width="18"
                    height="24"
                    viewBox="0 0 18 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.8123 6.727H11.0626V0H1.68821C0.754898 0 0 0.732 0 1.636V22.364C0 23.268 0.754899 24 1.68718 24H16.3128C17.2451 24 18 23.268 18 22.364V6.727H11.8123ZM11.2503 17.182H3.9364V15.818H11.2482V17.182H11.2503ZM14.0626 13.909H3.93744V12.545H14.0626V13.909ZM14.0626 10.636H3.93744V9.273H14.0626V10.636ZM11.8123 6H18L11.8123 0V6Z"
                      fill="#2684FC"
                    />
                  </svg>
                  <p>Google Docs</p>
                </div>
              </Option>
              <Option value="Facebook">
                <div className="flex gap-7 items-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 12C24 5.37262 18.6274 0 12 0C5.37262 0 0 5.37262 0 12C0 17.9895 4.38825 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9705 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.3399 7.875 13.875 8.80003 13.875 9.74906V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6117 22.954 24 17.9896 24 12Z"
                      fill="#1877F2"
                    />
                    <path
                      d="M16.6711 15.4688L17.2031 12H13.875V9.74906C13.875 8.79994 14.3399 7.875 15.8306 7.875H17.3438V4.92188C17.3438 4.92188 15.9705 4.6875 14.6575 4.6875C11.9166 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4688H10.125V23.8542C10.7453 23.9514 11.3722 24.0001 12 24C12.6278 24.0001 13.2547 23.9514 13.875 23.8542V15.4688H16.6711Z"
                      fill="white"
                    />
                  </svg>
                  <p>Facebook</p>
                </div>
              </Option>
              <Option value="Youtube">
                <div className="flex gap-7 items-center">
                  <svg
                    width="35"
                    height="24"
                    viewBox="0 0 35 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M33.5126 3.75826C33.316 3.03185 32.9326 2.3696 32.4005 1.83747C31.8684 1.30533 31.2062 0.921877 30.4798 0.725281C27.8204 0 17.1174 0 17.1174 0C17.1174 0 6.41377 0.0219538 3.75441 0.747235C3.02799 0.943842 2.36575 1.32732 1.83363 1.85948C1.30152 2.39164 0.918102 3.05391 0.721558 3.78035C-0.0828367 8.50552 -0.394876 15.7056 0.743646 20.2417C0.94021 20.9681 1.32364 21.6304 1.85575 22.1625C2.38786 22.6947 3.05009 23.0781 3.77649 23.2747C6.43586 24 17.1392 24 17.1392 24C17.1392 24 27.8424 24 30.5016 23.2747C31.228 23.0781 31.8903 22.6947 32.4224 22.1626C32.9545 21.6304 33.338 20.9682 33.5346 20.2417C34.383 15.5099 34.6444 8.31423 33.5126 3.75826Z"
                      fill="#FF0000"
                    />
                    <path
                      d="M13.7109 17.1431L22.5899 12.0003L13.7109 6.85742V17.1431Z"
                      fill="white"
                    />
                  </svg>
                  <p>Youtube</p>
                </div>
              </Option>
            </Select>
          </div>
          <div>
            <label className="font-semibold font-roboto text-base text-black">
              Link
            </label>
            <Input
              placeholder="Paste link"
              className="py-4 border-none bg-[#F0F0F0]"
            />
          </div>
        </div>
        <Button
          type="primary"
          className="w-full bg-[#4B5320] hover:bg-[#3d4318] text-white mt-4"
          size="large"
          onClick={handleUpload}
        >
          Upload
        </Button>
      </div>
    </Modal>
  );
};

export default ManageModel;
