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

export default function Page() {
  const [loadProducts, setLoadProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [finitions, setFinitions] = useState([]);
  const [thiknesses, setThiknesses] = useState([]);
  const [motifs, setMotifs] = useState([]);
  const [colors, setColors] = useState([]);

  // États des filtres
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedMotifs, setSelectedMotifs] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedThiknesses, setSelectedThiknesses] = useState([]);
  const [selectedFinitions, setSelectedFinitions] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    coupDeCoeur: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filters, setFilters] = useState([]);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [cat, thi, fin, pat, col] = await Promise.all([
          fetch("/api/stock/categories").then((res) => res.json()),
          fetch("/api/stock/thiknesses").then((res) => res.json()),
          fetch("/api/stock/finitions").then((res) => res.json()),
          fetch("/api/stock/patterns").then((res) => res.json()),
          fetch("/api/stock/colors").then((res) => res.json()),
        ]);
        setCategories(cat);
        setThiknesses(thi);
        setFinitions(fin);
        setMotifs(pat);
        setColors(col?.colors || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchMetadata();
  }, []);

  const fetchProducts = async (isReset = false) => {
    // if (loadProducts) return;

    const nextPage = isReset ? 1 : page;
    setLoadProducts(true);

    try {
      const response = await axios.get(`/api/stock/products`, {
        params: {
          categories: selectedCategories.join(","),
          thiknesses: selectedThiknesses.join(","),
          finitions: selectedFinitions.join(","),
          motifs: selectedMotifs.join(","),
          colors: selectedColors.join(","),
          coupDeCoeur: selectedFilters.coupDeCoeur ? "true" : "false",
          searchTerm: searchTerm,
          page: nextPage,
          limit: 20, // Remis à 20 pour correspondre à votre logique de pagination backend
        },
      });

      const newProducts = response.data.data;
      setProducts((prev) =>
        isReset ? newProducts : [...prev, ...newProducts],
      );
      setHasMore(response.data.current_page < response.data.last_page);
      setPage(nextPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadProducts(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadProducts) {
          fetchProducts(false);
        }
      },
      { threshold: 0.1 },
    );

    const target = document.querySelector("#scroll-trigger");
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, loadProducts]);

  useEffect(() => {
    // 1. On vide la liste pour forcer le chargement propre
    setProducts([]);
    setPage(1);
    setHasMore(true);

    // 2. On appelle la fonction de fetch avec le flag isReset=true
    fetchProducts(true);
  }, [
    selectedCategories,
    selectedMotifs,
    selectedColors,
    selectedThiknesses,
    selectedFinitions,
    selectedFilters,
    searchTerm,
  ]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 500);

    return () => {
      clearTimeout(handler); 
    };
  }, [inputValue]);

  const handleCategoryChange = (category, isParent) => {
    const isCategorySelected = selectedCategories.includes(category.id);

    let updatedCategories;
    let updatedFilters;

    if (isCategorySelected) {
      // Supprime la catégorie et ses enfants s'ils sont sélectionnés
      updatedCategories = selectedCategories.filter(
        (id) =>
          id !== category.id &&
          !category.children?.some((child) => child.id === id),
      );

      updatedFilters = filters.filter(
        (filter) =>
          filter.type !== "matieres" ||
          (filter.text !== category.label &&
            !category.children?.some((child) => child.label === filter.text)),
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
          id: category.id,
          icon: null,
        },
        ...(category.children?.map((child) => ({
          type: "matieres",
          text: child.label,
          id: child.id,
          icon: null,
        })) || []),
      ];

      updatedFilters = [...filters, ...newFilters];
    }

    setSelectedCategories(updatedCategories);
    setFilters(updatedFilters);
  };

  const handleThiknessChange = (thikness) => {
    if (selectedThiknesses.includes(thikness.id)) {
      setSelectedThiknesses(
        selectedThiknesses.filter((id) => id !== thikness.id),
      );
    } else {
      setSelectedThiknesses([...selectedThiknesses, thikness.id]);
    }

    setFilters((prevFilters) => {
      const isSelected = selectedThiknesses.includes(thikness.id);
      if (isSelected) {
        return prevFilters.filter((f) => f.text !== thikness.label);
      }
      return [
        ...prevFilters,
        { type: "thikness", text: thikness.label, id: thikness.id }, // Ajout de l'ID ici
      ];
    });
  };

  const handleFinitionChange = (finition) => {
    const isSelected = selectedFinitions.includes(finition.id);

    if (isSelected) {
      setSelectedFinitions((prev) => prev.filter((id) => id !== finition.id));
      setFilters((prev) => prev.filter((f) => f.id !== finition.id)); // Utiliser ID
    } else {
      setSelectedFinitions((prev) => [...prev, finition.id]);
      setFilters((prev) => [
        ...prev,
        { type: "finition", text: finition.label, id: finition.id },
      ]); // Ajouter ID
    }
  };

  const handleMotifChange = (motif) => {
    if (selectedMotifs.includes(motif.slug)) {
      setSelectedMotifs(selectedMotifs.filter((name) => name !== motif.slug));
    } else {
      setSelectedMotifs([...selectedMotifs, motif.slug]);
    }

    setFilters((prevFilters) => {
      const isSelected = selectedMotifs.includes(motif.slug);
      if (isSelected) {
        return prevFilters.filter((f) => f.text !== motif.name);
      }
      return [
        ...prevFilters,
        { type: "motif", text: motif.web_label, slug: motif.slug }, // Ajout du slug
      ];
    });
  };

  const handleColorChange = (color) => {
    const isSelected = selectedColors.includes(color.name);

    if (isSelected) {
      setSelectedColors((prev) => prev.filter((n) => n !== color.name));
      setFilters((prev) => prev.filter((f) => f.text !== color.name));
    } else {
      setSelectedColors((prev) => [...prev, color.name]);
      setFilters((prev) => [...prev, { type: "color", text: color.name }]); // Ici le texte suffit
    }
  };

  const handleFilterChange = (filterName, filterText, filterIcon) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
    setFilters((prevFilters) => {
      const isSelected = selectedFilters[filterName];
      if (isSelected) {
        return prevFilters.filter((f) => f.text !== filterText);
      }
      return [
        ...prevFilters,
        { type: "filter", text: filterText, name: filterName }, // Ajout du nom technique
      ];
    });
  };

  const removeFilter = (filterToRemove) => {
    setFilters((prevFilters) =>
      prevFilters.filter((filter) => filter.text !== filterToRemove.text),
    );
  };

  const toggleFiltersMenu = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  const removeFilterAndUncheck = (filterToRemove) => {
    console.log("Tentative de suppression de :", filterToRemove);
    // 1. Supprimer le tag
    setFilters((prev) => prev.filter((f) => f !== filterToRemove));

    // 2. Synchroniser
    switch (filterToRemove.type) {
      case "matieres":
        setSelectedCategories((prev) =>
          prev.filter((id) => id !== filterToRemove.id),
        );
        break;
      case "thikness":
        setSelectedThiknesses((prev) =>
          prev.filter((id) => id !== filterToRemove.id),
        );
        break;
      case "finition":
        setSelectedFinitions((prev) =>
          prev.filter((id) => id !== filterToRemove.id),
        );
        break;
      case "motif":
        setSelectedMotifs((prev) =>
          prev.filter((slug) => slug !== filterToRemove.slug),
        );
        break;
      case "color":
        setSelectedColors((prev) =>
          prev.filter((name) => name !== filterToRemove.text),
        );
        break;
      case "filter":
        setSelectedFilters((prev) => ({
          ...prev,
          [filterToRemove.name]: false,
        }));
        break;
    }
  };

  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={"Nos produits"} />
      <div className="max-w-[1900px] mx-auto px-4 md:px-8">
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
          <aside className="hidden lg:block w-80 flex-shrink-0 relative">
            <div className="p-1 border border-gray-100 bg-secondary text-white sticky top-20 h-[calc(100vh-8rem)] flex flex-col">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-or font-bold m-6">
                Affiner la recherche
              </h2>
              <div className="overflow-y-auto flex-1">
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
                  setSearchTerm={setInputValue}
                />
              </div>
            </div>
          </aside>
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
              <div className="bg-white p-4">
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
                  setSearchTerm={setInputValue}
                />
              </div>
            </div>
          )}
          <div className="w-full bg-white px-4">
            {/* Zone des tags actifs */}
            {filters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 p-4 bg-primary/50 border border-gray-100">
                {filters.map((filter, index) => (
                  <button
                    key={index}
                    onClick={() => removeFilterAndUncheck(filter)}
                    className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1 text-sm hover:border-or transition rounded-none"
                  >
                    {filter.text}
                    <Icon
                      icon="carbon:close"
                      className="text-gray-400 hover:text-red-500"
                    />
                  </button>
                ))}
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedThiknesses([]);
                    setSelectedFinitions([]);
                    setSelectedMotifs([]);
                    setSelectedColors([]);
                    setSelectedFilters({ coupDeCoeur: false });
                    setFilters([]);
                  }}
                  className="text-sm text-or font-bold underline ml-2 hover:text-orange-600"
                >
                  Tout effacer
                </button>
              </div>
            )}
            {/* Grille unique de produits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard key={`${product.id}-${index}`} product={product} />
              ))}
            </div>

            {/* État vide */}
            {!loadProducts && products.length === 0 && (
              <p className="text-center py-20">
                Aucun produit ne correspond à vos filtres.
              </p>
            )}

            {/* Scroll Trigger */}
            <div id="scroll-trigger" className="h-10 w-full" />

            {loadProducts && (
              <div className="flex justify-center py-6">
                <Icon
                  icon="nrk:spinner"
                  className="animate-spin"
                  width="48"
                  height="48"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
