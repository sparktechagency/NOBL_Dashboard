import { Button, Form, Input } from "antd";

import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForgotPasswordMutation } from "../../redux/apiSlices/authApiSlices";
import AuthWrapper from "../component/share/AuthWrapper";

interface ForgetPasswordFormValues {
  email: string;
}

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();

  const onFinish = async (values: ForgetPasswordFormValues) => {
    try {
      const res = await forgotPassword(values).unwrap();
      if (res?.status) {
        Swal.fire({
          icon: "success",
          title: "Check your email",
          text:
            res?.message ||
            `Password reset instructions sent to ${values.email}`,
        });
        navigate(`/auth/verify?email=${values?.email}`);
      } else {
        // Handle specific API error messages if they exist
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res?.message?.email || res?.message || "Failed to send email.",
        });
      }
    } catch (error: any) {
      console.log(error);
      // A more robust error message display
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "An unexpected error occurred.";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  };

  return (
    // Use the responsive AuthWrapper with optimized padding
    <AuthWrapper className="p-8 md:p-12">
      <div className="text-center mb-10">
        {/* Responsive heading */}
        <h3 className="font-semibold text-2xl sm:text-3xl text-[#333333]">
          Forgot Password?
        </h3>
        {/* Helper text for better UX */}
        <p className="text-base text-[#5C5C5C] mt-4">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      <Form<ForgetPasswordFormValues> layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          {/* Removed fixed inline styles, using Tailwind classes instead */}
          <Input
            placeholder="Enter your registered email"
            className="w-full h-12 bg-[#fefefe] rounded-lg"
          />
        </Form.Item>

        <Form.Item className="mt-6">
          {/* Full-width button for better mobile usability */}
          <Button
            className="w-full bg-[#4B5320] h-12 text-base text-white font-bold rounded-lg hover:bg-opacity-90"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};

export default ForgetPassword;
