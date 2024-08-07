"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

const BubbleIcon = ({ icon, size, link }) => {
  return link ? (
    <Link href={link} className="group">
      <div
        className={`rounded-full bg-primary flex items-center justify-center p-4 overflow-hidden min-h-${size} min-w-${size}`}
      >
        <Icon
          icon={icon}
          className={`text-or ${
            link ? "group-hover:translate-x-40 transform duration-700" : ""
          }`}
        />
        {link && (
          <span className="-translate-x-40 group-hover:translate-x-0 transform duration-700">
            En savoir plus
          </span>
        )}
      </div>
    </Link>
  ) : (
    <div className="rounded-full bg-primary flex items-center justify-center p-4 overflow-hidden">
      <Icon icon={icon} width={size} height={size} className="text-or" />
    </div>
  );
};

export default BubbleIcon;
