"use client";
import MainMenu from "./../components/MainMenu";
import PageTitle from "./../components/PageTitle";
import Footer from "./../components/Footer";
import useBlogServices from "@/api/services/blogServices";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/fr";
import { motion } from "framer-motion";

moment.locale("fr");

export default function Page() {
  const { fetchArticles } = useBlogServices();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={"Journal & Inspirations"} />

      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 gap-24">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <BlogItem key={article.id} article={article} index={index} />
            ))
          ) : (
            <div className="py-20 text-center border border-white/10">
              <p className="text-gray-500 uppercase tracking-widest text-xs">
                {loading
                  ? "Chargement des archives..."
                  : "Aucun article trouvé."}
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}

const BlogItem = ({ article, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      // On ajoute "group" sur le parent pour piloter les animations internes au survol de la fiche
      className={`relative flex flex-col md:flex-row gap-12 items-center group hover:bg-secondary/10 duration-500 ${
        index % 2 !== 0 ? "md:flex-row-reverse pl-2" : "pr-2"
      }`}
    >
      {/* 🔗 Lien invisible qui couvre toute la zone */}
      <a
        href={`/blog/article/${article.id}`}
        className="absolute inset-0 z-20"
        aria-label={`Lire l'article : ${article.title}`}
      />

      {/* 📸 Image Bloc Architectural */}
      <div className="w-full md:w-1/2 overflow-hidden border border-white/5 relative aspect-[16/10]">
        <img
          src={article.coverImage || "/images/placeholder.jpg"}
          alt={article.title}
          // On utilise "group-hover" pour l'animation d'image
          className="object-cover w-full h-full transform transition-all duration-1000 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* 📝 Contenu */}
      <div className="w-full md:w-1/2 flex flex-col z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-or text-[10px] uppercase tracking-[0.3em] font-bold">
            {moment(article.updated_at).format("DD.MM.YYYY")}
          </span>
          <div className="h-[1px] w-8 bg-white/20" />
        </div>

        <h2 className="text-3xl md:text-4xl font-light mb-6 uppercase tracking-wider leading-tight group-hover:text-or transition-colors duration-500">
          {article.title}
        </h2>

        {article.tags && (
          <div className="flex flex-wrap gap-4 mb-8">
            {article.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-[9px] text-gray-400 uppercase tracking-widest border border-white/10 px-3 py-1"
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}

        <div
          className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-8 font-light italic"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        <div className="mt-auto">
          <div className="inline-flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.4em] group-hover:text-or transition-colors">
              Lire l&apos;article
            </span>
            <div className="h-[1px] w-20 bg-or transform origin-left group-hover:scale-x-125 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
