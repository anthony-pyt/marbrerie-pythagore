"use client";

import Button from "../../components/Button";
import MainMenu from "../../components/MainMenu";
import Footer from "../../components/Footer";
import PageTitle from "../../components/PageTitle";
import ProductCard from "../../components/product/ProductCard";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Filter from "../../components/catalogue/Filter";
import FiltersMenu from "./../../components/catalogue/FilterMenus";
import axios from "axios";
import { colors, motifs } from "../../datas/filters";

export default function Page() {
  const [loadProducts, setLoadProducts] = useState(true);
  const [loadCategories, setLoadCategories] = useState(true);
  const [loadThiknesses, setLoadThiknesses] = useState(true);
  const [loadFinitions, setLoadFinitions] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [thiknesses, setThiknesses] = useState([]);
  const [finitions, setFinitions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMotifs, setSelectedMotifs] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedThiknesses, setSelectedThiknesses] = useState([]);
  const [selectedFinitions, setSelectedFinitions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState({
    coupDeCoeur: false,
    produitDurable: false,
  });
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [filters, setFilters] = useState([
    // { type: "filter", text: "Coup de cœur", icon: "solar:heart-bold" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filterParams = {
    categories: selectedCategories,
    thiknesses: selectedThiknesses,
    finitions: selectedFinitions,
    motifs: selectedMotifs,
    colors: selectedColors,
    coupDeCoeur: selectedFilters.coupDeCoeur,
    produitDurable: selectedFilters.produitDurable,
    searchTerm: searchTerm,
    page: currentPage,
    limit: 50,
  };

  const queryParams = new URLSearchParams(filterParams).toString();

  const fetchData = async () => {
    setLoadProducts(true);
    setLoadCategories(true);
    setLoadThiknesses(true);
    setLoadFinitions(true);

    try {
      const [categoryResponse, thiknessResponse, finitionsResponse] =
        await Promise.all([
          fetch(
            process.env.NEXT_PUBLIC_API_STOCK_URL +
              "/stock/categories-with-parent-matieres"
          ),
          fetch(process.env.NEXT_PUBLIC_API_STOCK_URL + "/thiknesses"),
          fetch(process.env.NEXT_PUBLIC_API_STOCK_URL + "/finitions"),
        ]);

      const categories = await categoryResponse.json();
      const thiknesses = await thiknessResponse.json();
      const finitions = await finitionsResponse.json();

      setCategories(categories);
      setThiknesses(thiknesses);
      setFinitions(finitions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadCategories(false);
      setLoadThiknesses(false);
      setLoadFinitions(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoadProducts(true);
      const productsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_STOCK_URL}/stock/products_only_matieres?${queryParams}`
      );
      setTotalProducts(productsResponse.data.total);
      setTotalPages(productsResponse.data.last_page);
      setProducts(productsResponse.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadProducts(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [
    selectedCategories,
    selectedMotifs,
    selectedColors,
    selectedThiknesses,
    selectedFinitions,
    selectedFilters,
    searchTerm,
    currentPage,
  ]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  const handleCategoryChange = (category, isParent) => {
    setCurrentPage(1);

    const isCategorySelected = selectedCategories.includes(category.id);

    let updatedCategories;
    let updatedFilters;

    if (isCategorySelected) {
      // Supprime la catégorie et ses enfants s'ils sont sélectionnés
      updatedCategories = selectedCategories.filter(
        (id) =>
          id !== category.id &&
          !category.children?.some((child) => child.id === id)
      );

      updatedFilters = filters.filter(
        (filter) =>
          filter.type !== "matieres" ||
          (filter.text !== category.label &&
            !category.children?.some((child) => child.label === filter.text))
      );
    } else {
      // Ajoute la catégorie et ses enfants (si isParent est true)
      const categoryIds = [
        category.id,
        ...(category.children?.map((child) => child.id) || []),
      ];
      updatedCategories = [...selectedCategories, ...categoryIds];

      const newFilters = [
        {
          type: "matieres",
          text: category.label,
          icon: null,
        },
        ...(category.children?.map((child) => ({
          type: "matieres",
          text: child.label,
          icon: null,
        })) || []),
      ];

      updatedFilters = [...filters, ...newFilters];
    }

    setSelectedCategories(updatedCategories);
    setFilters(updatedFilters);
  };

  const handleThiknessChange = (thikness) => {
    setCurrentPage(1);

    if (selectedThiknesses.includes(thikness.id)) {
      setSelectedThiknesses(
        selectedThiknesses.filter((id) => id !== thikness.id)
      );
    } else {
      setSelectedThiknesses([...selectedThiknesses, thikness.id]);
    }

    setFilters((prevFilters) => {
      const updatedFilters = prevFilters.filter(
        (filter) => filter.text !== thikness.label
      );

      if (prevFilters.some((filter) => filter.text === thikness.label)) {
        return updatedFilters;
      } else {
        return [
          ...updatedFilters,
          {
            type: "thikness",
            text: thikness.label,
            icon: null,
          },
        ];
      }
    });
  };

  const handleFinitionChange = (finition) => {
    setCurrentPage(1);

    if (selectedFinitions.includes(finition.id)) {
      setSelectedFinitions(
        selectedFinitions.filter((id) => id !== finition.id)
      );
    } else {
      setSelectedFinitions([...selectedFinitions, finition.id]);
    }

    setFilters((prevFilters) => {
      // Retire le filtre existant si déjà présent
      const updatedFilters = prevFilters.filter(
        (filter) => filter.text !== finition.label
      );

      // Ajoute ou retire le filtre selon l'état du checkbox
      if (prevFilters.some((filter) => filter.text === finition.label)) {
        return updatedFilters;
      } else {
        return [
          ...updatedFilters,
          {
            type: "finition",
            text: finition.label,
            icon: null,
          },
        ];
      }
    });
  };

  const handleMotifChange = (motif) => {
    setCurrentPage(1);

    if (selectedMotifs.includes(motif.slug)) {
      setSelectedMotifs(selectedMotifs.filter((name) => name !== motif.slug));
    } else {
      setSelectedMotifs([...selectedMotifs, motif.slug]);
    }

    setFilters((prevFilters) => {
      // Retire le filtre existant si déjà présent
      const updatedFilters = prevFilters.filter(
        (filter) => filter.text !== motif.name
      );

      // Ajoute ou retire le filtre selon l'état du checkbox
      if (prevFilters.some((filter) => filter.text === motif.name)) {
        return updatedFilters;
      } else {
        return [
          ...updatedFilters,
          {
            type: "motif",
            text: motif.name,
            icon: null,
          },
        ];
      }
    });
  };

  const handleColorChange = (color) => {
    setCurrentPage(1);

    if (selectedColors.includes(color.name)) {
      setSelectedColors(selectedColors.filter((name) => name !== color.name));
    } else {
      setSelectedColors([...selectedColors, color.name]);
    }

    setFilters((prevFilters) => {
      // Retire le filtre existant si déjà présent
      const updatedFilters = prevFilters.filter(
        (filter) => filter.text !== color.name
      );

      // Ajoute ou retire le filtre selon l'état du checkbox
      if (prevFilters.some((filter) => filter.text === color.name)) {
        return updatedFilters;
      } else {
        return [
          ...updatedFilters,
          {
            type: "color",
            text: color.name,
            icon: null,
          },
        ];
      }
    });
  };

  const handleFilterChange = (filterName, filterText, filterIcon) => {
    setCurrentPage(1);

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

  const filteredProducts = products.filter((external_product) => {
    const matchesSearchTerm =
      searchTerm.length > 2
        ? external_product.label
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        : true;

    const matchesCategory =
      selectedCategories.length > 0
        ? selectedCategories.includes(
            external_product.product.category?.parent?.id
          ) ||
          selectedCategories.includes(external_product.product.category?.id)
        : true;

    const matchesThikness =
      selectedThiknesses.length > 0
        ? selectedThiknesses.every((selectedThikness) =>
            external_product.thiknesses.map(
              (thikness) => thikness.id === selectedThikness
            )
          )
        : true;

    // const matchesFinition =
    //   selectedFinitions.length > 0
    //     ? external_product.finitions.some((finition) =>
    //         selectedFinitions.includes(finition.id)
    //       )
    //     : true;

    const matchesMotif =
      selectedMotifs.length > 0
        ? selectedMotifs.includes(external_product.motif) ||
          selectedMotifs.includes(external_product.motif)
        : true;

    const matchesColor =
      selectedColors.length > 0
        ? external_product.colories.some((color) =>
            selectedColors.includes(color.name)
          )
        : true;

    const matchesCoupDeCoeur = selectedFilters.coupDeCoeur
      ? external_product.heart == 1
      : true;

    const matchesproduitDurable = selectedFilters.produitDurable
      ? external_product.durable == 1
      : true;

    return (
      matchesSearchTerm &&
      matchesCategory &&
      matchesThikness &&
      // matchesFinition &&
      matchesCoupDeCoeur &&
      matchesproduitDurable &&
      matchesColor &&
      matchesMotif
    );
  });

  const removeFilter = (filterToRemove) => {
    setFilters((prevFilters) =>
      prevFilters.filter((filter) => filter.text !== filterToRemove.text)
    );
  };

  const toggleFiltersMenu = () => {
    setOpenMenuMobile(!openMenuMobile);
    console.log(openMenuMobile);
  };

  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={"Nos produits"} />
      <div className="mt-2">
        <div className="lg:hidden flex justify-end mx-2">
          <Button
            text="Filtres"
            color="or"
            size="small"
            icon="check"
            onClick={toggleFiltersMenu}
          />
        </div>
        <div className="flex">
          <div className="p-4 rounded-xl bg-white m-2 min-w-72 hidden lg:block">
            <FiltersMenu
              categories={categories}
              thiknesses={thiknesses}
              finitions={finitions}
              motifs={motifs}
              colors={colors}
              selectedCategories={selectedCategories}
              selectedThiknesses={selectedThiknesses}
              selectedFinitions={selectedFinitions}
              selectedMotifs={selectedMotifs}
              selectedColors={selectedColors}
              handleFilterChange={handleFilterChange}
              handleCategoryChange={handleCategoryChange}
              handleThiknessChange={handleThiknessChange}
              handleFinitionChange={handleFinitionChange}
              handleMotifChange={handleMotifChange}
              handleColorChange={handleColorChange}
              filters={filters}
              setFilters={setFilters}
              removeFilter={removeFilter}
              selectedFilters={selectedFilters}
              loadCategories={loadCategories}
              loadFinitions={loadFinitions}
              loadThiknesses={loadThiknesses}
              setSearchTerm={setSearchTerm}
            />
          </div>
          {openMenuMobile && (
            <div className="lg:hidden fixed inset-0 z-50 bg-primary/50 overflow-auto p-12">
              <div>
                <button
                  className="fixed top-3 right-3"
                  onClick={toggleFiltersMenu}
                >
                  <Icon icon={"carbon:close-outline"} width="42" height="42" />
                </button>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <FiltersMenu
                  categories={categories}
                  thiknesses={thiknesses}
                  finitions={finitions}
                  motifs={motifs}
                  colors={colors}
                  selectedCategories={selectedCategories}
                  selectedThiknesses={selectedThiknesses}
                  selectedFinitions={selectedFinitions}
                  selectedMotifs={selectedMotifs}
                  selectedColors={selectedColors}
                  handleFilterChange={handleFilterChange}
                  handleCategoryChange={handleCategoryChange}
                  handleThiknessChange={handleThiknessChange}
                  handleFinitionChange={handleFinitionChange}
                  handleMotifChange={handleMotifChange}
                  handleColorChange={handleColorChange}
                  filters={filters}
                  setFilters={setFilters}
                  removeFilter={removeFilter}
                  selectedFilters={selectedFilters}
                  loadCategories={loadCategories}
                  loadFinitions={loadFinitions}
                  loadThiknesses={loadThiknesses}
                  setSearchTerm={setSearchTerm}
                />
              </div>
            </div>
          )}
          <div className="w-full bg-white p-4 rounded-xl m-2 min-h-screen">
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
            <div className="flex items-center flex-wrap truncate w-full text-xs">
              {filters?.map((filter, index) => {
                return (
                  <Filter
                    text={filter.text}
                    icon={filter.icon}
                    key={index}
                    onClick={() => console.log(filter)}
                  />
                );
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

            <div className="pagination-controls flex justify-center items-center mt-12">
              <Button
                text={"Précédente"}
                color={"primary"}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Précédent
              </Button>
              <span className="mx-4">
                Page {currentPage} sur {totalPages}
              </span>
              <Button
                text={"Suivante"}
                color="primary"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Suivant
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
