import MainMenu from "./../components/MainMenu";
import Image from 'next/image';
import Cards from '../components/cards/cardComponent';
import Footer from "../components/Footer";

const histories = [
  {
    year: 1995,
    description: "Création de la marbrerie de décoration",
    image: "/images/atelier/polissage_manuel.jpg",
  },
  {
    year: 2003,
    description: "Acquisition du 1ier centre d’usinage numérique en France pour la fabrication des plans de travail en pierre",
    image: "/images/atelier/polissage_manuel.jpg",
  },
  {
    year: 2007,
    description: "Déménagement à Laniscat dans un nouveau bâtiment",
    image: "/images/atelier/polissage_manuel.jpg",
  },
  {
    year: 2011,
    description: "Automatisation de la production en intégrant des nouvelles machines à commande numérique",
    image: "/images/atelier/polissage_manuel.jpg",
  },
  {
    year: 2019,
    description: "Agrandissement de l’atelier de 1000m²",
    image: "/images/atelier/polissage_manuel.jpg",
  },
  {
    year: 2023,
    description: "Nouvel agrandissement de plus de 3000m²",
    image: "/images/atelier/polissage_manuel.jpg",
  },
];

const ourValues = [
  {
    title: 'La passion',
    description: "Chaque jour, nous nous engageons avec passion dans notre travail pour réaliser vos projets et donner vie à votre créativité.",
    image: "/images/atelier/IMG_0053.JPEG",
  },
  {
    title: 'La satisfaction clients',
    description: "Nous œuvrons chaque jour pour améliorer votre expérience avec des produits de haute qualité et un service client dévoué.",
    image: "/images/atelier/polissage_manuel.jpg",
  },
  {
    title: 'L\'engagement',
    description: "Chaque année, nous minimisons notre impact environnemental en éliminant nos déchets, recyclant nos eaux usées et réduisant l'utilisation de produits chimiques.",
    image: "/images/atelier/polissage_manuel.jpg",
  },
];

const managers = [
  {
    name: 'MONDAN Mathieu',
    degree: 'Directeur d’exploitation',
    description: '',
    imageUrl: '/images/visuel-a-venir.jpg'
  },
  {
    name: 'MORIN Christelle',
    degree: 'Responsable Commerciale',
    description: 'Dans le service 13 ADV, Planning, Chargés de clientèle',
    imageUrl: '/images/visuel-a-venir.jpg'
  },
  {
    name: 'GUEGUIN Cédric',
    degree: 'Responsable Bureau d’Études',
    description: 'Dans le service 6  dessinateurs',
    imageUrl: '/images/visuel-a-venir.jpg'
  },
  {
    name: 'BOUYER Loïc',
    degree: 'Responsable Production',
    description: 'Dans le service 32 Polisseurs, Débiteurs, Conducteurs CN, Gestionnaire de stock et approvisionnement, Contrôleurs',
    imageUrl: '/images/visuel-a-venir.jpg'
  },
  {
    name: 'PRIGENT Romuald',
    degree: 'Responsable Prestations',
    description: 'Dans le service 35 Installateurs, Métreurs, SAV',
    imageUrl: '/images/visuel-a-venir.jpg'
  },
  {
    name: 'KERZERHO Gaëlle',
    degree: 'Responsable Ressources Humaines',
    description: 'Dans le service 1 assistante RH',
    imageUrl: '/images/visuel-a-venir.jpg'
  },
  {
    name: 'LE FLOCH Miguel',
    degree: 'Responsable Administratif et Financer',
    description: 'Dans le service 1 assistante comptabilité',
    imageUrl: '/images/visuel-a-venir.jpg'
  }
]
const mapSource = '/images/maps/carte-zone-presta-02.png'
const zones = [
  {
    name: 'Notre Atelier',
    address: 'ZA Pen Ar Hoat 22570 Laniscat'
  },
  {
    name: 'Un dépôt Logistique',
    address: 'ZA de Caillemare 27310 Saint-Ouen-de-Thouberville'
  }
]
export default function Page() {
  return (
    <main className="min-h-screen w-full">
      <MainMenu />
      <IntroSection />
      <HistorySection />
      <ValuesSection />
      <TeamSection />
      <DeliveryArea />
      <Footer />
    </main>
  );
}

const IntroSection = () => (
  <div className="container mx-auto flex flex-col items-center justify-center p-2">
    <h2 className="text-xl text-center">
      La marbrerie <span className="text-or-light text-3xl">PYTHAGORE</span>
    </h2>
    <p className="text-center max-w-xl mb-4">
      Accompagne depuis 30 ans ses clients professionnels dans la réalisation de leurs agencements en pierre naturelle ou reconstituée, en fournissant des produits et un service de la plus haute qualité.
    </p>
    <div className="max-w-sm h-0.5 bg-or-light w-full"></div>
  </div>
);

const HistorySection = () => (
  <div className="h-full">
    <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 max-h-96 text-white py-24 overflow-hidden">
      <BackgroundImage />
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center ">
        <div className="flex sm:justify-between container mx-auto max-w-7xl w-full flex-col sm:flex-row ">
          <h1 className="sm:text-7xl  leading-tight mb-4 text-white sm:text-left sm:w-20 sm:ms-10 p-2">Notre histoire</h1>
          <YearSummary />
        </div>
      </div>
    </div>
    <HistoryCards />
  </div>
);

const BackgroundImage = () => (
  <div className="absolute inset-0">
    <Image
      src="/images/atelier/polissage_manuel.jpg"
      alt="Image de fond"
      width={500}
      height={600}
      className="object-cover object-center w-full filter grayscale h-full"
      priority
    />
    <div className="absolute inset-0 bg-black opacity-50"></div>
  </div>
);

const YearSummary = () => (
  <div className="max-w-sm items-start flex flex-col  mx-auto sm:mx-4">
    <div className="flex items-baseline">
      <span className="text-or-light text-8xl">30</span>
      <span className="text-white  text-5xl">ans</span>
    </div>
    <p className="text-white  text-5xl">de savoir-faire</p>
  </div>
);

const HistoryCards = () => (
  <section className="flex justify-center items-center mx-auto">
    <div className="max-w-7xl mx-auto py-12 p-2">
      <div className="gap-8 grid sm:grid-cols-3 ">
        {histories.map((item, index) => (
          <Cards key={index} description={item.description} title={item.year} image={item.image} titleClass="text-base text-2xl font-bold" />
        ))}
      </div>
    </div>
  </section>
);

const ValuesSection = () => (
  <section className="flex justify-center items-center mx-auto">
    <div className="max-w-7xl mx-auto mb-5">
      <ValuesHeader />
      <ValuesCards />
      <Statistics />
    </div>
  </section>
);

const ValuesHeader = () => (
  <div className="py-5 mt-5">
    <div className="sm:ms-20 text-5xl flex flex-col ">
      <div className="flex items-baseline">Nos <span>Valeurs</span>
        <div className="h-0.5 bg-or-light flex-grow bottom-0 ms-8"></div>
      </div>
    </div>
  </div>
);

const ValuesCards = () => (
  <div className="grid sm:grid-cols-3 gap-4 mb-5 p-2">
    {ourValues.map((item, index) => (
      <Cards key={index} description={item.description} title={item.title} image={item.image} titleClass="text-or-light md:text-2xl text-lg" cardClass="border border-gray-200 rounded-lg shadow" />
    ))}
  </div>
);

const Statistics = () => (
  <div className="mb-5 w-full flex justify-center items-center">
    <div className="grid sm:grid-cols-3">
      <StatisticCard value="96%" description="de satisfaction clients" />
      <StatisticCard value="+ de 7000" description="projets par an" />
      <StatisticCard value="100" description="collaborateurs" />
    </div>
  </div>
);

const StatisticCard = ({ value, description }) => (
  <div className="max-w-sm w-full py-10 text-5xl text-or-light md:border-e border-b md:border-b-0 border-or flex flex-col p-4">
    {value}
    <span className="text-slate-700 text-3xl">{description}</span>
  </div>
);

const TeamSection = () => (
  <div className="flex justify-center items-center mx-auto py-4 ">
    <div className=" max-w-7xl mx-auto mb-5 items-center flex justify-center flex-col">
      <div className="sm:ms-20 md:text-5xl flex flex-col  text-3xl text-center md:text-left">
        <div className="flex items-baseline ">
          L’ÉQUIPE D’ENCADREMENT
          <div className="h-0.5 bg-or-light flex-grow bottom-0 ms-8"></div>
        </div>
        <p className=""> PYTHAGORE</p>
      </div>
      <Teamcard />
    </div>
  </div>
);

const Teamcard = () => (
  <div className="mt-8 w-full flex justify-center items-center">
    <div className="grid md:grid-cols-4 sm:gap-6 mb-5 gap-5 mt-12 p-2 sm:grid-cols-3">
      {managers.map((item, index) => (
        <Cards key={index} description={item.description} title={item.name} image={item.imageUrl} titleClass="text-base text-2xl font-bold"
          cardClass="max-w-64 min-w-48 bg-white rounded-xl shadow-xl border my-10 "
          imageClass=" rounded-md  max-w-48 w-auto  "
          imageContainerClass="flex justify-center -mt-24"
          chidren={item.degree}
          cildrenClass='text-gray-400' />
      ))}
    </div>
  </div>
);

const DeliveryArea = () => (
  <div className="p-2 flex justify-center items-center mx-auto  ">
    <div className="max-w-7xl mx-auto mb-5 items-center flex flex-wrap md:flex-nowrap">
      <div className="flex w-full items-end justify-center">
        <div>
          {zones.map((zone, index) => (
            <div key={index} className="flex flex-col">
              <p className="md:text-4xl py-4 text-xl ">{zone.name}</p>
              <p className="text-base text-wrap w-auto md:max-w-56 max-w-64">{zone.address}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center w-full md:basis-1/2">
        <Image src={mapSource} width={400} height={500} alt="Zones de prestation" className="h-auto w-auto" />
      </div>
    </div>
  </div>
)
