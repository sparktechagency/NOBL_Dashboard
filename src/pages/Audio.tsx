import { Edit2, Eye, Trash2 } from "lucide-react";
// lucide icons
import { Image, Select, Space, Table } from "antd";
import {
  useDeleteAudiosMutation,
  useGetAudiosQuery,
} from "../../redux/apiSlices/admin/audiosSlices";

import AudioModal from "../component/audios/AudioModal";
import { DownOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useGetCategoryQuery } from "../../redux/apiSlices/admin/categorySlices";
import { useState } from "react";

const Audios = () => {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedCate, setSelectedCate] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(7);

  const {
    data: AudioLibraryData,
    isFetching,
    isLoading,
  } = useGetAudiosQuery({
    params: { page, per_page: limit, category_id: selectedCate, search },
  });

  const { data: categoryData } = useGetCategoryQuery({
    params: { type: "Audio Category" },
  });
  const [deleteAudio] = useDeleteAudiosMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);

  const showEditModal = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDeletedAudio = async (id: string) => {
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
          await deleteAudio(id).unwrap();
          Swal.fire("Deleted!", "Your Audio has been deleted.", "success");
        }
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete Audio: " + error.message,
      });
    }
  };

  const columns = [
    {
      title: "Sl. no.",
      dataIndex: "serial",
      key: "serial",
      align: "center",
      render: (_, __, index) => <span>{(page - 1) * limit + index + 1}</span>,
    },
    {
      title: "Audio",
      dataIndex: "Audio",
      key: "Audio",
      render: (_: any, record: any) => (
        <Space>
          <Image width={40} src={record.thumbnail} alt="thumbnail" />
          <span>{record.title}</span>
        </Space>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
      render: (category: any) => (
        <span>{category ? category.name : "N/A"}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Eye
            className="cursor-pointer text-[#F96D10]"
            onClick={() => showEditModal(record)}
          />
          <Edit2
            className="cursor-pointer text-[#28A745]"
            onClick={() => showEditModal(record)}
          />
          <Trash2
            className="cursor-pointer text-[#FF0000]"
            onClick={() => handleDeletedAudio(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 pt-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto">
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search || ""}
            placeholder="Search for a audio"
            className="w-full sm:w-[350px] p-2 sm:p-4 border border-[#D9D9D9] rounded-md"
          />
          <button
            onClick={showModal}
            className="flex items-center justify-center gap-2 bg-[#4b5320] text-white h-10 lg:h-14 py-2 px-4 sm:px-6 rounded-md w-full sm:w-auto"
          >
            Add a new audio
          </button>
        </div>

        <Select
          showSearch
          style={{ width: "100%", maxWidth: 363, height: 50 }}
          placeholder="Select a category"
          optionFilterProp="children"
          suffixIcon={<DownOutlined style={{ color: "black" }} />}
          value={selectedCate}
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

      <div className="overflow-x-auto">
        <Table
          loading={isFetching || isLoading}
          columns={columns}
          rowClassName={() => "table-row-gap"}
          className="custom-ant-table min-w-[600px]"
          dataSource={AudioLibraryData?.data?.data}
          pagination={{
            current: page,
            pageSize: limit,
            total: AudioLibraryData?.data?.total,
            onChange: (page) => setPage(page),
          }}
        />
      </div>

      <AudioModal
        categoryData={categoryData?.data?.data}
        data={selectedItem}
        setData={setSelectedItem}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Audios;
