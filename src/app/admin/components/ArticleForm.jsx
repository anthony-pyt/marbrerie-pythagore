"use client";

import { use, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Button from "@/components/Button";
// import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import useBlogServices from "@/api/services/blogServices";
import useTagService from "@/api/services/tagsServices";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
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
          console.error("Erreur lors de la récupération de l'article", error);
        }
      };
      getArticle();
    }
  }, [articleId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        const editor = document.querySelector(".ql-editor"); // Sélectionne l'éditeur par sa classe

        if (editor) {
          editor.style.minHeight = "400px";
          editor.style.border = "1px solid rgb(209 213 219)";
          editor.style.borderRadius = "0.5rem";

          const toolbar = document.querySelector(".ql-toolbar");
          if (toolbar) {
            toolbar.style.border = "none";
            toolbar.style.display = "flex";
            toolbar.style.justifyContent = "center";
            toolbar.style.margin = "1.5rem 0 0.5rem 0";
          }

          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const getTags = async () => {
      const res = await fetchTags();
      setPredefinedTags(res);
    };
    getTags();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"], // toggled buttons

          [{ align: [] }],

          ["blockquote", "code-block"],
          ["link", "image", "video"],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ],
      },
    }),
    []
  );

  // const predefinedTags = ["Technologie", "Sport", "Art", "Cuisine", "Mode"];

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setPhoto(reader.result); // Stocke l'image en Base64
    }
  };

  const handleTagChange = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleTagRemove = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSend(true);
    setErrorMessage(null);
    try {
      const userName = user ? user.full_name : "Anonyme";
      if (articleId) {
        await updateArticle(articleId, {
          title,
          photo,
          content,
          tags,
          userName,
        });
      } else {
        await storeArticle({
          title,
          photo,
          content,
          tags,
          userName,
        });
      }
      router.push("/admin");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setLoadingSend(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Créer un nouvel article</h1>

      <form onSubmit={handleSubmit} className="space-y-6 mb-24">
        {/* Titre de l'article */}
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700">
            Nom de l'article
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez le titre..."
          />
        </div>

        {/* Editeur de texte */}
        <div>
          <label className="block font-medium text-gray-700">Contenu</label>
          <QuillEditor
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="Prenez votre plus belle plume 🖋️"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium text-gray-700">Tags</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {predefinedTags.map((tag) => (
              <button
                type="button"
                key={tag.id}
                onClick={() => handleTagChange(tag.label)}
                className={`px-3 py-1 border rounded-full ${
                  tags.includes(tag.label)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                } transition hover:bg-blue-500 hover:text-white`}
              >
                {tag.label}
              </button>
            ))}
          </div>
          {/* Affichage des tags sélectionnés */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="ml-2"
                  >
                    <Icon icon="mdi:close-circle" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upload d'image */}
        <div>
          <label htmlFor="photo" className="block font-medium text-gray-700">
            Photo de l'article
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-2"
          />
          {photo && (
            <div className="mt-2">
              <img
                src={photo}
                alt="Aperçu"
                className="w-32 h-32 object-cover rounded-lg shadow"
              />
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-6 shadow-md bg-white">
          <div className="flex justify-end items-center space-x-3">
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <Button
              loading={loadingSend}
              text={articleId ? "Modifier l'article" : "Publier l'article"}
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Publier l'article
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
