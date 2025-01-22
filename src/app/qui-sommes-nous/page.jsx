"use client";
/* eslint react/no-unescaped-entities: off */

import MainMenu from "./../components/MainMenu";
import Image from "next/image";
import Cards from "../components/cards/cardComponent";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Timeline } from "../components/ui/timeline";
import { FocusCards } from "../components/ui/focus-cards";
import ServiceCard from "../components/services/serviceCard";

export default function Page() {
  return (
    <main className="min-h-screen w-full">
      <MainMenu />
      <PageTitle title={"Qui sommes nous ?"} />
      <div className="flex justify-center m-12">
        <div className="w-11/12 xl:w-5/12 text-center">
          <h3>
            La marbrerie <span className="text-or">PYTHAGORE</span>{" "}
          </h3>
          accompagne depuis 30 ans ses clients professionnels dans la
          réalisation de leurs agencements en pierre naturelle ou reconstituée,
          en fournissant des produits et un service de la plus haute qualité.
        </div>
      </div>
      <HistoricalData />
      <OurValues />
      <Team />
      <Footer />
    </main>
  );
}

const HistoricalData = () => {
  const data = [
    {
      title: "2023",
      content: (
        <div>
          <p className="text-neutral-800 font-normal mb-8">
            Nouvel agrandissement de plus de 3000m2
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://assets.aceternity.com/templates/startup-1.webp"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2019",
      content: (
        <div>
          <p className="text-neutral-800 font-normal mb-8">
            Agrandissement de l’atelier de 1000m2
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2011",
      content: (
        <div>
          <p className="text-neutral-800 font-normal mb-8">
            Automatisation de la production en intégrant des nouvelles machines
            à commande numérique
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2007",
      content: (
        <div>
          <p className="text-neutral-800 font-normal mb-8">
            Déménagement à Laniscat dans un nouveau bâtiment
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2003",
      content: (
        <div>
          <p className="text-neutral-800 font-normal mb-8">
            Acquisition du 1ier centre d’usinage numérique en France pour la
            fabrication des plans de travail en pierre
          </p>
          {/* <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div> */}
        </div>
      ),
    },
    {
      title: "1995",
      content: (
        <div>
          <p className="text-neutral-800 font-normal mb-8">
            Création de la marbrerie de décoration
          </p>
          {/* <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://assets.aceternity.com/features-section.png"
              alt="feature template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div> */}
        </div>
      ),
    },
  ];
  return (
    <div className="mx-4 my-12 flex flex-col xl:flex-row">
      <h2 className="lg:w-1/3 text-center lg:text-left">NOTRE HISTOIRE</h2>
      <div className="lg:w-9/12">
        <Timeline data={data} />
      </div>
    </div>
  );
};

const OurValues = () => {
  const datas = [
    {
      title: "La passion",
      content:
        "Chaque jour, nous nous engageons avec passion dans notre travail pour réaliser vos projets et donner vie à votre créativité.",
      image: "/images/conseil.jpg",
    },
    {
      title: "La satisfaction clients",
      content:
        "Nous œuvrons chaque jour pour améliorer votre expérience avec des produits de haute qualité et un service client dévoué.",
        "image": "/images/formation.jpg",
    },
    {
      title: "L'engagement",
      content:
        "Chaque année, nous minimisons notre impact environnemental en éliminant nos déchets, recyclant nos eaux usées et réduisant l'utilisation de produits chimiques.",
      image: "/images/prestation.jpg",
    },
  ];

  return (
    <div className="mx-4 my-12 flex flex-col xl:flex-row">
      <h2 className="lg:w-1/3 text-center lg:text-left">NOS VALEURS</h2>
      <div className="lg:w-9/12">
        <div className="flex flex-wrap justify-between">
          {datas.map((data, index) => {
            return (
              <ServiceCard
                key={index}
                title={data.title}
                image={data.image}
              >
                <div>
                  <p>{data.content}</p>
                </div>
              </ServiceCard>
            );
          })}
        </div>
        <div className="flex justify-between space-x-1 divide-x-2 divide-or my-20">
          <div className="w-full flex flex-col items-center justify-center py-12">
            <p className="text-6xl font-bold font-serif">96%</p>
            <p className="text-xl">de satisfation clients</p>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-6xl font-bold font-serif">7000+</p>
            <p className="text-xl">projets par an</p>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-6xl font-bold font-serif">100+</p>
            <p className="text-xl">collaborateurs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  const cards = [
    {
      name: "Mathieu MONDAN",
      job: "Directeur d'exploitation",
      src: "https://images.unsplash.com/photo-1734335225921-06e1b6d94ed0?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Christelle MORIN",
      job: "Resposable commerciale",
      src: "https://images.unsplash.com/photo-1737202777198-7a913f95aa01?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Cédric GUEGIN",
      job: "Responsable bureau d'études",
      src: "https://images.unsplash.com/photo-1734335225921-06e1b6d94ed0?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Romuald PRIGENT",
      job: "Responsable des opérations",
      src: "https://images.unsplash.com/photo-1734335225921-06e1b6d94ed0?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Loîc BOUYER",
      job: "Responsable production",
      src: "https://images.unsplash.com/photo-1734335225921-06e1b6d94ed0?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Galle KERZHERO",
      job: "Directrice des ressources humaines",
      src: "https://images.unsplash.com/photo-1737202777198-7a913f95aa01?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Miguel LE FLOCH",
      job: "Responsable administratif et financier",
      src: "https://images.unsplash.com/photo-1734335225921-06e1b6d94ed0?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div className="mx-4 my-12 flex flex-col xl:flex-row">
      <h2 className="lg:w-1/3 text-center lg:text-left">L'ENCADREMENT</h2>
      <div className="lg:w-9/12">
        <FocusCards cards={cards} />
      </div>
    </div>
  );
};
