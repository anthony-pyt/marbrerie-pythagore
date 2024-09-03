"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const BubbleIcon = ({ icon, link, children }) => {
  return (
    <Link
      href={link}
      className="relative block p-4 overflow-hidden rounded-xl bg-white border border-gray-300 shadow-lg h-32 w-96 m-4 group"
      aria-label={children ? `Link to ${children}` : "Link"}
    >
      <div className="absolute -left-20 -top-4 transform rotate-6 opacity-25 z-0">
        <Icon icon={icon} width={175} height={175} color="#A88512" />
      </div>
      <div className="relative z-10 font-sans font-semibold uppercase text-base text-right">{children}</div>
      <div className="absolute opacity-25 -bottom-24 -right-24">
        <Image
          src={"/images/circle_dots.png"}
          alt="dots"
          width={200}
          height={200}
        />
      </div>
    </Link>
  );
};

export default BubbleIcon;
