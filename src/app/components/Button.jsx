import { Icon } from "@iconify/react";
import React from "react";

const Button = ({
  text,
  color = "primary",
  size = "normal",
  icon = null,
  onClick,
  disabled = false,
  loading = false, // Optionnel pour un état de chargement
}) => {
  let bgColor, textColor, hoverBgColor, hoverTextColor, borderColor;
  let textSize = "text-base",
    pHorizontal = "px-6",
    pVertical = "py-3";
  let width = 16,
    height = 16;

  // Gestion des tailles
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

  // Définition des couleurs en fonction de `color`
  switch (color) {
    case "secondary":
      bgColor = "bg-secondary";
      textColor = "text-white";
      hoverBgColor = "hover:bg-white";
      hoverTextColor = "hover:text-secondary";
      borderColor = "border-white";
      break;
    case "or":
      bgColor = "bg-or-light";
      textColor = "text-secondary";
      hoverBgColor = "hover:bg-secondary";
      hoverTextColor = "hover:text-white";
      borderColor = "border-or-light";
      break;
    default: // "primary"
      bgColor = "bg-white";
      textColor = "text-secondary";
      hoverBgColor = "hover:bg-secondary";
      hoverTextColor = "hover:text-white";
      borderColor = "border-secondary";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative border ${borderColor} rounded-full 
        font-sans font-semibold leading-none text-center 
        transition-all duration-300 ease-in-out shadow-sm transform-gpu
        ${pHorizontal} ${pVertical} ${textSize} 
        flex items-center justify-center 
        ${bgColor} ${textColor}
        ${
          !disabled && !loading
            ? `${hoverBgColor} ${hoverTextColor} hover:shadow-md hover:-translate-y-0.5`
            : "opacity-50 cursor-not-allowed"
        }
      `}
    >
      <div className="flex items-center space-x-3">
        {icon && (
          <Icon
            icon={icon}
            width={width}
            height={height}
            className="transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        )}
        <span>{text}</span>
        {loading && (
          <Icon
            icon="svg-spinners:pulse-rings-3"
            width="24"
            height="24"
            className="text-black"
          />
        )}
      </div>
    </button>
  );
};

export default Button;
