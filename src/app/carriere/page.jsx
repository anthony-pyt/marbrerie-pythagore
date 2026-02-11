"use client";

import MainMenu from "./../components/MainMenu";
import Footer from "../components/Footer";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import PageTitle from "../components/PageTitle";
import AnimatedTestimonials from "./../components/ui/animated-testimonials";
import ServiceCard from "../components/services/serviceCard";
import Button from "../components/Button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./../components/ui/animated-modal";
import {
  metiersAtelier,
  metiersClient,
  metiersTerrain,
  commitments,
} from "../datas/infosCarriere";
import Textarea from "../components/Textarea";
import Input from "../components/Input";
import FormServices from "./../api/services/formServices";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import useJobOffersServices from "@/api/services/jobOffersServices";
import Loader from "../components/loader";
import Alert from "../components/Alert";

export default function Page() {
  const { fetchJobOffers } = useJobOffersServices();
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetchJobOffers();
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingJobs(false);
      }
    };
    getJobs();
  }, []);

  return (
    <main className="min-h-screen antialiased">
      <MainMenu />
      <PageTitle title={"Carrière"} />
      <div className="flex justify-center mb-6">
        <p className="font-semibold max-w-2xl">
          Chez Pythagore nous sommes toutes et tous en lien pour répondre à vos
          besoins. Tous nos métiers se déclinent au féminin et au masculin.
          Découvrez ces métiers qui nous permettent d&apos;être :
        </p>
      </div>
      <div className="container mx-auto my-8 px-4">
        <h2 className="text-4xl font-title">NOS MÉTIERS</h2>
        <div className="m-4 p-4 rounded-xl ">
          <SectionTestimonials
            title={"EN RELATION AVEC NOS CLIENTS"}
            images={metiersClient}
            // retardInterval={0}
          />
          <SectionTestimonials
            title={"À L’ATELIER"}
            images={metiersAtelier}
            // retardInterval={1000}
          />
          <SectionTestimonials
            title={"SUR LE TERRAIN"}
            images={metiersTerrain}
            // retardInterval={2000}
          />
        </div>
      </div>
      <div className="px-4">
        <SectionCommitments />
        <ListJobs
          jobs={jobs}
          loading={loadingJobs}
          setShowApplicationForm={setShowApplicationForm}
          showApplicationForm={showApplicationForm}
          successMessage={successMessage}
        />
        {showApplicationForm && (
          <ModalSendForm
            onClose={() => setShowApplicationForm(false)}
            setSuccessMessage={setSuccessMessage}
          />
        )}
      </div>
      <Footer />
    </main>
  );
}

const SectionTestimonials = ({ title, images, retardInterval }) => (
  <div className="container mx-auto m-4 bg-gray-50 p-4">
    <h2 className="text-2xl text-center md:text-left">{title}</h2>
    <AnimatedTestimonials
      testimonials={images}
      // autoplay
      retardInterval={retardInterval}
    />
  </div>
);

const SectionCommitments = () => (
  <div className="container mx-auto my-8">
    <h2 className="text-4xl font-title">NOS ENGAGEMENTS</h2>
    <div className="w-full flex justify-center items-center">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:gap-10 mb-5 gap-5 mt-12 p-2 ">
        {commitments.map((item, index) => (
          <ServiceCard key={index} title={item.title} image={item.src}>
            <div>{item.description}</div>
          </ServiceCard>
        ))}
      </div>
    </div>
  </div>
);

const ListJobs = ({
  jobs,
  loading,
  setShowApplicationForm,
  successMessage,
  setSuccessMessage,
}) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedJob(null);
      }
    };

    if (selectedJob) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedJob]);

  return (
    <div className="mt-12 mx-auto bg-secondary p-12 lg:w-10/12 w-full">
      <div className="flex items-center justify-center w-full">
        <div className="mb-6 flex items-center space-x-3">
          <h2 className="text-white">Nos dernières offres d&apos;emploi</h2>
          <Button
            text={"Postuler"}
            color={"or"}
            onClick={() => setShowApplicationForm(true)}
            icon={"tabler:send"}
          />
        </div>
      </div>
      <div>
        <Alert
          isVisible={successMessage}
          message={"Votre message a bien été transmis"}
          type="success"
          onClose={() => setSuccessMessage(false)}
        />
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center text-white">
          <Icon
            icon="svg-spinners:pulse-rings-3"
            width="64"
            height="64"
            className="text-white"
          />
          <p>Récupération des données...</p>
        </div>
      )}
      <div className="">
        <div className="w-full flex justify-center items-center max-w-5xl mx-auto">
          {jobs.length === 0 ? (
            <div className="text-center p-2 text-white flex flex-col items-center">
              <Icon
                icon="fluent:live-off-20-regular"
                width="64"
                height="64"
                className="mb-8"
              />
              <div className="text-sm flex flex-col items-center justify-center text-white border p-4">
                <p className="font-semibold text-center underline underline-offset-2">
                  Aucune offre pour le moment
                </p>
                <p className="mt-2">
                  Nous vous invitons à soumettre votre candidature spontanée.
                </p>
                <p>
                  Nous restons constamment à la recherche de talents motivés et
                  ouverts à de nouvelles opportunités.
                </p>
              </div>
            </div>
          ) : (
            <div>
              {jobs.map((item, index) => (
                <div
                  key={index}
                  className="border shadow p-4 mb-4 bg-white cursor-pointer"
                  onClick={() => setSelectedJob(item)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold uppercase">{item.title}</p>
                    <div className="flex justify-end items-center space-x-2">
                      <p className="text-xs border shadow px-2">{item.type}</p>
                      {item.weekly_hours && (
                        <p className="text-sm">{item?.weekly_hours + "h"}</p>
                      )}
                    </div>
                  </div>
                  <p
                    className="text-sm line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></p>
                  <div className="flex justify-end">
                    <span className="text-xs text-gray-500">
                      Mise à jour le{" "}
                      {new Date(item.updated_at).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>
              ))}
              <div className="text-sm flex flex-col items-center justify-center mt-8 text-white border p-4">
                <p className="font-semibold text-center underline underline-offset-2">
                  Aucune offre ne correspond à votre profil ?
                </p>
                <p className="mt-2">
                  Nous vous invitons à soumettre votre candidature spontanée.
                </p>
                <p>
                  Nous restons constamment à la recherche de talents motivés et
                  ouverts à de nouvelles opportunités.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODALE */}
      {selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center bg-secondary/40 backdrop-blur-sm z-50 p-4 md:p-8">
          <div
            ref={modalRef}
            className="bg-white shadow-2xl max-w-5xl w-full relative max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Bouton de fermeture élégant */}
            <button
              className="absolute top-5 right-5 z-10 p-2 text-gray-400 hover:text-or transition-colors"
              onClick={() => setSelectedJob(null)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header avec ligne décorative */}
            <div className="p-8 pb-4 border-b border-gray-100">
              <span className="text-[10px] uppercase tracking-[0.3em] text-or font-bold mb-2 block">
                Offre d'emploi
              </span>
              <h3 className="text-3xl font-light uppercase tracking-wider text-secondary">
                {selectedJob.title}
              </h3>
              <div className="h-[2px] w-16 bg-or mt-4" />
            </div>

            {/* Contenu Scrollable */}
            <div className="overflow-y-auto p-8 pt-4 space-y-10">
              {/* Grille d'infos rapides */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6">
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-widest text-gray-400 mb-1 font-semibold">
                    Contrat
                  </span>
                  <span className="text-secondary font-medium">
                    {selectedJob.type}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-widest text-gray-400 mb-1 font-semibold">
                    Temps de travail
                  </span>
                  <span className="text-secondary font-medium">
                    {selectedJob.weekly_hours
                      ? `${selectedJob.weekly_hours}h / semaine`
                      : "Non précisé"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-widest text-gray-400 mb-1 font-semibold">
                    Rémunération
                  </span>
                  <span className="text-secondary font-medium">
                    {selectedJob.salary
                      ? `${selectedJob.salary} € / mois`
                      : "Selon profil"}
                  </span>
                </div>
              </div>

              {/* Sections de texte */}
              <div className="space-y-8">
                {/* Description */}
                <section>
                  <h4 className="text-sm uppercase tracking-[0.2em] text-secondary font-bold mb-4 flex items-center">
                    <span className="w-2 h-2 bg-or rounded-full mr-3" />
                    Description du poste
                  </h4>
                  <div
                    className="text-gray-600 leading-relaxed text-sm prose prose-sm max-w-none px-5 border-l-2 border-gray-50"
                    dangerouslySetInnerHTML={{
                      __html: selectedJob.description,
                    }}
                  />
                </section>

                {/* Profil & Formation côte à côte sur desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section>
                    <h4 className="text-sm uppercase tracking-[0.2em] text-secondary font-bold mb-4 flex items-center">
                      <span className="w-2 h-2 bg-or rounded-full mr-3" />
                      Profil recherché
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed px-5">
                      {selectedJob.profile_sought ?? "Non précisé"}
                    </p>
                  </section>

                  <section>
                    <h4 className="text-sm uppercase tracking-[0.2em] text-secondary font-bold mb-4 flex items-center">
                      <span className="w-2 h-2 bg-or rounded-full mr-3" />
                      Formation
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed px-5">
                      {selectedJob.formation ?? "Non précisé"}
                    </p>
                  </section>
                </div>
              </div>
            </div>

            {/* Footer fixe avec bouton d'action */}
            <div className="p-6 bg-white border-t border-gray-100 flex justify-end">
              <Button
                text={"Postuler à cette offre"}
                color="or"
                size="big"
                className="shadow-xl hover:shadow-or/20 transition-all transform hover:-translate-y-1"
                onClick={() => setShowApplicationForm(true)}
              >
                Postuler
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ModalSendForm = ({ onClose, setSuccessMessage }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [sendMessage, setSendMessage] = useState(false);
  const modalRef = useRef(null);
  const { VerifyAndSendCandidacy } = FormServices();

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // Nettoyage du listener
    };
  }, []);

  // Cette fonction vérifie si le clic se fait en dehors du modal
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(false);
    }
  };

  const handleInputChange = (id, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: newValue,
    }));
  };

  const sendForm = async () => {
    if (!validateForm()) {
      return; // Ne pas envoyer si validation échoue
    }
    try {
      // Affiche le message 2 secondes, puis ferme la modale
      setTimeout(() => {
        onClose(false);
      }, 2000);
      await VerifyAndSendCandidacy(formData);
      setSendMessage(true);
      setSuccessMessage("Votre candidature a bien été envoyée !");
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setSendMessage(false);
      }, 5000);
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.first_name || formData.first_name.trim() === "") {
      errors.first_name = "Votre prénom est requis";
    }
    if (!formData.last_name || formData.last_name.trim() === "") {
      errors.last_name = "Votre nom est requis";
    }
    if (!formData.phone_number || formData.phone_number.trim() === "") {
      errors.phone_number = "Un numéro de téléphone est requis";
    }
    if (
      formData.phone_number &&
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
        formData.phone_number,
      )
    ) {
      errors.phone_number = "Le numéro de téléphone n'est pas correct";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Un email valide est requis";
    }

    // MESSAGE
    if (!formData.message || formData.message.trim() === "") {
      errors.message = "Votre message ne peut pas être vide";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      {/* <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
      > */}
      <Modal>
        {/* <ModalTrigger className="bg-or-light rounded-xl hover:bg-white transform duration-300 flex items-center space-x-2">
          <Icon icon="tabler:send" width="16" height="16" />
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Postuler
          </span>
        </ModalTrigger> */}
        <ModalTrigger className={"hidden"} />
        <ModalBody>
          <ModalContent ref={modalRef}>
            <h4 className="text-lg md:text-2xl font-bold text-center mb-8">
              Votre candidature
            </h4>
            <div className="py-10">
              <div className="flex flex-wrap justify-between my-2">
                <div className="flex-1">
                  <Input
                    icon="solar:user-circle-bold"
                    type="text"
                    id="first_name"
                    placeholder="Votre prénom"
                    onInputChange={(newValue) =>
                      handleInputChange("first_name", newValue)
                    }
                    // className={"w-80"}
                    // error={formErrors.email}
                  />
                  <p className="error-message">{formErrors["first_name"]}</p>
                </div>
                <div className="flex-1">
                  <Input
                    icon="solar:user-circle-bold"
                    type="text"
                    id="last_name"
                    placeholder="Votre nom"
                    onInputChange={(newValue) =>
                      handleInputChange("last_name", newValue)
                    }
                    // className={"w-80"}
                    // error={formErrors.email}
                  />
                  <p className="error-message">{formErrors["last_name"]}</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-between my-2">
                <div className="flex-1">
                  <Input
                    icon="solar:phone-bold"
                    type="text"
                    id="phone_number"
                    placeholder="Votre numéro de téléphone"
                    onInputChange={(newValue) =>
                      handleInputChange("phone_number", newValue)
                    }
                    // className={"w-80"}
                    // error={formErrors.email}
                  />
                  <p className="error-message">{formErrors["phone_number"]}</p>
                </div>
                <div className="flex-1">
                  <Input
                    icon="lets-icons:e-mail"
                    type="mail"
                    id="email"
                    placeholder="Votre email"
                    onInputChange={(newValue) =>
                      handleInputChange("email", newValue)
                    }
                    // className={"w-80"}
                    // error={formErrors.email}
                  />
                  <p className="error-message">{formErrors["email"]}</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-between my-6">
                <div className="flex-1">
                  <label htmlFor="cv" className="text-sm ml-4">
                    Votre CV
                  </label>
                  <Input
                    icon="solar:file-text-bold"
                    type="file"
                    id="cv"
                    placeholder="Votre CV"
                    onInputChange={(event) => handleInputChange("cv", event)}
                  />

                  <p className="error-message">{formErrors["cv"]}</p>
                </div>
                <div className="flex-1">
                  <label htmlFor="motivLetter" className="text-sm ml-4">
                    Votre lettre de motivation
                  </label>
                  <Input
                    icon="solar:file-text-bold"
                    type="file"
                    id="motivLetter"
                    placeholder="Votre lettre de motivation"
                    onInputChange={(event) =>
                      handleInputChange("motivLetter", event)
                    }
                    // className={"w-80"}
                    // error={formErrors.email}
                  />
                  <p className="error-message">{formErrors["motivLetter"]}</p>
                </div>
              </div>
              <div className="my-2">
                <Textarea
                  id={"message"}
                  placeholder={"Votre message"}
                  onInputChange={(newValue) =>
                    handleInputChange("message", newValue)
                  }
                  className={"h-48 w-full"}
                  // error={formErrors.message}
                />
                <p className="error-message">{formErrors["message"]}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                text={"Envoyer"}
                onClick={sendForm}
                icon={"tabler:send"}
                disabled={sendMessage}
              />
            </div>
          </ModalContent>
        </ModalBody>
      </Modal>
      {/* </GoogleReCaptchaProvider> */}
    </div>
  );
};
