"use client";

import Button from "@/app/components/Button";
import Loader from "@/app/components/loader/Loader";
import MainMenu from "@/app/components/MainMenu";
import PageTitle from "@/app/components/PageTitle";
import ProductCard from "@/app/components/product/card";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function Page() {
  const [load, setLoad] = useState(true);
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
          "https://gateway.marbrerie-pythagore.fr/api/stock/categories-with-parent-matieres"
        );
        const resultat = await response.json();

        const categoriesArray = Object.keys(resultat).map(
          (key) => resultat[key][0]
        );

        const groupedData = categoriesArray.map((category) => {
          if (category.children && category.children.length > 0) {
            const children = category.children.map((childCategory) => {
              const groupedProducts = {};

              childCategory.products.forEach((product) => {
                const { label, thikness, finition, ...rest } = product;

                if (groupedProducts[label]) {
                  if (
                    thikness &&
                    !groupedProducts[label].thikness.some(
                      (t) => t.label === thikness.label
                    )
                  ) {
                    groupedProducts[label].thikness.push(thikness);
                  }

                  if (
                    finition &&
                    !groupedProducts[label].finition.some(
                      (f) => f.label === finition.label
                    )
                  ) {
                    groupedProducts[label].finition.push(finition);
                  }
                } else {
                  groupedProducts[label] = {
                    label, // On conserve le label du produit
                    ...rest,
                    thikness: thikness ? [thikness] : [],
                    finition: finition ? [finition] : [],
                  };
                }
              });

              return {
                id: childCategory.id,
                label: childCategory.label,
                logo_url: childCategory.logo_url,
                products: Object.values(groupedProducts),
              };
            });

            return {
              id: category.id,
              label: category.label,
              children: children,
            };
          } else {
            return {
              id: category.id,
              label: category.label,
              children: [],
            };
          }
        });

        setCategories(groupedData);

        // Sélectionner toutes les catégories par défaut
        const allCategoryIds = groupedData.map((cat) => cat.id);
        setSelectedCategories(allCategoryIds);
      } catch (error) {
        console.error(error);
      } finally {
        setLoad(false);
      }
    };

    fetchProduct();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleColorChange = (colorHex) => {
    setSelectedColors((prev) =>
      prev.includes(colorHex)
        ? prev.filter((hex) => hex !== colorHex)
        : [...prev, colorHex]
    );
  };

  const filteredCategories = categories
    .filter((category) => selectedCategories.includes(category.id))
    .map((category) => ({
      ...category,
      children: category.children.map((child) => ({
        ...child,
        products: child.products.filter((product) => {
          if (selectedColors.length === 0) return true;
          return selectedColors.some((color) =>
            product.colors?.includes(color)
          );
        }),
      })),
    }));

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
              <label
                htmlFor="account-number"
                className="sr-only"
              >
                Recherche
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  id="account-number"
                  name="account-number"
                  type="text"
                  placeholder="Ex: sirius, zimbabwe"
                  className="block w-full rounded-md border-0 p-1.5 pr-8 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
                  <Icon
                    icon="f7:search-circle-fill"
                    width="24"
                    height="24"
                    style={{ color: 'gray' }}
                  />
                </div>
              </div>
            </div>
            <div>
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
                {categories?.map((category) => (
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
                ))}
              </fieldset>
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
          <div className="w-full bg-white p-4 rounded-xl shadow-lg border m-2 min-h-screen">
            {load && (
              <div className="mt-28 flex flex-col items-center">
                <Icon
                  icon="ph:spinner-gap"
                  className="w-16 h-16 animate-spin"
                />
                <p>Chargement des données...</p>
              </div>
            )}
            {filteredCategories.length > 0
              ? filteredCategories.map((category) => (
                  <div key={category.id} className="mb-4">
                    <h2 className="text-xl font-bold mb-2">{category.label}</h2>
                    {category.children.map((child) => (
                      <div key={child.id} className="mb-4">
                        <h5 className="text-lg font-semibold mb-2">
                          {child.label}
                        </h5>
                        {child.products.length > 0 ? (
                          <div className="flex flex-wrap justify-center md:justify-normal items-stretch">
                            {child.products.map((product) => (
                              <ProductCard key={product.id} product={product} />
                            ))}
                          </div>
                        ) : (
                          <p>
                            Aucun produit disponible pour cette sous-catégorie.
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ))
              : !load && (
                  <div className="flex justify-center items-center mt-28">
                    <p className="text-gray-500">
                      Aucun produit ne correspond aux filtres.
                    </p>
                  </div>
                )}
          </div>
        </div>
      </div>
    </main>
  );
}
