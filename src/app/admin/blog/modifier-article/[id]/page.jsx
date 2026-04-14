"use client";

import ArticleForm from "@/admin/components/ArticleForm";
import { use } from "react";


export default function Page({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  return (
    <main className="w-full mx-auto p-6">
      <ArticleForm articleId={id}/>
    </main>
  );
}
