const listMenu = [
  // {
  //   label: "Accueil",
  //   active: true,
  //   link: "/",
  //   icon: "solar:home-2-outline",
  //   children: [],
  // },
  // {
  //   label: "Matières",
  //   active: true,
  //   link: "#",
  //   icon: "solar:command-outline",
  //   children: [
  //     {
  //       label: "Catalogue",
  //       slug: "catalogue",
  //       link: "/matieres/catalogue",
  //       icon: "solar:notebook-bookmark-outline",
  //     },
  //     {
  //       label: "Entretien",
  //       slug: "entretien",
  //       link: "/matieres/entretien",
  //       icon: "solar:info-circle-outline",
  //     },
  //     {
  //       label: "Caractéristiques",
  //       slug: "caractéristiques",
  //       link: "/matieres/caracteristiques",
  //       icon: "solar:case-outline",
  //     },
  //   ],
  // },
  {
    label: "Nos produits",
    active: true,
    link: "/matieres/nos-produits",
    icon: "solar:notebook-minimalistic-outline",
    children: [],
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
  // {
  //   label: "Inspiration",
  //   active: true,
  //   slug: "inspiration",
  //   link: "/inspiration",
  //   icon: "solar:folder-open-outline",
  //   children: [],
  // },
  // {
  //   label: "Inspiration",
  //   active: true,
  //   slug: "inspiration",
  //   link: "#",
  //   icon: "solar:folder-open-outline",
  //   children: [
  //     {
  //       label: "Cuisine",
  //       slug: "cuisine",
  //       icon: "solar:gallery-round-outline",
  //       link: "/inspiration/cuisine",
  //     },
  //     {
  //       label: "Salle de bain",
  //       slug: "salle-de-bain",
  //       icon: "solar:gallery-round-outline",
  //       link: "/inspiration/salle-de-bain",
  //     },
  //     {
  //       label: "Escalier",
  //       slug: "escalier",
  //       icon: "solar:gallery-round-outline",
  //       link: "/inspiration/escalier",
  //     },
  //     {
  //       label: "Table",
  //       slug: "table",
  //       icon: "solar:gallery-round-outline",
  //       link: "/inspiration/table",
  //     },
  //     {
  //       label: "Professionnel",
  //       slug: "professionel",
  //       icon: "solar:gallery-round-outline",
  //       link: "/inspiration/professionel",
  //     },
  //   ],
  // },
  {
    label: "Qui sommes-nous ?",
    active: true,
    children: [],
    slug: "qui-sommes-nous",
    link: "/qui-sommes-nous",
    icon: "solar:info-circle-linear",
  },
  {
    label: "Blog",
    active: true,
    children: [],
    slug: "blg",
    link: "/blog",
    icon: "solar:chat-round-linear",
  },
  {
    label: "Carrière",
    active: true,
    children: [],
    slug: "carriere",
    link: "/carriere",
    icon: "solar:ruler-cross-pen-outline",
  },
];

const listActions = [{ label: "Contact" }, { label: "Extranet" }];

export { listMenu, listActions };
