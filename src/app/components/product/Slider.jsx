import { useRef, useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Slider = ({ principal_image, images }) => {

//   // Fusionner l'image principale avec les autres images
//   const mergedImages = principal_image
//     ? [{ image_url: principal_image }, ...images]
//     : images;
  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-black overflow-hidden">
        <Splide
          options={{
            type: "loop",
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            arrows: true,
            pagination: true,
            rewind: true,
            fixedHeight: "450px",
            cover: false,
            breakpoints: {
              768: { fixedHeight: "300px" },
            },
          }}
          aria-label="Photos du produit"
        >
          {images.map((image, index) => (
            <SplideSlide key={index}>
              <img
                src={image.image_url}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover block"
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default Slider;
