"use client";
import Button from "@/app/components/Button";
import Loader from "@/app/components/loader/Loader";
import MainMenu from "@/app/components/MainMenu";
import PageTitle from "@/app/components/PageTitle";
import ProductCard from "@/app/components/product/card";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function Page() {
  const [load, setLoad] = useState(false);
  const [categories, setCategories] = useState([]);

  const colors = [
    "Blanc",
    "Beige",
    "Marron",
    "Gris",
    "Noir",
    "Bleu",
    "Vert",
    "Rose",
    "Rouge",
    "Orange",
    "Argent",
    "Or",
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

        console.log(groupedData);
        setCategories(groupedData);
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
      <div>
        <div className="mx-12 block lg:hidden">
          <Button text="Filtres" color="or" size="small" icon="check" />
        </div>
        <div className="flex">
          <div className="border p-4 shadow-lg rounded-xl bg-white m-2 w-72 hidden lg:block">
            <div>
              <fieldset>
                <legend className="border-b border-or w-full mb-2">
                  Matières
                </legend>
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
                          aria-describedby={color}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label htmlFor={index} className="font-medium">
                          {color}
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
            {categories?.map((category) => (
              <div key={category.id} className="mb-4">
                <h4 className="text-xl font-bold mb-2">{category.label}</h4>
                {category?.children?.map((child) => (
                  <div key={child.id} className="mb-6">
                    <h5 className="text-lg font-semibold mb-2">
                      {child.label}
                    </h5>
                    <div className="flex flex-wrap items-stretch">
                      {child?.products?.map((product, index) => {
                        const animationDelay = `${index * 0.075}s`; // Délai de 75ms entre chaque produit
                        return (
                          <ProductCard
                            product={product}
                            animationDelay={animationDelay}
                            key={product.id}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
