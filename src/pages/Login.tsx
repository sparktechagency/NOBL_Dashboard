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
    // console.log(values);
    try {
      const res = await login(values).unwrap();
      console.log(res);
      if (res.status) {
        localStorage.setItem("token", res.data?.access_token);
        // localStorage.setItem("user",res.data?.user)
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
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.message,
      });
    }
  };

  return (
    <AuthWrapper className=" py-28 px-24">
      <div className="text-center mb-12">
        {/* <Title>Login</Title> */}
        <div className="flex py-6 justify-center">
          <h3 className="font-semibold text-2xl text-[#333333]">
            Log in to your account
          </h3>
        </div>
        <p className="text-sm font-normal mb-6 text-[#5C5C5C] ">
          Please enter your email and password to continue
        </p>
      </div>
      <Form<LoginFormValues> layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input
            placeholder="example@gmail.com"
            type="email"
            style={{
              height: "50px",
              width: "481px",
              backgroundColor: "#fefefe",
            }}
            className="bg-[#fefefe]"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
            placeholder="**********"
            style={{ height: "50px", width: "481px" }}
          />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-[#818181]">Remember me</Checkbox>
            </Form.Item>

            <Link
              className="login-form-forgot text-[#4B5320]"
              to="/auth/forget-password"
            >
              Forgot password
            </Link>
          </div>
        </Form.Item>
        <Form.Item>
          <div className="flex justify-center">
            <Button
              className="bg-[#4B5320] h-12 text-sm text-white font-bold  mt-6"
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
