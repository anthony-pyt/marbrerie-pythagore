"use client"; // Cette directive indique que ce composant doit être rendu côté client

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default () => {
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
      <SplideSlide>
        <img
          src="/images/credence-marbre-dore-3.png"
          alt="Image 1"
          className="min-h-[500px] max-h-[500px] w-full object-cover bg-center"
        />
      </SplideSlide>
      <SplideSlide>
        <img
          src="/images/2.jpg"
          alt="Image 2"
          className="min-h-[500px] max-h-[500px] w-full object-cover bg-center"
        />
      </SplideSlide>
      <SplideSlide>
        <img
          src="/images/3.jpg"
          alt="Image 3"
          className="min-h-[500px] max-h-[500px] w-full object-cover bg-center"
        />
      </SplideSlide>
    </Splide>
  );
};
