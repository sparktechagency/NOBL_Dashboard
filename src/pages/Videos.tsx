import { Image, Popconfirm, Select, Space, Table, message } from "antd";

import { DownOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import { useState } from "react";
import img2 from "../assets/Images/videos/Rectangle 8 (1).png";
import img3 from "../assets/Images/videos/Rectangle 8 (2).png";
import img4 from "../assets/Images/videos/Rectangle 8 (3).png";
import img5 from "../assets/Images/videos/Rectangle 8 (4).png";
import img6 from "../assets/Images/videos/Rectangle 8 (5).png";
import img7 from "../assets/Images/videos/Rectangle 8 (6).png";
import img1 from "../assets/Images/videos/Rectangle 8.png";
import VideoModal from "../component/videos/VideoModal";

const Videos = () => {
  // show view modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpenModal, setIsEditOpenModal] = useState(false); //edit modal open stat

  const showModal = () => {
    setIsModalOpen(true);
  };
  // edit modal

  const showEditModal = () => {
    setIsEditOpenModal(true);
  };

  // delete modal
  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  // delete modal end

  const columns = [
    {
      title: "Sl. no.",
      dataIndex: "serial",
      key: "serial",
      align: "center",
    },
    {
      title: "Video",
      dataIndex: "video",
      key: "video",
      render: (video: any) => (
        <Space>
          <Image width={40} src={video.thumbnail} alt="thumbnail" />
          <span>{video.title}</span>
        </Space>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          {/* view icon */}
          <div onClick={showModal}>
            <svg
              width="37"
              height="37"
              viewBox="0 0 37 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="37" height="37" rx="5" fill="#FFF3EB" />
              <path
                d="M18 15.8C17.132 15.8 16.2996 16.1371 15.6858 16.7373C15.0721 17.3374 14.7273 18.1513 14.7273 19C14.7273 19.8487 15.0721 20.6626 15.6858 21.2627C16.2996 21.8629 17.132 22.2 18 22.2C18.868 22.2 19.7004 21.8629 20.3142 21.2627C20.9279 20.6626 21.2727 19.8487 21.2727 19C21.2727 18.1513 20.9279 17.3374 20.3142 16.7373C19.7004 16.1371 18.868 15.8 18 15.8ZM18 24.3333C16.5534 24.3333 15.166 23.7714 14.1431 22.7712C13.1201 21.771 12.5455 20.4145 12.5455 19C12.5455 17.5855 13.1201 16.229 14.1431 15.2288C15.166 14.2286 16.5534 13.6667 18 13.6667C19.4466 13.6667 20.834 14.2286 21.8569 15.2288C22.8799 16.229 23.4545 17.5855 23.4545 19C23.4545 20.4145 22.8799 21.771 21.8569 22.7712C20.834 23.7714 19.4466 24.3333 18 24.3333ZM18 11C12.5455 11 7.88727 14.3173 6 19C7.88727 23.6827 12.5455 27 18 27C23.4545 27 28.1127 23.6827 30 19C28.1127 14.3173 23.4545 11 18 11Z"
                fill="#F96D10"
              />
            </svg>
          </div>

          <div onClick={showEditModal}>
            <svg
              width="37"
              height="37"
              viewBox="0 0 37 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="37" height="37" rx="5" fill="#E4FFEB" />
              <path
                d="M21 13.1716L24 16.1716M19 27.1716H27M11 23.1716L10 27.1716L14 26.1716L25.586 14.5856C25.9609 14.2105 26.1716 13.7019 26.1716 13.1716C26.1716 12.6412 25.9609 12.1326 25.586 11.7576L25.414 11.5856C25.0389 11.2106 24.5303 11 24 11C23.4697 11 22.9611 11.2106 22.586 11.5856L11 23.1716Z"
                stroke="#28A745"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div>
            <Popconfirm
              title="Are you sure to delete this video?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <svg
                width="37"
                height="37"
                viewBox="0 0 37 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="37" height="37" rx="5" fill="#FFE6E6" />
                <path
                  d="M23 16V26H15V16H23ZM21.5 10H16.5L15.5 11H12V13H26V11H22.5L21.5 10ZM25 14H13V26C13 27.1 13.9 28 15 28H23C24.1 28 25 27.1 25 26V14Z"
                  fill="#FF0000"
                />
              </svg>
            </Popconfirm>
          </div>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      serial: "001",
      video: {
        thumbnail: img1,
        title: "Training Video Part 1",
      },
      category: "Welcome to NOBL",
    },
    {
      key: "2",
      serial: "002",
      video: {
        thumbnail: img2,
        title: "Training Video Part 2",
      },
      category: "Amply Value",
    },
    {
      key: "3",
      serial: "003",
      video: {
        thumbnail: img3,
        title: "Training Video Part 3",
      },
      category: "Introduction",
    },
    {
      key: "4",
      serial: "004",
      video: {
        thumbnail: img4,
        title: "Training Video Part 4",
      },
      category: "Key to success in this industry",
    },
    {
      key: "5",
      serial: "005",
      video: {
        thumbnail: img5,
        title: "Training Video Part 5",
      },
      category: "Introduction",
    },
    {
      key: "6",
      serial: "006",
      video: {
        thumbnail: img6,
        title: "Training Video Part 6",
      },
      category: "Transitioning",
    },
    {
      key: "7",
      serial: "007",
      video: {
        thumbnail: img7,
        title: "Training Video Part 7",
      },
      category: "Building Value",
    },
  ];

  // categories
  const categories = [
    "All",
    "Welcome to NOBL",
    "Introduction",
    "Key to success in this industry",
    "Door approach / Pitch",
    "Transitioning",
    "Building Value",
    "Qualify Questions",
    "Buying Atmosphere",
    "Amply Value",
    "Drop Price / Compare Price",
    "Closing Lines",
    "Area Management",
    "How to use your IPad Resources",
    "PayScale’s",
    "Binder",
    "Slicks",
    "Career Progress Sheets",
    "Agreements Examples",
    "BASAFASA Information",
    "Blitz Trips",
    "Incentives",
    "Playbook",
  ];

  return (
    <div>
      <div className=" flex justify-between items-center mt-5 mb-[43px]">
        <div className="flex justify-center">
          <input
            type="search"
            className="w-[534px] p-4 border border-[#D9D9D9]"
            placeholder="Search for a video"
            name=""
            id=""
          />
          <button className="bg-[#4b5320] p-[18px]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.2127 12.3535L9.15493 8.29564C9.78462 7.48158 10.1252 6.48627 10.1252 5.43939C10.1252 4.18627 9.63618 3.01127 8.75181 2.12533C7.86743 1.23939 6.68931 0.751892 5.43774 0.751892C4.18618 0.751892 3.00806 1.24095 2.12368 2.12533C1.23774 3.0097 0.750244 4.18627 0.750244 5.43939C0.750244 6.69095 1.23931 7.86908 2.12368 8.75345C3.00806 9.63939 4.18462 10.1269 5.43774 10.1269C6.48462 10.1269 7.47837 9.78627 8.29243 9.15814L12.3502 13.2144C12.3621 13.2263 12.3763 13.2357 12.3918 13.2422C12.4074 13.2486 12.424 13.2519 12.4409 13.2519C12.4577 13.2519 12.4744 13.2486 12.4899 13.2422C12.5055 13.2357 12.5196 13.2263 12.5315 13.2144L13.2127 12.5347C13.2246 12.5228 13.2341 12.5087 13.2405 12.4931C13.247 12.4776 13.2503 12.4609 13.2503 12.4441C13.2503 12.4272 13.247 12.4106 13.2405 12.395C13.2341 12.3795 13.2246 12.3654 13.2127 12.3535ZM7.91274 7.91439C7.25024 8.57533 6.37212 8.93939 5.43774 8.93939C4.50337 8.93939 3.62524 8.57533 2.96274 7.91439C2.30181 7.25189 1.93774 6.37377 1.93774 5.43939C1.93774 4.50502 2.30181 3.62533 2.96274 2.96439C3.62524 2.30345 4.50337 1.93939 5.43774 1.93939C6.37212 1.93939 7.25181 2.30189 7.91274 2.96439C8.57368 3.62689 8.93774 4.50502 8.93774 5.43939C8.93774 6.37377 8.57368 7.25346 7.91274 7.91439Z"
                fill="white"
              />
            </svg>
          </button>
          {/* Add mamber icon */}
          <button
            onClick={showModal}
            className="font-semibold ml-7 flex items-center gap-6 text-base font-roboto text-white bg-[#4b5320] py-3 px-[63px]"
          >
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.07143 11.4286H0.5V8.57143H9.07143V0H11.9286V8.57143H20.5V11.4286H11.9286V20H9.07143V11.4286Z"
                fill="white"
              />
            </svg>
            Add a new video
          </button>
        </div>
        <div>
          <Select
            showSearch
            style={{ width: 363, height: 50 }}
            className="border border-black rounded-md"
            placeholder="Select a category"
            optionFilterProp="children"
            suffixIcon={
              <div className="flex justify-between w-full gap-72">
                <h1 className="text-black">klsdf</h1>
                <DownOutlined style={{ color: "black" }} />
              </div>
            }
          >
            {categories?.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      {/* table */}
      <Table
        columns={columns}
        rowClassName={() => "table-row-gap"}
        className="custom-ant-table"
        dataSource={data}
        pagination={true}
      />
      {/* video modal */}
      <VideoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Videos;
