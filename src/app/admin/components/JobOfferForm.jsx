"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import QuillEditor from "@/components/QuillEditor";
import "react-quill/dist/quill.snow.css";
import Button from "@/components/Button";
import useJobOffersServices from "@/api/services/jobOffersServices";

export default function JobOfferForm({ jobOfferId = null }) {
  const { storeJobOffer, fetchJobOffer, updateJobOffer } =
    useJobOffersServices();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [salary, setSalary] = useState("");
  const [weeklyHours, setWeeklyHours] = useState("");
  const [description, setDescription] = useState("");
  const [profileSought, setProfileSought] = useState("");
  const [formation, setFormation] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingSend, setLoadingSend] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        const editor = document.querySelector(".ql-editor"); // Sélectionne l'éditeur par sa classe
        console.log(editor);

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
    if (jobOfferId) {
      const getJobOffer = async () => {
        try {
          const response = await fetchJobOffer(jobOfferId);
          setTitle(response.title || "");
          setType(response.type || "");
          setSalary(response.salary || "");
          setWeeklyHours(response.weekly_hours || "");
          setDescription(response.description || "");
          setProfileSought(response.profile_sought || "");
          setFormation(response.formation || "");
        } catch (error) {
          console.error("Erreur lors de la récupération de l'offre", error);
        }
      };
      getJobOffer();
    }
  }, [jobOfferId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSend(true);
    setErrorMessage(null);
    try {
      if (jobOfferId) {
        await updateJobOffer(jobOfferId, {
          title,
          type,
          salary,
          weekly_hours: weeklyHours,
          description,
          profile_sought: profileSought,
          formation,
        });
      } else {
        await storeJobOffer({
          title,
          type,
          salary,
          weekly_hours: weeklyHours,
          description,
          profile_sought: profileSought,
          formation,
        });
      }
      router.push("/admin/liste-jobs");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Une erreur est survenue."
      );
      console.error(error);
    } finally {
      setLoadingSend(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {jobOfferId ? "Modifier l'offre" : "Créer une nouvelle offre"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 mb-24">
        <div>
          <label className="block font-medium text-gray-700">
            Nom du poste
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez le titre..."
          />
        </div>
        <div className="flex items-center space-x-2">
          <div>
            <label className="block font-medium text-gray-700">
              Type de contrat
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionnez le type de contrat</option>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Apprentissage">Apprentissage</option>
              <option value="Stage">Stage</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Salaire par mois</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="1500"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Heures hebdomadaires
            </label>
            <input
              type="number"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Ex : 39h"
            />
          </div>
        </div>

        {/* Editeur de texte */}
        {/* <div>
          <label className="block font-medium">Contenu de l'offre</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            modules={modules}
            placeholder="Contenu de l'offre..."
            className="mt-1 w-full p-3 border border-gray-300 rounded-md h-36"
          />
        </div> */}
        <div>
          <label className="block font-medium sr-only">
            Contenu de l'offre
          </label>
          <QuillEditor
            value={description}
            onChange={setDescription}
            modules={modules}
            placeholder="Contenu de l'offre..."
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block font-medium text-gray-700">
              Profil recherché
            </label>
            <textarea
              value={profileSought}
              onChange={(e) => setProfileSought(e.target.value)}
              modules={modules}
              placeholder="Décrivez le profil recherché..."
              className="mt-1 w-full p-3 border border-gray-300 rounded-md h-36"
            />
          </div>

          <div className="flex-1">
            <label className="block font-medium text-gray-700">
              Formation requise
            </label>
            <textarea
              value={formation}
              onChange={(e) => setFormation(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md h-36"
              placeholder="Ex : Bac+5, BTS..."
            />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-6 shadow-md bg-white">
          <div className="flex justify-end items-center space-x-3">
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <Button
              loading={loadingSend}
              text={jobOfferId ? "Modifier l'offre" : "Publier l'offre"}
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
