"use client";

import { useEffect, useRef } from "react";

const PageTitle = ({ title }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      if (titleRef.current) {
        titleRef.current.style.transform = `translateY(${
          scrollPosition * 0.5
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-white border rounded-xl mx-2 md:p-16 overflow-hidden relative bg-cover">
        <img src="/images/bg-title.png" alt="bg" className="absolute inset-0"/>
      <h1
        ref={titleRef}
        className="p-4 text-center text-secondary text-2xl md:text-6xl"
      >
        {title}
      </h1>
    </div>
  );
};

export default PageTitle;
