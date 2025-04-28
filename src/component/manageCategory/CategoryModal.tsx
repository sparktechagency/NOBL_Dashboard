import React from "react";
import { Modal, Form, Input, Button } from "antd";

interface CategoryModalProps {
  inputVisible: boolean;
  setInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddNewCategory: (newCategory: string) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  inputVisible,
  setInputVisible,
  handleAddNewCategory,
}) => {
  const [form] = Form.useForm();

  const onFinish = (data: { category: string }) => {
    handleAddNewCategory(data?.category);
    setInputVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setInputVisible(false);
  };

  return (
    <Modal
      width={640}
      title={
        <div className="text-center bg-[#4b5320] text-white py-4 font-roboto text-[18px] font-semibold rounded-t-lg">
          Create New Category
        </div>
      }
      open={inputVisible}
      onCancel={handleCancel}
      footer={null}
      className="!rounded-xl"
    >
      <div className="rounded-b-3xl p-8">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <p className="font-roboto text-lg font-normal mb-3">Category Title</p>
          <Form.Item
            name="category"
            rules={[{ required: true, message: "Please enter a category name !" }]}
          >
            <Input
              className="bg-[#F0F0F0] p-5 border-none"
              placeholder="Type here..."
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full mt-4 py-6 bg-[#4B5320] text-white"
              type="default"
              htmlType="submit"
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CategoryModal;
