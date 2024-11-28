import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SidebarAdmin from "@/components/SidebarAdmin";
import SidebarProfile from "@/components/SidebarProfile";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarAdmin />
      <main>
        <div>{children}</div>
      </main>
    </>
  );
}
