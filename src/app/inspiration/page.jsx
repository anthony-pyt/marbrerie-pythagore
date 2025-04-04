"use client";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { ParallaxScroll } from "../components/ui/parallax-scroll.jsx";
import MainMenu from "./../components/MainMenu";
import PageTitle from "./../components/PageTitle";
import { LayoutGrid } from "./../components/ui/layout-grid";
import axios from "axios";
import useImageServices from "./../api/services/imageService";

const Skeleton = ({name}) => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        {name}
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <Skeleton name="nom_produit"/>,
    // className: "md:col-span-1",
    thumbnail: "/images/2.jpg",
  },
  {
    id: 2,
    content: <Skeleton name="nom_produit"/>,
    // className: "col-span-1",
    thumbnail: "/images/3.jpg",
  },
  {
    id: 3,
    content: <Skeleton name="nom_produit"/>,
    // className: "col-span-1",
    thumbnail: "/images/atr.jpg",
  },
  {
    id: 4,
    content: <Skeleton name="nom_produit"/>,
    // className: "md:col-span-2",
    thumbnail: "/images/credence-marbre-dore-3.png",
  },
  {
    id: 5,
    content: <Skeleton name="nom_produit"/>,
    // className: "col-span-1",
    thumbnail: "/images/IMG-4058.JPG",
  },
  {
    id: 6,
    content: <Skeleton name="nom_produit"/>,
    // className: "md:col-span-1",
    thumbnail: "/images/romantic.jpg",
  },
  {
    id: 7,
    content: <Skeleton name="nom_produit"/>,
    // className: "col-span-1",
    thumbnail: "/images/credence-marbre-dore-3.png",
  },
  {
    id: 8,
    content: <Skeleton name="nom_produit"/>,
    // className: "md:col-span-1",
    thumbnail: "/images/2.jpg",
  },
  {
    id: 9,
    content: <Skeleton name="nom_produit"/>,
    // className: "md:col-span-1",
    thumbnail: "/images/3.jpg",
  },
  {
    id: 10,
    content: <Skeleton name="nom_produit"/>,
    // className: "md:col-span-2",
    thumbnail: "/images/2.jpg",
  },
];

const shuffle = (array) => {
  if (array){
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  return []
};

export default function Page() {
  const {fetchAllInspirationPhotos } = useImageServices()
  const [inspirations, setInspirations] = useState([]);

  useEffect(() => {
    const fetchInspirations = async () => {
      try {
        const response = await fetchAllInspirationPhotos()
        setInspirations(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
      }
    };

    fetchInspirations();
  }, []);

  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={"Inspiration"} />
      <div className="h-auto overflow-auto">
        <LayoutGrid cards={shuffle(inspirations)} />
      </div>
      <Footer />
    </main>
  );
}
