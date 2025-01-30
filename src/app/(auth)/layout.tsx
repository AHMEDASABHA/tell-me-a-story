import Image from "next/image";
import React from "react";
import loginImage from "../../assets/images/login.png";

// Define a layout component for the authentication pages
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Image
        className="md:w-1/2 md:flex hidden h-full"
        src={loginImage}
        alt="Story App Login Page"
        objectFit="cover"
      />
      <div className="w-full md:w-1/2 flex justify-center items-center bg-primary h-full">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
