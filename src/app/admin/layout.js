"use client";
import { Inter } from "next/font/google";
import "./../../app/globals.css";
import "animate.css";
import { usePathname } from "next/navigation";
import Loader from "@/components/loader";
import { useEffect, useState } from "react";
import { logout } from "@/api/services/authServices";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Fermé par défaut sur mobile
  const router = useRouter();

  // Gestion du chargement lors de la navigation
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
    setLoading(false);
    setSidebarOpen(false); // Ferme automatiquement le menu mobile après navigation
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div
      className={`min-h-screen bg-white ${inter.className} overflow-x-hidden`}
    >
      {loading && <Loader />}

      {/* Header Mobile / Titre Desktop */}
      <header className="flex items-center justify-between p-4 md:p-8 border-b border-black">
        <h1 className="text-xl md:text-7xl font-light tracking-[0.2em] md:tracking-widest uppercase">
          Administration
        </h1>
        {/* Toggle Burger pour Mobile uniquement */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 border border-black"
        >
          <Icon
            icon={sidebarOpen ? "ph:x-thin" : "ph:list-thin"}
            className="w-6 h-6"
          />
        </button>
      </header>

      <div className="flex min-h-screen relative">
        {/* Overlay pour Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed top-0 md:relative z-50 h-full md:h-auto pt-16 lg:pt-0
            transition-all duration-500 ease-in-out
            border-r border-black bg-white flex flex-col
            ${sidebarOpen ? "translate-x-0 w-72" : "-translate-x-full w-72 md:translate-x-0 md:w-20 lg:w-72"}
            md:translate-x-0
          `}
        >
          <nav className="flex-1 overflow-y-auto">
            <NavItem
              icon="ph:layout-thin"
              text="Dashboard"
              active={pathname === "/admin"}
              onClick={() => router.push("/admin")}
            />
            <NavItem
              icon="ph:article-thin"
              text="Articles"
              active={pathname.includes("articles")}
              onClick={() => router.push("/admin/blog/liste-articles")}
            />
            <NavItem
              icon="ph:briefcase-thin"
              text="Jobs"
              active={pathname.includes("jobs")}
              onClick={() => router.push("/admin/liste-jobs")}
            />
          </nav>

          <div className="border-t border-black bg-white">
            <NavItem
              icon="ph:power-thin"
              text="Déconnexion"
              onClick={handleLogout}
              danger
            />
          </div>
        </aside>

        {/* Zone de contenu principale */}
        <main className="flex-1 p-4 md:p-10 w-full overflow-hidden">
          <div className="max-w-7xl mx-auto animate__animated animate__fadeIn">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

/* 🔹 Composant NavItem - Adaptatif */
const NavItem = ({ icon, text, onClick, active, danger }) => (
  <div
    className={`
      flex items-center space-x-4 px-6 py-5 cursor-pointer transition-all duration-300
      ${active ? "bg-black text-white" : "text-black hover:bg-zinc-100"}
      ${danger ? "hover:bg-red-600 hover:text-white" : ""}
    `}
    onClick={onClick}
  >
    <div className="flex-shrink-0">
      <Icon icon={icon} className="w-6 h-6" />
    </div>
    {/* On cache le texte sur tablette (md) mais on le montre sur mobile et grand écran (lg) */}
    <span className="text-[10px] uppercase tracking-[0.3em] font-medium overflow-hidden whitespace-nowrap block md:hidden lg:block">
      {text}
    </span>
  </div>
);
