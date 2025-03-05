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

export const story = [
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
    title: "2007",
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

export const our_values = [
  {
    title: "La passion",
    content:
      "Chaque jour, nous nous engageons avec passion dans notre travail pour réaliser vos projets et donner vie à votre créativité.",
    src: "/images/qui-sommes-nous/nos-valeurs/atelier-poncage.JPEG",
  },
  {
    title: "La satisfaction clients",
    content:
      "Nous œuvrons chaque jour pour améliorer votre expérience avec des produits de haute qualité et un service client dévoué.",
    src: "/images/qui-sommes-nous/nos-valeurs/satisfaction.jpg",
  },
  {
    title: "L'engagement",
    content:
      "Chaque année, nous minimisons notre impact environnemental en éliminant nos déchets, recyclant nos eaux usées et réduisant l'utilisation de produits chimiques.",
    src: "/images/qui-sommes-nous/nos-valeurs/atelier.jpg",
  },
  {
    title: "L'inovation",
    content:
      "Nous plaçons l'innovation au coeur de notre développement, en optimisant nos processus, en investissant dans les outils de production et en développement des logiciels pour optimiser le travaile de chaque collaborateur.",
    src: "/images/qui-sommes-nous/nos-valeurs/innovation.jpg",
  },
];