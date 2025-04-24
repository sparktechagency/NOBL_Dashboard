import React, { useRef, useState } from "react";
import { Modal, Form, Input, Button } from "antd";

const CategoryModal: React.FC = ({
  inputVisible,
  setInputVisible,
  handleAddNewCategory,
}: any) => {
  const [addedMamber, setAddedMamber] = useState();

  const onFinish = (data) => {
    console.log(data);
    handleAddNewCategory(data?.category);
    setInputVisible(false);
  };
  const handleCancel = () => {
    setInputVisible(false);
  };

  return (
    <Modal
      width={640}
      // height={400}
    //   centered
      title={
        <div className="text-center bg-[#4b5320] text-white py-4 font-roboto text-[18px]  font-semibold rounded-t-lg">
          Create New Category
        </div>
      }
      open={inputVisible}
      onOk={addedMamber}
      onCancel={handleCancel}
      footer={null}
      className="!rounded-xl"
    >
      <div className="rounded-b-3xl  p-8 ">
        {/* add mamber form */}

        <Form onFinish={onFinish} layout="vertical">
          <p className="font-roboto text-lg font-normal mb-3">Category Title</p>
          <Form.Item
            name="category"
            rules={[
              { required: true, message: "Please enter a category name !" },
            ]}
          >
            <Input className='bg-[#F0F0F0] p-5 border-none' placeholder="Type here..." />
          </Form.Item>

          <Form.Item label={null}>
            <Button className="w-full mt-4 py-6 bg-[#4B5320] text-white" type="default" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CategoryModal;
