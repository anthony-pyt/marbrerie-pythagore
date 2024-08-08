import { Icon } from "@iconify/react";
import Link from "next/link";

const BubbleIcon = ({ icon, size, link }) => {
  return link ? (
    <Link href={link} className="group">
      <div
        className={`relative rounded-full bg-primary flex items-center justify-center p-4 overflow-hidden h-${size} w-${size}`}
      >
        <Icon
          icon={icon}
          width={size -8}
          height={size -8}
          className={` ${
            link ? "group-hover:translate-x-24 transform duration-300" : ""
          }`}
        />
        {link && (
          <span className="absolute -translate-x-24 group-hover:translate-x-0 transform duration-300 text-center">
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
