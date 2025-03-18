"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import Button from "../Button";
import { useRouter } from "next/navigation";

export function ModalProduct({ setOpen, open, product }) {
  const router = useRouter();

  const handleNavigate = (product) => {
    router.push(`/matieres/produits/${product.id}`);
  };
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-20 ">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="animate__animated animate__slideInDown animate__faster fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-xl bg-white max-w-6xl m-12 shadow-xl  p-8"
          >
            <div className="w-full flex justify-end mb-8">
              {product.product.category.logo_url != null ? (
                <img
                  src={product.product.category.logo_url}
                  className="h-5 p-0.5 bg-white rounded px-2"
                />
              ) : (
                <div className="border border-or inline-block px-2 rounded-full leading-3 bg-white">
                  <span className="text-or text-xs">
                    {product.product.category.label}
                  </span>
                </div>
              )}
            </div>
            <div className="rounded-lg overflow-hidden flex flex-col items-center">
              <img
                src={product.image_url}
                loading="lazy"
                alt={product.label}
                className="object-cover h-72 lg:h-[500px] w-72 lg:w-[500px] rounded-lg"
              />
              {/* <div className="flex items-center justify-between w-full mt-2">
                {product.images && product.images.length > 0
                  ? product.images.map((image, imageIndex) => (
                      <img
                        src={image.image_url}
                        loading="lazy"
                        alt={product.label}
                        className="object-cover h-20 w-20 rounded-lg"
                        key={imageIndex}
                      />
                    ))
                  : // Images par défaut
                    [1, 2, 3].map((_, index) => (
                      <img
                        src={product.image_url} // Remplace par le chemin de tes images par défaut
                        loading="lazy"
                        alt={`Image par défaut ${index + 1}`}
                        className="object-cover h-20 w-20 rounded-lg"
                        key={index}
                      />
                    ))}
              </div> */}
              <p className="text-[0.6rem] max-w-[400px] bg-blue-50 p-2 rounded-xl m-2">
                Les visuels sont fournis à titre indicatif et peuvent présenter
                des variations de teintes et de motifs par rapport à la tranche
                et au plan de travail final.
              </p>
            </div>

            <div className="mt-3 text-center lg:text-left sm:mt-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <DialogTitle
                    as="h3"
                    className="font-semibold text-2xl flex items-center space-x-4"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{product.label}</span>
                    </div>
                    {product.eco == 1 && (
                      <Icon
                        icon="mdi:ecology"
                        width="24"
                        height="24"
                        className="text-green-600"
                      />
                    )}
                  </DialogTitle>
                  <div>
                    <button
                      text="Voir la page"
                      size="small"
                      onClick={() => handleNavigate(product)}
                      className="px-4 border rounded hover:shadow-inner shadow"
                    >
                      Voir le produit
                    </button>
                  </div>
                </div>
                <div className="border rounded-lg my-8 py-2">
                  <div className="flex flex-wrap items-center space-x-1 text-xs m-3">
                    <Icon
                      icon="arcticons:rocksndiamonds"
                      width="18"
                      height="18"
                    />
                    <div className="bg-primary/25 px-2 py-0.5 rounded">
                      <span className="text-secondary">
                        {product.product.category?.parent?.label ??
                          "Non spécifié"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center space-x-1 text-xs m-3">
                    <Icon
                      icon="solar:sticker-square-outline"
                      width="18"
                      height="18"
                    />
                    {product?.finitions.map((item, index) => (
                      <div
                        className="lowercase bg-primary/25 px-2 py-0.5 rounded"
                        key={item.id}
                      >
                        <span className="text-secondary">
                          {item.finition.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center space-x-1 text-xs m-3">
                    <Icon
                      icon="solar:ruler-angular-outline"
                      width="18"
                      height="18"
                    />
                    {product?.thiknesses.map((item, index) => (
                      <div
                        className="lowercase bg-primary/25 px-2 py-0.5 rounded"
                        key={item.id}
                      >
                        <span className="text-secondary">
                          {item.thikness_plan.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center space-x-1 text-xs m-3">
                    <Icon
                      icon="fluent:color-24-regular"
                      width="18"
                      height="18"
                    />
                    <div className="lowercase bg-primary/25 px-2 py-0.5 rounded">
                      <span className="text-secondary">Blanc</span>
                    </div>
                    <div className="lowercase bg-primary/25 px-2 py-0.5 rounded">
                      <span className="text-secondary">Gris</span>
                    </div>
                    <div className="lowercase bg-primary/25 px-2 py-0.5 rounded">
                      <span className="text-secondary">Noir</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center space-x-1 text-xs m-3">
                    <Icon
                      icon="icon-park-outline:lattice-pattern"
                      width="18"
                      height="18"
                    />
                    <div className="bg-primary/25 px-2 py-0.5 rounded">
                      <span className="text-secondary">
                        {product.motif ?? "Non spécifié"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center space-x-1 text-xs m-3">
                    <Icon icon="mdi:planet" width="18" height="18" />
                    <div className="bg-primary/25 px-2 py-0.5 rounded">
                      <span className="text-secondary">
                        {product.origine ?? "Non spécifié"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* GARANTIE */}
            <div className="border p-4 rounded-lg mt-4 max-w-[650px] mx-auto">
              <h6>Garantie</h6>
              <p className="text-xs text-justify">
                Nous offrons une garantie sur l’ensemble des matériaux
                manufacturés et posés par nos équipes ou simplement livrés ;
                ceci sous réserve que ces matériaux soient transformés et
                installés dans le respect des bonnes pratiques.
              </p>
              {product.product.category.waranty && (
                <div className="flex flex-col items-center flex-shrink justify-center">
                  <div className="flex justify-end">
                    <img
                      src={`${product.product.category.waranty.imageSrc}`}
                      loading="lazy"
                      alt={product.product.category.waranty.title}
                      className="object-cover min-w-24 max-w-24 rounded-full p-4 bg-white"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-justify text-xs">
                      {product.product.category.waranty.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
