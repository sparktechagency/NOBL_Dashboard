import { Image, Select, Space, Table } from "antd";
import {
  useDeleteDocumentsMutation,
  useGetDocumentsQuery,
} from "../../redux/apiSlices/admin/documentsSlices";

import DocumentModal from "../component/documents/DocumentModal";
import DocumentViewModal from "../component/documents/DocumentViewModal";
import { DownOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useGetCategoryQuery } from "../../redux/apiSlices/admin/categorySlices";
import { useState } from "react";

const Documents = () => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedCate, setSelectedCate] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState(7);

  const {
    data: documentLibraryData,
    isFetching,
    isLoading,
  } = useGetDocumentsQuery({
    params: { page, per_page, category_id: selectedCate, search },
  });

  const { data: categoryData } = useGetCategoryQuery({
    params: { type: "Documents Category" },
  });

  const [deletedDocument] = useDeleteDocumentsMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalViewOpen, setisModalViewOpen] = useState(false);

  const showModal = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const showPDFViewModal = (item: any) => {
    setSelectedItem(item);
    setisModalViewOpen(true);
  };

  const showViewModal = (item: any) => {
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
          await deletedDocument(id).unwrap();
          Swal.fire("Deleted!", "Your document has been deleted.", "success");
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete the document.",
      });
    }
  };

  const columns = [
    {
      title: "Sl. no.",
      dataIndex: "serial",
      key: "serial",
      align: "center",
      render: (_, __, index) => index + 1 + (page - 1) * per_page,
    },
    {
      title: "Document",
      dataIndex: "document",
      key: "document",
      render: (document: any, record: any) => (
        <Space wrap>
          <Image width={40} src={record.thumbnail} alt="thumbnail" />
          <span>{record.title}</span>
        </Space>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "document Type",
      align: "center",
      render: (category: any) => category?.name || "N/A",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle" wrap>
          <div onClick={() => showPDFViewModal(record)}>
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
          <div onClick={() => showViewModal(record)}>
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
          <div onClick={() => handleDelete(record.id)}>
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
    <div className="  lg:px-10 py-5">
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search || ""}
            className="flex-1 sm:flex-none w-full sm:w-[350px] p-3 border border-[#D9D9D9] rounded-md"
            placeholder="Search for a document"
          />

          <button
            onClick={showModal}
            className="flex gap-2 justify-center items-center text-white bg-[#4b5320] py-3 px-5 rounded-md font-semibold"
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
            Add a new Document
          </button>
        </div>

        <div className="w-full sm:w-[250px] lg:w-[363px]">
          <Select
            showSearch
            className="w-full border border-gray-300 rounded-md"
            placeholder="Select a category"
            optionFilterProp="children"
            suffixIcon={<DownOutlined style={{ color: "black" }} />}
            defaultValue={null}
            options={[
              { value: null, label: "All Categories" },
              ...(categoryData?.data?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []),
            ]}
            onChange={(value) => setSelectedCate(value)}
          />
        </div>
      </div>

      {/* Table */}
      <Table
        loading={isFetching || isLoading}
        columns={columns}
        rowClassName={() => "table-row-gap"}
        className="custom-ant-table overflow-x-auto"
        dataSource={documentLibraryData?.data?.data}
        pagination={{
          current: page,
          pageSize: per_page,
          total: documentLibraryData?.data?.total,
          onChange: (page) => setPage(page),
        }}
        scroll={{ x: "max-content" }}
      />

      {/* Modals */}
      <DocumentViewModal
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        isModalOpen={isModalViewOpen}
        setIsModalOpen={setisModalViewOpen}
      />
      <DocumentModal
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        categoryData={categoryData?.data?.data}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Documents;
