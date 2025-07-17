import { Button, Input } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

import React from "react";
import Swal from "sweetalert2";
import { useVerifyOtpMutation } from "../../redux/apiSlices/authApiSlices";
import AuthWrapper from "../component/share/AuthWrapper";

// Assuming `Input.OTP` is a custom input component
interface OTPInputProps {
  size?: "large" | "small" | "middle";
  className?: string;
  style?: React.CSSProperties;
  length: number;
  formatter?: (str: string) => string;
  onChange: (text: string) => void;
}

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();

  const [VerifyEmail] = useVerifyOtpMutation();

  const [searchData] = useSearchParams();
  const email = searchData.get("email");

  // console.log(email);

  // Define the `onChange` handler with the correct type
  const onChange = async (text: string) => {
    // console.log("onChange:", text);
    try {
      const res = await VerifyEmail({
        email: email,
        otp: text,
      }).unwrap();
      if (res?.status) {
        // console.log(res);
        Swal.fire({
          icon: "success",
          title: res?.message,
          text: "Please check you mail",
        });
        navigate(`/auth/set-new-password?token=${res?.data?.access_token}`);
      } else {
        // console.log(res);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res?.message?.email,
        });
      }
    } catch (error) {
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
    <AuthWrapper className="py-32 px-20">
      <div className="text-center mb-12 ">
        <div className="flex py-8 justify-center ">
          <h3 className="font-semibold text-2xl text-[#333333]">
            Verification code
          </h3>
        </div>
        <p className="text-sm font-normal mb-6 text-[#5C5C5C] ">
          We sent a reset link to {email}
          <br />
          enter 5 digit code that is mentioned in the email
        </p>
      </div>

      {/* Assuming `Input.OTP` is a custom component */}
      <Input.OTP
        size="large"
        className="otp-input"
        style={{ width: "100%", height: "50px" }}
        length={6}
        formatter={(str: string) => str.toUpperCase()}
        onChange={onChange}
      />

      <div className="flex justify-center pt-11">
        <Button
          className="bg-[#4B5320] h-12 text-sm text-white font-bold  "
          htmlType="submit"
          onClick={handleVerify}
        >
          Verify Code
        </Button>
      </div>

      <p className="text-center mt-10 text-sm font-normal mb-6 text-[#5C5C5C]">
        You have not received the email?
        <Button className="pl-1 text-[#00B047] " type="link">
          Resend
        </Button>
      </p>
    </AuthWrapper>
  );
};

export default VerifyEmail;
