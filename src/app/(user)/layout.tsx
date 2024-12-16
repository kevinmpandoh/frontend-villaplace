import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import { cookies } from "next/headers";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore.getAll();
  return (
    <>
      <Navbar token={token} />
      <main>
        <div className="bg-gray-100">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
