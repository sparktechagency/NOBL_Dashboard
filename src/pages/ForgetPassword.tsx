import React from "react";
import AuthWrapper from "../component/share/AuthWrapper";
import Title from "../component/share/Title";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Images/logoChoozy.svg";

interface ForgetPasswordFormValues {
  email: string;
}

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: ForgetPasswordFormValues) => {
    console.log(values);
    navigate("/auth/verify");
  };

  return (
    <AuthWrapper className="py-64 px-24 flex flex-col bg-[#ffffff]  justify-center shadow-lg border">
      <p className="font-popping font-semibold text-2xl text-[#333333 mb-6 ]">
        Forgot password ?
      </p>
      <Form<ForgetPasswordFormValues> layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input
            placeholder="abidhasan@gmail.com"
            style={{ height: "50px", width: "481px" }}
          />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-center">
            <Button
              className="bg-[#4B5320] h-12 text-sm text-white font-bold  mt-6"
              htmlType="submit"
            >
              Send Code
            </Button>
          </div>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};

export default ForgetPassword;
