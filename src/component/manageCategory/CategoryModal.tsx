import { Button, Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../redux/apiSlices/admin/categorySlices";

import Swal from "sweetalert2";

interface CategoryModalProps {
  data: any;
  inputVisible: boolean;
  selectedCategory: string;
  setData: React.Dispatch<React.SetStateAction<any>>;
  setInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  inputVisible,
  setInputVisible,
  setData,
  selectedCategory,
  data,
}) => {
  const [form] = Form.useForm();
  const inputRef = React.useRef<any>(null);
  const [addNewCategory, { isLoading: addLoading }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();

  // console.log(selectedCategory);

  const handleApiResponse = (
    res: any,
    successMessage: string,
    errorMessage: string
  ) => {
    if (res?.data?.status) {
      Swal.fire("Success!", successMessage, "success");
    } else {
      Swal.fire("Error!", res?.data?.message || errorMessage, "error");
    }
  };

  const onFinish = async (newData: any) => {
    try {
      if (data?.id) {
        const res = await updateCategory({
          id: data.id,
          data: {
            _method: "PUT",
            name: newData.category,
            type: selectedCategory,
          },
        });
        handleApiResponse(
          res,
          "Category updated successfully!",
          "Failed to update category."
        );
      } else {
        const res = await addNewCategory({
          name: newData.category,
          type: selectedCategory || "Video Category",
        });
        handleApiResponse(
          res,
          "Category added successfully!",
          "Failed to add category."
        );
      }
    } catch (error) {
      Swal.fire("Error!", "An unexpected error occurred.", "error");
    } finally {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setInputVisible(false);
    form.resetFields();
    setData(null);
  };

  useEffect(() => {
    if (data?.name) {
      form.setFieldsValue({ category: data.name });
    }
  }, [data?.name]);

  setTimeout(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, 100);

  return (
    <Modal
      width={640}
      title={
        <div className="text-center bg-[#4b5320] text-white py-4 font-roboto text-[18px] font-semibold rounded-t-lg">
          {data?.id ? "Edit Category" : "Add a Category"}
        </div>
      }
      open={inputVisible}
      onCancel={handleCancel}
      footer={null}
      className="!rounded-xl"
    >
      <div className="rounded-b-3xl p-8">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="category"
            label={
              <p className="font-roboto text-lg font-normal mb-3">
                Category Title
              </p>
            }
            rules={[
              { required: true, message: "Please enter a category name!" },
            ]}
          >
            <Input
              ref={inputRef}
              className="bg-[#F0F0F0] p-5"
              placeholder="Type here..."
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                backgroundColor: "#4B5320",
                color: "white",
                height: 50,
              }}
              loading={addLoading || updateLoading}
              className="w-full mt-4 py-6 bg-[#4B5320] text-white"
              type="default"
              htmlType="submit"
            >
              {data?.id ? "Update Category" : "Add Category"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CategoryModal;
