'use client'
import { Icon } from "@iconify/react";
import Link from "next/link";

const BubbleIcon = ({ icon, link }) => {
  
  return link ? (
    <Link href={link} className="group">
      <div
        className={`relative rounded-full bg-primary flex items-center justify-center p-4 overflow-hidden max-h-120 max-w-120 mb-4`}
      >
        <Icon
          icon={icon}
          width={100}
          height={100}
          className={` ${
            link ? "group-hover:translate-x-36 transform duration-300" : ""
          }`}
        />
        {link && (
          <span className="absolute -translate-x-36 group-hover:translate-x-0 transform duration-300 text-center">
            En savoir plus
          </span>
        )}
      </div>
    </Link>
  ) : (
    <div className="rounded-full bg-primary flex items-center justify-center p-4 overflow-hidden">
      <Icon icon={icon} width={size} height={size} className="" />
    </div>
  );
};

export default BubbleIcon;
