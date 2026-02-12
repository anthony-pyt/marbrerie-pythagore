"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import QuillEditor from "@/components/QuillEditor";
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

  // Style de l'éditeur version Luxe (Angles droits)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        const editor = document.querySelector(".ql-editor");
        if (editor) {
          editor.style.minHeight = "450px";
          editor.style.border = "1px solid black";
          editor.style.borderRadius = "0px"; // Force no radius

          const toolbar = document.querySelector(".ql-toolbar");
          if (toolbar) {
            toolbar.style.border = "1px solid black";
            toolbar.style.borderBottom = "none";
            toolbar.style.borderRadius = "0px";
            toolbar.style.display = "flex";
            toolbar.style.flexWrap = "wrap";
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
          console.error("Erreur récupération", error);
        }
      };
      getJobOffer();
    }
  }, [jobOfferId]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline"],
          [{ align: [] }],
          [{ header: [1, 2, false] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["clean"],
        ],
      },
    }),
    [],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSend(true);
    setErrorMessage(null);
    try {
      const payload = {
        title,
        type,
        salary,
        weekly_hours: weeklyHours,
        description,
        profile_sought: profileSought,
        formation,
      };
      if (jobOfferId) {
        await updateJobOffer(jobOfferId, payload);
      } else {
        await storeJobOffer(payload);
      }
      router.push("/admin/liste-jobs");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Une erreur est survenue.",
      );
    } finally {
      setLoadingSend(false);
    }
  };

  const inputStyle =
    "mt-1 w-full p-4 border border-black rounded-none focus:bg-zinc-50 outline-none transition-colors placeholder:text-zinc-300 text-sm";
  const labelStyle =
    "block text-[10px] uppercase tracking-[0.2em] font-semibold text-zinc-500 mb-1";

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 border-b border-black pb-6">
        <h1 className="text-3xl font-light tracking-[0.2em] uppercase">
          {jobOfferId ? "Édition" : "Nouvelle Offre"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl space-y-12">
        {/* Section Principale */}
        <div className="grid grid-cols-1 gap-8">
          <div>
            <label className={labelStyle}>Intitulé du poste</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={inputStyle}
              placeholder="POLISSEUR, ADV..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelStyle}>Type de contrat</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className={inputStyle}
              >
                <option value="">SÉLECTIONNER</option>
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Apprentissage">APPRENTISSAGE</option>
                <option value="Stage">STAGE</option>
              </select>
            </div>

            <div>
              <label className={labelStyle}>Rémunération mensuelle</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className={inputStyle}
                placeholder="0.00"
              />
            </div>

            <div>
              <label className={labelStyle}>Volume hebdomadaire</label>
              <input
                type="text"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(e.target.value)}
                className={inputStyle}
                placeholder="EX: 35H"
              />
            </div>
          </div>
        </div>

        {/* Éditeur */}
        <div>
          <label className={labelStyle}>Description détaillée</label>
          <div className="mt-2 border border-black">
            <QuillEditor
              value={description}
              onChange={setDescription}
              modules={modules}
              placeholder="Rédiger l'offre ici..."
            />
          </div>
        </div>

        {/* Profil & Formation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className={labelStyle}>Profil recherché</label>
            <textarea
              value={profileSought}
              onChange={(e) => setProfileSought(e.target.value)}
              placeholder="Exigences et soft skills..."
              className={`${inputStyle} h-48 resize-none`}
            />
          </div>

          <div>
            <label className={labelStyle}>Formation & Expérience</label>
            <textarea
              value={formation}
              onChange={(e) => setFormation(e.target.value)}
              className={`${inputStyle} h-48 resize-none`}
              placeholder="Cursus académique requis..."
            />
          </div>
        </div>

        {/* Footer Bar fixe - Style Brutaliste */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-black p-6 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              {errorMessage && (
                <p className="text-red-600 text-[10px] uppercase tracking-widest animate-pulse">
                  {errorMessage}
                </p>
              )}
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 py-3 text-[10px] uppercase tracking-widest border border-black hover:bg-zinc-100 transition-colors"
              >
                Annuler
              </button>
              <Button
                loading={loadingSend}
                text={
                  jobOfferId
                    ? "Enregistrer les modifications"
                    : "Publier l'opportunité"
                }
                type="submit"
                className="bg-black text-white px-10 py-3 text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all font-medium border border-black"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
