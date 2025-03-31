"use client";

import { useEffect, useState, useRef } from "react";
import useJobsServices from "@/api/services/jobOffersServices";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import Toast from '@/components/Toast'

export default function AdminDashboard() {
  const { fetchJobOffers, deleteJobOffer, togglePublishmentStatut } =
    useJobsServices();
  const [jobOffers, setJobOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");
  const menuRef = useRef(null); // Référence pour détecter les clics à l'extérieur

  const router = useRouter();

  useEffect(() => {
    const getJobOffers = async () => {
      try {
        const response = await fetchJobOffers();
        setJobOffers(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getJobOffers();
  }, []);

  // Ferme le menu si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    if (openMenu !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  const handleDelete = async (id) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;
    try {
      await deleteJobOffer(id);
      setJobOffers(jobOffers.filter((offer) => offer.id !== id));
      setToastMessage("Cette offre a bien été supprimée");
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      setToastMessage("Une erreur s'est produite. Veuillez recommencer...");
      setToastType("error");
      setShowToast(true);
    }
  };

  const handlePublishmentOffer = async (offer) => {
    try {
      await togglePublishmentStatut(offer.id);
      setJobOffers(
        jobOffers.map((jobOffer) => {
          if (jobOffer.id === offer.id) {
            return { ...jobOffer, is_published: !offer.is_published };
          }
          return jobOffer;
        })
      );
      setToastMessage("Le statut a été mis à jour !");
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      setToastMessage("Une erreur s'est produite. Veuillez recommencer...");
      setToastType("error");
      setShowToast(true);
    }
  };

  const handleNavigation = (url) => {
    router.push(url);
  };

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <div>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="flex items-center justify-between space-x-2 mb-4">
        <h1 className="text-2xl font-bold">Liste des offres d'emploi</h1>
        <button
          className="hover:bg-gray-100 py-1 px-2 rounded flex items-center border space-x-1"
          onClick={() => handleNavigation("/admin/blog/creer-article")}
        >
          <Icon icon={"mdi:plus"} className="h-4 w-4" />
          <span className="text-sm">Créer une offre</span>
        </button>
      </div>

      {loading ? (
        <p className="text-center">Chargement des offres...</p>
      ) : jobOffers.length === 0 ? (
        <p className="text-center">Aucune offre n'est disponible.</p>
      ) : (
        <div className="relative border text-sm">
          {" "}
          {/* Permet aux menus de dépasser */}
          <table className="min-w-full border-collapse">
            <thead className="border-b bg-gray-100">
              <tr className="text-left">
                <th className="px-3 py-2">Titre</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Publié ?</th>
                <th className="px-3 py-2 text-right sr-only">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobOffers.map((offer) => (
                <tr key={offer.id} className="hover:bg-gray-50 relative">
                  <td className="px-3 py-2">{offer.title}</td>
                  <td className="px-3 py-2">
                    {new Date(offer.date).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-3 py-2">{offer.type}</td>
                  <td className="px-3 py-2">
                    {offer.is_published ? (
                      <Icon
                        icon="mdi:check"
                        width="24"
                        height="24"
                        className="text-green-600"
                      />
                    ) : (
                      <Icon
                        icon="mdi:close"
                        width="24"
                        height="24"
                        className="text-red-600"
                      />
                    )}
                  </td>
                  <td className="px-3 py-2 text-right relative text-sm">
                    <button
                      className="hover:bg-slate-100 rounded w-8 h-8"
                      onClick={() => toggleMenu(offer.id)}
                    >
                      <Icon
                        icon="mdi:dots-vertical"
                        className="inline-block h-4 w-4"
                      />
                    </button>

                    {openMenu === offer.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-3 mt-05 w-32 bg-white border rounded shadow-md z-50"
                      >
                        <button
                          className="flex items-center px-4 py-2 w-full hover:bg-blue-100 text-blue-600 border-b"
                          onClick={() => handlePublishmentOffer(offer)}
                        >
                          {offer.is_published ? "Dépublier" : "Publier"}
                        </button>
                        <button
                          className="flex items-center px-4 py-2 w-full hover:bg-gray-100"
                          onClick={() => handleNavigation(`/carriere`)}
                        >
                          Voir
                        </button>
                        <button
                          className="flex items-center px-4 py-2 w-full hover:bg-gray-100"
                          onClick={() => handleNavigation(``)}
                        >
                          Modifier
                        </button>
                        <button
                          className="flex items-center px-4 py-2 w-full text-red-600 hover:bg-red-100 border-t"
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
      )}
    </div>
  );
}
