import React, { useState } from "react";
import AuthWrapper from "../component/share/AuthWrapper";
import Title from "../component/share/Title";
import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface SetNewPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const SetNewPassword: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: SetNewPasswordFormValues) => {
    console.log(values);
    navigate("/auth/login");
  };

  return (
    <AuthWrapper className="py-28 px-24">
      <div className="text-center mb-12">
        <div className="flex py-6 justify-center">
          <h3 className="font-semibold text-2xl text-[#333333]">
            Set a new password
          </h3>
        </div>
        <p className="text-sm font-normal mb-6 text-[#5C5C5C]">
          Create a new password. Ensure it differs from <br /> previous ones for security
        </p>
      </div>

      <Form<SetNewPasswordFormValues> layout="vertical" onFinish={onFinish}>
        {/* New Password Field */}
        <Form.Item
          label="New password"
          name="password"
          rules={[{ required: true, message: "Please enter your new password" }]}
        >
          <Input.Password
            placeholder="Write new password"
            iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
            style={{ height: "50px", width: "481px" }}
          />
        </Form.Item>

        {/* Confirm Password Field */}
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm your password" }]}
        >
          <Input.Password
            placeholder="Write confirm password"
            iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
            style={{ height: "50px", width: "481px" }}
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <div className="flex justify-center">
            <Button
              className="bg-[#4B5320] h-12 text-sm text-white font-bold mt-6 px-10"
              htmlType="submit"
            >
              Update Password
            </Button>
          </div>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};

export default SetNewPassword;
