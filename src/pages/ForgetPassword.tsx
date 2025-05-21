import { Button, Form, Input } from "antd";

import AuthWrapper from "../component/share/AuthWrapper";
import React from "react";
import Swal from "sweetalert2";
import { useForgotPasswordMutation } from "../../redux/apiSlices/authApiSlices";
import { useNavigate } from "react-router-dom";

interface ForgetPasswordFormValues {
  email: string;
}

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();

  const onFinish = async (values: ForgetPasswordFormValues) => {
    console.log(values);
    try {
      const res = await forgotPassword(values).unwrap();
      if (res?.status) {
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res?.message,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.data || error?.message,
      });
    }
    // navigate("/auth/verify");
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
