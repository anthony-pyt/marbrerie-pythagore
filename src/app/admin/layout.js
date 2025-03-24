"use client";
import { Inter } from "next/font/google";
import "./../../app/globals.css";
import "animate.css";
import { usePathname } from "next/navigation";
import Loader from "@/components/loader";
import { metadata } from "@/datas/metadata";
import { useEffect, useState } from "react";
import MainMenu from "@/components/MainMenu";
import PageTitle from "@/components/PageTitle";
import { logout } from "@/api/services/authServices";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target.closest("a");
      if (target && target.href.startsWith(window.location.origin)) {
        setLoading(true);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    setLoading(false); // Arrête le loader quand la page a changé
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen">
      {loading && <Loader />}
      <MainMenu />
      <PageTitle title={"Administration"} />

      <div className="flex min-h-screen">
        <aside
          className={`p-4 transition-all ${sidebarOpen ? "w-64" : "w-20"}`}
        >
          <div className="flex justify-between items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-md hover:bg-gray-200"
            >
              {sidebarOpen ? (
                <Icon icon="hugeicons:sidebar-left-01" width="24" height="24" />
              ) : (
                <Icon
                  icon="hugeicons:sidebar-right-01"
                  width="24"
                  height="24"
                />
              )}
            </button>
          </div>

          <nav className="mt-8 space-y-4">
            <NavItem
              icon="mdi:view-dashboard"
              text="Dashboard"
              sidebarOpen={sidebarOpen}
              onClick={() => router.push("/admin")}
            />
            <NavItem
              icon="mdi:post-it-note-add-outline"
              text="Créer un article"
              sidebarOpen={sidebarOpen}
              onClick={() => router.push("/admin/blog/creer-article")}
            />
            <NavItem
              icon="mdi:logout"
              text="Déconnexion"
              sidebarOpen={sidebarOpen}
              onClick={handleLogout}
            />
          </nav>
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

/* 🔹 Composant NavItem */
const NavItem = ({ icon, text, sidebarOpen, onClick }) => (
  <div
    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 cursor-pointer transition"
    onClick={onClick}
    as="button"
  >
    <Icon size={22} className="text-gray-700" icon={icon} />
    {sidebarOpen && <span className="text-gray-700">{text}</span>}
  </div>
);
