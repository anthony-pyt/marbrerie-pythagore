"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom"; // Étape 1 : Importer le portail
import { Icon } from "@iconify/react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Alert from "../Alert";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const NewsletterModal = ({ isOpen, onClose, initialEmail, onSuccess }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    email: initialEmail,
    last_name: "",
    first_name: "",
    department: "",
    society: "",
    typeClient: "Professionnel",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [departements, setDepartements] = useState([]);

  // Gestion du montage pour Next.js (SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Gestion du scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    setMounted(true);
    const fetchDepartements = async () => {
      try {
        const response = await fetch("https://geo.api.gouv.fr/departements");
        if (response.ok) {
          const data = await response.json();
          const sorted = data.sort((a, b) => {
            return parseInt(a.code) - parseInt(b.code);
          });

          setDepartements(sorted);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des départements", err);
      }
    };
    fetchDepartements();
  }, []);

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!executeRecaptcha) {
      setError("reCAPTCHA n'est pas encore prêt.");
      return;
    }

    const { last_name, first_name, department, society, typeClient } = formData;

    if (!last_name.trim() || !first_name.trim() || !department.trim()) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Logique spécifique pour la société
    if (typeClient === "Professionnel" && !society.trim()) {
      setError("Le nom de votre société est requis pour les professionnels.");
      return;
    }

    setLoading(true);
    try {
      const token = await executeRecaptcha("newsletter_signup");

      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          email: initialEmail,
          recaptchaToken: token,
        }),
      });

      if (res.ok) {
        onSuccess();
      } else {
        const data = await res.json();
        setError(
          data.error ||
            data.message ||
            "Une erreur est survenue. Veuillez recommencer...",
        );
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  // Étape 2 : Préparer le JSX de la modale
  const modalJSX = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Overlay avec Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-secondary/90 backdrop-blur"
          />

          {/* Container de la modale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl mx-4 bg-secondary border border-white/10 p-8 lg:p-12 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <Icon icon="lucide:x" width="24" />
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-light text-white mb-2 uppercase tracking-widest">
                Finalisez votre profil
              </h3>
              <p className="text-gray-400 text-sm font-light italic">
                Complétez les champs pour finaliser l&apos;inscription
              </p>
            </div>

            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div className="flex gap-8 py-2 border-b border-white/5">
                {["Professionnel", "Particulier"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="type"
                      className="hidden"
                      checked={formData.typeClient === type}
                      onChange={() =>
                        setFormData({ ...formData, typeClient: type })
                      }
                    />
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${formData.typeClient === type ? "border-or" : "border-gray-600"}`}
                    >
                      {formData.typeClient === type && (
                        <div className="w-2 h-2 bg-or rounded-full" />
                      )}
                    </div>
                    <span
                      className={`text-[10px] uppercase tracking-[0.2em] ${formData.typeClient === type ? "text-white" : "text-gray-500 group-hover:text-gray-300"}`}
                    >
                      {type}
                    </span>
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  placeholder="NOM *"
                  onInputChange={(v) =>
                    setFormData({ ...formData, last_name: v })
                  }
                  required={true} // Obligatoire
                />
                <Input
                  placeholder="PRÉNOM *"
                  onInputChange={(v) =>
                    setFormData({ ...formData, first_name: v })
                  }
                  required={true} // Obligatoire
                />
              </div>

              <div className="relative group">
                <select
                  required
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-or transition-all appearance-none cursor-pointer"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                >
                  <option value="" className="bg-secondary text-gray-400">
                    DÉPARTEMENT *
                  </option>
                  {departements.map((dept) => (
                    <option
                      key={dept.code}
                      value={`${dept.nom}`}
                      className="bg-secondary text-white"
                    >
                      {dept.code} - {dept.nom}
                    </option>
                  ))}
                </select>
                {/* Petit icone pour indiquer que c'est un menu déroulant */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-focus-within:text-or">
                  <Icon icon="lucide:chevron-down" width="20" />
                </div>
              </div>

              {formData.typeClient === "Professionnel" && (
                <Input
                  placeholder={"SOCIÉTÉ *"}
                  onInputChange={(v) =>
                    setFormData({ ...formData, society: v })
                  }
                  required={formData.typeClient === "Professionnel"} // Dynamique
                />
              )}

              {error && (
                <Alert
                  isVisible={!!error}
                  message={error}
                  type="error"
                  onClose={() => setError("")}
                />
              )}

              <Button
                type="submit"
                color="or"
                text={loading ? "Traitement..." : "Confirmer l'inscription"}
                loading={loading}
                className="w-full"
                size="large"
              />
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Étape 3 : Rendre via le portail
  if (!mounted) return null;
  return createPortal(modalJSX, document.body);
};

export default NewsletterModal;
