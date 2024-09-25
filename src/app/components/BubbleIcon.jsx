"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const BubbleIcon = ({ icon, link, children }) => {
  return (
    <Link
      href={link}
      className="relative block p- overflow-hidden rounded-full bg-white border border-gray-300 shadow-lg h-56 w-56 m-8 group"
      aria-label={children ? `Link to ${children}` : "Link"}
    >
      <div className="absolute bottom-1/2 transform translate-y-1/2 left-1/2 -translate-x-1/2 opacity-25 z-0">
        <Icon icon={icon} width={150} height={150} color="#A88512" />
      </div>
      <div className="absolute bottom-1/2 transform translate-y-1/2 left-1/2 -translate-x-1/2 text-center text-xl w-full h-full flex flex-col items-center justify-center px-10">
        {children}
      </div>
      <div className="absolute opacity-25 bottom-1/2 transform translate-y-1/2 left-1/2 -translate-x-1/2 w-48 h-48">
        <img
          src={"/images/circle_dots.png"}
          alt="dots"
        />
      </div>
    </Link>
  );
};

export default BubbleIcon;
