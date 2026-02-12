"use client";

import { useEffect, useState, useRef } from "react";
import useBlogServices from "@/api/services/blogServices";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export default function AdminArticlesList() {
  const { fetchArticles, deleteArticle } = useBlogServices();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetchArticles();
        setArticles(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    if (openMenu !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  const handleDelete = async (id) => {
    if (!confirm("CONFIRMATION : Supprimer définitivement cet article ?"))
      return;
    try {
      await deleteArticle(id);
      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      console.error("Erreur suppression", error);
    }
  };

  return (
    <div className="bg-white min-h-screen px-4 md:px-0">
      {/* Header Luxe - S'adapte en colonne sur mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-12 border-b border-black pb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase">
          Articles
        </h1>
        <button
          className="bg-black text-white hover:bg-zinc-800 py-3 px-6 md:px-8 flex items-center justify-center space-x-3 transition-all duration-300 w-full sm:w-auto"
          onClick={() => router.push("/admin/blog/creer-article")}
        >
          <Icon icon={"mdi:plus"} className="h-5 w-5" />
          <span className="text-[10px] uppercase tracking-widest font-medium">
            Nouvelle Publication
          </span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Icon
            icon="svg-spinners:ring-resize"
            className="w-10 h-10 text-black"
          />
        </div>
      ) : articles.length === 0 ? (
        <p className="text-center italic text-gray-400 py-20 font-serif">
          La collection est actuellement vide.
        </p>
      ) : (
        <div className="border border-black">
          <div className="">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="bg-black text-white text-[10px] uppercase tracking-[0.2em]">
                  <th className="hidden md:table-cell px-6 py-4 font-medium">
                    Visuel
                  </th>
                  <th className="px-4 md:px-6 py-4 font-medium">
                    Titre de l&apos;œuvre
                  </th>
                  <th className="hidden lg:table-cell px-6 py-4 font-medium">
                    Date
                  </th>
                  <th className="hidden sm:table-cell px-6 py-4 font-medium">
                    Auteur
                  </th>
                  <th className="px-4 md:px-6 py-4 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black">
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="hover:bg-zinc-50 transition-colors group"
                  >
                    {/* Visuel masqué sur mobile */}
                    <td className="hidden md:table-cell px-6 py-4">
                      <div className="w-16 h-16 border border-zinc-200 overflow-hidden bg-zinc-100">
                        <img
                          src={article.coverImage}
                          alt=""
                          className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 hover:scale-110"
                        />
                      </div>
                    </td>

                    <td className="px-4 md:px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium uppercase">
                          {article.title}
                        </span>
                        {/* Info de secours visible uniquement sur mobile */}
                        <span className="md:hidden text-[9px] text-zinc-400 mt-1 uppercase tracking-tighter">
                          {new Date(article.created_at).toLocaleDateString(
                            "fr-FR",
                          )}{" "}
                          — {article.user_name}
                        </span>
                      </div>
                    </td>

                    {/* Date masquée sur tablette/mobile */}
                    <td className="hidden lg:table-cell px-6 py-4 text-[11px] font-serif italic text-gray-500">
                      {new Date(article.created_at).toLocaleDateString("fr-FR")}
                    </td>

                    {/* Auteur masqué sur mobile */}
                    <td className="hidden sm:table-cell px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400">
                      {article.user_name}
                    </td>

                    <td className="px-4 md:px-6 py-4 text-right relative">
                      <button
                        className="p-2 hover:bg-black hover:text-white transition-colors duration-200 border border-transparent hover:border-black"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === article.id ? null : article.id,
                          )
                        }
                      >
                        <Icon icon="mdi:dots-horizontal" className="h-5 w-5" />
                      </button>

                      {openMenu === article.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-4 md:right-10 top-12 w-40 md:w-48 bg-white border border-black z-50 shadow-2xl"
                        >
                          <button
                            className="flex items-center px-4 py-3 w-full text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors border-b border-zinc-100"
                            onClick={() =>
                              router.push(`/blog/article/${article.id}`)
                            }
                          >
                            Consulter
                          </button>
                          <button
                            className="flex items-center px-4 py-3 w-full text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors border-b border-zinc-100"
                            onClick={() =>
                              router.push(
                                `/admin/blog/modifier-article/${article.id}`,
                              )
                            }
                          >
                            Éditer
                          </button>
                          <button
                            className="flex items-center px-4 py-3 w-full text-[10px] uppercase tracking-widest text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                            onClick={() => handleDelete(article.id)}
                          >
                            Supprimer
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
