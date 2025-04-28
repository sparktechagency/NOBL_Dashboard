import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  PopconfirmProps,
  message,
  Popconfirm,
} from "antd";
import ManageModel from "../component/ManageLinks/ManageModel";
import ManageLinksEditModal from "../component/ManageLinks/ManageLinksEditModal";

const Managelinks: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  //  Edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const showEditModal = () => {
    setIsEditModalOpen(true);
  };
  // delete modal
  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  // delete modal end

  const columns = [
    {
      title: "Link Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (type: { icon: React.ReactNode; title: string }) => (
        <Space direction="horizontal" align="center">
          {type.icon}
          <span>{type.title}</span>
        </Space>
      ),
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (link: string) => (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {link}
        </a>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          {/* view icon */}
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
              title="Are you sure to delete this link ?"
              // description="Are you sure to delete this task?"
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
      type: {
        icon: (
          <svg
            width="42"
            height="38"
            viewBox="0 0 42 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_102_3809)">
              <path
                d="M3.17527 32.5295L5.02753 35.7654C5.41242 36.4467 5.96564 36.982 6.61516 37.3713C8.47552 34.9828 9.77052 33.1499 10.5002 31.8726C11.2406 30.5764 12.1507 28.5489 13.2303 25.7901C10.3205 25.4027 8.11552 25.209 6.61533 25.209C5.17541 25.209 2.9703 25.4027 0 25.7901C0 26.5443 0.192445 27.2985 0.577336 27.9798L3.17527 32.5295Z"
                fill="#0066DA"
              />
              <path
                d="M35.385 37.3713C36.0347 36.982 36.5879 36.4467 36.9726 35.7655L37.7424 34.4274L41.423 27.9798C41.8007 27.3133 41.9997 26.5584 42.0002 25.7901C39.0126 25.4027 36.8116 25.209 35.3971 25.209C33.8769 25.209 31.6759 25.4027 28.7939 25.7901C29.8608 28.564 30.7589 30.5915 31.4882 31.8726C32.2236 33.165 33.5226 34.9979 35.385 37.3713Z"
                fill="#EA4335"
              />
              <path
                d="M20.9999 12.1651C23.1524 9.53579 24.6358 7.50829 25.4501 6.08265C26.1059 4.93469 26.8276 3.10178 27.6151 0.583939C26.9656 0.194646 26.2199 0 25.4501 0H16.5497C15.78 0 15.0345 0.219039 14.3848 0.583939C15.3866 3.47161 16.2367 5.5267 16.935 6.74923C17.7067 8.10031 19.0617 9.90561 20.9999 12.1651Z"
                fill="#00832D"
              />
              <path
                d="M28.7699 25.79H13.2302L6.61523 37.3712C7.26459 37.7605 8.01026 37.9552 8.78004 37.9552H33.2201C33.9899 37.9552 34.7357 37.7361 35.3851 37.3711L28.7699 25.79Z"
                fill="#2684FC"
              />
              <path
                d="M21.0002 12.165L14.3852 0.583984C13.7355 0.973277 13.1823 1.50843 12.7974 2.18977L0.577336 23.6004C0.199542 24.2669 0.000521966 25.0218 0 25.7901H13.2303L21.0002 12.165Z"
                fill="#00AC47"
              />
              <path
                d="M35.3128 12.8952L29.2026 2.18977C28.8179 1.50843 28.2645 0.973277 27.615 0.583984L21 12.1652L28.7697 25.7903H41.976C41.976 25.0359 41.7836 24.2819 41.3987 23.6005L35.3128 12.8952Z"
                fill="#FFBA00"
              />
            </g>
            <defs>
              <clipPath id="clip0_102_3809">
                <rect width="42" height="38" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
        title: "Google Drive",
      },
      link: "https://drive.google.com/drive/folders/16y4_XIZhMxBbBDK9XZUPfCFI2Q_bkCW",
    },
    {
      key: "2",
      type: {
        icon: (
          <svg width="28" height="38" viewBox="0 0 28 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.3747 10.6511H17.2084V0H2.6261C1.17429 0 0 1.159 0 2.59033V35.4097C0 36.841 1.17429 38 2.6245 38H25.3755C26.8257 38 28 36.841 28 35.4097V10.6511H18.3747ZM17.5004 27.2048H6.1233V25.0452H17.4972V27.2048H17.5004ZM21.8751 22.0226H6.1249V19.8629H21.8751V22.0226ZM21.8751 16.8403H6.1249V14.6823H21.8751V16.8403ZM18.3747 9.5H28L18.3747 0V9.5Z" fill="#2684FC"/>
          </svg>
          
        ),
        title: "Google Drive",
      },
      link: "https://drive.google.com/drive/folders/16y4_XIZhMxBbBDK9XZUPfCFI2Q_bkCW",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={true}
        rowClassName={() => "table-row-gap"}
        className="custom-ant-table mt-5"
      />
      {/* add new Links */}
      <button
        onClick={showModal}
        className="font-semibold   flex items-center gap-3 text-lg  font-roboto text-white bg-[#4b5320] py-3 px-[50px]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.57143 11.4286H0V8.57143H8.57143V0H11.4286V8.57143H20V11.4286H11.4286V20H8.57143V11.4286Z"
            fill="white"
          />
        </svg>
        Add new Link
      </button>
      <ManageModel isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <ManageLinksEditModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
      />
    </div>
  );
};

export default Managelinks;
