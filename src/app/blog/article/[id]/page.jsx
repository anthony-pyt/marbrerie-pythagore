"use client";

import MainMenu from "@/components/MainMenu";
import PageTitle from "@/components/PageTitle";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import useBlogServices from "@/api/services/blogServices";
import Image from "next/image";
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

export default function ArticlePage({ params }) {
  const { fetchArticle } = useBlogServices();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await fetchArticle(params.id);
        setArticle(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getArticle();
  }, [params.id]);

  useEffect(() => {
    console.log(article);
  }, [article]);

    if (loading) {
      return (
        <main className="min-h-screen flex items-center justify-center">
          <div className="mt-28 flex flex-col items-center">
            <div className="h-32 overflow-hidden flex justify-center items-center">
              <img
                src="/images/loaders/loader-pythagore.gif"
                className="h-40"
              />
            </div>
            <p>Chargement de l'article...</p>
          </div>
        </main>
      );
    }

  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={article.title} />
      {article.imageSrc && (
        <div className="relative h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${article.coverImage})` }}
          ></div>
        </div>
      )}
      <div className="max-w-7xl mx-auto p-6">
        <p className="text-gray-500 text-sm mb-3">
          Publié {moment(article.created_at).fromNow()}
        </p>
        {article.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <Tag key={tag.id} label={tag.label} />
            ))}
          </div>
        )}
        <div
          className="text-gray-700 leading-relaxed p-8"
          dangerouslySetInnerHTML={{ __html: article.body }}
        >
          {/* {article.body} */}
        </div>
      </div>
      <Footer />
    </main>
  );
}

const Tag = ({ label }) => (
  <span className="px-3 py-1 text-sm font-medium text-black bg-or-light rounded-full">
    {label}
  </span>
);
