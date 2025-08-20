import { Button, Form, Input } from "antd";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

import React from "react";
import Swal from "sweetalert2";
import { useResetPasswordMutation } from "../../redux/apiSlices/authApiSlices";
import AuthWrapper from "../component/share/AuthWrapper";

interface SetNewPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const SetNewPassword: React.FC = () => {
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const [searchData] = useSearchParams();
  const token = searchData.get("token");

  const onFinish = async (values: SetNewPasswordFormValues) => {
    try {
      const res = await resetPassword({ data: values, token });
      if (res?.data?.status) {
        Swal.fire({
          icon: "success",
          title: "Password updated successfully",
          text: res?.data?.message,
        });
        navigate("/auth/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res?.data?.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthWrapper className="px-4 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-24 md:py-28">
      <div className="text-center mb-10 sm:mb-12">
        <div className="flex justify-center py-4 sm:py-6">
          <h3 className="font-semibold text-xl sm:text-2xl text-[#333333]">
            Set a new password
          </h3>
        </div>
        <p className="text-xs sm:text-sm md:text-base font-normal mb-6 text-[#5C5C5C]">
          Create a new password. Ensure it differs from{" "}
          <br className="hidden sm:block" />
          previous ones for security.
        </p>
      </div>

      <Form
        layout="vertical"
        onFinish={onFinish}
        className="w-full max-w-lg mx-auto"
      >
        {/* New Password Field */}
        <Form.Item
          label="New password"
          name="password"
          rules={[
            { required: true, message: "Please enter your new password" },
          ]}
        >
          <Input.Password
            placeholder="Write new password"
            iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
            className="h-12 w-full"
          />
        </Form.Item>

        {/* Confirm Password Field */}
        <Form.Item
          label="Confirm Password"
          name="c_password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Write confirm password"
            iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
            className="h-12 w-full"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <div className="flex justify-center">
            <Button
              className="bg-[#4B5320] w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base text-white font-bold mt-6 px-6 sm:px-10"
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
