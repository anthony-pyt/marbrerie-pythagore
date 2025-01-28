"use client";
import PageTitle from "../components/PageTitle";
import MainMenu from "../components/MainMenu";
import Footer from "../components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";

const knowledges = [
  {
    title: "Un savoir-faire unique, au service de vos projets",
    image_url: "/images/atelier/savoir-faire.png",
    description:
      "Pythagore est spécialisé dans le travail de la pierre naturelle, mais également la pierre reconstituée et la céramique. Avec plus de 30 ans d’expérience en Bretagne, nous réalisons des agencements sur mesure pour transformer vos espaces avec passion et savoir-faire. Les projets sur lesquels nous travaillons sont très diversifiés, allant de la cuisine à la salle de bain, en passant par la table ou l’escalier, et plus encore. Nous travaillons uniquement avec des matériaux de qualité, soigneusement sélectionnés auprès de nos fournisseurs.",
  },
  {
    title: "Un savoir-faire français traditionnel, constamment réinventé",
    image_url: "/images/atelier/savoir-faire-traditionnel.png",
    description:
      "Chaque jour, l’équipe Pythagore concrétise vos projets les plus créatifs. Notre entreprise a évolué pour s’adapter aux tendances actuelles du marché et aux exigences de nos clients. Nous sommes fiers d’exporter notre savoir-faire unique à travers toute la France, tout en préservant l’héritage de la marbrerie artisanale.",
  },
];

const images = [
  {
    alt: "Précision pose",
    image_url: "/images/precisions/precision-pose.png",
  },
  {
    alt: "Précision découpe",
    image_url: "/images/precisions/precision-decoupe.png",
  },
  {
    alt: "Précision",
    image_url: "/images/precisions/precision.png",
  },
];

const Section = ({ title, description, image_url, reverse }) => {
  return (
    <motion.div
      className={`flex flex-col md:flex-row items-center gap-8 max-w-7xl mx-auto p-6 mb-12 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full md:w-1/2">
        <Image
          src={image_url}
          alt={title}
          width={600}
          height={400}
          className="rounded-xl object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const ImageGrid = ({ images }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto p-6">
    {images.map((image, index) => (
      <motion.div
        key={index}
        className="overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={image.image_url}
          alt={image.alt}
          width={500}
          height={500}
          className="object-cover w-full h-full"
        />
      </motion.div>
    ))}
  </div>
);

export default function Page() {
  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={"Notre savoir-faire"} />

      <section className="py-16">
        {knowledges.map((knowledge, index) => (
          <Section
            key={index}
            title={knowledge.title}
            description={knowledge.description}
            image_url={knowledge.image_url}
            reverse={index % 2 !== 0}
          />
        ))}
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-800">Nos précisions</h3>
          <div className="flex flex-col lg:flex-row p-5 my-5 lg:space-x-10">
            <ul className="list-disc text-justify">
              <li>
                <span className="font-bold">Finitions de chant : </span>
                chant
                droit, arrondi, biseauté, bec de corbin…{" "}
              </li>
              <li>
                <span className="font-bold">Découpe sur mesure : </span>
                grâce à
                nos machines de découpe, nous réalisons des découpes précises.
                Que ce soit pour des arrondis, des angles spécifiques ou des
                ajustements millimètres, nos collaborateurs mettent tout en
                œuvre pour garantir un travail de précision.
              </li>
            </ul>
            <ul className="list-disc text-justify">
              <li>
                <span className="font-bold">Joint Parfait : </span>
                Cette technique permet d’obtenir un résultat visiblement net et
                continu.{" "}
              </li>
              <li>
                Pour que votre projet soit réussi dans tous les détails, nous
                proposons également des façonnages spécifiques comme : le
                polissage sous plan, l’assemblage à l’onglet, le suivi du mur en
                pierre...
              </li>
            </ul>
          </div>
        </div>
        <ImageGrid images={images} />
      </section>

      <Footer />
    </main>
  );
}
