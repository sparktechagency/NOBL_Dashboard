import { Button, Checkbox, Form, Input } from "antd";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import React from "react";
import Swal from "sweetalert2";
import { useLoginMutation } from "../../redux/apiSlices/authApiSlices";
import AuthWrapper from "../component/share/AuthWrapper";

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const onFinish = async (values: LoginFormValues) => {
    try {
      const res = await login(values).unwrap();
      console.log(res);
      if (res.status) {
        localStorage.setItem("token", res.data?.access_token);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res?.message,
        });
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res?.message,
        });
      }
    } catch (error: any) {
      // Added 'any' type for better error handling
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        // Accessing nested error message if it exists
        text:
          error?.data?.message || error?.message || "An unknown error occurred",
      });
    }
  };

  return (
    // CHANGE 1: Responsive padding for the wrapper
    <AuthWrapper className="py-16 px-6 md:py-28 md:px-24">
      <div className="text-center mb-10">
        <div className="flex py-6 justify-center">
          <h3 className="font-semibold text-2xl text-[#333333]">
            Log in to your account
          </h3>
        </div>
        <p className="text-sm font-normal mb-6 text-[#5C5C5C] ">
          Please enter your email and password to continue
        </p>
      </div>
      <Form<LoginFormValues>
        layout="vertical"
        onFinish={onFinish}
        // Ensure the form itself doesn't have a fixed max-width unless intended
        className="w-full max-w-md mx-auto"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          {/* CHANGE 2: Removed fixed width, using Tailwind classes */}
          <Input
            placeholder="example@gmail.com"
            type="email"
            className="w-full h-12 bg-[#fefefe]"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          {/* CHANGE 2: Removed fixed width, using Tailwind classes */}
          <Input.Password
            iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
            placeholder="**********"
            className="w-full h-12"
          />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-[#818181]">Remember me</Checkbox>
            </Form.Item>

            <Link
              className="login-form-forgot text-[#4B5320] font-medium"
              to="/auth/forget-password"
            >
              Forgot password
            </Link>
          </div>
        </Form.Item>
        <Form.Item>
          <div className="flex justify-center">
            {/* CHANGE 3: Responsive button width */}
            <Button
              className="w-full md:w-auto md:px-16 bg-[#4B5320] h-12 text-sm text-white font-bold mt-6"
              htmlType="submit"
            >
              Sign in
            </Button>
          </div>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};

export default Login;
