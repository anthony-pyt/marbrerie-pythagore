import { Icon } from "@iconify/react";
import React from "react";

const Button = ({ text, color, size = "normal", icon = null, onClick }) => {
  let bgColor,
    textColor,
    hoverBgColor,
    hoverTextColor,
    borderColor,
    textSize = "text-base";
  let pHorizontal = "px-6",
    pVertical = "py-3";
  let width = 16,
    height = 16;

  // Ajuster la taille du bouton
  if (size === "small") {
    textSize = "text-xs";
    pHorizontal = "px-4";
    pVertical = "py-2";
    width = 12;
    height = 12;
  } else if (size === "large") {
    textSize = "text-xl";
    pHorizontal = "px-8";
    pVertical = "py-4";
    width = 20;
    height = 20;
  }

  // Définir les couleurs selon la prop `color`
  if (color === "primary") {
    bgColor = "bg-white";
    textColor = "text-secondary";
    hoverBgColor = "hover:bg-secondary";
    hoverTextColor = "hover:text-white";
    borderColor = "border-secondary";
  } else if (color === "secondary") {
    bgColor = "bg-secondary";
    textColor = "text-white";
    hoverBgColor = "hover:bg-white";
    hoverTextColor = "hover:text-secondary";
    borderColor = "border-white";
  } else if (color === "or") {
    bgColor = "bg-or-light";
    textColor = "text-secondary";
    hoverBgColor = "hover:bg-secondary";
    hoverTextColor = "hover:text-white";
    borderColor = "border-or-light";
  }

  return (
    <button
      onClick={onClick}
      className={`relative border ${borderColor} rounded-full box-border 
        font-sans font-semibold leading-none text-center 
        transition-all duration-500 ease-in-out shadow-sm transform-gpu
        hover:shadow-md hover:-translate-y-0.5
        ${bgColor} ${textColor} ${hoverBgColor} ${hoverTextColor}
        ${textSize} ${pHorizontal} ${pVertical}
        flex items-center justify-center`}
    >
      {icon && (
        <Icon
          icon={icon}
          width={width}
          height={height}
          className="mr-2 transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      )}
      {text}
    </button>
  );
};

export default Button;
