"use client";
import PageTitle from "../components/PageTitle";
import MainMenu from "../components/MainMenu";
import Footer from "../components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";
import ServiceCard from "../components/services/serviceCard";
import { savoirFaire, projetsSpecifiques } from "@/datas/savoirFaire";
import { Carousel } from "../components/ui/carousel";
import AnimatedTestimonials from "../components/ui/animated-testimonials";

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

      <section className="py-16 max-w-[110rem] mx-auto">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-y-12 max-w-7xl mx-auto">
            {savoirFaire.map((item, index) => (
              <div key={index} className="mx-auto">
                <ServiceCard title={item.title} image={item.image}>
                  <p className="">{item.description}</p>
                </ServiceCard>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto px-6 mt-12 py-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-extrabold text-gray-800 mb-4">
              Nos projets
            </h3>
            <p className="max-w-4xl mx-auto">
              Vous retrouverez des photos de projets spécifiques vous montrant
              notre savoir-faire
            </p>
          </div>
          <div className="container mx-auto m-4 rounded-xl p-4 bg-gradient-to-br from-or to-or-light">
            <AnimatedTestimonials testimonials={projetsSpecifiques} autoplay />
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto px-6 mt-12 py-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-extrabold text-gray-800 mb-4">
              Nos prestations
            </h3>
            <p className="max-w-4xl mx-auto">
              Projets sur mesure en pierre naturelle, pierre reconstituée et
              céramique grand format. Nous accompagnons nos clients
              professionnels dès la conception, la fabrication et jusqu’à
              l’installation de leurs projets, partout en France.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 max-w-7xl mx-auto gap-y-12">
            <div className="mx-auto">
              <ServiceCard
                title="Résidentiel"
                image="/images/savoir-faire/silestone.jpg"
              >
                <ul className="list-disc ml-4">
                  <li>Cuisine intérieur et extérieur</li>
                  <li>Salle de bains</li>
                  <li>Habillage de cheminée</li>
                  <li>Tables</li>
                </ul>
              </ServiceCard>
            </div>
            <div className="mx-auto">
              <ServiceCard
                title="Commercial"
                image="/images/savoir-faire/neolith_san_simone.png"
              >
                <ul className="list-disc ml-4">
                  <li>Boutique</li>
                  <li>Centre commercial</li>
                  <li>Hôtel</li>
                  <li>Bar</li>
                  <li>Restaurant</li>
                </ul>
              </ServiceCard>
            </div>
            <div className="mx-auto">
              <ServiceCard
                title="Tertiaire"
                image="/images/savoir-faire/terrazzo.jpg"
              >
                <ul className="list-disc ml-4">
                  <li>Bureau</li>
                  <li>Cabinet dentaire ou médical</li>
                </ul>
              </ServiceCard>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
