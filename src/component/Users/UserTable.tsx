import { Image, Modal, Space, Table } from "antd";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../redux/apiSlices/admin/userSlices";

import type { PopconfirmProps } from "antd";
import Swal from "sweetalert2";
import { useState } from "react";

// --- IMPORTANT ---
// In your actual application, you would uncomment the following line
// to import your actual RTK Query hooks.
// import { useGetUsersQuery, useDeleteUserMutation } from "../../../redux/apiSlices/admin/userSlices";

// We assume 'Swal' from sweetalert2 is available globally via a <script> tag.

const UserTable = ({ search }) => {
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(7);

  // This now relies on your actual RTK Query hook implementation.
  // For this to work, your Redux store must be correctly configured with the apiSlice.
  const {
    data: UsersData,
    isFetching,
    isLoading,
    // You can also destructure 'error' for error handling
  } = useGetUsersQuery({
    params: {
      page: page,
      per_page: per_page,
      search: search,
    },
  });

  const [deleteUser] = useDeleteUserMutation();

  // Delete confirmation modal logic
  const confirmDelete: PopconfirmProps["onConfirm"] = (record) => {
    // Assuming Swal is available globally

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "responsive-swal",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Calling the actual mutation hook
        deleteUser(record?.id).then((res) => {
          // The response structure from your backend might differ.
          // Adjust this logic based on your actual API response.
          if (res?.data?.status) {
            Swal.fire("Deleted!", res?.data?.message, "success");
            // With RTK Query's tag invalidation, the table will automatically refetch.
          } else {
            Swal.fire(
              "Error!",
              res?.data?.message || "Failed to delete user.",
              "error"
            );
          }
        });
      }
    });
  };

  // Table column definitions
  const columns = [
    {
      title: "Sl. no.",
      dataIndex: "serial",
      key: "serial",
      width: 60,
      render: (text: any, record: any, index: number) => {
        return <span>{(page - 1) * per_page + index + 1}</span>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "Name",
      render: (name: any, record: any) => (
        <Space>
          <Image
            width={40}
            height={40}
            src={record?.photo}
            alt={name || "thumbnail"}
            className="rounded-full object-cover"
            preview={false}
          />
          <span className="font-medium">{name}</span>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      responsive: ["md"],
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center",
      responsive: ["lg"],
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 120,
      render: (_, record: any) => (
        <Space size="middle">
          <button
            onClick={() => showModal(record)}
            className="p-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                fill="#F96D10"
              />
            </svg>
          </button>
          <button
            onClick={() => confirmDelete(record)}
            className="p-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                fill="#FF0000"
              />
            </svg>
          </button>
        </Space>
      ),
    },
  ];

  // View modal state and handlers
  const [selectItem, setSelectItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (record: any) => {
    setSelectItem(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectItem(null), 300);
  };

  return (
    <>
      <div className="w-full overflow-x-auto">
        <Table
          loading={isFetching || isLoading}
          columns={columns}
          // The dataSource now correctly points to the data from your backend
          dataSource={UsersData?.data?.data}
          rowKey="id"
          className="custom-ant-table"
          rowClassName={() => "table-row-gap"}
          pagination={{
            current: page,
            pageSize: per_page,
            total: UsersData?.data?.total,
            onChange: (page, pageSize) => {
              setPage(page);
              setPerPage(pageSize);
            },
            showSizeChanger: true,
            pageSizeOptions: ["7", "10", "20", "50"],
          }}
          scroll={{ x: "max-content" }}
        />
      </div>
      <Modal
        title={null}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        // centered
        width="90%"
        style={{ maxWidth: "500px" }}
      >
        {selectItem && (
          <div className="flex flex-col items-center space-y-4 p-4 sm:p-6 md:p-8">
            <img
              src={selectItem.photo}
              alt="Profile"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-gray-200"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/150x150/EFEFEF/AAAAAA?text=No+Image";
              }}
            />
            <h3 className="font-roboto pb-6 font-medium text-xl sm:text-2xl text-center text-gray-800">
              {selectItem.name}
            </h3>
            <div className="w-full space-y-3 text-sm sm:text-base">
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b">
                <span className="font-normal text-gray-500">Email:</span>
                <span className="text-gray-800 font-semibold text-left sm:text-right break-all">
                  {selectItem.email}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b">
                <span className="font-normal text-gray-500">Username:</span>
                <span className="text-gray-800 font-semibold text-left sm:text-right">
                  {selectItem.username}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b">
                <span className="font-normal text-gray-500">Badge Number:</span>
                <span className="text-gray-800 font-semibold text-left sm:text-right">
                  {selectItem.badge_number}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-2">
                <span className="font-normal text-gray-500">Address:</span>
                <span className="text-gray-800 font-semibold text-left sm:text-right">
                  {selectItem.address}
                </span>
              </div>
            </div>
            <button
              onClick={handleCancel}
              className="mt-6 w-full bg-[#4a5320] text-white py-3 rounded-lg font-semibold hover:bg-[#3a4219] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a5320]"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UserTable;
