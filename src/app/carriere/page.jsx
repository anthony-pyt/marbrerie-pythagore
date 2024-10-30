"use client"

import MainMenu from "./../components/MainMenu";
import SlideComponent from "./../components/sliders/sliderComponent";
import Cards from '../components/cards/cardComponent';
import Footer from "../components/Footer";

const images = [{
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
  title: 'Polisseur',
  description: "assure la finition des surfaces en pierres naturelles, quartz ou céramique selon l’aspect final voulu par les clients. Il met en valeur l’éclat et la brillance de la pierre grâce à un polissage manuel ou automatique d’une grande précision. "
}]
const coustomerRealtionship = [
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
]
const Commintments = [{
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
}]

const provideds = [
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
]
export default function Page() {
  return (
    <main className="min-h-screen antialiased">
      <MainMenu />
      <h1>Nos métiers</h1>
      <SectionWorkShop />
      <RelationShip />
      <SectionCommintments />
      <Footer />
    </main>
  );
}

const SectionWorkShop = () => (
  <fieldset className="container flex justify-center mx-auto my-8 border border-or rounded-lg">
    <legend className="text-3xl ms-5">À L’ATELIER</legend>
    <SlideComponent images={images} />
  </fieldset>
)
const RelationShip = () => (
  <fieldset className="container flex justify-center mx-auto my-8 border border-or rounded-lg">
    <legend className="text-3xl ms-5">EN RELATION AVEC NOS CLIENTS</legend>
    <SlideComponent images={coustomerRealtionship} />
  </fieldset>
)

const SectionCommintments = () => (

  <div className="container mx-auto">
    <h2>NOS ENGAGEMENTS</h2>
    <div className="mt-8 w-full flex justify-center items-center">
      <div className="grid md:grid-cols-3 sm:gap-6 mb-5 gap-5 mt-12 p-2 ">
        {Commintments.map((item, index) => (
          <Cards key={index} description={item.description} title={item.title} image={item.image_url} titleClass="text-base"
            cardClass=" min-w-48 bg-white rounded-xl shadow-xl border my-10 "
            imageClass=" rounded-md  max-w-64 w-auto  "
            imageContainerClass="flex justify-center -mt-24"
            cildrenClass='text-gray-400' />
        ))}
      </div>
    </div>
    <Provided />
    <Candidacy />
  </div>
)

const Provided = () => (
  <div>
    <div className="flex items-center gap-4">
      <h2 className="">POSTES
        À POURVOIR</h2>
      <button type="button" className="py-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Postuler</button>
    </div>
    <div className="mt-8 w-full flex justify-center items-center  ">
      <div className="grid md:grid-cols-3 sm:gap-6 mb-5 gap-5 mt-12 p-2 ">
        {provideds.map((item, index) => (
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

const Candidacy = () => (
  <div className="flex items-center w-full justify-center">
    <div className="border rounded-md p-4 my-8 w-full max-w-lg ">
      <h2 className="mb-4">CANDIDATURES</h2>
      <form className="flex flex-col space-y-4" >
        <div>
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre nom *</label>
          <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 outline-none" placeholder="Nom" required />
        </div>
        <div>
          <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vos prénoms *</label>
          <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 outline-none" placeholder="Prénoms" required />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre adresse mail *</label>
          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 outline-none" placeholder="Email" required />
        </div>
        <div>
          <label htmlFor="fil_cv" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Laissez-nous votre CV</label>
          <input type="file" id="fil_cv" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 outline-none" />
        </div>
        <div>
          <label htmlFor="fil_lmotiv" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ajoutez une lettre de motivation</label>
          <input type="file" id="fil_lmotiv" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1.5 outline-none" />
        </div>
        <div>
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre message *</label>
          <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none" placeholder="Écrivez vos pensées ici..." required></textarea>
        </div>
        <p className="my-4 text-xs">* Champ obligatoire</p>
        <div className="flex items-center mb-4">
          <input id="terms-checkbox" type="checkbox" onChange={(e) => handllechecked(e)} className="w-4 h-4 text-slate-900 outline-none  border-gray-300 rounded " required />
          <label htmlFor="terms-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{"J'accepte les conditions"}</label>
        </div>
        <a className="text-xs decoration-or text-or underline" href="#" target="_blank" rel="noopener noreferrer">
          Lire nos CGU
        </a>

        <button type="submit" className="bg-slate-800 text-white rounded-lg p-2">Envoyer</button>
      </form>
    </div>
  </div>
);

const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    firstName: formData.get('first_name'),
    lastName: formData.get('last_name'),
    email: formData.get('email'),
    message: formData.get('message'),
    cv: formData.get('fil_cv'),
    motivationLetter: formData.get('fil_lmotiv'),
    termsAccepted: formData.get('terms-checkbox'),
  };

  console.log('Form data submitted:', data);
  // Ici, vous pouvez envoyer les données à un serveur ou effectuer d'autres actions
};

const handllechecked = (e) => {

};

