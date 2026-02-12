"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import Button from "@/components/Button";
import useBlogServices from "@/api/services/blogServices";
import useTagService from "@/api/services/tagsServices";
import { useRouter } from "next/navigation";
import QuillEditor from "@/components/QuillEditor";

export default function ArticleForm({ articleId = null }) {
  const { storeArticle, fetchArticle, updateArticle } = useBlogServices();
  const { fetchTags } = useTagService();
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [predefinedTags, setPredefinedTags] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingSend, setLoadingSend] = useState(false);
  const router = useRouter();

  // Style de l'éditeur version Luxe (Angles droits & Serif)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        const editor = document.querySelector(".ql-editor");
        const toolbar = document.querySelector(".ql-toolbar");
        const container = document.querySelector(".ql-container");

        if (editor && toolbar && container) {
          editor.style.minHeight = "500px";
          editor.style.fontFamily = "serif";
          editor.style.fontSize = "1.1rem";

          container.style.border = "1px solid black";
          container.style.borderRadius = "0px";

          toolbar.style.border = "1px solid black";
          toolbar.style.borderBottom = "none";
          toolbar.style.borderRadius = "0px";

          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (articleId) {
      const getArticle = async () => {
        try {
          const response = await fetchArticle(articleId);
          setTitle(response.title);
          setContent(response.body);
          setPhoto(response.coverImage);
          setTags(response.tags.map((tag) => tag.label));
        } catch (error) {
          console.error("Erreur récupération article", error);
        }
      };
      getArticle();
    }
  }, [articleId]);

  useEffect(() => {
    const getTags = async () => {
      const res = await fetchTags();
      setPredefinedTags(res);
    };
    getTags();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image", "blockquote"],
        ["clean"],
      ],
    }),
    [],
  );

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setPhoto(reader.result);
    }
  };

  const handleTagToggle = (tagLabel) => {
    setTags((prev) =>
      prev.includes(tagLabel)
        ? prev.filter((t) => t !== tagLabel)
        : [...prev, tagLabel],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSend(true);
    setErrorMessage(null);
    try {
      const userName = user ? user.full_name : "Anonyme";
      const payload = { title, photo, content, tags, userName };

      articleId
        ? await updateArticle(articleId, payload)
        : await storeArticle(payload);
      router.push("/admin/blog/liste-articles");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Une erreur est survenue",
      );
    } finally {
      setLoadingSend(false);
    }
  };

  // Styles partagés Brutalistes
  const labelStyle =
    "text-[10px] uppercase tracking-[0.3em] font-bold text-black";

  return (
    <div className="max-w-5xl mx-auto pb-32">
      {/* Header Luxe */}
      <header className="mb-12 border-b border-black pb-8">
        <h1 className="text-3xl font-light tracking-[0.2em] uppercase">
          {articleId ? "Édition de l'éditorial" : "Nouvelle Rédaction"}
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-16">
        {/* Section Titre */}
        <section className="space-y-4">
          <label className={labelStyle}>Titre de l'article</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full text-2xl md:text-4xl font-serif italic border-b border-zinc-200 focus:border-black outline-none pb-4 transition-colors bg-transparent placeholder:text-zinc-200"
            placeholder="LE TITRE DE VOTRE ŒUVRE..."
          />
        </section>

        {/* Upload Visuel */}
        <section className="space-y-4">
          <label className={labelStyle}>Image de couverture</label>
          <div className="relative group border border-zinc-200 hover:border-black transition-colors p-10 text-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {photo ? (
              <div className="space-y-4">
                <img
                  src={photo}
                  alt="Preview"
                  className="max-h-80 mx-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <p className="text-[9px] tracking-widest text-zinc-400 uppercase">
                  Cliquer pour remplacer le visuel
                </p>
              </div>
            ) : (
              <div className="py-12">
                <Icon
                  icon="ph:image-thin"
                  className="w-12 h-12 mx-auto mb-4 text-zinc-300"
                />
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                  Importer une photographie haute résolution
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Éditeur de texte */}
        <section className="space-y-4 border border-black">
          <label className={labelStyle}>Contenu éditorial</label>
          <QuillEditor
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="Prenez votre plus belle plume..."
          />
        </section>

        {/* Tags / Classification */}
        <section className="space-y-6">
          <label className={labelStyle}>Classification & Tags</label>
          <div className="flex flex-wrap gap-3">
            {predefinedTags.map((tag) => (
              <button
                type="button"
                key={tag.id}
                onClick={() => handleTagToggle(tag.label)}
                className={`px-6 py-2 border text-[10px] uppercase tracking-widest transition-all duration-300 ${
                  tags.includes(tag.label)
                    ? "bg-black text-white border-black"
                    : "bg-white text-zinc-400 border-zinc-200 hover:border-black hover:text-black"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </section>

        {/* Barre d'action fixe (Identique au Job Form) */}
        <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-black p-4 z-[60]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-red-600 text-[10px] uppercase tracking-widest font-bold">
              {errorMessage && (
                <span className="flex items-center">
                  <Icon
                    icon="mdi:alert-circle-outline"
                    className="mr-2 h-4 w-4"
                  />
                  {errorMessage}
                </span>
              )}
            </div>

            <div className="flex space-x-4 w-full md:w-auto">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 md:flex-none px-8 py-3 border border-black text-[10px] uppercase tracking-widest hover:bg-zinc-100 transition-colors"
              >
                Retour
              </button>
              <button
                loading={loadingSend}
                type="submit"
                className="bg-black text-white px-10 py-3 text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all font-medium border border-black"
              >
                {articleId
                  ? "Enregistrer les modifications"
                  : "Publier l'article"}
              </button>
            </div>
          </div>
        </footer>
      </form>
    </div>
  );
}
