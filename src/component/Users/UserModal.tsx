import { Button, Form, Input, Modal } from "antd";

import React from "react";
import Swal from "sweetalert2";
import { useAddUserMutation } from "../../../redux/apiSlices/admin/userSlices";

const UserModal: React.FC<{
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}> = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const [addNewUser] = useAddUserMutation();

  const handleSubmit = async (values: any) => {
    try {
      // Call the API
      await addNewUser(values).unwrap();

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User added successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      // Close modal and reset form
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add user. Please try again.",
      });
      console.error("Failed to add user:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Modal
        title={
          <div className="text-center bg-[#4b5320] text-white py-4 font-roboto text-[18px] font-semibold rounded-t-lg">
            Add a member
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
        style={{
          top: "2%",
          // transform: "translateY(-50%)",
        }}
      >
        <div className="rounded-b-lg p-4">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="flex flex-col w-full pt-6 justify-center items-center"
          >
            {/* Name Field */}
            <Form.Item
              name="name"
              label={
                <span className="text-black text-lg font-medium font-roboto">
                  Your Name
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter your name!",
                  type: "name",
                },
              ]}
            >
              <Input
                className="shadow-xs bg-[#f0f0f0] px-4 py-3 text-gray-900 text-sm rounded-lg w-[500px]"
                placeholder="name@flowbite.com"
              />
            </Form.Item>
            {/* Email Field */}
            <Form.Item
              name="email"
              label={
                <span className="text-black text-lg font-medium font-roboto">
                  Your Email
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                  type: "email",
                },
              ]}
            >
              <Input
                className="shadow-xs bg-[#f0f0f0] px-4 py-3 text-gray-900 text-sm rounded-lg w-[500px]"
                placeholder="name@flowbite.com"
              />
            </Form.Item>

            {/* Username Field */}
            <Form.Item
              name="user_name"
              label={
                <span className="text-black text-lg font-medium font-roboto">
                  Username
                </span>
              }
              rules={[{ required: true, message: "Please enter a username!" }]}
            >
              <Input
                className="shadow-xs bg-[#f0f0f0] px-4 py-3 text-gray-900 text-sm rounded-lg w-[500px]"
                placeholder="Set a username"
              />
            </Form.Item>

            {/* Badge Number Field */}
            <Form.Item
              name="badge_number"
              label={
                <span className="text-black text-lg font-medium font-roboto">
                  Badge Number
                </span>
              }
              rules={[
                { required: true, message: "Please enter a badge number!" },
              ]}
            >
              <Input
                type="number"
                className="shadow-xs bg-[#f0f0f0] px-4 py-3 text-gray-900 text-sm rounded-lg w-[500px]"
                placeholder="5468437"
              />
            </Form.Item>
            {/* Address Field */}
            <Form.Item
              name="address"
              label={
                <span className="text-black text-lg font-medium font-roboto">
                  Address
                </span>
              }
              rules={[{ required: true, message: "Please enter a address!" }]}
            >
              <Input
                type="text"
                className="shadow-xs bg-[#f0f0f0] px-4 py-3 text-gray-900 text-sm rounded-lg w-[500px]"
                placeholder="Write a address"
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              name="password"
              label={
                <span className="text-black text-lg font-medium font-roboto">
                  Password
                </span>
              }
              rules={[{ required: true, message: "Please enter a password!" }]}
            >
              <Input.Password
                className="shadow-xs bg-[#f0f0f0] px-4 py-3 text-gray-900 text-sm rounded-lg w-[500px]"
                placeholder="Set a password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-[500px] p-3 bg-[#4B5320] my-5 rounded-lg text-white"
              >
                ADD
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default UserModal;
