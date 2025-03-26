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

export default function Page() {
  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={"Notre savoir-faire"} />
      

      <section className="py-16 bg-gray-50 max-w-[120rem] mx-auto">
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
