import { Button, Form, Input } from "antd";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

import AuthWrapper from "../component/share/AuthWrapper";
import React from "react";
import Swal from "sweetalert2";
import { useResetPasswordMutation } from "../../redux/apiSlices/authApiSlices";

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
    // console.log(values);
    try {
      const res = await resetPassword({ data: values, token });
      // console.log(res);
      if (res?.data?.status) {
        Swal.fire({
          icon: "success",
          title: "Successfully updated done",
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
    <AuthWrapper className="py-28 px-24">
      <div className="text-center mb-12">
        <div className="flex py-6 justify-center">
          <h3 className="font-semibold text-2xl text-[#333333]">
            Set a new password
          </h3>
        </div>
        <p className="text-sm font-normal mb-6 text-[#5C5C5C]">
          Create a new password. Ensure it differs from <br /> previous ones for
          security
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
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
            style={{ height: "50px", width: "481px" }}
          />
        </Form.Item>

        {/* Confirm Password Field */}
        <Form.Item
          label="Confirm Password"
          name="c_password"
          dependencies={["password"]} // Ensures this field updates when the password field changes
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
