"use client";

import Button from "./../../components/Button";
import MainMenu from "./../../components/MainMenu";
import PageTitle from "./../../components/PageTitle";
import ProductCard from "./../../components/product/card";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Filter from "./../../components/catalogue/Filter";

export default function Page() {
  const [loadProducts, setLoadProducts] = useState(true);
  const [loadCategories, setLoadCategories] = useState(true);
  const [loadThiknesses, setLoadThiknesses] = useState(true);
  const [loadFinitions, setLoadFinitions] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [thiknesses, setThiknesses] = useState([]);
  const [finitions, setFinitions] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedThiknesses, setSelectedThiknesses] = useState([]);
  const [selectedFinitions, setSelectedFinitions] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    coupDeCoeur: false,
    ecoResponsable: false,
  });
  const [filters, setFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    const fetchData = async () => {
      setLoadProducts(true);
      setLoadCategories(true);
      setLoadThiknesses(true);
      setLoadFinitions(true);

      try {
        const [
          productResponse,
          categoryResponse,
          thiknessResponse,
          finitionsResponse,
        ] = await Promise.all([
          fetch(
            process.env.NEXT_PUBLIC_API_URL + "/stock/products_only_matieres"
          ),
          fetch(
            process.env.NEXT_PUBLIC_API_URL +
              "/stock/categories-with-parent-matieres"
          ),
          fetch(process.env.NEXT_PUBLIC_API_URL + "/thiknesses"),
          fetch(process.env.NEXT_PUBLIC_API_URL + "/finitions"),
        ]);

        const products = await productResponse.json();
        const categories = await categoryResponse.json();
        const thiknesses = await thiknessResponse.json();
        const finitions = await finitionsResponse.json();

        setProducts(products);
        setCategories(categories);
        setThiknesses(thiknesses);
        setFinitions(finitions);

        //ajout du filtre 'coup de coeur'
        handleFilterChange("coupDeCoeur", "Coup de cœur", "solar:heart-bold");
      } catch (error) {
        console.error(error);
      } finally {
        setLoadProducts(false);
        setLoadCategories(false);
        setLoadThiknesses(false);
        setLoadFinitions(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    const isCategorySelected = selectedCategories.includes(category.id);

    // Met à jour les catégories sélectionnées
    const updatedCategories = isCategorySelected
      ? [] // Si la catégorie est déjà sélectionnée, vide la liste
      : [category.id]; // Sinon, remplace la liste par la nouvelle catégorie

    setSelectedCategories(updatedCategories);

    // Met à jour les filtres
    const updatedFilters = isCategorySelected
      ? filters.filter((filter) => filter.type !== "matieres") // Retire le filtre existant si la catégorie est désélectionnée
      : [
          ...filters.filter((filter) => filter.type !== "matieres"), // Enlève les filtres existants avec le même label
          {
            type: "matieres",
            text: category.label,
            icon: null,
          },
        ];

    setFilters(updatedFilters);
  };

  const handleThiknessChange = (thiknessId) => {
    if (selectedThiknesses.includes(thiknessId)) {
      setSelectedThiknesses(
        selectedThiknesses.filter((id) => id !== thiknessId)
      );
    } else {
      setSelectedThiknesses([...selectedThiknesses, thiknessId]);
    }
  };

  const handleFinitionChange = (finitionId) => {
    if (selectedFinitions.includes(finitionId)) {
      setSelectedFinitions(selectedFinitions.filter((id) => id !== finitionId));
    } else {
      setSelectedFinitions([...selectedFinitions, finitionId]);
    }
  };

  const handleFilterChange = (filterName, filterText, filterIcon) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
    setFilters((prevFilters) => {
      // Retire le filtre existant si déjà présent
      const updatedFilters = prevFilters.filter(
        (filter) => filter.text !== filterText
      );

      // Ajoute ou retire le filtre selon l'état du checkbox
      if (prevFilters.some((filter) => filter.text === filterText)) {
        return updatedFilters;
      } else {
        return [
          ...updatedFilters,
          {
            type: "filter",
            text: filterText,
            icon: filterIcon,
          },
        ];
      }
    });
    
  };

useEffect(() => {
  console.log(filters);
  
}, [filters])

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm =
      searchTerm.length > 2
        ? product.label.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

    const matchesCategory =
      selectedCategories.length > 0
        ? selectedCategories.includes(product.category.parent.id) ||
          selectedCategories.includes(product.category.id)
        : true;

    const matchesThikness =
      selectedThiknesses.length > 0
        ? selectedThiknesses.every((selectedThikness) =>
            product.thiknesses.some(
              (thikness) => thikness.thikness_plan.id === selectedThikness
            )
          )
        : true;

    const matchesFinition =
      selectedFinitions.length > 0
        ? product.finitions.some((finition) =>
            selectedFinitions.includes(finition.finition_id)
          )
        : true;

    const matchesCoupDeCoeur = selectedFilters.coupDeCoeur
      ? product.heart === 1
      : true;

    const matchesEcoResponsable = selectedFilters.ecoResponsable
      ? product.eco === 1
      : true;

    return (
      matchesSearchTerm &&
      matchesCategory &&
      matchesThikness &&
      matchesFinition &&
      matchesCoupDeCoeur &&
      matchesEcoResponsable
    );
  });

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
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                        id={"coup_de_coeur"}
                        name={"coup_de_coeur"}
                        type="checkbox"
                        aria-describedby={"coup de cœur"}
                        checked={selectedFilters.coupDeCoeur}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={() =>
                          handleFilterChange(
                            "coupDeCoeur",
                            "Coup de cœur",
                            "solar:heart-bold"
                          )
                        }
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label
                        htmlFor={"coup_de_coeur"}
                        className="font-medium flex space-x-1 items-center"
                      >
                        <span>Coup de cœur</span>
                        <Icon
                          icon="solar:heart-bold"
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
                        id={"eco_responsable"}
                        name={"Eco responsable"}
                        type="checkbox"
                        aria-describedby={"eco responsable"}
                        checked={selectedFilters.ecoResponsable}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={() =>
                          handleFilterChange(
                            "ecoResponsable",
                            "Eco responsable",
                            "mdi:ecology"
                          )
                        }
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label
                        htmlFor={"eco_responsable"}
                        className="font-medium flex space-x-1 items-center"
                      >
                        <span>Eco responsable </span>
                        <Icon
                          icon="mdi:ecology"
                          width="20"
                          height="20"
                          className="text-green-600"
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
                  {loadCategories && (
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
                            onChange={() => handleCategoryChange(category)}
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label
                            htmlFor={category.id}
                            className="font-medium lo"
                          >
                            {category.label}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </fieldset>
              </div>
              <div className="my-4">
                <fieldset>
                  <legend className="border-b border-or w-full mb-2">
                    Epaisseurs
                  </legend>
                  {loadThiknesses && (
                    <div className="flex flex-col items-center">
                      <Icon
                        icon="ph:spinner-gap"
                        className="w-6 h-6 animate-spin"
                      />
                    </div>
                  )}
                  {thiknesses?.map((thikness) => {
                    return (
                      <div
                        className="relative flex items-start"
                        key={thikness.id}
                      >
                        <div className="flex h-6 items-center">
                          <input
                            name={thikness.label}
                            id={thikness.label}
                            type="checkbox"
                            aria-describedby={"coup de coeur"}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            onChange={() => handleThiknessChange(thikness.id)}
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label
                            htmlFor={thikness.label}
                            className="font-medium flex space-x-1 items-center"
                          >
                            <span className="lowercase">{thikness.label}</span>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </fieldset>
              </div>
              <div className="my-4">
                <fieldset>
                  <legend className="border-b border-or w-full mb-2">
                    Finitions
                  </legend>
                  {loadFinitions && (
                    <div className="flex flex-col items-center">
                      <Icon
                        icon="ph:spinner-gap"
                        className="w-6 h-6 animate-spin"
                      />
                    </div>
                  )}
                  {finitions?.map((finition) => {
                    return (
                      <div
                        className="relative flex items-start"
                        key={finition.id}
                      >
                        <div className="flex h-6 items-center">
                          <input
                            name={finition.label}
                            id={finition.label}
                            type="checkbox"
                            aria-describedby={finition.label}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            onChange={() => handleFinitionChange(finition.id)}
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label
                            htmlFor={finition.label}
                            className="font-medium flex space-x-1 items-center"
                          >
                            <span className="lowercase">{finition.label}</span>
                          </label>
                        </div>
                      </div>
                    );
                  })}
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
                        id={"Uni"}
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
            {loadProducts && (
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
            <div className="flex items-center space-x-2">
              {filters?.map((filter, index) => {
                return <Filter text={filter.text} icon={filter.icon} key={index}/>;
              })}
            </div>
            <div>
              {filteredProducts.length > 0 ? (
                filteredProducts.length > 0 ? (
                  <div className="flex flex-wrap justify-center md:justify-normal items-stretch">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <p>Aucun produit disponible</p>
                )
              ) : (
                !loadProducts && (
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
      </div>
    </main>
  );
}
