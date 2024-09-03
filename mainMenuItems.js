const listMenu = [
  {
    label: "Accueil",
    active: true,
    link: "/",
    icon: "solar:home-2-outline",
    children: [],
  },
  {
    label: "Matières",
    active: true,
    link: "#",
    icon: "solar:command-outline",
    children: [
      {
        label: "Catalogue",
        slug: "catalogue",
        link: "/matieres/catalogue",
        icon: "solar:notebook-bookmark-outline",
      },
      {
        label: "Entretien",
        slug: "entretien",
        link: "/matieres/entretien",
        icon: "solar:info-circle-outline",
      },
      {
        label: "Caractéristiques",
        slug: "caractéristiques",
        link: "/matieres/caracteristiques",
        icon: "solar:case-outline",
      },
    ],
  },
  {
    label: "Savoir-faire",
    active: true,
    slug: "savoir-faire",
    link: "/savoir-faire",
    icon: "solar:accessibility-outline",

    children: [],
  },
  {
    label: "Nos services",
    active: true,
    slug: "nos-services",
    link: "/nos-services",
    icon: "solar:filters-outline",

    children: [],
  },
  {
    label: "Inspiration",
    active: true,
    slug: "inspiration",
    link: "#",
    icon: "solar:folder-open-outline",
    children: [
      {
        label: "Cuisine",
        slug: "cuisine",
        icon: "solar:gallery-round-outline",
        link: "/inspiration/cuisine",
      },
      {
        label: "Salle de bain",
        slug: "salle-de-bain",
        icon: "solar:gallery-round-outline",
        link: "/inspiration/salle-de-bain",
      },
      {
        label: "Escalier",
        slug: "escalier",
        icon: "solar:gallery-round-outline",
        link: "/inspiration/escalier",
      },
      {
        label: "Table",
        slug: "table",
        icon: "solar:gallery-round-outline",
        link: "/inspiration/table",
      },
      {
        label: "Professionnel",
        slug: "professionel",
        icon: "solar:gallery-round-outline",
        link: "/inspiration/professionel",
      },
    ],
  },
  {
    label: "A propos",
    active: true,
    children: [],
    slug: "a-propos",
    link: "/a-propos",
    icon: "solar:chat-round-linear",
  },
  {
    label: "Nos métiers",
    active: true,
    children: [],
    slug: "nos-metiers",
    link: "/nos-metiers",
    icon: "solar:ruler-cross-pen-outline",
  },
];

const listActions = [{ label: "Contact" }, { label: "Extranet" }];

export { listMenu, listActions };
