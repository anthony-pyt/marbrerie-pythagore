"use client"; // Cette directive indique que ce composant doit être rendu côté client

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";

export default function HomeSwipper({ images }) {
  return (
    <Splide
      options={{
        rewind: true,
        gap: "1rem",
        autoplay: true,
        arrows: false,
        interval: 3000,
        pagination: false,
      }}
      aria-label="My Favorite Images"
    >
      {images.map((image, index) => {
        return (
          <SplideSlide key={index}>
            <Image
              src={image}
              alt={index}
              width={500}
              height={500}
              className="min-h-[500px] max-h-[500px] w-full object-cover bg-center"
            />
          </SplideSlide>
        );
      })}
    </Splide>
  );
}
