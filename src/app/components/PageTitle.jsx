"use client";

import { useEffect, useState } from "react";

const PageTitle = ({ title }) => {
  const animations = [
    "animate__bounceInLeft",
    "animate__bounceInRight",
    "animate__backInDown",
    "animate__backInUp",
    "animate__bounceInDown",
    "animate__bounceInLeft",
    "animate__bounceInRight",
    "animate__bounceInUp",
    "animate__zoomInDown",
    "animate__zoomInLeft",
    "animate__zoomInRight",
    "animate__zoomInUp",
  ];
  const [animationClass, setAnimationClass] = useState("");
  const [RandomNumber, setRandomNumber] = useState(1);

  useEffect(() => {
    const randomAnim =
      animations[Math.floor(Math.random() * animations.length)];
    setAnimationClass(randomAnim);

    const number = Math.floor(Math.random() * 10) + 1;
    setRandomNumber(number);
  }, []);

  return (
    <div
      className="relative bg-white border rounded-xl overflow-hidden parallax h-48 flex items-center justify-center"
      style={{ backgroundImage: `url('/images/wave-${RandomNumber}.png')` }}
    >
      <h1
        className={`relative p-4 text-center text-secondary text-3xl md:text-6xl parallax-title animate__animated ${animationClass}`}
      >
        {title}
      </h1>
    </div>
  );
};

export default PageTitle;
