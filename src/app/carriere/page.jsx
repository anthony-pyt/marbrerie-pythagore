"use client";

import MainMenu from "./../components/MainMenu";
import SlideComponent from "./../components/sliders/sliderComponent";
import Cards from "../components/cards/cardComponent";
import Footer from "../components/Footer";
import { Icon } from "@iconify/react";
import { useState } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import PageTitle from "../components/PageTitle";
import AnimatedTestimonials from "./../components/ui/animated-testimonials";
import ServiceCard from "../components/services/serviceCard";
import { PinContainer, PinPerspective } from "../components/ui/3d-pin";
import Image from "next/image";
import Button from "../components/Button";

const metiersAtelier = [
  {
    id: 1,
    src: "/images/atelier/IMG_0053.JPEG",
    alt: "IMG_0053",
    name: "Polisseur",
    quote:
      "assure la finition des surfaces en pierres naturelles, quartz ou céramique selon l’aspect final voulu par les clients. Il met en valeur l’éclat et la brillance de la pierre grâce à un polissage manuel ou automatique d’une grande précision.",
  },
  {
    id: 2,
    src: "/images/atelier/IMG_0084.JPEG",
    alt: "IMG_0084",
    name: "Débiteur",
    quote:
      "assure la découpe en machine des surfaces en pierre naturelle, quartz ou céramique conformément aux plans transmis par le bureau d’étude.",
  },
  {
    id: 3,
    src: "/images/atelier/IMG_1598.jpg",
    alt: "IMG_1598",
    name: "Contrôleur",
    quote:
      "intervient à la fin de la chaîne de transformation pour vérifier la conformité du plan de travail et le préparer avant expédition. ",
  },
];

const metiersClient = [
  {
    id: 1,
    src: "/images/relations/relation_reunion.jpg",
    alt: "realtion_reunion",
    name: "Assistant commercial/ADV",
    quote:
      "est en charge d’assurer la relation client par la création d’une réelle relation de confiance et d’élaborer les commandes clients de son propre secteur géographique.",
  },
  {
    id: 2,
    src: "/images/relations/excited-multiracial-colleagues-enjoying-triumph-together-in-3931634-scaled.jpeg",
    alt: "realtion_reunion",
    name: "Chargé de planning",
    quote:
      "organise la pose des plans de travail choisis. Pour cela, il gère les échanges clients, et planifie les tournées des installateurs.",
  },
  {
    id: 3,
    src: "/images/relations/excited-multiracial-colleagues-enjoying-triumph-together-in-3931634-scaled.jpeg",
    alt: "realtion_reunion",
    name: "Chargé de Clientèle",
    quote:
      "développe un portefeuille client de son propre secteur géographique, en organisant des visites clients, en les formant, et en collaborant avec les équipes commerciales pour maximiser la visibilité et les ventes des produits.",
  },
];

const metiersTerrain = [
  {
    id:1,
    src: "/images/relations/relation_reunion.jpg",
    alt: "realtion_reunion",
    name: "Dessinateur DAO",
    quote:
      "étudie les projets, puis réalise des plans de fabrication 2D sur logiciel pour permettre la conception de plans de travail en pierres naturelles, quartz ou céramique par l’entreprise.",
  },
  {
    id:2,
    src: "/images/relations/excited-multiracial-colleagues-enjoying-triumph-together-in-3931634-scaled.jpeg",
    alt: "realtion_reunion",
    name: "Installateur ",
    quote:
      " intervient auprès des clients pour monter et assembler des surfaces en pierres naturelles, quartz ou céramique préalablement transformés par l’entreprise pour réaliser différents types d’agencement. (Organisation des chantiers, Pose et Installation, Assurer le bon déroulement de la commande)",
  },
  {
    id:3,
    src: "/images/relations/excited-multiracial-colleagues-enjoying-triumph-together-in-3931634-scaled.jpeg",
    alt: "realtion_reunion",
    name: "Coteur ",
    quote:
      "intervient auprès des clients pour effectuer des relevés de mesures sur différents agencements, en vue de la fabrication des plans en pierre naturelle, quartz ou céramique par l’entreprise. (Organisation et préparation des interventions, Prise de cotes, Assure la relation client au moment de la prise de cotes, Réalisation du dossier de cotes)",
  },
];

const commitments = [
  {
    id: 1,
    title: "Nous soutenons nos collaborateurs",
    description:
      "Donner les moyens à nos collaborateurs de réaliser pleinement leur potentiel, est une valeur unanimement reconnue dans l’entreprise. Les conditions de travail sont régulièrement optimisées pour que chacun puisse offrir le meilleur de lui-même.",
    src: "/images/engagements/young-colleagues-work-office-using-computers.jpg",
  },
  {
    id: 2,
    title: "Nous pensons à notre futur",
    description:
      "Notre engagement se traduit également par des actions concrètes pour préserver notre environnement. Nous optimisons nos déchets  et privilégions le recyclage de l'eau dans notre processus de travail. Nous adoptons aussi une approche de sobriété énergétique, en réduisant notre consommation d'énergie pour un avenir plus durable.",
    src: "/images/relations/relation_reunion.jpg",
  },
  {
    id: 3,
    title: "Nous recrutons pour l’avenir",
    description:
      "En tant qu'acteur économique de notre territoire, nous adoptons des politiques de recrutement inclusives, offrant des aides à la mobilité pour faciliter l’installation de nos nouveaux employés. Notre processus d’intégration permet à chacun de s’épanouir et de s’intégrer facilement au sein de notre équipe.",
    src: "/images/engagements/decoupe.jpg",
  },
];

const providedPositions = [
  {
    id:1,
    title: "Installateurs H/F",
    description:
      "Vos missions : Vous êtes chargé(e) d'assurer la finition des plans de travail en pierres naturelles, quartz ou céramique selon l'aspect final voulu par les clients. Vous mettez en valeur le plan de travail par des opérations de polissage extrêmement précises qu'elles soient manuelles ou automatiques ; à l'aide d'un outillage électroportatif (polissage, collage, assemblage). Vous êtes à l'aise avec ce type de matériel. Port de charge et manipulation à prévoir. ",
    type: "CDI Temps Plein",
    src: "/images/engagements/installateurs.png",
    date: "2022-12-12",
  },
  {
    id:2,
    title: "Polisseurs H/F",
    description:
      "Prendre connaissance des commandes prévues et leurs spécificités - Savoir lire les plans",
    type: "CDI Temps Plein",
    src: "/images/engagements/polisseur.png",
    date: "2022-12-12",
  },
  {
    id:3,
    title: "Chargé de clientèle H/F",
    description:
      "Vous êtes autonome, minutieux (e). La lecture de plans ne vous pose aucun problème et votre travail est soigné. Vous aimez travailler en équipe. Idéalement vous justifiez d'une expérience en tant que marbrier(ère), ou tout autre métier manuel (travail du métal, du verre, du bois) ou d'un métier du second œuvre.",
    type: "CDD mi-temps",
    src: "/images/engagements/entretien.png",
    date: "2022-12-12",
  },
];

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = (value) => {
    setIsOpenModal(value);
  };
  return (
    <main className="min-h-screen antialiased">
      <MainMenu />
      <PageTitle title={"Nos métiers"} />
      <div className="m-4 bg-gray-100 p-4 rounded-xl ">
        <SectionTestimonials
          title={"EN RELATION AVEC NOS CLIENTS"}
          images={metiersClient}
        />
        <SectionTestimonials title={"À L’ATELIER"} images={metiersAtelier} />
        <SectionTestimonials title={"SUR LE TERRAIN"} images={metiersTerrain} />
      </div>
      <SectionCommitments />
      <Footer />
    </main>
  );
}

const SectionTestimonials = ({ title, images }) => (
  <div className="container mx-auto m-2">
    <h2 className="text-4xl text-center md:text-left">{title}</h2>
    <AnimatedTestimonials testimonials={images} />
  </div>
);

const SectionCommitments = () => (
  <div className="container mx-auto my-8">
    <h2 className="text-4xl">NOS ENGAGEMENTS</h2>
    <div className="w-full flex justify-center items-center">
      <div className="grid md:grid-cols-3 sm:gap-6 mb-5 gap-5 mt-12 p-2 ">
        {commitments.map((item, index) => (
          <ServiceCard key={index} title={item.title} image={item.src}>
            <div>{item.description}</div>
          </ServiceCard>
        ))}
      </div>
    </div>
    <Provided />
  </div>
);

const Provided = () => (
  <div className="mt-12 mx-auto bg-secondary p-12 rounded-xl">
    <div className="flex items-center justify-center w-full">
      <div className="mb-12 flex items-center space-x-3">
        <h2 className="text-white">Nos dernières offres d'emploi</h2>
        <Button
          onClick={() => setIsOpenModal(true)}
          text={"Voir plus"}
          color="or"
          icon={"solar:arrow-right-outline"}
        />
      </div>
    </div>
    <div className="w-full flex justify-center items-center max-w-5xl mx-auto">
      <div className="">
        {providedPositions.map((item, index) => (
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

const Candidacy = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    cv: null,
    motivationLetter: null,
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Ici, vous pouvez envoyer les données à un serveur ou effectuer d'autres actions
  };

  return (
    <div className="w-full">
      <div className=" ">
        <h2 className="mb-4">CANDIDATURES</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <InlineInput
            type="text"
            label="Votre nom"
            name="lastName"
            value={formData.firstName}
            onChange={handleChange}
            icon="solar:user-circle-bold"
            placeholder="Nom"
            required
          />
          <InlineInput
            type="text"
            label="Votre prénom"
            name="fistName"
            value={formData.lastName}
            onChange={handleChange}
            icon="solar:user-circle-bold"
            placeholder="Prénom"
            required
          />
          <InlineInput
            type="email"
            label="Votre adresse mail"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            icon="entypo:email"
            required
          />
          <FileInput
            id="fil_cv"
            label="Laissez-nous votre CV"
            name="cv"
            onChange={handleChange}
          />
          <FileInput
            id="fil_lmotiv"
            label="Ajoutez une lettre de motivation"
            name="motivationLetter"
            onChange={handleChange}
          />
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Écrivez vos pensées ici..."
            required
            className="block p-2.5 w-full text-sm text-gray-900 0 rounded-lg border border-gray-300 outline-none"
          />
          <div className="flex items-center mb-4">
            <input
              id="terms-checkbox"
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="w-4 h-4"
              required
            />
            <label
              htmlFor="terms-checkbox"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              {"J'accepte les conditions"}
            </label>
            <a
              className="text-xs text-blue-500 underline"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lire nos CGU
            </a>
          </div>
          <button
            type="submit"
            className="bg-slate-800 text-white rounded-lg p-2"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

const InlineInput = ({
  type,
  label,
  name,
  value,
  onChange,
  required,
  icon,
  placeholder,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-900"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none shadow-sm transition duration-300 ease-in-out"
      />
      <Icon
        icon={icon}
        width="30"
        height="30"
        className="absolute transform -translate-y-1/2 top-1/2 right-1 text-gray-300 hover:text-blue-500 transition-colors duration-200 ease-in-out"
      />
    </div>
  </div>
);

const FileInput = ({ id, label, name, onChange }) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-900"
    >
      {label}
    </label>
    <input
      type="file"
      id={id}
      name={name}
      onChange={onChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-1.5"
    />
  </div>
);

const DialogFom = () => {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="py-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Postuler
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        transition
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className=" space-y-4 bg-white p-6 rounded-lg duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="static-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <Candidacy />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
