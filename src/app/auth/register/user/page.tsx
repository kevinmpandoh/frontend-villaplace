// pages/registerUser.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import RegisFormUser from "@/components/Auth/RegisFormUser";

const RegisterUser = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="mb-8">
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>

        <RegisFormUser />

        <p className="mt-4 text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/auth/login" className="text-green-600 hover:underline">
            Masuk
          </Link>
        </p>
      </div>

      <div className="hidden md:flex md:w-1/2 relative">
        <Image
          src="/assets/images/villa.png"
          alt="Villa Background"
          layout="fill"
          objectFit="cover"
          className="rounded-r-lg object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default RegisterUser;
