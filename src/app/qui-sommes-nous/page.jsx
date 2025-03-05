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
import { story, our_values } from "./../../../datas/story";
import { leads } from "./../../../datas/leads";

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
        <HistoricalData />
        <OurValues />
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
  const mapSource = "/images/maps/carte-zone-presta-02.png";
  const zones = [
    {
      name: "Notre Atelier",
      address: "ZA Pen Ar Hoat 22570 Laniscat",
    },
    {
      name: "Dépot logisitque de Rouen",
      // address: "ZA de Caillemare 27310 Saint-Ouen-de-Thouberville",
    },
  ];
  return (
    <div className="p-6 mx-auto mt-20 w-full bg-primary">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Liste des zones */}
        <div className="space-y-6">
          {zones.map((zone, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-xl shadow-md transition-transform hover:scale-105"
            >
              <h3 className="text-xl md:text-2xl font-semibold">{zone.name}</h3>
              <p className="text-sm md:text-base mt-2">{zone.address}</p>
            </div>
          ))}
        </div>

        {/* Image de la carte */}
        <div className="flex justify-end">
          <Image
            src={mapSource}
            width={250}
            height={500}
            alt="Zones de prestation"
            className="bg-white rounded-2xl p-4"
          />
        </div>
      </div>
    </div>
  );
};
