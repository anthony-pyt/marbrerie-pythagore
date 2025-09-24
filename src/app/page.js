"use client";
import Button from "@/components/Button";
import HomeSwipper from "@/components/home/HomeSwipper";
import ActionCatalogue from "@/components/home/ActionCatalogue";
import MainMenu from "@/components/MainMenu";
import InspirationWidget from "@/components/home/InspirationWidget";
import BubbleService from "@/components/BubbleService";
import Review from "@/components/Review";
import Footer from "@/components/Footer";
import { useEffect, useState, useRef, use, useMemo } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Loader from "@/components/loader";
import GoogleReviews from "@/components/googleReviews";
import { FadeLoader, ScaleLoader } from "react-spinners";
import useImageServices from "@/api/services/imageService";

const message = "bienvenue chez pythagore";

export default function Home() {
  const { fetchAllInspirationPhotos } = useImageServices();
  const [inspirations, setInspirations] = useState([]);
  const [loadInspirations, setLoadInspirations] = useState(true);
  // État pour la visibilité des sections
  const [visibleSections, setVisibleSections] = useState({});
  const [imageSrc, setImageSrc] = useState("");
  const [images, setImages] = useState([]);
  const [loadImages, setLoadingImages] = useState(true);
  const [cardsInspiration, setCardsInspiration] = useState([]);
  const sectionRefs = useRef([]);
  const router = useRouter();

  // Récupération des images en une seule fonction
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [principalRes, savoirFaireRes] = await Promise.all([
          fetch(`/api/images/random-principal-accueil?t=${Date.now()}`, {
            cache: "no-store",
          }).then((res) => res.json()),
          fetch(`/api/images/accueil-savoir-faire?t=${Date.now()}`, {
            cache: "no-store",
          }).then((res) => res.json()),
        ]);

        if (principalRes.src) setImageSrc(principalRes.src);
        if (savoirFaireRes.images) setImages(savoirFaireRes.images);
      } catch (err) {
        console.error("Failed to load images", err);
      } finally {
        setLoadingImages(false);
      }
    };

    fetchData();
  }, []);

  // Récupération des inspirations
  useEffect(() => {
    const fetchInspirations = async () => {
      try {
        const response = await fetchAllInspirationPhotos(8);
        setInspirations(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des inspirations :",
          error
        );
      } finally {
        setLoadInspirations(false);
      }
    };

    fetchInspirations();
  }, []);

  // Intersection Observer pour les animations
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

  // Génération des cartes avec useMemo pour éviter les recalculs inutiles
  const cards = useMemo(
    () =>
      inspirations.map((card, index) => (
        <Card key={card.id} card={card} index={index} />
      )),
    [inspirations]
  );

  const navigateTo = (href) => {
    router.push(href);
  };

  return (
    <main className="min-h-screen">
      <MainMenu page="home" />
      <section className="relative hidden xl:flex">
        <div className="w-full h-screen overflow-hidden flex justify-center items-center bg-black animate__animated animate__fadeIn">
          {/* <video
            src="/videos/pres1.mp4"
            // loop
            autoPlay
            muted
            className="opacity-40 blur w-full object-cover"
          /> */}
         {imageSrc && (
            <Image
              alt="acceuil"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={imageSrc}
              className="opacity-40"
            />
          )}
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
                réunit une équipe d’hommes et de femmes passionnés, dédiés à
                sublimer les matériaux. Spécialisés dans la marbrerie de
                décoration, nous accompagnons les professionnels de l’agencement
                résidentiel, commercial et tertiaire. 
                
                Chaque réalisation prend
                vie dans nos ateliers, au coeur de la Bretagne, où vos projets
                sont minutieusement découpés, façonnés et assemblés.
              </p>
              <p></p>
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
            <div className="flex items-center justify-center w-full">
              <ScaleLoader color="#EBC74F" loading={loadImages} />
              <HomeSwipper images={images} />
            </div>
          </div>
        </div>
      </section>

      {/* <section
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
          {inspirations && <Carousel items={cards} />}
        </div>
      </section> */}

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
            <div className="rounded-3xl flex-wrap flex flex-col lg:flex-row items-center justify-between w-full max-w-full m-4 p-8 bg-white shadow-lg min-h-96">
              <BubbleService
                urlImage={"/images/nos-services/suivi_commercial.jpg"}
              >
                Conseil & formation
              </BubbleService>
              <BubbleService urlImage={"/images/echantillons.JPEG"}>
                Choix, disponibilité des produits & Outils d&apos;aide à la
                vente
              </BubbleService>
              <BubbleService urlImage={"/images/nos-services/SAV.jpg"}>
                Prestation complète & SAV
              </BubbleService>
            </div>
          </div>
        </Link>
      </section>

      <section
        ref={(el) => (sectionRefs.current[4] = el)}
        data-id="reviews"
        className={`py-8 animate__animated ${
          visibleSections["reviews"] ? "animate__fadeIn" : "opacity-0"
        }`}
      >
        <GoogleReviews />
      </section>
      <Footer />
    </main>
  );
}

const ShowTextGenerateEffect = () => {
  return <TextGenerateEffect duration={2} filter={false} words={message} />;
};

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
