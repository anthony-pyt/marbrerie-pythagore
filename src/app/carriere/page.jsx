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

export default function Page() {
  const { fetchJobOffers } = useJobOffersServices();
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

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
      <PageTitle title={"Nos métiers"} />
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
      <SectionCommitments />
      <ListJobs
        jobs={jobs}
        loading={loadingJobs}
        setShowApplicationForm={setShowApplicationForm}
        showApplicationForm={showApplicationForm}
      />
      {showApplicationForm && (
        <ModalSendForm onClose={() => setShowApplicationForm(false)} />
      )}
      <Footer />
    </main>
  );
}

const SectionTestimonials = ({ title, images, retardInterval }) => (
  <div className="container mx-auto m-4 bg-gray-50 rounded-xl p-4">
    <h2 className="text-4xl text-center md:text-left">{title}</h2>
    <AnimatedTestimonials
      testimonials={images}
      // autoplay
      retardInterval={retardInterval}
    />
  </div>
);

const SectionCommitments = () => (
  <div className="container mx-auto my-8">
    <h2 className="text-4xl">NOS ENGAGEMENTS</h2>
    <div className="w-full flex justify-center items-center">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:gap-6 mb-5 gap-5 mt-12 p-2 ">
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
  showApplicationForm,
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
    <div className="mt-12 mx-auto bg-secondary p-12 rounded-xl lg:w-10/12 w-full">
      <div className="flex items-center justify-center w-full">
        <div className="mb-6 flex items-center space-x-3">
          <h2 className="text-white">Nos dernières offres d'emploi</h2>
          <Button
            text={"Postuler"}
            color={"or"}
            onClick={() => setShowApplicationForm(true)}
            icon={"tabler:send"}
          />
        </div>
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
      <div>
        <div className="w-full flex justify-center items-center max-w-5xl mx-auto">
          {jobs.length === 0 ? (
            <div className="text-center p-2 text-white flex flex-col items-center">
              <Icon
                icon="fluent:live-off-20-regular"
                width="64"
                height="64"
                className="mb-8"
              />
              <div className="text-sm flex flex-col items-center justify-center text-white border rounded-xl p-4">
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
                  className="border rounded-xl shadow p-4 mb-4 bg-white cursor-pointer"
                  onClick={() => setSelectedJob(item)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold uppercase">{item.title}</p>
                    <div className="flex justify-end items-center space-x-2">
                      <p className="text-xs border shadow rounded px-2">
                        {item.type}
                      </p>
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
              <div className="text-sm flex flex-col items-center justify-center mt-8 text-white border rounded-xl p-4">
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 overflow-y-auto">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-xl shadow-lg max-w-7xl w-full relative max-h-screen overflow-y-auto"
          >
            {/* Bouton de fermeture */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
              onClick={() => setSelectedJob(null)}
            >
              ✖
            </button>

            {/* Titre du job */}
            <h3 className="text-2xl font-bold text-secondary border-b border-gray-300 pb-2">
              {selectedJob.title}
            </h3>

            {/* Infos générales */}
            <div className="mt-4 space-y-3 text-gray-700 border-b border-gray-300 pb-4">
              <p className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📄</span> <strong>Type :</strong>{" "}
                <span className="ml-1">{selectedJob.type}</span>
              </p>
              <p className="flex items-center text-sm text-gray-600">
                <span className="mr-2">⏳</span>{" "}
                <strong>Heures / semaine :</strong>
                {selectedJob.weekly_hours ? (
                  <span className="ml-1">{selectedJob.weekly_hours}h</span>
                ) : (
                  <span className="ml-1">Non précisé</span>
                )}
              </p>
              <p className="flex items-center text-sm text-gray-600">
                <span className="mr-2">💰</span>{" "}
                <strong>Salaire / mois : </strong>{" "}
                {selectedJob.salary ? (
                  <span className="ml-1">{selectedJob.salary} €</span>
                ) : (
                  <span className="ml-1">Selon profil</span>
                )}
              </p>
            </div>

            {/* Description */}
            <div className="mt-4 border-b border-gray-300 pb-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                📝 <span className="ml-2">Description</span>
              </h4>
              <p
                className="text-sm text-gray-600 mt-1 p-6 border rounded-xl leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedJob.description }}
              ></p>
            </div>

            {/* Profil recherché */}
            <div className="mt-4 border-b border-gray-300 pb-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                🔍 <span className="ml-2">Profil recherché</span>
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {selectedJob.profile_sought ?? "Non précisé"}
              </p>
            </div>

            {/* Formation requise */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                🎓 <span className="ml-2">Formation</span>
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {selectedJob.formation ?? "Non précisé"}
              </p>
            </div>
            <div className="flex justify-end mt-10">
              <Button
                text={"Je postule"}
                color="or"
                size="big"
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

const ModalSendForm = ({ onClose }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({});
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
    console.log(event);

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
      return; // Si la validation échoue, ne pas envoyer
    }
    VerifyAndSendCandidacy(formData);
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
        formData.phone_number
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
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
      >
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
                    <p className="error-message">
                      {formErrors["phone_number"]}
                    </p>
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
                />
              </div>
            </ModalContent>
          </ModalBody>
        </Modal>
      </GoogleReCaptchaProvider>
    </div>
  );
};
