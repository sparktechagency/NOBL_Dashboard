import React from "react";
import AuthWrapper from "../component/share/AuthWrapper";
import Title from "../component/share/Title";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Images/logoChoozy.svg";

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

  // Define the `onChange` handler with the correct type
  const onChange = (text: string) => {
    console.log("onChange:", text);
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
          We sent a reset link to contact@dscode...com <br />
          enter 5 digit code that is mentioned in the email
        </p>
      </div>

      {/* Assuming `Input.OTP` is a custom component */}
      <Input.OTP
        size="large"
        className="otp-input"
        style={{ width: "100%", height: "50px" }}
        length={5}
        formatter={(str: string) => str.toUpperCase()}
        onChange={onChange}
      />

      <div className="flex justify-center pt-11">
        <Button
          className="bg-[#4B5320] h-12 text-sm text-white font-bold  "
          htmlType="submit"
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
