import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/Modal";

const ListImages = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="flex flex-wrap justify-start items-center">
      {images.map((image, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <div
              className="relative cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="rounded-xl object-cover h-[200px] w-[300px] m-1 border shadow"
              />
            </div>
          </DialogTrigger>
          {selectedImage && (
            <DialogContent className="max-w-3xl">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-screen h-auto rounded-lg"
              />
              <DialogTitle>
                <p className="text-center mt-2 text-sm text-gray-500">
                  {selectedImage.title}
                </p>
              </DialogTitle>
              <DialogDescription className="sr-only">
                description
              </DialogDescription>
            </DialogContent>
          )}
        </Dialog>
      ))}
    </div>
  );
};

export default ListImages;

export const story = [
  {
    year: "1950",
    title: "Le départ",
    content: (
      <div>
        <p className=" mb-8">
          À cette époque, l’entreprise avait pour activité l’extraction de
          minerais. Puis, elle a fait l’objet de deux transmissions familiales,
          au fils puis au petit-fils du fondateur.
        </p>
        {/* <ListImages
          images={[
            {
              title: "Ancien bâtiment",
              url: "/images/qui-sommes-nous/notre-histoire/batiment_ancien_logo_pythagore.jpg",
            },
          ]}
        /> */}
      </div>
    ),
  },
  {
    year: "1995",
    title: "Création de la marbrerie",
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
    year: "2003",
    title: "Premier centre d'usinage",
    content: (
      <div>
        <p className=" mb-8">
          Acquisition du premier centre d’usinage numérique en France pour la
          fabrication des agencements en pierre. Pythagore joue un rôle clé dans
          la professionnalisation du secteur.
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
    year: "2005",
    title: "Reprise par Jérôme Tronel",
    content: (
      <div>
        <p className=" mb-8">
          Reprise de la société par Mr Jérôme Tronel, qui décide de se
          positionner sur le secteur de la cuisine. L’entreprise compte alors 12
          salariés.
        </p>
        {/* <ListImages
          images={[
            {
              title: "Commande Numérique",
              url: "/images/qui-sommes-nous/notre-histoire/CN_2.jpg",
            },
          ]}
        /> */}
      </div>
    ),
  },
  {
    year: "2007",
    title: "Déménagement",
    content: (
      <div>
        <p className=" mb-8">
          L’entreprise déménage dans un nouvel atelier de 2500 m2 à Laniscat, à
          quelques kilomètres de l’atelier historique.15 collaborateurs œuvrent
          alors avec une ambition commune :{" "}
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
              url: "/images/qui-sommes-nous/notre-histoire/Pythagore-laniscat.jpg",
            },
          ]}
        />
      </div>
    ),
  },
  {
    year: "2011",
    title: "Automatisation",
    content: (
      <div>
        <p className="">
          Automatisation de la production avec l’intégration d’une, puis de deux
          nouvelles machines à commande numérique.
        </p>
        <p className=" mb-8">
          L’entreprise dispose alors d’un des plus importants parcs machines en
          France dans ce secteur. L’équipe grandit avec près de 25
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
    year: "2014",
    title: "Reprise par Nicolas Perrine",
    content: (
      <div>
        <p className="">Nicolas Perrine acquiert l’entreprise Pythagore.</p>
        <p className=" mb-8">
          Dans les années qui suivent, l’entreprise étend sa zone
          d’intervention, notamment vers les régions de la Normandie et des Pays
          de la Loire, et développe de nouveaux marchés.
        </p>
        {/* <ListImages
          images={[
            {
              title: "CN",
              url: "/images/qui-sommes-nous/notre-histoire/CN.JPEG",
            },
          ]}
        /> */}
      </div>
    ),
  },
  {
    year: "2019",
    title: "Agrandissement",
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
    year: "2020",
    title: "Changement de logo",
    content: (
      <div>
        <p className="">
          Changement de logo pour l’entreprise. Le logo a été retravaillé pour
          devenir plus élégant et plus représentatif de notre métier.
          L’entreprise compte 57 collaborateurs.
        </p>
        <ListImages
          images={[
            {
              title: "L'ancien logo",
              url: "/images/logos/ancien_logo_pythagore.png",
            },
            {
              title: "Le nouveau logo",
              url: "/images/logo_pythagore_texte_noir_dore.png",
            },
          ]}
        />
      </div>
    ),
  },
  {
    year: "2023",
    title: "Agrandissement",
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
            Réorganisation des zones de production pour améliorer les conditions
            de travail
          </li>
          <li>
            Investissement dans trois nouveaux centres d’usinage de dernière
            génération
          </li>
          <li>
            Pythagore compte près de 90 collaborateurs, engagés chaque jour dans
            la réussite des projets de nos clients
          </li>
        </ul>
        <ListImages
          images={[
            {
              title: "Travaux",
              url: "/images/qui-sommes-nous/notre-histoire/travaux_2023.jpg",
            },
            {
              title: "Travaux",
              url: "/images/qui-sommes-nous/notre-histoire/travaux_2023_1.jpg",
            },
            {
              title: "Les tranches",
              url: "/images/qui-sommes-nous/notre-histoire/photos_abus_1.jpg",
            },
            {
              title: "Le pont",
              url: "/images/qui-sommes-nous/notre-histoire/photos_abus_2.jpg",
            },
          ]}
        />
      </div>
    ),
  },
  {
    year: "2024",
    title: "Nouveau dépot",
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
    year: "2025",
    title: "30 ans",
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

export const our_values = [
  {
    title: "La passion",
    content:
      "Chaque jour, nous nous engageons avec passion dans notre travail pour réaliser vos projets et donner vie à votre créativité.",
    src: "/images/qui-sommes-nous/nos-valeurs/passion.jpg",
  },
  {
    title: "La satisfaction client",
    content:
      "Nous œuvrons chaque jour pour améliorer votre expérience avec des produits de haute qualité et un service client dévoué.",
    src: "/images/qui-sommes-nous/nos-valeurs/satisfaction.jpg",
  },
  {
    title: "L'engagement",
    content:
      "Chaque année, nous minimisons notre impact environnemental en éliminant nos déchets, recyclant nos eaux usées et réduisant l'utilisation de produits chimiques.",
    src: "/images/qui-sommes-nous/nos-valeurs/engagement.jpg",
  },
  {
    title: "L'innovation",
    content:
      "Nous plaçons l’innovation au cœur de notre développement, en optimisant nos processus, en investissant dans des outils de production et en développant des logiciels pour optimiser le travail de chaque collaborateur",
    src: "/images/qui-sommes-nous/nos-valeurs/innovation.jpg",
  },
];
