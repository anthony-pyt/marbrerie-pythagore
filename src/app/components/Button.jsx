"use client";
import { Icon } from "@iconify/react";
import React from "react";
import clsx from "clsx"; // Optionnel : pour gérer les classes proprement

const Button = ({
  text,
  color = "primary",
  size = "normal",
  icon = null,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
}) => {
  // 1. Configuration des tailles via un objet (plus propre)
  const sizeConfig = {
    small: { text: "text-xs", py: "py-2", px: "px-4", icon: 14 },
    normal: { text: "text-sm", py: "py-3", px: "px-6", icon: 18 },
    large: { text: "text-lg", py: "py-4", px: "px-8", icon: 22 },
  };

  // 2. Configuration des couleurs
  const colorConfig = {
    secondary:
      "bg-secondary text-white border-white hover:bg-white hover:text-secondary",
    or: "bg-or text-secondary border-or hover:bg-secondary hover:text-white",
    primary:
      "bg-white text-secondary border-secondary hover:bg-secondary hover:text-white",
  };

  const currentSize = sizeConfig[size] || sizeConfig.normal;
  const currentColor = colorConfig[color] || colorConfig.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        // Classes de base
        "relative inline-flex items-center justify-center border transition-all duration-300 ease-out",
        "font-sans overflow-hidden group active:scale-95",
        "shadow-sm hover:shadow-md",
        // Classes dynamiques
        currentSize.text,
        currentSize.py,
        currentSize.px,
        currentColor,
        // État désactivé
        (disabled || loading) && "opacity-50 cursor-not-allowed grayscale",
      )}
    >
      {/* Effet de brillance subtil au survol */}
      <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />

      <div className="flex items-center space-x-2 relative z-10">
        {/* Loader ou Icône */}
        {loading ? (
          <Icon
            icon="svg-spinners:ring-resize"
            width={currentSize.icon}
            height={currentSize.icon}
          />
        ) : (
          icon && (
            <Icon
              icon={icon}
              width={currentSize.icon}
              height={currentSize.icon}
              className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12"
            />
          )
        )}

        <span className="leading-none">{text}</span>
      </div>
    </button>
  );
};

export default Button;
