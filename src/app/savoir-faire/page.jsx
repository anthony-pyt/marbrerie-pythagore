"use client";
import PageTitle from "../components/PageTitle";
import MainMenu from "../components/MainMenu";
import Footer from "../components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

// const knowledges = [
//   {
//     title: "Un savoir-faire unique, au service de vos projets",
//     image_url: "/images/atelier/savoir-faire.png",
//     description:
//       "Pythagore est spécialisé dans le travail de la pierre naturelle, mais également la pierre reconstituée et la céramique. Avec plus de 30 ans d’expérience en Bretagne, nous réalisons des agencements sur mesure pour transformer vos espaces avec passion et savoir-faire. Les projets sur lesquels nous travaillons sont très diversifiés, allant de la cuisine à la salle de bain, en passant par la table ou l’escalier, et plus encore. Nous travaillons uniquement avec des matériaux de qualité, soigneusement sélectionnés auprès de nos fournisseurs.",
//   },
//   {
//     title: "Un savoir-faire français traditionnel, constamment réinventé",
//     image_url: "/images/atelier/savoir-faire-traditionnel.png",
//     description:
//       "Chaque jour, l’équipe Pythagore concrétise vos projets les plus créatifs. Notre entreprise a évolué pour s’adapter aux tendances actuelles du marché et aux exigences de nos clients. Nous sommes fiers d’exporter notre savoir-faire unique à travers toute la France, tout en préservant l’héritage de la marbrerie artisanale.",
//   },
// ];

const images = [
  {
    alt: "Précision pose",
    image_url: "/images/atelier/IMG_0053.JPEG",
  },
  {
    alt: "Précision découpe",
    image_url: "/images/atelier/IMG_0084.JPEG",
  },
  {
    alt: "Précision",
    image_url: "/images/atelier/IMG_1597.png",
  },
];

// const Section = ({ title, description, image_url, reverse }) => {
//   return (
//     <motion.div
//       className={`flex flex-col md:flex-row items-center gap-8 max-w-7xl mx-auto p-6 mb-12 ${
//         reverse ? "md:flex-row-reverse" : ""
//       }`}
//       whileHover={{ scale: 1.02 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="w-full md:w-1/2">
//         <Image
//           src={image_url}
//           alt={title}
//           width={600}
//           height={400}
//           className="rounded-xl object-cover"
//         />
//       </div>
//       <div className="w-full md:w-1/2 text-center md:text-left">
//         <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
//         <p className="text-gray-600 leading-relaxed">{description}</p>
//       </div>
//     </motion.div>
//   );
// };

const ImageGrid = ({ images }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto p-6">
    {images.map((image, index) => (
      <motion.div
        key={index}
        className="overflow-hidden rounded-xl"
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

const SquareSkeleton = ({ className, number, text }) => {
  return (
    <div className={clsx("rounded-xl shadow-lg p-4", className)}>
      <h4 className="text-6xl">{number}</h4>
      <div className="py-6">
        <p className="">{text}</p>
      </div>
    </div>
  );
};

const RectangleSkeleton = ({ className, image_url, title, text }) => {
  return (
    <div
      className={clsx(
        "rounded-xl shadow-lg p-2 flex items-center justify-between",
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center items-center mr-4">
        <Image
          src={image_url}
          alt={title}
          width={350}
          height={350}
          className="rounded-lg object-cover h-64"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between h-full">
        <p className="text-gray-600 text-sm">{text}</p>
        <h6 className="font-bold mt-2 text-sm">{title}</h6>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={"Notre savoir-faire"} />
      <div className="mt-24">
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 m-4 flex-1">
          <SquareSkeleton
            className={"col-span-1 bg-or bg-opacity-10"}
            number="96%"
            text="de satisfation clients"
          />
          <SquareSkeleton
            className={"col-span-1 bg-secondary bg-opacity-10"}
            number="1000+"
            text="de clients"
          />
          <RectangleSkeleton
            className={"col-span-1 sm:col-span-2 bg-gray-50"}
            image_url={"/images/atelier/IMG_1598.jpg"}
            text="Chaque jour, l’équipe Pythagore concrétise vos projets les plus créatifs. Notre entreprise a évolué pour s’adapter aux tendances actuelles du marché et aux exigences de nos clients. Nous sommes fiers d’exporter notre savoir-faire unique à travers toute la France, tout en préservant l’héritage de la marbrerie artisanale."
            title="Un savoir-faire français traditionnel, constamment réinventé"
          />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 m-4 flex-1">
          <RectangleSkeleton
            className={"col-span-1 sm:col-span-2 bg-gray-50"}
            image_url={"/images/atelier/polissage_manuel.jpg"}
            text="Pythagore est spécialisé dans le travail de la pierre naturelle, mais également la pierre reconstituée et la céramique. Avec plus de 30 ans d’expérience en Bretagne, nous réalisons des agencements sur mesure pour transformer vos espaces avec passion et savoir-faire. Les projets sur lesquels nous travaillons sont très diversifiés, allant de la cuisine à la salle de bain, en passant par la table ou l’escalier, et plus encore. Nous travaillons uniquement avec des matériaux de qualité, soigneusement sélectionnés auprès de nos fournisseurs."
            title="Un savoir-faire unique, au service de vos projets"
          />
          <SquareSkeleton
            className={"col-span-1  bg-or bg-opacity-10"}
            number="100+"
            text="de collaborateurs"
          />
          <SquareSkeleton
            className={"col-span-1 bg-secondary bg-opacity-10"}
            number="7000+"
            text="de projets par an"
          />
        </div>
      </div>

      {/* <section className="py-16">
        {knowledges.map((knowledge, index) => (
          <Section
            key={index}
            title={knowledge.title}
            description={knowledge.description}
            image_url={knowledge.image_url}
            reverse={index % 2 !== 0}
          />
        ))}
      </section> */}

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-extrabold text-gray-800 mb-4">
              Les précisions de notre savoir-faire
            </h3>
            <p className="text-gray-600 text-lg">
              Découvrez les techniques et finitions qui font la renommée de
              notre expertise.
            </p>
          </div>

          {/* Liste des savoir-faire */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Carte 1 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Finitions de chant
              </h4>
              <p className="text-gray-600">
                Chant droit, arrondi, biseauté, bec de corbin… Nous proposons
                des finitions adaptées à vos besoins et projets.
              </p>
            </div>

            {/* Carte 2 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Découpe sur mesure
              </h4>
              <p className="text-gray-600">
                Grâce à nos machines de découpe, nous réalisons des ajustements
                précis pour arrondis, angles spécifiques ou ajustements
                millimétriques.
              </p>
            </div>

            {/* Carte 3 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Joint parfait
              </h4>
              <p className="text-gray-600">
                Obtenez un résultat visiblement net et continu grâce à notre
                technique de joint parfait.
              </p>
            </div>

            {/* Carte 4 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Façonnages spécifiques
              </h4>
              <p className="text-gray-600">
                Polissage sous plan, assemblage à l’onglet, suivi du mur en
                pierre... Nous peaufinons les moindres détails.
              </p>
            </div>
          </div>

          {/* Galerie d'images */}
          <div className="mt-12">
            <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Quelques photos
            </h4>
            <ImageGrid images={images} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
