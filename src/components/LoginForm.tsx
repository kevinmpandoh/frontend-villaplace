"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const LoginForm = () => {
  const [isUser, setIsUser] = useState(true);

  return (
    <div className="w-full max-w-sm">
      {/* Tabs */}
      <div className="flex justify-center gap-7 mb-16">
        <button
          className={`text-4xl font-semibold px-4 py-2 ${isUser ? 'text-black border-b-2 border-green-500' : 'text-gray-500'}`}
          onClick={() => setIsUser(true)}
        >
          User
        </button>
        <button
          className={`text-4xl font-semibold px-4 py-2 ${!isUser ? 'text-brown-500 border-b-2 border-brown-500' : 'text-gray-500'}`}
          onClick={() => setIsUser(false)}
        >
          Mitra
        </button>
      </div>

      {/* Form */}
      <form className="space-y-10">
        <div>
          <label htmlFor="username" className="block text-sm font-bold text-gray-700">Username</label>
          <input type="text" id="username" className="block w-full border-b-2 border-green-500 focus:outline-none focus:border-green-600" placeholder="Enter Username" required />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-bold text-gray-700">Password</label>
          <input type="password" id="password" className="block w-full border-b-2 border-green-500 focus:outline-none focus:border-green-600" placeholder="Enter Password" required />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-3 mt-11 mb-3 rounded-3xl hover:bg-green-700 transition">
          Masuk
        </button>

        <p className="text-center text-gray-600">
          Tidak punya akun? <Link href={isUser ? "/registUser" : "/registMitra"} className="text-black font-bold">Daftar sekarang</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
