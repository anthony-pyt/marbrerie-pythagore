"use client";

import { useEffect, useState } from "react";
import useBlogServices from "@/api/services/blogServices";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { fetchArticles } = useBlogServices();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const rooter = useRouter();

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

  const handleDelete = async (id) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;
    try {
      await deleteArticle(id);
      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  const handleNavigation = (id) => {
    rooter.push(`/blog/article/${id}`);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Liste des articles</h1>

      {loading ? (
        <p className="text-center">Chargement des articles...</p>
      ) : articles.length === 0 ? (
        <p className="text-center">Aucun article disponible.</p>
      ) : (
        <table className="min-w-full overflow-hidden rounded-xl shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-3 py-4">Titre</th>
              <th className="px-3 py-4">Date</th>
              <th className="px-3 py-4">Publié par</th>
              <th className="px-3 py-4 flex justify-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-3 py-4">{article.title}</td>
                <td className="px-3 py-4">
                  {new Date(article.created_at).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-3 py-4">
                  {article.user_name}
                </td>
                <td className="px-3 p flex space-x-2 justify-end items-center">
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => handleNavigation(article.id)}
                  >
                    <Icon
                      icon="mdi:eye-outline"
                      className="inline-block mr-1 h-6 w-6"
                    />
                  </button>
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => alert("Modifier l'article " + article.id)}
                  >
                    <Icon
                      icon="mdi:pencil"
                      className="inline-block mr-1 h-6 w-6"
                    />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(article.id)}
                  >
                    <Icon
                      icon="mdi:trash-can"
                      className="inline-block mr-1 h-6 w-6"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
