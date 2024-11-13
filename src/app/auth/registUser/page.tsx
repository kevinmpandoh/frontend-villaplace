// pages/registerUser.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const RegisterUser = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="mb-8">
          <Image src="/assets/images/logo.png" alt="Logo" width={100} height={100} />
        </div>

        <form className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center">Daftar sebagai User</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" placeholder="Username" className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" placeholder="Email" className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" placeholder="Password" className="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700">
            Daftar
          </button>
        </form>

        <p className="mt-4 text-gray-500">
          Sudah punya akun? <Link href="/auth/login" className="text-green-600 hover:underline">Masuk</Link>
        </p>
      </div>

      <div className="hidden md:flex md:w-1/2 relative">
        <Image src="/assets/images/villa.png" alt="Villa Background" layout="fill" objectFit="cover" className="rounded-r-lg object-cover h-full w-full" />
      </div>
    </div>
  );
};

export default RegisterUser;
