"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Button from "@/components/Button";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import useBlogServices from "@/api/services/blogServices";
import useTagService from "@/api/services/tagsServices";
import { useRouter } from "next/navigation";

export default function ArticleForm() {
  const { storeArticle } = useBlogServices();
  const { fetchTags } = useTagService();
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [predefinedTags, setPredefinedTags] = useState([]);
  const quillRef = useRef(null);
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined" && quillRef.current) {
      const editor = quillRef.current.getEditor();
      const toolbar = editor.getModule("toolbar");
      if (toolbar) {
        const toolbarContainer = toolbar.container;
        toolbarContainer.style.border = "none";
        toolbarContainer.style.display = "flex";
        toolbarContainer.style.justifyContent = "center";
        toolbarContainer.style.margin = "1.5rem 0 0.5rem 0";
        const editorContainer = editor.root;
        editorContainer.style.minHeight = "400px";
        editorContainer.style.border = "1px solid rgb(209 213 219)";
        editorContainer.style.borderRadius = "0.5rem";
      }
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
    setUser(JSON.parse(localStorage.getItem("user")));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const userName = user ? user.full_name : "Anonyme";
    storeArticle({ title, photo, content, tags, userName });
    router.push("/admin");
  };

  return (
    <main className="w-full mx-auto p-6">
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
          <ReactQuill
            ref={quillRef}
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
          <div className="flex justify-end">
            <Button
              text="Publier l'article"
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Publier l'article
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}
