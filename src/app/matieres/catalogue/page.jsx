"use client";
import Loader from "@/app/components/loader/Loader";
import MainMenu from "@/app/components/MainMenu";
import ProductCard from "@/app/components/product/card";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function Page() {
  const [load, setLoad] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoad(true);
      try {
        const response = await fetch(
          "https://gateway.marbrerie-pythagore.fr/api/stock/products/category-first-parent/362/products"
        );
        const resultat = await response.json();
        setCategories(resultat);
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
      <h2 className="p-4">Catalogue</h2>
      <div>
        <div className="flex">
          <div className="border p-4 shadow-lg rounded-xl bg-white m-2 w-72">
            {categories.length > 0 && (
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
                    Couleur
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
              </div>
            )}
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
                <div className="flex flex-wrap items-stretch">
                  {category?.products.map((product, index) => {
                    const animationDelay = `${index * 0.075}s`; // Délai de 100ms entre chaque produit
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
        </div>
      </div>
    </main>
  );
}
