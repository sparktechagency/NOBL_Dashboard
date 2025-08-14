import { Button, Form, Input, Modal } from "antd";

import React from "react";
import Swal from "sweetalert2";
import { useAddUserMutation } from "../../../redux/apiSlices/admin/userSlices";

const UserModal: React.FC<{
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}> = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const [addNewUser, { isLoading: addLoading }] = useAddUserMutation();

  const handleSubmit = async (values: any) => {
    try {
      await addNewUser(values).unwrap();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User added successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add user. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title={
        <div className="text-center bg-[#4b5320] text-white py-4 font-roboto text-[18px] font-semibold rounded-t-lg">
          Add a member
        </div>
      }
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width="95%"
      style={{
        maxWidth: 600,
        top: "2%",
        margin: "0 auto",
      }}
      bodyStyle={{ padding: 0 }}
    >
      <div className="rounded-b-lg p-4 sm:p-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="flex flex-col w-full pt-2 sm:pt-4"
        >
          {/* Name */}
          <Form.Item
            name="name"
            label={
              <span className="text-black text-base sm:text-lg font-medium font-roboto">
                Your Name
              </span>
            }
            rules={[{ required: true, message: "Please enter your name!" }]}
            className="w-full"
          >
            <Input
              className="shadow-xs bg-[#f0f0f0] px-3 py-2 sm:px-4 sm:py-3 text-gray-900 text-sm rounded-lg w-full"
              placeholder="Enter your name"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label={
              <span className="text-black text-base sm:text-lg font-medium font-roboto">
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
              className="shadow-xs bg-[#f0f0f0] px-3 py-2 sm:px-4 sm:py-3 text-gray-900 text-sm rounded-lg w-full"
              placeholder="name@example.com"
            />
          </Form.Item>

          {/* Username */}
          <Form.Item
            name="user_name"
            label={
              <span className="text-black text-base sm:text-lg font-medium font-roboto">
                Username
              </span>
            }
            rules={[{ required: true, message: "Please enter a username!" }]}
          >
            <Input
              className="shadow-xs bg-[#f0f0f0] px-3 py-2 sm:px-4 sm:py-3 text-gray-900 text-sm rounded-lg w-full"
              placeholder="Set a username"
            />
          </Form.Item>

          {/* Badge Number */}
          <Form.Item
            name="badge_number"
            label={
              <span className="text-black text-base sm:text-lg font-medium font-roboto">
                Badge Number
              </span>
            }
            rules={[
              { required: true, message: "Please enter a badge number!" },
            ]}
          >
            <Input
              type="number"
              className="shadow-xs bg-[#f0f0f0] px-3 py-2 sm:px-4 sm:py-3 text-gray-900 text-sm rounded-lg w-full"
              placeholder="5468437"
            />
          </Form.Item>

          {/* Address */}
          <Form.Item
            name="address"
            label={
              <span className="text-black text-base sm:text-lg font-medium font-roboto">
                Address
              </span>
            }
            rules={[{ required: true, message: "Please enter an address!" }]}
          >
            <Input
              type="text"
              className="shadow-xs bg-[#f0f0f0] px-3 py-2 sm:px-4 sm:py-3 text-gray-900 text-sm rounded-lg w-full"
              placeholder="Write an address"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            label={
              <span className="text-black text-base sm:text-lg font-medium font-roboto">
                Password
              </span>
            }
            rules={[{ required: true, message: "Please enter a password!" }]}
          >
            <Input.Password
              className="shadow-xs bg-[#f0f0f0] px-3 py-2 sm:px-4 sm:py-3 text-gray-900 text-sm rounded-lg w-full"
              placeholder="Set a password"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="w-full mt-4">
            <Button
              style={{
                backgroundColor: "#4B5320",
                color: "white",
                height: 48,
              }}
              loading={addLoading}
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full sm:w-full p-3 bg-[#4B5320] rounded-lg text-white"
            >
              ADD
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default UserModal;
