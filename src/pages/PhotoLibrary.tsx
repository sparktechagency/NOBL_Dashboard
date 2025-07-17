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
    params: { page: page, limit: limit, category_id: selectedCate },
  });
  const { data: categoryData } = useGetCategoryQuery({
    params: {
      type: "Image Category",
    },
  });

  const [deletePhoto] = useDeletePhotosMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);

  const showModal = (photo: any = null) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleDeletePhoto = (id: number) => {
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
        try {
          await deletePhoto(id).unwrap();
          Swal.fire("Deleted!", "Photo has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to delete photo", "error");
        }
      }
    });
  };

  const openModal = (item: any | null = null) => {
    setSelectedPhoto(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex  justify-between items-center">
        <button
          onClick={() => showModal()}
          className="w-[252px]  py-3 flex justify-center items-center gap-3 bg-[#4B5320] my-5 mb-9 rounded-md text-white font-roboto font-normal text-lg"
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
        </button>
        <div>
          <Select
            showSearch
            style={{ width: 363, height: 50 }}
            className="border border-gray-300 rounded-md"
            placeholder="Select a category"
            optionFilterProp="children"
            suffixIcon={<DownOutlined style={{ color: "black" }} />}
            defaultValue={null}
            options={[
              {
                value: null,
                label: "All Categories",
              },
              ...(categoryData?.data?.data?.map((item) => ({
                value: item.id,
                label: item.name,
              })) || []),
            ]}
            onChange={(value) => {
              setSelectedCate(value);
            }}
          />
        </div>
      </div>
      {/* photo Card */}
      <div className="relative h-[55vh] flex-col justify-between items-end">
        <div className="grid grid-cols-5 gap-5">
          {photoLibraryData?.data?.data?.map((item) => (
            <Card
              key={item.id}
              style={{ width: 284, margin: 0 }}
              bodyStyle={{
                padding: 0,
                margin: 0,
              }}
            >
              <div className="relative ">
                <img
                  alt="example"
                  className="w-full h-60  object-fill  rounded-md"
                  src={item.photo}
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
                              onClick={() => openModal(item)}
                              size="small"
                              className="flex  justify-start items-center !bg-transparent w-full  border-none "
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20 6.8399C20.0004 8.19129 19.6008 9.51255 18.8515 10.6371C18.1021 11.7616 17.0367 12.6391 15.7895 13.1589V13.1567C15.7895 10.7834 14.8468 8.50718 13.1688 6.82895C11.4909 5.15071 9.2151 4.20788 6.84211 4.20788H6.84C7.44927 2.74841 8.54504 1.54498 9.94106 0.802111C11.3371 0.0592422 12.9472 -0.177224 14.4978 0.132902C16.0485 0.443027 17.4439 1.28061 18.4469 2.50329C19.45 3.72598 19.9987 5.25832 20 6.8399ZM4.73684 0.523056C3.62014 0.523056 2.54918 0.966737 1.75955 1.7565C0.969923 2.54626 0.526316 3.6174 0.526316 4.73429V6.3135H2.63158V4.73429C2.63158 4.17584 2.85338 3.64027 3.2482 3.24539C3.64301 2.85051 4.17849 2.62867 4.73684 2.62867H6.31579V0.523056H4.73684ZM17.3684 13.6832V15.2624C17.3684 15.8208 17.1466 16.3564 16.7518 16.7513C16.357 17.1461 15.8215 17.368 15.2632 17.368H13.6842V19.4736H15.2632C16.3799 19.4736 17.4508 19.0299 18.2404 18.2402C19.0301 17.4504 19.4737 16.3793 19.4737 15.2624V13.6832H17.3684ZM6.84211 20C8.65674 20 10.3971 19.279 11.6802 17.9957C12.9633 16.7123 13.6842 14.9717 13.6842 13.1567C13.6842 11.3418 12.9633 9.6012 11.6802 8.31784C10.3971 7.03448 8.65674 6.3135 6.84211 6.3135C5.02747 6.3135 3.28715 7.03448 2.00401 8.31784C0.720862 9.6012 0 11.3418 0 13.1567C0 14.9717 0.720862 16.7123 2.00401 17.9957C3.28715 19.279 5.02747 20 6.84211 20ZM6.84211 10.5247L9.47368 13.1567L6.84211 15.7888L4.21053 13.1567L6.84211 10.5247Z"
                                  fill="#4B5320"
                                />
                              </svg>
                              <p className="font-medium text-base font-roboto text-[#4B5320] ">
                                Change photo
                              </p>
                            </Button>
                          ),
                        },
                        {
                          key: "2",
                          label: (
                            <Button
                              size="small"
                              onClick={() => handleDeletePhoto(item.id)}
                              className="flex justify-start  items-center  w-full !bg-transparent hover:bg-red-100 border-none "
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16 1.11111H12L10.8571 0H5.14286L4 1.11111H0V3.33333H16M1.14286 17.7778C1.14286 18.3671 1.38367 18.9324 1.81233 19.3491C2.24098 19.7659 2.82236 20 3.42857 20H12.5714C13.1776 20 13.759 19.7659 14.1877 19.3491C14.6163 18.9324 14.8571 18.3671 14.8571 17.7778V4.44444H1.14286V17.7778Z"
                                  fill="#FF0000"
                                />
                              </svg>

                              <p className="font-medium text-base font-roboto text-[#FF0000] ">
                                Delete photo
                              </p>
                            </Button>
                          ),
                        },
                      ],
                    }}
                    placement="bottomRight"
                  >
                    <svg
                      width="35"
                      height="35"
                      viewBox="0 0 35 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="34"
                        height="34"
                        rx="17"
                        fill="white"
                        fill-opacity="0.24"
                      />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="34"
                        height="34"
                        rx="17"
                        stroke="white"
                      />
                      <path
                        d="M17.5 10.9483C18.4522 10.9483 19.2242 10.1764 19.2242 9.22414C19.2242 8.27192 18.4522 7.5 17.5 7.5C16.5478 7.5 15.7759 8.27192 15.7759 9.22414C15.7759 10.1764 16.5478 10.9483 17.5 10.9483Z"
                        fill="white"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17.5 19.2242C18.4522 19.2242 19.2242 18.4522 19.2242 17.5C19.2242 16.5478 18.4522 15.7759 17.5 15.7759C16.5478 15.7759 15.7759 16.5478 15.7759 17.5C15.7759 18.4522 16.5478 19.2242 17.5 19.2242Z"
                        fill="white"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17.5 27.5C18.4522 27.5 19.2242 26.7281 19.2242 25.7759C19.2242 24.8237 18.4522 24.0518 17.5 24.0518C16.5478 24.0518 15.7759 24.8237 15.7759 25.7759C15.7759 26.7281 16.5478 27.5 17.5 27.5Z"
                        fill="white"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Dropdown>
                </div>

                <div className="bg-white py-1 px-2  absolute bottom-2 left-2 rounded-md">
                  <p className="text-sm font-medium font-popping ">
                    {item?.category?.name || "Uncategorized"}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {/* Pagination */}
        <div className="absolute -bottom-[150px] right-0  ">
          <Pagination
            defaultCurrent={page}
            total={photoLibraryData?.data?.total}
            onChange={(page) => {
              setPage(page);
            }}
          />
        </div>
      </div>
      {/* add new photo modal*/}
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
