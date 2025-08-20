import { Button, Input } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

import React from "react";
import Swal from "sweetalert2";
import { useVerifyOtpMutation } from "../../redux/apiSlices/authApiSlices";
import AuthWrapper from "../component/share/AuthWrapper";

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [VerifyEmail] = useVerifyOtpMutation();
  const [searchData] = useSearchParams();
  const email = searchData.get("email");

  const onChange = async (text: string) => {
    try {
      const res = await VerifyEmail({
        email: email,
        otp: text,
      }).unwrap();

      if (res?.status) {
        Swal.fire({
          icon: "success",
          title: res?.message,
          text: "Please check your mail",
        });
        navigate(`/auth/set-new-password?token=${res?.data?.access_token}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res?.message?.email,
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.data || error?.message,
      });
    }
  };

  const handleVerify = () => {
    navigate("/auth/set-new-password");
  };

  return (
    <AuthWrapper className="px-4 sm:px-8 md:px-16 lg:px-20 py-16 sm:py-24 md:py-32">
      <div className="text-center mb-10 sm:mb-12">
        <div className="flex justify-center py-6 sm:py-8">
          <h3 className="font-semibold text-xl sm:text-2xl text-[#333333]">
            Verification Code
          </h3>
        </div>
        <p className="text-xs sm:text-sm md:text-base font-normal mb-6 text-[#5C5C5C]">
          We sent a reset link to <span className="font-medium">{email}</span>
          <br className="hidden sm:block" />
          Enter the 6-digit code mentioned in the email
        </p>
      </div>

      {/* OTP Input */}
      <Input.OTP
        size="large"
        className="otp-input"
        style={{ width: "100%", height: "50px" }}
        length={6}
        formatter={(str: string) => str.toUpperCase()}
        onChange={onChange}
      />

      <div className="flex justify-center pt-8 sm:pt-11">
        <Button
          className="bg-[#4B5320] w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base text-white font-bold"
          htmlType="submit"
          onClick={handleVerify}
        >
          Verify Code
        </Button>
      </div>

      <p className="text-center mt-8 sm:mt-10 text-xs sm:text-sm font-normal text-[#5C5C5C]">
        You have not received the email?
        <Button className="pl-1 text-[#00B047]" type="link">
          Resend
        </Button>
      </p>
    </AuthWrapper>
  );
};

export default VerifyEmail;
