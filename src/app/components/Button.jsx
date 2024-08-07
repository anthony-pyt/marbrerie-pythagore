// src/components/Button.js

import { Icon } from "@iconify/react";
import React from "react";

const Button = ({ text, color, size = "normal", icon = null }) => {
  // Définir les classes en fonction de la prop `color`
  let bgColor,
    textColor,
    hoverBgColor,
    hoverTextColor,
    borderColor,
    textSize = "text-base";
  let pHorizontal = "px-6",
    pVertical = "py-3";
  let usedIcon = null;

  if (size === "small") {
    textSize = "text-xs";
    pHorizontal = "px-4";
    pVertical = "py-2";
  } else if (size === "large") {
    textSize = "text-xl";
    pHorizontal = "px-8";
    pVertical = "py-4";
  }
  if (icon) {
    let width = 16;
    let height = 16;
    if (size == "small") {
      width = 12;
      height = 12;
    } else if (size == "large") {
      width = 20;
      height = 20;
    }
    if (icon === "send") {
      usedIcon = (
        <Icon
          icon="solar:file-send-bold"
          width={width}
          height={height}
          className="mr-2"
        />
      );
    } else if (icon === "check") {
      usedIcon = (
        <Icon
          icon="solar:check-read-bold"
          width={width}
          height={height}
          className="mr-2"
        />
      );
    } else if (icon ==="watch") {
      usedIcon = (
      <Icon
        icon="solar:clapperboard-play-bold"
        width={width}
        height={height}
        className="mr-2"
      />
      )
    }
  }

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
    borderColor = "border-primary";
  }

  return (
    <button
      className={`border ${borderColor} rounded-xl box-border 
        font-sans font-semibold leading-none text-center 
        transition-all duration-500 ease-in-out shadow-sm 
        ${bgColor} ${textColor} ${hoverBgColor} ${hoverTextColor}
        ${textSize} ${pHorizontal} ${pVertical}
        flex items-center justify-center`}
    >
      {usedIcon}
      {text}
    </button>
  );
};

export default Button;
