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
            className="relative transform overflow-hidden rounded-xl bg-white w-full md:w-auto shadow-xl p-8 flex flex-col md:flex-row md:space-x-6 xl:space-x-12"
          >
            <div className="rounded-lg overflow-hidden flex flex-col items-center">
              <img
                src={product.image_url}
                loading="lazy"
                alt={product.label}
                className="object-cover h-72 w-72 rounded-lg"
              />
              <div className="flex items-center justify-between w-full mt-2">
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
              </div>
            </div>

            <div className="mt-3 text-center lg:text-left sm:mt-5 flex flex-col justify-between">
              <div>
                <DialogTitle
                  as="h3"
                  className="font-semibold text-2xl flex items-center space-x-4"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{product.label}</span>
                    {/* <Button
                      text="Voir la page"
                      size="small"
                      onClick={() => handleNavigate(product)}
                    /> */}
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
                <div className="absolute top-1 right-1 m-2">
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
                  <Icon icon="fluent:color-24-regular" width="18" height="18" />
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
                <div className="flex flex-wrap items-center space-x-1 text-xs m-3">
                  <Icon
                    icon="arcticons:rocksndiamonds"
                    width="18"
                    height="18"
                  />
                  <div className="bg-primary/25 px-2 py-0.5 rounded">
                    <span className="text-secondary">
                      {product.type_materiau ?? "Non spécifié"}
                    </span>
                  </div>
                </div>
              </div>
              {/* GARANTIE */}
              {product.product.category.waranty && (
                <div className="flex flex-col lg:flex-row items-center w-72 flex-shrink justify-center mt-12">
                  <div className="flex justify-end">
                    <img
                      src={`${product.product.category.waranty.image_url}`}
                      loading="lazy"
                      alt={product.product.category.waranty.title}
                      className="object-cover min-w-24 max-w-24 rounded-full p-4 bg-white"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <h6>Garantie</h6>
                    <p className="text-left text-xs">
                      {product.product.category.waranty.description}
                    </p>
                  </div>
                </div>
              )}
              {/* <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Eius aliquam laudantium explicabo pariatur iste dolorem
                    animi vitae error totam. At sapiente aliquam accusamus
                    facere veritatis.
                  </p>
                </div> */}
            </div>
            {/* <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
              >
                Deactivate
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              >
                Cancel
              </button>
            </div> */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
