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

const ListImages = ({ images }) => {
  return (
    <div className="flex flex-wrap justify-start items-center">
      {images.map((image, index) => {
        return (
          <div key={index} className="relative">
            <a target="_blank" href={image.url}>
              <img
                src={image.url}
                alt={image.title}
                className={`rounded-lg object-cover h-[200px] w-[250px] m-1`}
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
    <div className="flex flex-col xl:flex-row overflow-hidden">
      <h2 className="lg:w-3/12 text-center lg:text-left">NOTRE HISTOIRE</h2>
      <div className="">
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
      image: "/images/qui-sommes-nous/nos-valeurs/atelier-poncage.JPEG",
    },
    {
      title: "La satisfaction clients",
      content:
        "Nous œuvrons chaque jour pour améliorer votre expérience avec des produits de haute qualité et un service client dévoué.",
      image: "/images/qui-sommes-nous/nos-valeurs/together.jpeg",
    },
    {
      title: "L'engagement",
      content:
        "Chaque année, nous minimisons notre impact environnemental en éliminant nos déchets, recyclant nos eaux usées et réduisant l'utilisation de produits chimiques.",
      image: "/images/qui-sommes-nous/nos-valeurs/atelier.jpg",
    },
    {
      title: "L'inovation",
      content:
        "Nous plaçons l'innovation au coeur de notre développement, en optimisant nos processus, en investissant dans les outils de production et en développement des logiciels pour optimiser le travaile de chaque collaborateur.",
      image: "/images/qui-sommes-nous/nos-valeurs/innovation.jpg",
    },
  ];

  return (
    <div className="flex flex-col xl:flex-row overflow-hidden">
      <h2 className="lg:w-3/12 text-center lg:text-left m-2">NOS VALEURS</h2>
      <div className="max-w-7xl m-12 mx-auto">
        <div className="grid lg:grid-cols-2 gap-4">
          {datas.map((data, index) => {
            return (
              <div className="p-4" key={index}>
              <ServiceCard title={data.title} image={data.image}>
                <div>
                  <p>{data.content}</p>
                </div>
              </ServiceCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  const cards = [
    {
      name: "Sylvie Owen",
      job: "Présidente",
      src: "https://images.unsplash.com/photo-1737202777198-7a913f95aa01?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Mathieu MONDAN",
      job: "Directeur d'exploitation",
      src: "https://images.unsplash.com/photo-1734335225921-06e1b6d94ed0?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Christelle MORIN",
      job: "Directrice commerciale",
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
      job: "Responsable des ressources humaines",
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
      <h2 className="lg:w-3/12 text-center lg:text-left m-2">L'ENCADREMENT</h2>
      <div className="lg:w-10/12 max-w-7xl m-12">
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
    <div className="p-6 mx-auto mt-20 w-full bg-primary">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Liste des zones */}
        <div className="space-y-6">
          {zones.map((zone, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-xl shadow-md transition-transform hover:scale-105"
            >
              <h3 className="text-xl md:text-2xl font-semibold">
                {zone.name}
              </h3>
              <p className="text-sm md:text-base mt-2">
                {zone.address}
              </p>
            </div>
          ))}
        </div>

        {/* Image de la carte */}
        <div className="flex justify-end">
          <Image
            src={mapSource}
            width={250}
            height={500}
            alt="Zones de prestation"
            className="bg-white rounded-2xl p-4"
          />
        </div>
      </div>
    </div>
  );
};
