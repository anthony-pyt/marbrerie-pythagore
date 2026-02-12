"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";

const BubbleService = ({ title, children, urlImage }) => {
  return (
    <div className="group flex flex-col items-center p-6 transition-all duration-500 flex-1">
      {/* Conteneur Cercle avec Zoom et Overlay */}
      <div className="relative overflow-hidden w-64 h-64 lg:w-72 lg:h-72 rounded-full shadow-2xl border border-gray-100">
        <img
          src={urlImage}
          alt={title || "Service"}
          className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-2"
        />
        {/* Overlay subtil qui s'estompe au survol */}
        <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* Contenu Texte */}
      <div className="mt-8 flex flex-col items-center text-center">
        {/* Titre stylisé */}
        {title && (
          <div className="flex flex-col items-center mb-4">
            <h4 className="text-lg font-light uppercase tracking-[0.2em] text-secondary leading-tight">
              {title}
            </h4>
            {/* Ligne décorative centrée qui s'élargit */}
            <div className="h-[2px] w-8 bg-or mt-3 transition-all duration-500 group-hover:w-20" />
          </div>
        )}

        {/* Description / Children */}
        <div className="text-sm text-gray-500 max-w-xs leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BubbleService;
