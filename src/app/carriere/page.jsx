"use client";

import MainMenu from "./../components/MainMenu";
import SlideComponent from "./../components/sliders/sliderComponent";
import Cards from "../components/cards/cardComponent";
import Footer from "../components/Footer";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
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
  jobs,
} from "../../../datas/infosCarriere";
import Textarea from "../components/Textarea";
import Input from "../components/Input";
import FormServices from "./../api/services/formServices";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

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

const ListJobs = () => (
  <div className="mt-12 mx-auto bg-secondary p-12 rounded-xl lg:w-10/12 w-full">
    <div className="flex items-center justify-center w-full">
      <div className="mb-6 flex items-center space-x-3">
        <h2 className="text-white">Nos dernières offres d'emploi</h2>
        <ModalSendForm />
      </div>
    </div>
    <div className="w-full flex justify-center items-center max-w-5xl mx-auto">
      {jobs.length === 0 && (
        <div className="text-center p-2 text-white flex flex-col items-center">
          <Icon
            icon="fluent:live-off-20-regular"
            width="64"
            height="64"
            className="mb-8"
          />
          <p className="text-lg font-semibold">
            Aucune offre n'est disponible pour le moment... mais votre talent
            nous intéresse !
          </p>
          <p className="mt-2">
            Envoyez nous votre candidature spontanée. Nous
            sommes toujours à la recherche de personnes motivées !
          </p>
        </div>
      )}
      <div className="">
        {jobs.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl shadow p-4 mb-4 bg-white"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold uppercase">{item.title}</p>
                <p className="text-xs border shadow rounded px-2">
                  {item.type}
                </p>
              </div>
              <p className="text-sm line-clamp-2">{item.description}</p>
            </div>
            <div className="flex justify-end">
              <span className="text-xs text-gray-500">
                publié le {item.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ModalSendForm = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({});
  const { VerifyAndSendCandidacy } = FormServices();

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
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
    >
      <Modal>
        <ModalTrigger className="bg-or-light rounded-xl hover:bg-white transform duration-300 flex items-center space-x-2">
          <Icon icon="tabler:send" width="16" height="16" />
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Postuler
          </span>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
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
              />
            </div>
          </ModalContent>
        </ModalBody>
      </Modal>
    </GoogleReCaptchaProvider>
  );
};

export default function Page() {
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
      <ListJobs />
      <Footer />
    </main>
  );
}
