"use client";

import { useEffect, useState, useRef } from "react";
import useJobsServices from "@/api/services/jobOffersServices";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";

export default function AdminJobsList() {
  const { fetchJobOffers, deleteJobOffer, togglePublishmentStatut } =
    useJobsServices();
  const [jobOffers, setJobOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");
  const menuRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    const getJobOffers = async () => {
      try {
        const response = await fetchJobOffers();
        setJobOffers(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getJobOffers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    if (openMenu !== null)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  const triggerToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("CONFIRMATION : Supprimer définitivement cette offre ?"))
      return;
    try {
      await deleteJobOffer(id);
      setJobOffers(jobOffers.filter((offer) => offer.id !== id));
      triggerToast("L'offre a été retirée de la collection.", "success");
    } catch (error) {
      triggerToast("Erreur lors de la suppression.", "error");
    }
  };

  const handlePublishmentOffer = async (offer) => {
    try {
      await togglePublishmentStatut(offer.id);
      setJobOffers(
        jobOffers.map((j) =>
          j.id === offer.id ? { ...j, is_published: !offer.is_published } : j,
        ),
      );
      triggerToast("Le statut de publication a été mis à jour.", "success");
    } catch (error) {
      triggerToast("Erreur de mise à jour.", "error");
    }
  };

  return (
    <div className="bg-white min-h-screen px-4 md:px-0">
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Header Luxe Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-12 border-b border-black pb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase">
          JOBS
        </h1>
        <button
          className="bg-black text-white hover:bg-zinc-800 py-3 px-6 md:px-8 flex items-center justify-center space-x-3 transition-all duration-300 w-full sm:w-auto"
          onClick={() => router.push("/admin/creer-offre-job")}
        >
          <Icon icon={"mdi:plus"} className="h-5 w-5" />
          <span className="text-[10px] uppercase tracking-widest font-medium">
            Créer une offre
          </span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 font-light tracking-[0.3em] uppercase text-[10px] text-zinc-400">
          Chargement de la sélection...
        </div>
      ) : jobOffers.length === 0 ? (
        <p className="text-center italic text-gray-400 py-20 font-serif">
          Aucune opportunité disponible actuellement.
        </p>
      ) : (
        <div className="border border-black">
          <div className="">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="bg-black text-white text-[10px] uppercase tracking-[0.2em]">
                  <th className="px-4 md:px-6 py-4 font-medium">Poste</th>
                  <th className="hidden md:table-cell px-6 py-4 font-medium">
                    Type
                  </th>
                  <th className="hidden lg:table-cell px-6 py-4 font-medium">
                    Mise à jour
                  </th>
                  <th className="px-4 md:px-6 py-4 font-medium text-center">
                    Statut
                  </th>
                  <th className="px-4 md:px-6 py-4 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black">
                {jobOffers.map((offer) => (
                  <tr
                    key={offer.id}
                    className="hover:bg-zinc-50 transition-colors group"
                  >
                    <td className="px-4 md:px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-xs md:text-sm font-medium tracking-tight uppercase">
                          {offer.title}
                        </span>
                        {/* Tags mobiles */}
                        <div className="md:hidden flex items-center space-x-2 mt-1">
                          <span className="text-[9px] text-zinc-400 uppercase tracking-tighter">
                            {offer.type}
                          </span>
                          <span className="text-[9px] text-zinc-300">•</span>
                          <span className="text-[9px] text-zinc-400 italic">
                            {new Date(offer.updated_at).toLocaleDateString(
                              "fr-FR",
                            )}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="hidden md:table-cell px-6 py-4 text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
                      {offer.type}
                    </td>

                    <td className="hidden lg:table-cell px-6 py-4 text-[11px] font-serif italic text-zinc-400">
                      {new Date(offer.updated_at).toLocaleDateString("fr-FR")}
                    </td>

                    <td className="px-4 md:px-6 py-4 text-center">
                      <div className="flex justify-center items-center space-x-1">
                        <span
                          className={`w-2 h-2 transition-all duration-500 ${
                            offer.is_published
                              ? "bg-green-600 animate-pulse"
                              : "bg-zinc-200 border border-zinc-300"
                          }`}
                          title={offer.is_published ? "En ligne" : "Suspendue"}
                        />
                        <span className="text-[10px] uppercase tracking-widest transition-colors">
                          {offer.is_published ? "En ligne" : "Suspendue"}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 md:px-6 py-4 text-right relative">
                      <button
                        className="p-2 hover:bg-black hover:text-white transition-colors duration-200 border border-transparent hover:border-black"
                        onClick={() =>
                          setOpenMenu(openMenu === offer.id ? null : offer.id)
                        }
                      >
                        <Icon icon="mdi:dots-horizontal" className="h-5 w-5" />
                      </button>

                      {openMenu === offer.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-4 md:right-10 top-12 w-44 md:w-48 bg-white border border-black z-50 shadow-2xl animate__animated animate__fadeIn animate__faster"
                        >
                          <button
                            className={`flex items-center px-4 py-3 w-full text-[10px] uppercase tracking-widest transition-colors border-b border-zinc-100 font-bold ${
                              offer.is_published
                                ? "text-zinc-400 hover:text-black"
                                : "text-black hover:bg-black hover:text-white"
                            }`}
                            onClick={() => handlePublishmentOffer(offer)}
                          >
                            {offer.is_published ? "Suspendre" : "Diffuser"}
                          </button>
                          <button
                            className="flex items-center px-4 py-3 w-full text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors border-b border-zinc-100"
                            onClick={() => router.push(`/carriere`)}
                          >
                            Consulter
                          </button>
                          <button
                            className="flex items-center px-4 py-3 w-full text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors border-b border-zinc-100"
                            onClick={() =>
                              router.push(
                                `/admin/modifier-offre-job/${offer.id}`,
                              )
                            }
                          >
                            Éditer
                          </button>
                          <button
                            className="flex items-center px-4 py-3 w-full text-[10px] uppercase tracking-widest text-red-600 hover:bg-red-600 hover:text-white transition-colors font-bold"
                            onClick={() => handleDelete(offer.id)}
                          >
                            Supprimer
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
