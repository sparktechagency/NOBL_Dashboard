import { Image, Space, Table } from "antd";
import React, { useState } from "react";
import {
  useDeleteLinksMutation,
  useGetLinksQuery,
} from "../../redux/apiSlices/admin/linksSlices";

import ManageModel from "../component/ManageLinks/ManageModel";
import Swal from "sweetalert2";

const Managelinks: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState(7);

  const {
    data: linksData,
    isFetching,
    isLoading,
  } = useGetLinksQuery({
    params: { page, per_page },
  });

  const [deleteLinks] = useDeleteLinksMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const showEditModal = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteLinks(id).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "Your link has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to delete link",
        icon: "error",
      });
    }
  };

  const columns = [
    {
      title: "Sl No",
      key: "sl",
      align: "center",
      render: (_, record, index) => index + 1 + (page - 1) * per_page,
    },
    {
      title: "Link Type",
      key: "type",
      render: (_, record) => (
        <span className="truncate max-w-[120px]">{record.link_type}</span>
      ),
    },
    {
      title: "Link",
      key: "link",
      render: (_, record) => (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <Image
            width={50}
            height={50}
            src={record.thumbnail}
            alt={record.link_type}
            style={{ borderRadius: "5px" }}
          />
          <a
            href={record.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline truncate max-w-[200px]"
          >
            {record.link}
          </a>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle" className="flex-wrap">
          <div onClick={() => showEditModal(record)} className="cursor-pointer">
            {/* Edit icon */}
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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            onClick={() => handleDelete(record.id)}
            className="cursor-pointer"
          >
            {/* Delete icon */}
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
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div className=" ">
      {/* Add new link button */}
      <div className="flex justify-end mb-4 sm:mb-6">
        <button
          onClick={showModal}
          className="flex items-center gap-2 sm:gap-3 bg-[#4b5320] text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-md text-sm sm:text-base"
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
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table
          loading={isFetching || isLoading}
          columns={columns}
          dataSource={linksData?.data?.data}
          pagination={{
            current: page,
            pageSize: per_page,
            total: linksData?.data?.total || 0,
            onChange: (page, pageSize) => {
              setPage(page);
              setPer_page(pageSize);
            },
            showSizeChanger: true,
            pageSizeOptions: ["5", "7", "10"],
          }}
          rowClassName={() => "table-row-gap"}
          className="custom-ant-table min-w-[600px]"
        />
      </div>

      <ManageModel
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Managelinks;
