"use client";
import PageTitle from "../components/PageTitle";
import MainMenu from "../components/MainMenu";
import Footer from "../components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";
import ServiceCard from "../components/services/serviceCard";

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

const ImageGrid = ({ images }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto p-6">
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

const RectangleSkeleton = ({
  className,
  image_url,
  title,
  text,
  number,
  imagePosition = "left",
}) => {
  const isImageRight = imagePosition === "right";

  return (
    <div
      className={clsx(
        "rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-6 overflow-hiddens",
        isImageRight ? "md:flex-row-reverse" : "md:flex-row",
        className
      )}
    >
      {/* Image */}
      <div className="w-[350px] h-[250px] flex-shrink-0">
        <Image
          src={image_url}
          alt={text}
          width={350}
          height={250}
          className="rounded-lg object-cover w-full h-full"
        />
      </div>

      {/* Contenu */}
      <div className="flex-1 text-center md:text-left p-4">
        <h4 className="text-7xl font-bold">{number}</h4>
        <div className="py-6">
          <p className="text-lg">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={"Notre savoir-faire"} />
      <div className="mt-24 mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-4 m-4 flex-1">
          <RectangleSkeleton
            className={"col-span-1 sm:col-span-2 bg-gray-50"}
            image_url={"/images/savoir-faire/IMG_0129.JPEG"}
            number="30+"
            text="années d’expérience dans le domaine de la marbrerie de décoration"
          />
          <RectangleSkeleton
            className={"col-span-1 sm:col-span-2 bg-or bg-opacity-10"}
            imagePosition="right"
            image_url={"/images/savoir-faire/centrale-eau.png"}
            number="98%"
            text="de l’eau utilisée est recyclée, et a permis de réduire de 96% notre consommation d’eau"
          />
          <RectangleSkeleton
            className={"col-span-1 sm:col-span-2 bg-gray-50"}
            image_url={"/images/echantillons.JPEG"}
            number="15"
            text="marques proposées dont 3 durables"
          />
          <RectangleSkeleton
            className={"col-span-1 sm:col-span-2 bg-or bg-opacity-10"}
            imagePosition="right"
            image_url={"/images/savoir-faire/infos_inter_1_6.jpg"}
            number="7000+"
            text="Projets réalisés : cuisine, salle de bain, habillement murale, comptoir d’accueil, cheminé..."
          />
          <RectangleSkeleton
            className={"col-span-1 sm:col-span-2 bg-gray-50"}
            image_url={"/images/savoir-faire/machine-PYTHAGORE.png"}
            number="10+"
            text="machines présentes dans notre atelier : machine à commande numérique, machine à découpe jet d’eau, polisseuse..."
          />
          <RectangleSkeleton
            className={"col-span-1 sm:col-span-2 bg-or bg-opacity-10"}
            imagePosition="right"
            image_url={"/images/savoir-faire/IMG-20231107-WA0005.jpg"}
            number="100+"
            text="collaborateurs répartis dans nos différents services et dépot. Commercial, atelier, pose, administratif..."
          />
          <RectangleSkeleton
            className={"col-span-1 sm:col-span-2 bg-gray-50"}
            image_url={"/images/savoir-faire/satisfaction client.jpg"}
            number="96%"
            text="de satisfaction client, ce qui montre l'importance de notre engagement envers la qualité, l'écoute et le suivi de projets."
          />
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-extrabold text-gray-800 mb-4">
              Notre expertise technique
            </h3>
            <p className=" text-lg">
              Découvrez les techniques et finitions qui font la renommée de
              notre expertise.
            </p>
          </div>

          {/* Liste des savoir-faire */}
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-y-12">
            {/* Carte 1 */}
            <div className="mx-auto">
              <ServiceCard title={"Façonnages spécifiques"} image={"/images/"}>
                <p className="">
                  Polissage sous plan, assemblage à l’onglet, suivi du mur en
                  pierre... Nous peaufinons les moindres détails.
                </p>
              </ServiceCard>
            </div>
            {/* Carte 2 */}
            <div className="mx-auto">
              <ServiceCard title={"Finitions de chant"} image={"/images/"}>
                <p className="">
                  Chant droit, arrondi, biseauté, bec de corbin… Nous proposons
                  des finitions adaptées à vos besoins et projets.
                </p>
              </ServiceCard>
            </div>

            {/* Carte 3 */}
            <div className="mx-auto">
              <ServiceCard
                title={"Découpe sur mesure"}
                image={"/images/savoir-faire/silestone versailles ivory.jpg"}
              >
                <p className="">
                  Grâce à nos machines de découpe, nous réalisons des
                  ajustements précis pour arrondis, angles spécifiques ou
                  ajustements millimétriques.
                </p>
              </ServiceCard>
            </div>

            {/* Carte 4 */}
            <div className="mx-auto">
              <ServiceCard
                title={"Joint parfait"}
                image={"/images/savoir-faire/ventouse1.jpg"}
              >
                <p className="">
                  Obtenez un résultat visiblement net et continu grâce à notre
                  technique de joint parfait.
                </p>
              </ServiceCard>
            </div>
          </div>

          {/* Galerie d'images */}
          <div className="mt-12">
            <h4 className="text-2xl font-bold mb-6 text-center">
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
