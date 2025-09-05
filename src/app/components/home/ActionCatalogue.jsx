"use client";

import { useEffect, useRef, useState } from "react";

const ActionCatalogue = () => {

  return (
    <div
      className={`bg-secondary py-8 overflow-hidden animate__animated group`}
    >
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <a
            href="/matieres/nos-produits"
            className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 ring-1 ring-white/10 sm:rounded-3xl p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center"
          >
            <img
              alt=""
              src="/images/mockup_catalogue_2.jpg"
              className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
            />
            <div className="w-full flex-auto">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Découvrez nos produits
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Tous nos produits disponibles dans un seul et même endroit !
              </p>
              <div className="mt-10 flex justify-end mx-12">
                <div className="text-sm font-semibold leading-6 text-or-light flex">
                  Je vais le consulter{" "}
                  <div
                    aria-hidden="true"
                    className="group-hover:translate-x-4 transform duration-300 ml-2"
                  >
                    &rarr;
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
            className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-gray-500 to-gray-800 opacity-25"
          />
        </div>
      </div>
    </div>
  );
};

export default ActionCatalogue;
