"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react";

export function ModalProduct({ setOpen, open, product }) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10 ">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="animate__animated animate__slideInDown animate__faster fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white shadow-xl p-8 flex flex-col lg:flex-row lg:space-x-6 xl:space-x-12"
          >
            <div className="rounded-lg overflow-hidden flex flex-col items-center">
              <img
                src={product.image_url}
                loading="lazy"
                alt={product.label}
                className="object-cover h-72 w-72 rounded-lg"
              />
              <div className="flex items-center justify-between w-full mt-2">
                <img
                  src={product.image_url}
                  loading="lazy"
                  alt={product.label}
                  className="object-cover h-20 w-20 rounded-lg"
                />
                <img
                  src={product.image_url}
                  loading="lazy"
                  alt={product.label}
                  className="object-cover h-20 w-20 rounded-lg"
                />
                <img
                  src={product.image_url}
                  loading="lazy"
                  alt={product.label}
                  className="object-cover h-20 w-20 rounded-lg"
                />
              </div>
            </div>
            <div className="mt-3 text-center lg:text-left sm:mt-5 flex flex-col justify-between">
              <div>
                <DialogTitle as="h3" className="font-semibold text-2xl">
                  {product.label}
                </DialogTitle>
                <div className="absolute top-1 right-1 m-2">
                  {product.category.logo_url != null ? (
                    <img
                      src={product.category.logo_url}
                      className="h-5 p-0.5 bg-white rounded px-2"
                    />
                  ) : (
                    <div className="border border-or inline-block px-2 rounded-full leading-3 bg-white">
                      <span className="text-or text-xs">
                        {product.category.label}
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
                  {product?.finition.map((finition, index) => (
                    <div
                      className="lowercase bg-primary/25 px-2 py-0.5 rounded"
                      key={finition.id}
                    >
                      <span className="text-secondary">{finition.label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center space-x-1 text-xs m-3">
                  <Icon
                    icon="solar:ruler-angular-outline"
                    width="18"
                    height="18"
                  />
                  {product?.thikness.map((thikness, index) => (
                    <div
                      className="lowercase bg-primary/25 px-2 py-0.5 rounded"
                      key={thikness.id}
                    >
                      <span className="text-secondary">{thikness?.label}</span>
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
                  <div className="lowercase bg-primary/25 px-2 py-0.5 rounded">
                    <span className="text-secondary">Uni</span>
                  </div>
                </div>
              </div>
              {/* GARANTIE */}
              <div className="flex flex-col lg:flex-row items-center w-72 flex-shrink justify-center mt-12">
                <div className="flex justify-end">
                  <img
                    src={`/images/garanties/${product.category.label}.png`}
                    loading="lazy"
                    alt={product.label}
                    className="object-cover min-w-16 max-w-16 rounded-lg"
                  />
                </div>
                <div className=" flex flex-col items-start">
                  <h6>Garantie</h6>
                  <p className="text-xs text-left">
                    Nous offrons la garantie sur l’ensemble des matériaux
                    manufacturés et posés par nos équipes ou simplement livrés.
                  </p>
                </div>
              </div>
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
