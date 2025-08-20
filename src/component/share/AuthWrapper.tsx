// src/components/share/AuthWrapper.tsx

import React from "react";

const AuthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`
        bg-white w-full
        md:max-w-lg md:shadow-lg md:border md:rounded-xl 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default AuthWrapper;
