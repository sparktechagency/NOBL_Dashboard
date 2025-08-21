import { Button, Card, Dropdown, Pagination, Select } from "antd";
import {
  useDeletePhotosMutation,
  useGetPhotosQuery,
} from "../../redux/apiSlices/admin/photosSlices";

import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import Swal from "sweetalert2";
import { useGetCategoryQuery } from "../../redux/apiSlices/admin/categorySlices";
import PhotoAddModal from "../component/PhotoLibary/PhotoAddModal";

const PhotoLibrary = () => {
  const [selectedCate, setSelectedCate] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: photoLibraryData } = useGetPhotosQuery({
    params: { page, limit, category_id: selectedCate },
  });
  const { data: categoryData } = useGetCategoryQuery({
    params: { type: "Image Category" },
  });

  const [deletePhoto] = useDeletePhotosMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  const showModal = (photo: any = null) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleDeletePhoto = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deletePhoto(id).unwrap();
        Swal.fire("Deleted!", "Photo has been deleted.", "success");
      } catch {
        Swal.fire("Error", "Failed to delete photo", "error");
      }
    }
  };

  // console.log(photoLibraryData);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 sm:gap-0 py-5">
        <Button
          onClick={() => showModal()}
          className="flex justify-center items-center h-10 lg:h-14 gap-2 bg-[#4B5320] text-white py-3 px-4 sm:px-6 rounded-md w-full sm:w-[252px]"
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
          Add a new photo
        </Button>

        <Select
          showSearch
          style={{ width: "100%", maxWidth: 363, height: 50 }}
          className="border border-gray-300 rounded-md"
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

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {photoLibraryData?.data?.data?.map((item) => (
          <Card key={item.id} className="w-full">
            <div className="relative">
              <img
                src={item.photo}
                alt="example"
                className="w-full h-60 object-cover rounded-md"
              />
              <div className="absolute top-2 right-2">
                <Dropdown
                  trigger={["click"]}
                  menu={{
                    items: [
                      {
                        key: "1",
                        label: (
                          <Button
                            onClick={() => showModal(item)}
                            size="small"
                            className="flex items-center gap-2 !bg-transparent w-full border-none"
                          >
                            Change photo
                          </Button>
                        ),
                      },
                      {
                        key: "2",
                        label: (
                          <Button
                            onClick={() => handleDeletePhoto(item.id)}
                            size="small"
                            className="flex items-center gap-2 !bg-transparent w-full border-none text-red-600"
                          >
                            Delete photo
                          </Button>
                        ),
                      },
                    ],
                  }}
                  placement="bottomRight"
                >
                  <div className="cursor-pointer w-8 h-8 bg-white rounded-full flex justify-center items-center shadow">
                    <DownOutlined />
                  </div>
                </Dropdown>
              </div>

              <div className="absolute bottom-2 left-2 bg-white py-1 px-2 rounded-md">
                <p className="text-sm font-medium">
                  {item?.title || "Untitled"}
                </p>
                <p className="text-xs font-medium bg-primary rounded-lg px-1 text-center text-white">
                  {item?.category?.name || "Uncategorized"}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={page}
          total={photoLibraryData?.data?.total}
          pageSize={limit}
          onChange={(p) => setPage(p)}
        />
      </div>

      {/* Add Photo Modal */}
      <PhotoAddModal
        data={selectedPhoto}
        categoryData={categoryData?.data?.data}
        setData={setSelectedPhoto}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default PhotoLibrary;
