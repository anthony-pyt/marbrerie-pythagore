"use client";
/* eslint react/no-unescaped-entities: off */

import MainMenu from "./../components/MainMenu";
import Image from "next/image";
import Cards from "../components/cards/cardComponent";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Timeline } from "../components/ui/timeline";
import { FocusCards } from "../components/ui/focus-cards";
import ServiceCard from "../components/services/serviceCard";
import { Carousel } from "../components/ui/carousel";
import { leads } from "@/datas/leads";
import { story, our_values } from "@/datas/story"
import dynamic from "next/dynamic";
import clsx from "clsx";
const FooterMaps = dynamic(
  () => import("@/components/qui-sommes-nous/FooterMaps"),
  { ssr: false }
);

export default function Page() {
  return (
    <main className="min-h-screen w-full">
      <MainMenu />
      <PageTitle title={"Qui sommes nous ?"} />
      <div className="flex justify-center m-12">
        <div className="w-11/12 xl:w-5/12 text-center">
          <h3>
            La marbrerie <span className="text-or">PYTHAGORE</span>{" "}
          </h3>
          accompagne depuis 30 ans ses clients professionnels dans la
          réalisation de leurs agencements en pierre naturelle ou reconstituée,
          en fournissant des produits et un service de la plus haute qualité.
        </div>
      </div>
      <div className="space-y-8">
        <div className="mt-24 mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-4 m-4 flex-1">
            <RectangleSkeleton
              className={"col-span-1 sm:col-span-2 bg-gray-50"}
              image_url={"/images/evenements/logo_30_ans.png"}
              number="30 ans"
              text="d’expérience dans le domaine de la marbrerie de décoration"
            />
            <RectangleSkeleton
              className={"col-span-1 sm:col-span-2 bg-or bg-opacity-10"}
              imagePosition="right"
              image_url={"/images/savoir-faire/centrale-eau.png"}
              number="98% d'eau"
              text="tilisée est recyclée, et a permis de réduire de 96% notre consommation d’eau"
            />
            <RectangleSkeleton
              className={"col-span-1 sm:col-span-2 bg-gray-50"}
              image_url={"/images/echantillons.JPEG"}
              number="15 marques"
              text="proposées dont 3 durables"
            />
            <RectangleSkeleton
              className={"col-span-1 sm:col-span-2 bg-or bg-opacity-10"}
              imagePosition="right"
              image_url={"/images/savoir-faire/infos_inter_1_6.jpg"}
              number="7000 projets"
              text="réalisés : cuisine, salle de bain, habillement murale, comptoir d’accueil, cheminé..."
            />
            <RectangleSkeleton
              className={"col-span-1 sm:col-span-2 bg-gray-50"}
              image_url={"/images/savoir-faire/machine-PYTHAGORE.png"}
              number="10 machines"
              text="présentes dans notre atelier : machine à commande numérique, machine à découpe jet d’eau, polisseuse..."
            />
            <RectangleSkeleton
              className={"col-span-1 sm:col-span-2 bg-or bg-opacity-10"}
              imagePosition="right"
              image_url={"/images/savoir-faire/IMG-20231107-WA0005.jpg"}
              number="100 collaborateurs"
              text="collaborateurs répartis dans nos différents services et dépot. Commercial, atelier, pose, administratif..."
            />
            <RectangleSkeleton
              className={"col-span-1 sm:col-span-2 bg-gray-50"}
              image_url={"/images/savoir-faire/satisfaction client.jpg"}
              number="96% de satisfaction client"
              text="ce qui montre l'importance de notre engagement envers la qualité, l'écoute et le suivi de projets."
            />
          </div>
        </div>
        <OurValues />
        <HistoricalData />
        <Team />
      </div>
      <div>
        <DeliveryArea />
        </div>
      <Footer />
    </main>
  );
}

const HistoricalData = () => {
  return (
    <div className="flex flex-col xl:flex-row overflow-hidden">
      <h2 className="lg:w-3/12 text-center lg:text-left">NOTRE HISTOIRE</h2>
      <div className="">
        <div className="mx-auto max-w-7xl pb-12 pt-24">
          <div className="relative border-t-2 border-secondary flex justify-between items-center px-4 md:px-12">
            {story?.map((event, index) => (
              <div
                key={index}
                className="relative text-center cursor-pointer"
                onClick={() => {
                  const target = document.getElementById(
                    `timeline-event-${event.id}`
                  );
                  if (target) {
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                {/* Titre en diagonale */}
                <span className="absolute bottom-16 left-1/2 transform  -rotate-[30deg] text-xs text-left font-bold text-gray-600 whitespace-nowrap w-20">
                  {event.title}
                </span>

                {/* Point de la timeline */}
                <div className="w-4 h-4 bg-or-light rounded-full absolute top-[-8px] left-1/2 transform -translate-x-1/2"></div>

                {/* Année */}
                <span className="mt-4 block text-sm font-semibold text-gray-700">
                  {event.year}
                </span>
              </div>
            ))}
          </div>
        </div>
        <Timeline data={story} />
      </div>
    </div>
  );
};

const OurValues = () => {
  return (
    <div className="flex flex-col xl:flex-row overflow-hidden">
      <h2 className="lg:w-3/12 text-center lg:text-left m-2">NOS VALEURS</h2>
      <div className="relative overflow-hidden w-full h-full py-20">
        <Carousel slides={our_values} />
      </div>
    </div>
  );
};

const Team = () => {
  return (
    <div className="flex flex-col xl:flex-row">
      <h2 className="lg:w-3/12 text-center lg:text-left m-2">L'ENCADREMENT</h2>
      <div className="lg:w-10/12 max-w-7xl m-12">
        <FocusCards cards={leads} />
      </div>
    </div>
  );
};

const DeliveryArea = () => {
  return (
    <div className=" relative p-6 mx-auto mt-20 w-full bg-or-light h-[400px]">
      <FooterMaps />
    </div>
  );
};

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
        <h4 className="text-4xl font-bold">{number}</h4>
        <div className="py-6">
          <p className="text-lg">{text}</p>
        </div>
      </div>
    </div>
  );
};
