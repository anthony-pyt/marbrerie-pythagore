"use client";

import Button from "./../../components/Button";
import MainMenu from "./../../components/MainMenu";
import PageTitle from "./../../components/PageTitle";
import ProductCard from "./../../components/product/card";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function Page() {
  const [load, setLoad] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]); // Par défaut, aucune couleur sélectionnée
  const [selectedCategories, setSelectedCategories] = useState([]); // Par défaut, toutes les catégories sélectionnées

  const colors = [
    { name: "Blanc", hex: "#FFFFFF" },
    { name: "Beige", hex: "#F5F5DC" },
    { name: "Marron", hex: "#8B4513" },
    { name: "Gris", hex: "#808080" },
    { name: "Noir", hex: "#000000" },
    { name: "Bleu", hex: "#0000FF" },
    { name: "Vert", hex: "#008000" },
    { name: "Rose", hex: "#FFC0CB" },
    { name: "Rouge", hex: "#FF0000" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Argent", hex: "#C0C0C0" },
    { name: "Or", hex: "#FFD700" },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      setLoad(true);
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/stock/products_only_matieres"
        );
        const resultat = await response.json();
        // Filtrer les produits qui ont la colonne `heart` égale à 1
        const filteredProducts = resultat.filter(
          (product) => product.heart === 1
        );
        setProducts(filteredProducts);

        const categories = await fetch(process.env.NEXT_PUBLIC_API_URL + "/stock/categories-with-parent-matieres") ;
        const resultatCategories = await categories.json()
        console.log(resultatCategories);
        
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoad(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={"Catalogue"} />
      <div className="mt-2">
        <div className="lg:hidden flex justify-end mx-2">
          <Button text="Filtres" color="or" size="small" icon="check" />
        </div>
        <div className="flex">
          <div className="border p-4 shadow-lg rounded-xl bg-white m-2 w-72 hidden lg:block">
            <div className="mb-12">
              <label htmlFor="account-number" className="sr-only">
                Recherche
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  id="account-number"
                  name="account-number"
                  type="search"
                  placeholder="Ex: sirius, zimbabwe"
                  className="block w-full rounded-md border-0 p-1.5 pl-8 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
                  <Icon
                    icon="f7:search-circle-fill"
                    width="24"
                    height="24"
                    className="text-secondary"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="my-4">
                <fieldset>
                  <legend className="border-b border-or w-full mb-2">
                    Filtres
                  </legend>
                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        name={"coup_de_coeur"}
                        type="checkbox"
                        aria-describedby={"coup de coeur"}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={() => console.log("click")}
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label
                        htmlFor={"coup_de_coeur"}
                        className="font-medium flex space-x-1 items-center"
                      >
                        <span>Coup de coeur </span>
                        <Icon
                          icon="solar:heart-angle-bold"
                          width="20"
                          height="20"
                          style={{ color: "#ff0000" }}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        name={"eco_responsable"}
                        type="checkbox"
                        aria-describedby={"coup de coeur"}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={() => console.log("click")}
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label
                        htmlFor={"eco_responsable"}
                        className="font-medium flex space-x-1 items-center"
                      >
                        <span>Eco responsable </span>
                        <Icon
                          icon="ion:leaf"
                          width="20"
                          height="20"
                          style={{ color: "#2a8339" }}
                        />
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="my-4">
                <fieldset>
                  <legend className="border-b border-or w-full mb-2">
                    Matières
                  </legend>
                  {load && (
                    <div className="flex flex-col items-center">
                      <Icon
                        icon="ph:spinner-gap"
                        className="w-6 h-6 animate-spin"
                      />
                    </div>
                  )}
                  {/* {categories?.map((category) => (
                    <div className="space-y-5" key={category.id}>
                      <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                          <input
                            id={category.id}
                            name={category.id}
                            type="checkbox"
                            aria-describedby={category.label}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => handleCategoryChange(category.id)}
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label htmlFor={category.id} className="font-medium">
                            {category.label}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))} */}
                </fieldset>
              </div>
              <div className="my-4">
                <fieldset>
                  <legend className="border-b border-or w-full mb-2">
                    Epaisseurs
                  </legend>
                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        name={"2cm"}
                        type="checkbox"
                        aria-describedby={"coup de coeur"}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={() => console.log("click")}
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label
                        htmlFor={"2cm"}
                        className="font-medium flex space-x-1 items-center"
                      >
                        <span>2cm </span>
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="my-4">
                <fieldset>
                  <legend className="border-b border-or w-full mb-2">
                    Finitions
                  </legend>
                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        name={"Adoucie"}
                        type="checkbox"
                        aria-describedby={"coup de coeur"}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={() => console.log("click")}
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label
                        htmlFor={"Adoucie"}
                        className="font-medium flex space-x-1 items-center"
                      >
                        <span>Adoucie</span>
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="my-4">
                <fieldset>
                  <legend className="border-b border-or w-full mb-2">
                    Motifs
                  </legend>
                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        name={"Uni"}
                        type="checkbox"
                        aria-describedby={"coup de coeur"}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={() => console.log("click")}
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label
                        htmlFor={"Uni"}
                        className="font-medium flex space-x-1 items-center"
                      >
                        <span>Uni</span>
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="my-4">
                <fieldset className="mt-3">
                  <legend className="border-b border-or w-full mb-2">
                    Couleurs
                  </legend>
                  {colors?.map((color, index) => (
                    <div className="space-y-5" key={index}>
                      <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                          <input
                            id={index}
                            name={index}
                            type="checkbox"
                            aria-describedby={color.name}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            checked={selectedColors.includes(color.hex)}
                            onChange={() => handleColorChange(color.hex)}
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label htmlFor={index} className="font-medium">
                            {color.name}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </fieldset>
              </div>
            </div>
          </div>
          <div className="w-full bg-white p-4 rounded-xl shadow-lg border m-2 min-h-screen">
            {load && (
              <div className="mt-28 flex flex-col items-center">
                <div className="h-32 overflow-hidden flex justify-center items-center">
                  <img
                    src="/images/loaders/loader-pythagore.gif"
                    className="h-40"
                  />
                </div>
                <p>Chargement des données...</p>
              </div>
            )}
            {products.length > 0 ? (
              products.length > 0 ? (
                <div className="flex flex-wrap justify-center md:justify-normal items-stretch">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p>Aucun produit disponible</p>
              )
            ) : (
              !load && (
                <div className="flex justify-center items-center mt-28">
                  <p className="text-gray-500">
                    Aucun produit ne correspond aux filtres.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
