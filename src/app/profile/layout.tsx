"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      <nav className="bg-white shadow-md mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/assets/images/logo.png"
                alt="VillaPlace Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </div>
            <div className="flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-gray-900">
                Home
              </a>
              <a href="/about" className="text-gray-700 hover:text-gray-900">
                About
              </a>
              <a href="/kategori" className="text-gray-700 hover:text-gray-900">
                Kategori
              </a>
              <a href="/contact" className="text-gray-700 hover:text-gray-900">
                Contact
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/registUser">
                <button className="border border-brown-500 text-brown-500 hover:text-gray-900 px-3 py-1 rounded-lg">
                  Daftar
                </button>
              </Link>
              <Link href="/login">
                <button className="bg-brown-500 text-white px-3 py-1 rounded-md hover:bg-brown-600">
                  + Masuk
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="flex-col flex md:flex-row max-w-screen-xl md:h-[650px] mx-auto px-4">
        <aside className="md:w-1/3 w-full h-full mr-4 mb-5">
          <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
            <div className="flex flex-col items-center py-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="/assets/images/profile-default.png"
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Kevin Pandoh
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                kevinmpandoh@gmail.com
              </span>
            </div>
          </div>
          <div className="w-full h-3/5 mt-4 py-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col  ">
              <ul className="">
                <li>
                  <Link href={"/profile/user"}>
                    <div className="flex w-full max-w-full items-center justify-between py-3 pl-8 font-medium text-zinc-950 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                      <div className="flex w-full items-center justify-center">
                        <div className="text mr-3 mt-2 text-zinc-950 dark:text-white ">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="-mt-[7px] h-4 w-4 stroke-2 text-inherit"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            ></path>
                          </svg>
                        </div>
                        <p className="mr-auto text-md font-semibold text-zinc-950 dark:text-zinc-400">
                          Profile
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/profile/change-password">
                    <div className="flex w-full max-w-full items-center justify-between py-3 pl-8 bg-[#089562] bg-opacity-15 font-semibold text-white dark:bg-white dark:text-zinc-950 hover:bg-opacity-20 ">
                      <div className="flex w-full items-center justify-center">
                        <div className="text mr-3 mt-2 font-semibold text-[#089562] dark:text-zinc-950 ">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="-mt-[7px] h-4 w-4 stroke-2 text-inherit"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
                            ></path>
                          </svg>
                        </div>
                        <p className="mr-auto text-md font-semibold text-[#089562] dark:text-zinc-950">
                          Ganti Password
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={"/profile/bookings"}>
                    <div className="flex w-full max-w-full items-center justify-between py-3 pl-8 font-medium text-zinc-950 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                      <div className="flex w-full items-center justify-center">
                        <div className="text mr-3 mt-2 text-zinc-950 dark:text-white ">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="-mt-[7px] h-4 w-4 stroke-2 text-inherit"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            ></path>
                          </svg>
                        </div>
                        <p className="mr-auto text-md font-semibold text-zinc-950 dark:text-zinc-400">
                          Pesanan Saya
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={"/profile/favorite"}>
                    <div className="flex w-full max-w-full items-center justify-between py-3 pl-8 font-medium text-zinc-950 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                      <div className="flex w-full items-center justify-center">
                        <div className="text mr-3 mt-2 text-zinc-950 dark:text-white ">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="-mt-[7px] h-4 w-4 stroke-2 text-inherit"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            ></path>
                          </svg>
                        </div>
                        <p className="mr-auto text-md font-semibold text-zinc-950 dark:text-zinc-400">
                          Favorite
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={"/logout"}>
                    <div className="flex w-full max-w-full items-center justify-between py-3 pl-8 font-medium text-zinc-950 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                      <div className="flex w-full items-center justify-center">
                        <div className="text mr-3 mt-2 text-zinc-950 dark:text-white ">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="-mt-[7px] h-4 w-4 stroke-2 text-inherit"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            ></path>
                          </svg>
                        </div>
                        <p className="mr-auto text-md font-semibold text-zinc-950 dark:text-zinc-400">
                          Keluar
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <main className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {/* buat card */}
          <div className="px-12 py-5 h-full">
            <div className=" p-2 border-b-2 border-gray-200 mb-5">
              <h1 className="text-lg font-bold">Villa Saya</h1>
            </div>
            {children}
          </div>
        </main>
      </section>
    </>
  );
}
