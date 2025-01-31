"use client";
import { Icon } from "@iconify/react";
import PageTitle from "../components/PageTitle";
import MainMenu from "./../components/MainMenu";
import Input from "./../components/Input";
import Textarea from "./../components/Textarea";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Button from "../components/Button";
import CompanyInfos from "../components/CompanyInfos"; // Nouveau composant
import Alert from "../components/Alert";
import Select from "../components/Select";
import { FileUpload } from "../components/ui/file-upload";
import FormServices from "./../api/services/formServices";
import codesPostaux from "codes-postaux";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MultiStepLoader } from "./../components/ui/multi-step-loader";

export default function Page() {
  const [formData, setFormData] = useState({});
  const [hasProject, setHasProject] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isWithPro, setIsWithPro] = useState("no");
  const [formErrors, setFormErrors] = useState({});
  const { VerifyAndSendEmail } = FormServices();
  const [cities, setCities] = useState([]);
  const [proCities, setProCities] = useState([]);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [messageStatus, setMessageStatus] = useState("");
  const [typeOfStatus, setTypeOfStatus] = useState(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();
  const [sendingInProgress, setSendingInProgress] = useState(false);
  const [stepChanger, setStepChanger] = useState(0);

  const handleInputChange = (id, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: newValue,
    }));
  };

  const handleHasProject = (type) => {
    setHasProject(type);
  };

  const handleShowInfosPro = (value) => {
    setIsWithPro(value);
  };

  const sendForm = async () => {
    if (!validateForm()) {
      return; // Si la validation échoue, ne pas envoyer
    }

    setSendingInProgress(true);
    setStepChanger(0);

    if (!executeRecaptcha) {
      setMessageStatus("Erreur avec le reCAPTCHA.");
      setTypeOfStatus("error");
      setShowAlert(true);
      return;
    }

    // Générer un NOUVEAU token reCAPTCHA
    const token = await executeRecaptcha("form_submission");
    setRecaptchaToken(token);

    // Vérification du reCAPTCHA côté serveur
    try {
      const recaptchaResponse = await axios.post(
        "/api/recaptcha",
        { token: token }, // Le corps de la requête
        {
          headers: {
            "Content-Type": "application/json", // Si c'est un JSON, sinon "multipart/form-data"
          },
        }
      );
      if (recaptchaResponse.status !== 200) {
        setMessageStatus("Échec de la vérification reCAPTCHA.");
        setSendingInProgress(true);
        // setTypeOfStatus("error");
        // setShowAlert(true);
        return;
      }

      const responseStatus = await VerifyAndSendEmail(formData);
      if (responseStatus === 200) {
        setStepChanger(1);
        // setTypeOfStatus("success");
        // setMessageStatus(
        //   "Formulaire envoyé avec succès ! Redirection vers la page d'accueil en cours..."
        // );
        setStepChanger(2);

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setSendingInProgress(false);
        setTypeOfStatus("error");
        setMessageStatus("Une erreur s'est produite, veuillez recommencer...");
        setShowAlert(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // Réinitialiser le token pour forcer la régénération lors du prochain envoi
      setRecaptchaToken(null);
    } catch (error) {
      setSendingInProgress(false);
      setTypeOfStatus("error");
      setMessageStatus("Une erreur s'est produite, veuillez recommencer...");
      setShowAlert(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const findCity = (zipcode, type) => {
    const response = codesPostaux.find(zipcode);
    const transformedCities = response.map((city) => ({
      label: city.nomCommune,
      value: city.libelleAcheminement,
    }));
    if (type === "cities") {
      setCities(transformedCities);
    }
    console.log("response", response);

    if (type === "proCities") {
      setProCities(transformedCities);
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
        formData.phone_number
      )
    ) {
      errors.phone_number = "Le numéro de téléphone n'est pas correct";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Un email valide est requis";
    }
    if (!formData.message || formData.message.trim() === "") {
      errors.message = "Votre message ne peut pas être vide";
    }
    if (hasProject === "yes") {
      if (!formData.address || formData.address.trim() === "") {
        errors.address = "L'adresse du projet est requise";
      }
      if (!formData.zipcode || formData.zipcode.trim() === "") {
        errors.zipcode = "Le code postal du projet est requis";
      }
      if (!formData.city || formData.city.trim() === "") {
        errors.city = "La ville du projet est requise";
      }
      if (!formData.typeProject) {
        errors.typeProject = "Le type de projet doit être renseigné";
      }
      // if (!formData.room) {
      //   errors.room = "La pièce doit être renseignée";
      // }
    }
    if (isWithPro === "yes") {
      // if (!formData.proAddress || formData.proAddress.trim() === "") {
      //   errors.proAddress = "L'adresse du projet est requise";
      // }
      if (!formData.proZipcode || formData.proZipcode.trim() === "") {
        errors.proZipcode = "Le code postal du professionnel est requis";
      }
      if (!formData.proCity || formData.proCity.trim() === "") {
        errors.proCity = "La ville du professionnel est requise";
      }
      if (!formData.proName || formData.proName.trim() === "") {
        errors.proName = "Le nom du professionnel est requis";
      }
      // if (!formData.proEmail || !/\S+@\S+\.\S+/.test(formData.proEmail)) {
      //   errors.proEmail = "Un email valide est requis";
      // }
      if (
        formData.proTel &&
        !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
          formData.proTel
        )
      ) {
        errors.proTel =
          "Le numéro de téléphone du professionnel n'est pas correct";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={"Formulaire de contact"}></PageTitle>
      {showAlert && (
        <Alert
          message={messageStatus}
          type={typeOfStatus}
          duration={5000}
          isVisible={showAlert}
          onClose={() => setShowAlert(false)}
        />
      )}
      <MultiStepLoader
        loadingStates={[
          { text: "Vérification des fichiers en cours" },
          { text: "Envoi du message" },
          { text: "Redirection vers la page d'accueil" },
        ]}
        loading={sendingInProgress}
        onStepChange={stepChanger}
      />
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
                  className={"w-80"}
                  error={formErrors.first_name}
                />
                <Input
                  icon="solar:user-circle-bold"
                  type="text"
                  id="last_name"
                  placeholder="Votre nom de famille"
                  onInputChange={(newValue) =>
                    handleInputChange("last_name", newValue)
                  }
                  className={"w-80"}
                  error={formErrors.last_name}
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
                  className={"w-80"}
                  error={formErrors.phone_number}
                />
                <Input
                  icon="solar:mailbox-bold"
                  type="mail"
                  id="email"
                  placeholder="Votre email"
                  onInputChange={(newValue) =>
                    handleInputChange("email", newValue)
                  }
                  className={"w-80"}
                  error={formErrors.email}
                />
              </div>
            </div>
            <div className="flex flex-col items-center mt-12">
              <p className="mb-4">
                Votre demande concerne t&apos;elle un projet à venir ?{" "}
              </p>
              <div className="flex flex-wrap justify-around w-full">
                <button
                  onClick={() => {
                    handleHasProject("yes");
                    handleInputChange("hasProject", "yes");
                  }}
                  className={`rounded-2xl flex flex-col items-center justify-center space-y-4 w-64 h-36 group m-2 ${
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
                  onClick={() => {
                    handleHasProject("no");
                    handleInputChange("hasProject", "no");
                  }}
                  className={`rounded-2xl flex flex-col items-center justify-center space-y-4 w-64 h-36 group m-2 ${
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
              <div className="mt-12">
                <div className="border rounded-2xl px-2 md:px-12 py-2 md:py-6 my-4 bg-white">
                  <h5 className="mb-4">Quelle est l'adresse du projet ?</h5>
                  <div className="flex flex-col flex-wrap items-center mt-4">
                    {/* <label htmlFor="address">
                        Quelle est l'adresse du projet ?
                      </label> */}
                    <Input
                      type="text"
                      id="address"
                      placeholder="Ex: Rue de la paix"
                      onInputChange={(newValue) =>
                        handleInputChange("address", newValue)
                      }
                      className={"w-full"}
                      error={formErrors.address}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <Input
                      // icon="solar:map-point-add-bold"
                      type="text"
                      id="zipcode"
                      placeholder="Code postal"
                      onInputChange={(newValue) => {
                        handleInputChange("zipcode", newValue);
                        findCity(newValue, "cities");
                      }}
                      className={"w-full sm:w-52"}
                      error={formErrors.zipcode}
                    />
                    <Select
                      id="city"
                      options={cities}
                      placeholder={`Choisissez une ville (${cities.length})`}
                      onSelectChange={(value) =>
                        handleInputChange("city", value)
                      }
                      className={"w-full -mr-0"}
                    />
                    {/* <Input
                      // icon="solar:map-point-add-bold"
                      type="text"
                      id="city"
                      placeholder="Ville"
                      onInputChange={(newValue) =>
                        handleInputChange("city", newValue)
                      }
                      className={"w-full -mr-0"}
                      error={formErrors.city}
                    /> */}
                  </div>
                </div>
                <div className="border rounded-2xl px-2 md:px-12 py-2 md:py-12 my-4 bg-white">
                  <h5 className="mb-4">
                    Quels sont les informations du projet ?
                  </h5>

                  <div className="flex flex-col flex-wrap items-center">
                    <label htmlFor="typeProject">
                      Quel est le type de votre projet ?
                    </label>
                    <Select
                      options={[
                        { label: "Neuf", value: "new" },
                        { label: "Rénovation", value: "renovation" },
                      ]}
                      placeholder="Type de projet"
                      onSelectChange={(value) =>
                        handleInputChange("typeProject", value)
                      }
                      className={"w-80"}
                      error={formErrors.typeProject}
                    />
                  </div>
                  <div className="flex flex-col flex-wrap items-center mt-4">
                    <label htmlFor="room">
                      Dans quelle pièce se situe votre projet ?
                    </label>
                    <Select
                      id={"room"}
                      options={rooms}
                      placeholder="Choisissez une pièce"
                      onSelectChange={(value) =>
                        handleInputChange("room", value)
                      }
                      className={"w-80"}
                      error={formErrors.room}
                    />
                  </div>
                  <div className="flex flex-col flex-wrap items-center mt-4">
                    <label htmlFor="room">
                      Avez-vous déjà choisi votre matériau ?
                    </label>
                    <Input
                      type="text"
                      id="material"
                      placeholder="Ex : Dekton Sirius 20MM"
                      onInputChange={(newValue) =>
                        handleInputChange("material", newValue)
                      }
                      className={"w-80"}
                      error={formErrors.material}
                    />
                  </div>
                  <div className="flex flex-col flex-wrap items-center mt-4">
                    <label htmlFor="room">
                      Savez vous s'il y a des usinages spécifiques à réaliser ?
                    </label>
                    <Input
                      type="text"
                      id="machining"
                      placeholder="Ex : Découpe d'évier, trou pour prise..."
                      onInputChange={(newValue) =>
                        handleInputChange("machining", newValue)
                      }
                      className={"w-80"}
                      error={formErrors.machining}
                    />
                  </div>
                </div>
                <div className="border rounded-2xl px-2 md:px-12 py-2 md:py-12 my-4 bg-white">
                  <h5 className="mb-4">
                    Êtes vous accompagné par un professionnel ?
                  </h5>

                  <div className="flex flex-col flex-wrap items-center">
                    {/* <label htmlFor="pro">
                      Êtes vous accompagné par un professionnel ?
                    </label> */}
                    <Select
                      id={"pro"}
                      options={[
                        { label: "Oui", value: "yes" },
                        { label: "Non", value: "no" },
                      ]}
                      placeholder="Choisissez une réponse"
                      onSelectChange={(value) => {
                        handleShowInfosPro(value);
                        handleInputChange("isPro", value);
                      }}
                      className={"w-auto"}
                      error={formErrors.isPro}
                    />
                  </div>
                  {isWithPro === "yes" && (
                    <div>
                      <div className="mt-4 w-full">
                        <div className="">
                          <Input
                            // icon="solar:mailbox-bold"
                            type="text"
                            id="proName"
                            placeholder="Nom du professionnel"
                            onInputChange={(newValue) =>
                              handleInputChange("proName", newValue)
                            }
                            error={formErrors.proName}
                          />
                          <Input
                            // icon="solar:mailbox-bold"
                            type="text"
                            id="proAddress"
                            placeholder="Adresse"
                            onInputChange={(newValue) =>
                              handleInputChange("proAddress", newValue)
                            }
                            error={formErrors.proAddress}
                          />
                        </div>
                        <div className="flex flex-col sm:flex-row items-center">
                          <Input
                            // icon="solar:map-point-add-bold"
                            type="text"
                            id="proZipcode"
                            placeholder="Code postal"
                            onInputChange={(newValue) => {
                              handleInputChange("proZipcode", newValue);
                              findCity(newValue, "proCities");
                            }}
                            className={"w-full sm:w-52"}
                            error={formErrors.proZipcode}
                          />
                          <Select
                            id="proCity"
                            options={proCities}
                            placeholder={`Choisissez une ville (${proCities.length})`}
                            onSelectChange={(value) => {
                              handleInputChange("proCity", value);
                            }}
                            className={"w-full -mr-0"}
                          />
                          {/* <Input
                            // icon="solar:map-point-add-bold"
                            type="text"
                            id="proCity"
                            placeholder="Ville"
                            onInputChange={(newValue) => {
                              handleInputChange("proCity", newValue);
                              findCity(newValue, "proCities");
                            }}
                            className={"w-full sm:w-full"}
                            error={formErrors.proCity}
                          /> */}
                        </div>
                        <div className="">
                          <Input
                            // icon="solar:map-point-add-bold"
                            type="mail"
                            id="proEmail"
                            placeholder="Email"
                            onInputChange={(newValue) =>
                              handleInputChange("proEmail", newValue)
                            }
                            error={formErrors.proEmail}
                          />
                          <Input
                            // icon="solar:map-point-add-bold"
                            type="text"
                            id="proTel"
                            placeholder="Numéro de téléphone"
                            onInputChange={(newValue) =>
                              handleInputChange("proTel", newValue)
                            }
                            error={formErrors.proTel}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="border rounded-2xl px-2 md:px-12 py-2 md:py-12 my-4 bg-white">
                  <h5 className="mb-4">Avez-vous des documents à fournir ?</h5>
                  <FileUpload
                    onChange={(newValue) =>
                      handleInputChange("files", newValue)
                    }
                  />
                </div>
              </div>
            )}
            {hasProject != null && (
              <div className="flex flex-col items-center mt-12">
                <div className="w-full h-60">
                  <Textarea
                    id={"message"}
                    placeholder={"Votre message"}
                    onInputChange={(newValue) =>
                      handleInputChange("message", newValue)
                    }
                    error={formErrors.message}
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
                {Object.keys(formErrors).length > 0 && (
                  <div className="m-8 border border-red-500 bg-red-50 rounded-2xl p-2 text-sm shadow-xl">
                    <p className="text-red-600 font-bold">
                      Veuillez corriger les erreurs suivantes avant l'envoi du
                      message
                    </p>
                    <div>
                      {Object.keys(formErrors).map((key, index) => {
                        return (
                          <div key={index} className="text-red-500">
                            {formErrors[key]}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

const rooms = [
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
];

// export const FormInputs = ({ label, options, placeholder }) => {
//   return (
//     <div className="flex flex-col flex-wrap items-center border rounded-2xl md:px-12 py-12 my-4">
//       <label>{label}</label>
//       <Select
//         options={options}
//         placeholder={placeholder}
//         onSelectChange={(value) => console.log("Valeur sélectionnée :", value)}
//       />
//     </div>
//   );
// };
