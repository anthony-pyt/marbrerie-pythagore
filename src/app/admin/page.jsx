"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import useBlogServices from "@/api/services/blogServices";
import useJobOffersServices from "@/api/services/jobOffersServices";

export default function AdminDashboard() {
  const { countArticles } = useBlogServices();
  const { countJobOffers } = useJobOffersServices();
  const [counts, setCounts] = useState({ articles: 0, jobOffers: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const [articlesResponse, offersResponse] = await Promise.allSettled([
          countArticles(),
          countJobOffers(),
        ]);

        setCounts({
          articles:
            articlesResponse.status === "fulfilled"
              ? articlesResponse.value.data
              : 0,
          jobOffers:
            offersResponse.status === "fulfilled"
              ? offersResponse.value.data
              : 0,
        });
      } catch (error) {
        console.error("Erreur stats", error);
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, []);

  return (
    <div className="bg-white min-h-screen p-4 md:p-0">
      {/* Header - S'adapte en colonne sur mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-12 border-b border-black pb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase">
          Tableau de Bord
        </h2>
        <button
          className="bg-black text-white hover:bg-zinc-800 py-3 px-6 flex items-center justify-center space-x-2 transition-all duration-300 w-full sm:w-auto"
          onClick={() => router.push("/admin/blog/creer-article")}
        >
          <Icon icon={"mdi:plus"} className="h-4 w-4" />
          <span className="text-[10px] uppercase tracking-widest font-bold">
            Nouveau Contenu
          </span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Icon
            icon="svg-spinners:ring-resize"
            className="w-8 h-8 text-black"
          />
        </div>
      ) : (
        /* Grille responsive : 1 col mobile, 2 cols desktop */
        /* Les bordures sont gérées pour éviter les doubles traits */
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-black">
          <StatCard
            title="Articles"
            value={counts.articles}
            description="Articles en ligne"
            url="/admin/blog/liste-articles"
            router={router}
          />
          <StatCard
            title="Opportunités"
            value={counts.jobOffers}
            description="Annonces en cours"
            url="/admin/liste-jobs"
            router={router}
          />
        </div>
      )}

      {/* Section Bas de page - Grille flexible */}
      <div className="mt-12 border border-black p-6 md:p-10">
        <h2 className="text-[10px] uppercase tracking-[0.3em] mb-8 text-zinc-400 font-bold">
          Système & Gestion
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border-b border-zinc-200 py-4 italic text-sm text-zinc-400 font-serif"
            >
              Module {i.toString().padStart(2, "0")} — En attente
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ title, value, description, url, router }) => {
  return (
    <div
      className="border-r border-b border-black p-8 md:p-12 group hover:bg-black transition-colors duration-700 cursor-pointer flex flex-col justify-between min-h-[250px] md:min-h-[350px]"
      onClick={() => router.push(url)}
    >
      <div className="flex justify-between items-start">
        <div className="w-full">
          <h2 className="text-[10px] uppercase tracking-[0.4em] mb-6 md:mb-12 text-zinc-500 group-hover:text-zinc-400 transition-colors font-bold">
            {title}
          </h2>
          <p className="text-6xl md:text-8xl font-light tracking-tighter group-hover:text-white transition-all duration-500 group-hover:translate-x-2">
            {value.toString().padStart(2, "0")}
          </p>
        </div>
        <Icon
          icon="mdi:arrow-top-right"
          className="text-black group-hover:text-white w-5 h-5 md:w-8 md:h-8 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>

      <div className="mt-8">
        <div className="h-[1px] w-8 bg-zinc-300 mb-4 group-hover:w-full group-hover:bg-zinc-700 transition-all duration-700"></div>
        <p className="text-xs md:text-sm font-serif italic text-zinc-500 group-hover:text-zinc-400 transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
};
