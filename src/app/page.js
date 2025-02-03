"use client";
import Button from "./components/Button";
import HomeSwipper from "./components/home/HomeSwipper";
import ActionCatalogue from "./components/home/ActionCatalogue";
import MainMenu from "./components/MainMenu";
import InspirationWidget from "./components/home/InspirationWidget";
import BubbleService from "./components/BubbleService";
import Review from "./components/Review";
import Footer from "./components/Footer";
import { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import {TextGenerateEffect} from "./components/ui/text-generate-effect";
import { Carousel, Card } from "./components/ui/apple-cards-carousel"
import { useRouter } from "next/navigation";

const message = "bienvenue chez pythagore";

export default function Home() {

  // État pour la visibilité des sections
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef([]);
  const router = useRouter()

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.dataset.id; // Utilise l'ID de la section
            setVisibleSections((prev) => ({
              ...prev,
              [sectionId]: true,
            }));
          }
        });
      },
      {
        threshold: 0.25, // Le pourcentage d'affichage du composant avant d'activer l'animation
      }
    );

    // Observer chaque section
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const navigateTo = (href) => {
    router.push(href)
  }

  return (
    <main className="min-h-screen">
      <MainMenu page="home" />
      <section className="relative hidden xl:flex">
        <div className="w-full h-screen overflow-hidden flex justify-center items-center bg-black animate__animated animate__fadeIn">
          <video
            src="/videos/presentation.mp4"
            loop
            autoPlay
            muted
            className="opacity-40 blur w-full object-cover"
          />
          <div className="absolute transform left-1/2 -translate-x-1/2 w-full">
            <ShowTextGenerateEffect />
          </div>
        </div>
        <div className="transform absolute bottom-4 left-1/2 -translate-x-1/2">
          <a href="#slider">
            <Icon
              icon="solar:mouse-minimalistic-outline"
              width="48"
              height="48"
              color="#FFFFFF"
              className="animate__animated animate__heartBeat animate__repeat-3 animate__slow"
            />
          </a>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        data-id="slider"
        id="slider"
        className={`flex justify-center animate__animated`}
      >
        <div className="bg-white flex h-auto lg:h-[500px] justify-between rounded-xl overflow-hidden my-12 shadow-lg flex-wrap w-11/12 border">
          <div className="flex-1">
            <div className=" py-12 lg:py-20 px-4 lg:px-20">
              <h2>
                Un savoir-faire depuis <span className="text-or">1995</span>
              </h2>
              <p className="mt-12">
                <span className="text-or">Pythagore </span>
                est une équipe d’hommes et de femmes, qui de par leur
                passion pour leur métier et les matériaux, incarnent ce que nous
                sommes aujourd'hui !
              </p>
              <div className="flex justify-end mt-12">
                <Button
                  color="primary"
                  text="Découvrir"
                  size="normal"
                  icon="watch"
                  onClick={() => navigateTo("/savoir-faire")}
                />
              </div>
            </div>
          </div>
          <div className="flex-1 hidden lg:flex">
            <HomeSwipper />
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        data-id="inspiration"
        className={`py-20 animate__animated 
          ${
            visibleSections["inspiration"]
              ? "animate__fadeInRight"
              : "opacity-0"
          }
        `}
      >
        <div className="w-full h-full">
          <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 font-sans">
            Inspirez-vous !
          </h2>
          <Carousel items={cards} />
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        data-id="catalogue"
        className={`animate__animated ${
          visibleSections["catalogue"] ? "animate__fadeInLeft" : "opacity-0"
        }`}
      >
        <ActionCatalogue />
      </section>

      <section
        ref={(el) => (sectionRefs.current[3] = el)}
        data-id="services"
        className={`py-20 animate__animated bg-gray-100 ${
          visibleSections["services"] ? "animate__fadeIn" : "opacity-0"
        }`}
      >
        <h2 className="text-center mb-12 text-secondary">
          Services pour les professionnels
        </h2>
        <Link href={"/nos-services"}>
          <div className="flex justify-center">
            <div className="rounded-3xl flex-wrap flex flex-col lg:flex-row items-center justify-between w-full max-w-full m-4 p-8 bg-white shadow-lg lg:divide-x divide-or-light min-h-96">
              <BubbleService urlImage={"/images/formation.jpg"}>
                Conseil & formation
              </BubbleService>
              <BubbleService urlImage={"/images/echantillons.JPEG"}>
                Choix, disponibilité des produits & Outils d&apos;aide à la
                vente
              </BubbleService>
              <BubbleService urlImage={"/images/sav.jpg"}>
                Prestation complète & SAV
              </BubbleService>
            </div>
          </div>
        </Link>
      </section>

      <section
        ref={(el) => (sectionRefs.current[4] = el)}
        data-id="reviews"
        className={`py-20 animate__animated ${
          visibleSections["reviews"] ? "animate__fadeIn" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center my-8">
          <h2 className="text-center">Avis de nos clients</h2>
          <div className="flex items-center space-x-1">
            <span>4,8</span>
            <div className="flex">
              {Array.from({ length: 5 }, (_, index) => (
                <Icon
                  key={index}
                  icon="line-md:star-filled"
                  className="text-xl text-or-light"
                />
              ))}
            </div>
            <span>148 avis</span>
          </div>
        </div>
        <div className="flex items-start justify-evenly flex-wrap">
          <Review
            note={5}
            name="Alain Connu"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          e et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequa"
            date="07/08/2024"
          />
          <Review
            note={5}
            name="Jean Neymar"
            text="Lorem ipsum dolor sit amet, consecte, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequa"
            date="24/06/2024"
          />
          <Review
            note={4}
            name="Guy Tare"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exer"
            date="17/04/2024"
          />
          <Review
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

const ShowTextGenerateEffect = () => {
  return <TextGenerateEffect duration={2} filter={false} words={message} />;
}

const data = [
  {
    category: "Xtone",
    title: "Ars Beige",
    src: "/images/romantic.jpg",
  },
  {
    category: "Dekton",
    title: "Sirius",
    src: "/images/versailles.jpg",
  },
  {
    category: "Verrazzo",
    title: "Topaze",
    src: "/images/credence-marbre-dore-3.png",
  },
  {
    category: "Ostrea",
    title: "Saint Jacques",
    src: "/images/IMG-4058.JPG",
  },
  {
    category: "Marazzi",
    title: "Golden White",
    src: "/images/atr.jpg",
  },
];