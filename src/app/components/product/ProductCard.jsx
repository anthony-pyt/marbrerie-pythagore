"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import { ModalProduct } from "./ModalProduct";
import Image from "next/image";

const ProductCard = ({ product }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Sécurisation des données
  const category = product?.product?.category;
  const imageSrc = product?.image_url || "/images/placeholder-product.jpg";

  return (
    <>
      {isOpenModal && (
        <ModalProduct
          openModal={setIsOpenModal}
          open={isOpenModal}
          setOpen={setIsOpenModal}
          product={product}
        />
      )}

      <div className="group relative flex flex-col w-full bg-white border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-transparent overflow-hidden">
        {/* --- ZONE IMAGE --- */}
        <div
          className="relative aspect-square w-full overflow-hidden bg-gray-50 cursor-pointer"
          onClick={() => setIsOpenModal(true)}
        >
          <img
            src={imageSrc}
            alt={product.label}
            className="object-cover transition-transform duration-700 group-hover:scale-110 h-full w-full"
          />

          {/* Overlay subtil au survol */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/90 px-4 py-2 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
                Découvrir
              </span>
            </div>
          </div>

          {/* Badge Catégorie */}
          <div className="absolute top-3 left-3">
            {category?.logo_url ? (
              <div className="bg-white/80 backdrop-blur-md p-1.5 shadow-sm">
                <img
                  src={category.logo_url}
                  alt={category.label}
                  className="h-4 w-auto object-contain"
                />
              </div>
            ) : (
              <span className="bg-white/80 backdrop-blur-md px-2 py-1 text-[9px] uppercase tracking-widest text-secondary font-bold shadow-sm">
                {category?.label || "Matière"}
              </span>
            )}
          </div>

          {/* Icône Coeur (Coup de coeur) */}
          {product.heart === 1 && (
            <div className="absolute top-3 right-3">
              <Icon
                icon="solar:heart-bold"
                className="text-red-500 drop-shadow-sm"
                width="20"
              />
            </div>
          )}
        </div>

        {/* --- ZONE INFOS --- */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-sm font-medium uppercase tracking-wider text-secondary mb-3 line-clamp-1">
            {product.label}
          </h3>

          <div className="space-y-3 flex-grow">
            {/* Finitions */}
            <div className="flex items-start gap-2">
              <Icon
                icon="solar:sticker-square-outline"
                className="text-gray-400 mt-0.5"
                width="14"
              />
              <div className="flex flex-wrap gap-1">
                {product.finitions?.slice(0, 3).map((item, index) => (
                  <span
                    key={index}
                    className="text-[10px] text-gray-500 bg-gray-50 px-1.5 py-0.5 border border-gray-100"
                  >
                    {item?.finition?.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Épaisseurs */}
            <div className="flex items-start gap-2">
              <Icon
                icon="solar:ruler-angular-outline"
                className="text-gray-400 mt-0.5"
                width="14"
              />
              <div className="flex flex-wrap gap-1">
                {product.thiknesses?.map((item, index) => (
                  <span
                    key={index}
                    className="text-[10px] text-gray-400 font-light"
                  >
                    {item?.thikness_plan?.label}
                    {index < product.thiknesses.length - 1 ? " • " : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bouton d'action invisible qui apparaît au hover (Optionnel) */}
          <button
            onClick={() => setIsOpenModal(true)}
            className="mt-4 w-full py-2 bg-secondary text-white text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            Fiche technique
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
