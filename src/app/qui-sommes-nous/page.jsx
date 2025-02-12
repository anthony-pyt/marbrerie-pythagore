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
      <div className="space-y-8">
        <HistoricalData />
        <OurValues />
        <Team />
      </div>
      <div>
        <DeliveryArea />
      </div>
      <Footer />
    </main>
  );
}

const ListImages = ({ images, size=32 }) => {
  return (
    <div className="flex flex-wrap justify-start items-center">
      {images.map((image, index) => {
        return (
          <div key={index}>
            <a target="_blank" href={image.url}>
              <Image
                src={image.url}
                alt={image.title}
                width={500}
                height={500}
                className={`rounded-lg object-cover h-${size} w-${size} m-1`}
              />
            </a>
          </div>
        );
      })}
    </div>
  );
};

const HistoricalData = () => {
  const data = [
    {
      title: "1995",
      content: (
        <div>
          <p className=" mb-8">
            Création de l’activité de marbrerie de décoration.
          </p>
          <ListImages
            images={[
              {
                title: "Ancien bâtiment",
                url: "/images/qui-sommes-nous/notre-histoire/batiment_ancien_logo_pythagore.jpg",
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: "2003",
      content: (
        <div>
          <p className=" mb-8">
            Acquisition du premier centre d’usinage numérique en France pour la
            fabrication des agencements en pierre. Pythagore joue un rôle clé
            dans la professionnalisation du secteur.
          </p>
          <ListImages
            images={[
              {
                title: "Commande Numérique",
                url: "/images/qui-sommes-nous/notre-histoire/CN_2.jpg",
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: "2007",
      content: (
        <div>
          <p className=" mb-8">
            L’entreprise déménage dans un nouvel atelier de 2500 m2 à Laniscat,
            à quelques kilomètres de l’atelier historique.15 collaborateurs
            œuvrent alors avec une ambition commune :{" "}
            <span className="font-bold underline underline-offset-2">
              la satisfaction de nos clients
            </span>
            .
          </p>
          <ListImages
            images={[
              {
                title: "les polisseurs",
                url: "/images/qui-sommes-nous/notre-histoire/polisseurs.JPEG",
              },
              {
                title: "le batiment",
                url: "/images/qui-sommes-nous/notre-histoire/pythagore-laniscat.jpg",
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: "2011",
      content: (
        <div>
          <p className="">
            Automatisation de la production avec l’intégration d’une, puis de
            deux nouvelles machines à commande numérique.
          </p>
          <p className=" mb-8">
            L’entreprise dispose alors d’un des plus importants parcs machines
            en France dans ce secteur. L’équipe grandit avec près de 25
            collaborateurs, et étend son activité dans tout le Grand Ouest.
          </p>
          <ListImages
            images={[
              {
                title: "CN",
                url: "/images/qui-sommes-nous/notre-histoire/CN.JPEG",
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: "2019",
      content: (
        <div>
          <p className="">
            L’année sera marquée par un agrandissement de 1000 m2 de l’atelier,
            suite à l’acquisition de 2 nouvelles machines à découpe jet d’eau en
            2018.
          </p>
          <p className=" mb-8">
            Les années à venir seront marquées par de profonds changements
            industriels. Pythagore compte désormais près de 40 collaborateurs
            tournés vers ses futurs projets de développement.
          </p>
          <ListImages
            images={[
              {
                title: "batiment en construction",
                url: "/images/qui-sommes-nous/notre-histoire/agrandissement_atelier_2020.jpg",
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p className="">
            l’entreprise entreprend un nouvel agrandissement de plus de 3000 m2,
            qui comprend :
          </p>
          <ul className="list-disc ml-8 mb-8">
            <li>un bâtiment de stockage pouvant contenir 5000 tranches</li>
            <li>un espace dédié aux centres d’usinage à commande numérique</li>
            <li>4000 m2 de bureaux d’atelier</li>
            <li>
              un espace totalement vitré dédié à l’accueil de nos clients et
              tourné vers les ateliers et stock (espace de réunion, cuisine,
              showroom)
            </li>
            <li>
              Réorganisation des zones de production pour améliorer les
              conditions de travail
            </li>
            <li>
              Investissement dans trois nouveaux centres d’usinage de dernière
              génération
            </li>
            <li>
              Pythagore compte près de 90 collaborateurs, engagés chaque jour
              dans la réussite des projets de nos clients
            </li>
          </ul>
          <ListImages
            images={[
              {
                title: "les tranches",
                url: "/images/qui-sommes-nous/notre-histoire/tranches.JPEG",
              },
              {
                title: "découpe à l'eau",
                url: "/images/atelier/IMG_0084.JPEG",
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <p className=" mb-8">
            Ouverture d’un dépôt à Rouen et renforcement de nos équipes
            franchissant ainsi le cap symbolique des 100 collaborateurs !
          </p>
          <ListImages
            images={[
              {
                title: "entrée Pythagore Rouen",
                url: "/images/qui-sommes-nous/notre-histoire/depot_rouen_1.jpg",
              },
              {
                title: "drapeau Pythagore Rouen",
                url: "/images/qui-sommes-nous/notre-histoire/depot_rouen_2.jpg",
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <p className=" mb-8">
            Pythagore célèbre 30 ans de passion. L’entreprise continue d’évoluer
            et d’investir afin de proposer une expertise reconnue et un service
            professionnel à la hauteur de nos clients.
          </p>
          <ListImages
          size={48}
            images={[
              {
                title: "logo 30 ans",
                url: "/images/evenements/logo_30_ans.png",
              },
            ]}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col xl:flex-row">
      <h2 className="lg:w-2/12 text-center lg:text-left">NOTRE HISTOIRE</h2>
      <div className="lg:w-10/12">
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
      image: "/images/formation.jpg",
    },
    {
      title: "L'engagement",
      content:
        "Chaque année, nous minimisons notre impact environnemental en éliminant nos déchets, recyclant nos eaux usées et réduisant l'utilisation de produits chimiques.",
      image: "/images/prestation.jpg",
    },
  ];

  return (
    <div className="flex flex-col xl:flex-row">
      <h2 className="lg:w-2/12 text-center lg:text-left">NOS VALEURS</h2>
      <div className="lg:w-10/12 max-w-7xl md:mx-10 mt-12">
        <div className="flex flex-wrap justify-between">
          {datas.map((data, index) => {
            return (
              <ServiceCard key={index} title={data.title} image={data.image}>
                <div>
                  <p>{data.content}</p>
                </div>
              </ServiceCard>
            );
          })}
        </div>
        <div className="flex justify-between space-x-1 divide-x-2 divide-or my-20">
          <div className="w-full flex flex-col items-center justify-center py-12">
            <p className="text-6xl font-bold">96%</p>
            <p className="text-xl">de satisfation clients</p>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-6xl font-bold">7000+</p>
            <p className="text-xl">projets par an</p>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-6xl font-bold">100+</p>
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
    <div className="flex flex-col xl:flex-row">
      <h2 className="lg:w-2/12 text-center lg:text-left">L'ENCADREMENT</h2>
      <div className="lg:w-10/12 max-w-7xl md:mx-10 px-4">
        <FocusCards cards={cards} />
      </div>
    </div>
  );
};

const DeliveryArea = () => {
  const mapSource = "/images/maps/carte-zone-presta-02.png";
  const zones = [
    {
      name: "Notre Atelier",
      address: "ZA Pen Ar Hoat 22570 Laniscat",
    },
    {
      name: "Dépot logisitque de Rouen",
      // address: "ZA de Caillemare 27310 Saint-Ouen-de-Thouberville",
    },
  ];
  return (
    <div className="p-2 flex justify-center items-center mx-auto mt-20 w-full md:w-11/12 border rounded-xl shadow-xl">
      <div className="max-w-7xl mx-auto mb-5 items-center flex flex-wrap md:flex-nowrap">
        <div className="flex w-full items-end justify-center">
          <div>
            {zones.map((zone, index) => (
              <div key={index} className="flex flex-col">
                <p className="md:text-4xl py-4 text-xl ">{zone.name}</p>
                <p className="text-base text-wrap w-auto md:max-w-56 max-w-64">
                  {zone.address}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center w-full md:basis-1/2">
          <Image
            src={mapSource}
            width={400}
            height={500}
            alt="Zones de prestation"
            className="h-auto w-auto"
          />
        </div>
      </div>
    </div>
  );
};
