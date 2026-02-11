"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function ModalProduct({ setOpen, open, product }) {
  const router = useRouter();

  if (!product) return null;

  const handleNavigate = () => {
    router.push(`/matieres/produits/${product.id}`);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-[100]"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-secondary/80 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
          <DialogPanel
            transition
            className="relative transform overflow-hidden bg-white shadow-2xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 w-full max-w-6xl"
          >
            {/* BOUTON FERMER */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 p-2 text-gray-400 hover:text-secondary transition-colors rounded-full bg-white"
            >
              <Icon icon="carbon:close" width="32" />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* --- COLONNE GAUCHE : IMAGE --- */}
              <div className="w-full lg:w-3/5 bg-gray-50 flex flex-col">
                <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px]">
                  <img
                    src={product.image_url}
                    alt={product.label}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* Badge Catégorie flottant */}
                  <div className="absolute top-6 left-6">
                    {product.product?.category?.logo_url ? (
                      <div className="bg-white/90 backdrop-blur p-2 shadow-sm">
                        <img
                          src={product.product.category.logo_url}
                          className="h-6 w-auto"
                          alt="logo"
                        />
                      </div>
                    ) : (
                      <span className="bg-white/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                        {product.product?.category?.label}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-gray-100/50">
                  <p className="text-[10px] text-gray-500 italic text-center uppercase tracking-tighter">
                    Visuel non contractuel : les nuances et veinages varient
                    selon la tranche.
                  </p>
                </div>
              </div>

              {/* --- COLONNE DROITE : INFOS --- */}
              <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-or font-bold">
                      Collection
                    </span>
                    {product.eco == 1 && (
                      <Icon
                        icon="mdi:ecology"
                        className="text-green-600"
                        width="18"
                      />
                    )}
                  </div>
                  <DialogTitle
                    as="h3"
                    className="text-3xl font-light text-secondary uppercase tracking-tight"
                  >
                    {product.label}
                  </DialogTitle>
                </div>

                {/* Grille de caractéristiques */}
                <div className="space-y-6 flex-grow">
                  {/* Matière Type */}
                  <div className="flex items-start gap-4">
                    <Icon
                      icon="arcticons:rocksndiamonds"
                      width="20"
                      className="text-gray-400 mt-1"
                    />
                    <div>
                      <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">
                        Matière
                      </p>
                      <span className="text-sm font-medium">
                        {product.product?.category?.parent?.label ||
                          "Naturelle"}
                      </span>
                    </div>
                  </div>

                  {/* Finitions */}
                  <div className="flex items-start gap-4">
                    <Icon
                      icon="solar:sticker-square-outline"
                      width="20"
                      className="text-gray-400 mt-1"
                    />
                    <div>
                      <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">
                        Finitions disponibles
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {product?.finitions.map((item) => (
                          <span
                            key={item.id}
                            className="text-[11px] bg-secondary/5 px-2 py-1 text-secondary border border-secondary/10 uppercase"
                          >
                            {item.finition.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Épaisseurs */}
                  <div className="flex items-start gap-4">
                    <Icon
                      icon="solar:ruler-angular-outline"
                      width="20"
                      className="text-gray-400 mt-1"
                    />
                    <div>
                      <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">
                        Épaisseurs
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {product?.thiknesses.map((item) => (
                          <span
                            key={item.id}
                            className="text-[11px] font-bold text-secondary"
                          >
                            {item.thikness_plan.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Origine & Motif */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">
                        Motif
                      </p>
                      <span className="text-xs">
                        {product.motif || "Veiné"}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">
                        Origine
                      </p>
                      <span className="text-xs">
                        {product.origine || "Italie"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Modale : Action */}
                <div className="mt-12 space-y-4">
                  <button
                    onClick={handleNavigate}
                    className="w-full bg-secondary text-white py-4 text-xs uppercase tracking-[0.2em] hover:bg-secondary/90 transition-all font-bold"
                  >
                    Consulter la fiche complète
                  </button>

                  {product.product.category.waranty && (
                    <div className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-100">
                      <img
                        src={product.product.category.waranty.imageSrc}
                        className="h-8 w-auto grayscale"
                        alt="Garantie"
                      />
                      <p className="text-[9px] leading-tight text-gray-500 uppercase">
                        Produit certifié avec garantie constructeur incluse.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
