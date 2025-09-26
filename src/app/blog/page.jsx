"use client";
import { cn } from "../lib/utils";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconAdCircleOff,
} from "@tabler/icons-react";
import MainMenu from "./../components/MainMenu";
import PageTitle from "./../components/PageTitle";
import Image from "next/image";
import Footer from "./../components/Footer";
import useBlogServices from "@/api/services/blogServices";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/fr";
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

  useEffect(() => {
    console.log(articles);
  }, [articles]);

  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={"Blog"} />
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          {articles.length > 0 ? (
            articles.map((article) => (
              <BlogItem key={article.id} article={article} />
            ))
          ) : (
            <p>Aucun article trouvé.</p>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}

const BlogItem = ({ article }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex">
      {/* 📸 Image à gauche */}
      <div className="w-1/3 relative min-h-[150px]">
        <img
          src={article.coverImage} // Remplace par ton image par défaut
          alt={article.title}
          fill
          className="object-cover w-full h-full"
        />
      </div>

      {/* 📝 Contenu à droite */}
      <div className="w-2/3 p-6">
        <div className="text-gray-500 text-sm flex flex-col items-end">
          <p>{moment(article.updated_at).fromNow()}</p>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {article.title}
        </h2>
        {article.tags && (
          <div className="flex flex-wrap gap-2 mb-3">
            {article.tags.map((tag) => (
              <Tag key={tag.id} label={tag.label} />
            ))}
          </div>
        )}
        <div className="prose line-clamp-3"
          dangerouslySetInnerHTML={{ __html: article.body }}
        >
          {/* {article.body} */}
        </div>
        <div className="mt-4 flex justify-end">
          <a
            href={`/blog/article/${article.id}`}
            className="text-or hover:underline"
          >
            Lire la suite →
          </a>
        </div>
      </div>
    </div>
  );
};

const Tag = ({ label }) => (
  <span className="px-3 py-1 text-sm font-medium text-black bg-or-light rounded-full">
    {label}
  </span>
);
