"use client";
import { Icon } from "@iconify/react";
import PageTitle from "../components/PageTitle";
import MainMenu from "./../components/MainMenu";
import Input from "./../components/Input";
import Textarea from "./../components/Textarea";
import { useState } from "react";
import Footer from "../components/Footer";
import Button from "../components/Button";
import CompanyInfos from "../components/CompanyInfos"; // Nouveau composant
import Alert from "../components/Alert";
import Select from "../components/Select";

export default function Page() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
  });
  const [hasProject, setHasProject] = useState("yes");
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (id, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: newValue,
    }));
  };

  const handleHasProject = (type) => {
    setHasProject(type);
  };

  const sendForm = () => {
    console.log("envoi du formulaire");
    setShowAlert(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // pour un effet de défilement fluide
    });
  };

  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={"Formulaire de contact"}></PageTitle>
      {showAlert && (
        <Alert
          message="Votre message a bien été transmis"
          type="success"
          duration={5000}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="w-full flex justify-center">
        {/* <div className="w-96 sticky">
          <CompanyInfos />
        </div> */}
        <div className="flex flex-col lg:flex-row my-24">
          <div className="flex-1">
            <div className="flex flex-col justify-center flex-wrap">
              <div className="flex flex-wrap items-center justify-center">
                <Input
                  icon="solar:user-circle-bold"
                  type="text"
                  id="first_name"
                  placeholder="Votre prénom"
                  onInputChange={(newValue) =>
                    handleInputChange("first_name", newValue)
                  }
                />
                <Input
                  icon="solar:user-circle-bold"
                  type="text"
                  id="last_name"
                  placeholder="Votre nom de famille"
                  onInputChange={(newValue) =>
                    handleInputChange("last_name", newValue)
                  }
                />
              </div>
              <div className="flex flex-wrap items-center justify-center">
                <Input
                  icon="solar:phone-bold"
                  type="text"
                  id="phone_number"
                  placeholder="Votre numéro de téléphone"
                  onInputChange={(newValue) =>
                    handleInputChange("phone_number", newValue)
                  }
                />
                <Input
                  icon="solar:mailbox-bold"
                  type="mail"
                  id="email"
                  placeholder="Votre email"
                  onInputChange={(newValue) =>
                    handleInputChange("email", newValue)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col items-center mt-12">
              <p>Votre demande concerne t&apos;elle un projet à venir ? </p>
              <div className="flex justify-center mt-4 space-x-12">
                <button
                  onClick={() => handleHasProject("yes")}
                  className={`rounded-2xl flex flex-col items-center justify-center space-y-4 w-64 h-36 group ${
                    hasProject === "yes"
                      ? "ring ring-green-600 bg-green-50"
                      : "bg-gray-100 hover:ring hover:bg-white ring-green-600 transform duration-200"
                  }`}
                >
                  <Icon
                    icon="solar:check-circle-outline"
                    width="48"
                    height="48"
                    className={` ${
                      hasProject == "yes"
                        ? "text-green-600"
                        : "text-gray-500 group-hover:text-green-600 transform duration-700"
                    }`}
                  />
                  <p
                    className={`${
                      hasProject == "yes"
                        ? "text-green-600"
                        : "text-gray-500 group-hover:text-green-600 transform duration-700"
                    } text-gray-500 uppercase font-bold text-2xl`}
                  >
                    OUI
                  </p>
                </button>
                <button
                  onClick={() => handleHasProject("no")}
                  className={`rounded-2xl flex flex-col items-center justify-center space-y-4 w-64 h-36 group ${
                    hasProject === "no"
                      ? "ring ring-red-400 bg-red-50"
                      : "bg-gray-100 hover:bg-white hover:ring ring-red-400 transform duration-200"
                  }`}
                >
                  <Icon
                    icon="solar:close-circle-outline"
                    width="48"
                    height="48"
                    className={` ${
                      hasProject == "no"
                        ? "text-red-400"
                        : "text-gray-500 group-hover:text-red-400 transform duration-700"
                    }`}
                  />
                  <p
                    className={`${
                      hasProject == "no"
                        ? "text-red-400"
                        : "text-gray-500 group-hover:text-red-400 transform duration-700"
                    } text-gray-500 uppercase font-bold text-2xl`}
                  >
                    NON
                  </p>
                </button>
              </div>
            </div>
            {hasProject === "yes" && (
              <div className="flex items-center mt-12">
                <div className="flex flex-wrap items-center justify-center">
                  <Select
                    options={rooms}
                    placeholder="Choisissez une pièce"
                    onSelectChange={(value) =>
                      console.log("Valeur sélectionnée :", value)
                    }
                  />
                  <Select
                    options={[
                      { label: "Neuf", value: "new" },
                      { label: "Rénovation", value: "renovation" },
                    ]}
                    placeholder="Type de projet"
                    onSelectChange={(value) =>
                      console.log("Valeur sélectionnée :", value)
                    }
                  />
                </div>
              </div>
            )}
            {hasProject === "no" && (
              <div className="flex flex-col items-center mt-12">
                <div className="w-full h-60">
                  <Textarea
                    id={"message"}
                    placeholder={"Votre message"}
                    onInputChange={(newValue) =>
                      handleInputChange("message", newValue)
                    }
                  />
                </div>
                <div className="flex justify-center mt-12">
                  <Button
                    text={"Envoyer"}
                    size="large"
                    color={"primary"}
                    icon={"lets-icons:send-fill"}
                    onClick={sendForm}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export const rooms = [
  {
    label: "Cuisine",
    value: "kitchen",
  },
  {
    label: "Salon",
    value: "living-room",
  },
  {
    label: "Salle de bain",
    value: "bathroom",
  },
  {
    label: "Bureau",
    value: "office",
  },
  {
    label: "Extérieur",
    value: "outside",
  },
  {
    label: "Chambre",
    value: "bedroom",
  },
  {
    label: "Autre",
    value: "other",
  },
]
