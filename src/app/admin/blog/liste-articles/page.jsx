"use client";

import { useEffect, useState, useRef } from "react";
import useBlogServices from "@/api/services/blogServices";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { fetchArticles, deleteArticle } = useBlogServices();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null); // Référence pour détecter les clics à l'extérieur

  const router = useRouter();

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetchArticles();
        setArticles(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, []);

  // Ferme le menu si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    if (openMenu !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  const handleDelete = async (id) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;
    try {
      await deleteArticle(id);
      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  const handleNavigation = (url) => {
    router.push(url);
  };

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <div>
      <div className="flex items-center justify-between space-x-2 mb-4">
        <h1 className="text-2xl font-bold">Liste des articles</h1>
        <button
          className="hover:bg-gray-100 py-1 px-2 rounded flex items-center border space-x-1"
          onClick={() => handleNavigation("/admin/blog/creer-article")}
        >
            <Icon icon={"mdi:plus"} className="h-4 w-4" />
          <span className="text-sm">Créer un article</span>
        </button>
      </div>

      {loading ? (
        <p className="text-center">Chargement des articles...</p>
      ) : articles.length === 0 ? (
        <p className="text-center">Aucun article disponible.</p>
      ) : (
        <div className="relative border text-sm">
          {" "}
          {/* Permet aux menus de dépasser */}
          <table className="min-w-full border-collapse">
            <thead className="border-b bg-gray-100">
              <tr className="text-left">
                <th className="px-3 py-2">Titre</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Publié par</th>
                <th className="px-3 py-2 text-right sr-only">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50 relative">
                  <td className="px-3 py-2">{article.title}</td>
                  <td className="px-3 py-2">
                    {new Date(article.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-3 py-2">{article.user_name}</td>
                  <td className="px-3 py-2 text-right relative text-sm">
                    <button
                      className="hover:bg-slate-100 rounded w-8 h-8"
                      onClick={() => toggleMenu(article.id)}
                    >
                      <Icon
                        icon="mdi:dots-vertical"
                        className="inline-block h-4 w-4"
                      />
                    </button>

                    {openMenu === article.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-3 mt-05 w-32 bg-white border rounded shadow-md z-50"
                      >
                        <button
                          className="flex items-center px-4 py-2 w-full hover:bg-gray-100"
                          onClick={() =>
                            handleNavigation(`/blog/article/${article.id}`)
                          }
                        >
                          Voir
                        </button>
                        <button
                          className="flex items-center px-4 py-2 w-full hover:bg-gray-100"
                          onClick={() =>
                            handleNavigation(
                              `/admin/blog/modifier-article/${article.id}`
                            )
                          }
                        >
                          Modifier
                        </button>
                        <button
                          className="flex items-center px-4 py-2 w-full text-red-600 hover:bg-red-100 border-t"
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
      )}
    </div>
  );
}
