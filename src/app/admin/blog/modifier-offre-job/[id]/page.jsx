"use client";

import ArticleForm from "@/admin/components/ArticleForm";


export default function CreerArticle({ params }) {
  return (
    <main className="w-full mx-auto p-6">
      <ArticleForm articleId={params.id}/>
    </main>
  );
}
