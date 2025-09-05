"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const BubbleService = ({ children, urlImage }) => {
  // const [isVisible, setIsVisible] = useState(false);
  // const sectionRef = useRef(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         setIsVisible(true);
  //       }
  //     },
  //     {
  //       threshold: 0.5, // Le pourcentage d'affichage du composant avant d'activer l'animation
  //     }
  //   );

  //   if (sectionRef.current) {
  //     observer.observe(sectionRef.current);
  //   }

  //   return () => {
  //     if (sectionRef.current) {
  //       observer.unobserve(sectionRef.current);
  //     }
  //   };
  // }, []);
  return (
    <div
      className={`group p-4 flex-1 h-full flex flex-col justify-center items-center animate__animated`}
    >
      <div className="overflow-hidden w-80 h-80 lg:w-60 lg:h-60 xl:w-80 xl:h-80 flex items-center justify-center rounded-full shadow-xl">
        <Image
          src={urlImage}
          className="object-cover h-full w-full group-hover:scale-125 group-hover:-rotate-6 transform duration-500"
          alt="Conseil et Formation"
          width={500}
          height={500}
          priority={true}
        />
      </div>
      <p className="mt-2 text-gray-500">{children}</p>
    </div>
  );
};

export default BubbleService;
