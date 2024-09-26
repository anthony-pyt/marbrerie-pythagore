"use client";
import Button from "./components/Button";
import HomeSwipper from "./components/home/HomeSwipper";
import ActionCatalogue from "./components/home/ActionCatalogue";
import MainMenu from "./components/MainMenu";
import InspirationWidget from "./components/home/InspirationWidget";
import BubbleIcon from "./components/BubbleIcon";
import AvisClient from "./components/AvisClient";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export default function Home() {
  const [text, setText] = useState("");
  const message = "Bienvenue chez PYTHAGORE";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText((prev) => prev + message[index]);
      index++;
      if (index >= message.length) {
        clearInterval(interval);
      }
    }, 100); // Change la vitesse ici (100 ms)

    return () => clearInterval(interval); // Nettoie l'intervalle lorsque le composant est démonté
  }, []);

  return (
    <main className="min-h-screen">
      <MainMenu page="home" />
      <section className="relative hidden xl:flex">
        <div className="w-full h-screen overflow-hidden flex justify-center items-center bg-black animate__animated animate__fadeIn">
          <video
            src="/videos/presentation.mp4"
            loop
            // autoPlay
            muted
            className="opacity-40 blur-sm w-full object-cover"
          />
          <div className="absolute transform left-1/2 -translate-x-1/2 w-auto">
            <h1 className="text-7xl text-white text-center">
              {text}
            </h1>
          </div>
        </div>
        <div className="transform absolute bottom-12 left-1/2 -translate-x-1/2">
        <a href='#slider'>
          <Icon
            icon="iconoir:mouse-scroll-wheel"
            width="48"
            height="48"
            color="#FFFFFF"
            className="animate__animated animate__bounce animate__infinite animate__slow"
          />
        </a>
        </div>
      </section>
      <section className="flex justify-center" id="slider">
        <div className="bg-white flex h-auto lg:h-[500px] justify-between rounded-xl overflow-hidden my-12 shadow-lg flex-wrap w-11/12 border">
          <div className="flex-1">
            <div className=" py-12 lg:py-20 px-4 lg:px-20">
              <h2>
                Un savoir-faire depuis <span className="text-or">1995</span>
              </h2>
              <p className="mt-12">
                <span className="text-or">Pythagore </span>
                est avant tout une équipe d’hommes et de femmes, qui grâce à la
                passion de leur métier, ont su créer l’entreprise que nous
                incarnons aujoud’hui.
              </p>
              <div className="flex justify-end mt-12">
                <Button
                  color="primary"
                  text="Découvrir"
                  size="normal"
                  icon="watch"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 hidden lg:flex">
            <HomeSwipper />
          </div>
        </div>
      </section>
      <section>
        <InspirationWidget />
      </section>
      <section>
        <ActionCatalogue />
      </section>
      <section className="bg-primary py-20">
        <h2 className="text-center mb-12 text-secondary">
          Services pour les professionnels
        </h2>
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center">
          <div>
            <BubbleIcon
              // icon="solar:user-speak-outline"
              link="/nos-services"
            >
              <p>Conseil</p>
              <p>Formation</p>
            </BubbleIcon>
          </div>
          <div>
            <BubbleIcon
              // icon="solar:notebook-minimalistic-outline"
              link="/nos-services"
            >
              <p>Choix, disponibilité des produits.</p>
              <p>Outils d&apos;aide à la vente</p>
            </BubbleIcon>
          </div>
          <div>
            <BubbleIcon
              // icon="solar:settings-minimalistic-outline"
              link="/nos-services"
            >
              <p>Prestation complète</p>
              <p>SAV</p>
            </BubbleIcon>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-center my-8">Avis de nos clients</h2>
        <div className="flex items-start justify-evenly flex-wrap">
          <AvisClient
            note={5}
            name="Alain Connu"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          e et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequa"
            date="07/08/2024"
          />
          <AvisClient
            note={5}
            name="Jean Neymar"
            text="Lorem ipsum dolor sit amet, consecte, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequa"
            date="24/06/2024"
          />
          <AvisClient
            note={4}
            name="Guy Tare"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exer"
            date="17/04/2024"
          />
          <AvisClient
            note={5}
            name="Gérard Manvussa"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor iagna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequa"
            date="07/02/2024"
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
