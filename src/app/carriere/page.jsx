"use client";

import MainMenu from "./../components/MainMenu";
import SlideComponent from "./../components/sliders/sliderComponent";
import Cards from '../components/cards/cardComponent';
import Footer from "../components/Footer";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Description, Dialog, DialogPanel, DialogTitle, DialogBackdrop, } from '@headlessui/react'
import PageTitle from "../components/PageTitle";
const images = [
  {
    image_url: "/images/atelier/IMG_0053.JPEG",
    alt: "IMG_0053",
    title: 'Polisseur',
    description: "assure la finition des surfaces en pierres naturelles, quartz ou céramique selon l’aspect final voulu par les clients. Il met en valeur l’éclat et la brillance de la pierre grâce à un polissage manuel ou automatique d’une grande précision. "

  },
  {
    image_url: "/images/atelier/IMG_0084.JPEG",
    alt: "IMG_0084",
    title: 'Polisseur',
    description: "assure la finition des surfaces en pierres naturelles, quartz ou céramique selon l’aspect final voulu par les clients. Il met en valeur l’éclat et la brillance de la pierre grâce à un polissage manuel ou automatique d’une grande précision. "
  },
  {
    image_url: "/images/atelier/IMG_1598.jpg",
    alt: "IMG_1598",
    title: 'Polisseur',
    description: "assure la finition des surfaces en pierres naturelles, quartz ou céramique selon l’aspect final voulu par les clients. Il met en valeur l’éclat et la brillance de la pierre grâce à un polissage manuel ou automatique d’une grande précision. "
  },
  {
    image_url: "/images/atelier/IMG_1597.png",
    alt: "IMG_1597",
    title: 'Polisseur',
    description: "assure la finition des surfaces en pierres naturelles, quartz ou céramique selon l’aspect final voulu par les clients. Il met en valeur l’éclat et la brillance de la pierre grâce à un polissage manuel ou automatique d’une grande précision. "
  },
  {
    image_url: "/images/atelier/IMG_1600.png",
    alt: "IMG_1600",
    title: 'Poseur',
    description: "assure la finition des surfaces en pierres naturelles, quartz ou céramique selon l’aspect final voulu par les clients. Il met en valeur l’éclat et la brillance de la pierre grâce à un polissage manuel ou automatique d’une grande précision. "
  }
  // ... (other images)
];

const customerRelationships = [
  {
    image_url: "/images/relations/relation_reunion.jpg",
    alt: "realtion_reunion",
    title: 'Assistant administration des ventes',
    description: "Est en charge d’assurer la relation client par la création d’une réelle relation de confiance et d’élaborer les commandes clients de son propre secteur géographique. "

  },
  {
    image_url: "/images/relations/excited-multiracial-colleagues-enjoying-triumph-together-in-3931634-scaled.jpeg",
    alt: "realtion_reunion",
    title: 'Assistant administration des ventes',
    description: "Est en charge d’assurer la relation client par la création d’une réelle relation de confiance et d’élaborer les commandes clients de son propre secteur géographique. "


  }
  // ... (other relationships)
];

const commitments = [
  {
    title: "Nous soutenons nos collaborateurs",
    description: "Donner les moyens à nos collaborateurs de réaliser pleinement leur potentiel, est une valeur unanimement reconnue dans l’entreprise. Les conditions de travail sont régulièrement optimisées pour que chacun puisse offrir le meilleur de lui-même.",
    image_url: "/images/engagements/young-colleagues-work-office-using-computers.jpg"
  },
  {
    title: "Nous pensons à notre futur",
    description: "Notre engagement se traduit également par des actions concrètes pour préserver notre environnement. Nous optimisons nos déchets  et privilégions le recyclage de l'eau dans notre processus de travail. Nous adoptons aussi une approche de sobriété énergétique, en réduisant notre consommation d'énergie pour un avenir plus durable.",
    image_url: "/images/relations/relation_reunion.jpg"
  },
  {
    title: "Nous recrutons pour l’avenir",
    description: "Nous adoptons des politiques de recrutement inclusives, offrant des aides à la mobilité pour faciliter l’installation de nos nouveaux employés. Notre processus d’intégration permet à chacun de s’épanouir et de s’intégrer facilement au sein de notre équipe.",
    image_url: "/images/engagements/decoupe.jpg"
  }
  // ... (other commitments)
];

const providedPositions = [
  {
    title: "Installateurs",
    description: "CDI Temps Plein",
    image_url: "/images/engagements/installateurs.png"
  },
  {
    title: "Polisseurs",
    description: "CDI Temps Plein",
    image_url: "/images/engagements/polisseur.png"
  },
  {
    title: "Chargé de clientèle",
    description: "CDI Temps Plein",
    image_url: "/images/engagements/entretien.png"
  }
  // ... (other positions)
];

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = (value) => {
    setIsOpenModal(value);
  };
  return (
    <main className="min-h-screen antialiased">
      <MainMenu />
      <PageTitle title={'Nos métier'} />
      <SectionWorkShop />
      <SectionCommitments />
      <Footer />
    </main>
  );
}

const SectionWorkShop = () => (
  <div className="container mx-auto">
    <fieldset className="grid my-8 border border-or rounded-lg">
      <legend className="md:text-3xl ms-5 text-xl">À L’ATELIER</legend>
      <SlideComponent images={images} />
    </fieldset>
    <RelationshipSection />
  </div>
);

const RelationshipSection = () => (
  <fieldset className="grid my-8 border border-or rounded-lg">
    <legend className="md:text-3xl ms-5 text-xl">EN RELATION AVEC NOS CLIENTS</legend>
    <SlideComponent images={customerRelationships} />
  </fieldset>
);

const SectionCommitments = () => (

  <div className="container mx-auto">
    <h2 className="text-xl md:text-4xl text-center md:text-left">NOS ENGAGEMENTS</h2>
    <div className="mt-8 w-full flex justify-center items-center">
      <div className="grid md:grid-cols-3 sm:gap-6 mb-5 gap-5 mt-12 p-2 ">
        {commitments.map((item, index) => (
          <Cards key={index} description={item.description} title={item.title} image={item.image_url} titleClass="text-base"
            cardClass=" min-w-48 bg-white rounded-xl shadow-xl border my-10 "
            imageClass=" rounded-md  max-w-64 w-auto  "
            imageContainerClass="flex justify-center -mt-24"
            cildrenClass='text-gray-400' />
        ))}
      </div>
    </div>
    <Provided />

  </div>
)

const Provided = () => (
  <div>
    <div className="flex items-center gap-4 w-full">
      <h2 className="">POSTES
        À POURVOIR</h2>
      <DialogFom />
    </div>
    <div className="mt-8 w-full flex justify-center items-center  ">
      <div className="grid md:grid-cols-3 sm:gap-6 mb-5 gap-5 mt-12 p-2 ">
        {providedPositions.map((item, index) => (
          <Cards key={index} description={item.description} chidren={item.title} image={item.image_url}
            cardClass=" min-w-64  rounded-xl   my-10 "
            imageClass=" rounded-md  max-w-64 w-auto  "
            imageContainerClass="flex justify-center -mt-24"
            cildrenClass='text-xs normal-case rounded-xl  inline-flex px-2 text-center  items-center py-0.5 border border-slate-600 hover:bg-slate-800 hover:text-white font-normal' />
        ))}
      </div>
    </div>
  </div>
)

const Candidacy = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    cv: null,
    motivationLetter: null,
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
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
            <label htmlFor="terms-checkbox" className="ms-2 text-sm font-medium text-gray-900">{"J'accepte les conditions"}</label>
            <a className="text-xs text-blue-500 underline" href="#" target="_blank" rel="noopener noreferrer">Lire nos CGU</a>
          </div>
          <button type="submit" className="bg-slate-800 text-white rounded-lg p-2">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

const InlineInput = ({ type, label, name, value, onChange, required, icon, placeholder }) => (
  <div >
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">{label} {required && <span className="text-red-500">*</span>}</label>
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
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
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
  let [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" className="py-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Postuler</button>
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
          <DialogPanel transition
            className=" space-y-4 bg-white p-6 rounded-lg duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0">
            <div className="flex gap-4 justify-end">
              <button onClick={() => setIsOpen(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <Candidacy />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
