import React from "react";

const AuthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={` bg-[#ffffff] shadow-lg border rounded-xl ${className}`}>{children}</div>
  );
};

export default AuthWrapper;
