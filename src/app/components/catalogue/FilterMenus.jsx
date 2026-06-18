import { Icon } from "@iconify/react";
import React from "react";

const FilterMenus = ({
  categories,
  thiknesses,
  finitions,
  motifs,
  colors,
  selectedCategories,
  selectedThiknesses,
  selectedFinitions,
  selectedMotifs,
  selectedColors,
  handleCategoryChange,
  handleThiknessChange,
  handleFinitionChange,
  handleMotifChange,
  handleColorChange,
  filters,
  setFilters,
  removeFilter,
  selectedFilters,
  loadCategories,
  loadFinitions,
  loadThiknesses,
  handleFilterChange,
  setSearchTerm,
}) => {
  if (categories.error) {
    return <div>Aucune catégorie</div>;
  }
  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-secondary pb-8">
        <div className="relative">
          <label htmlFor="search" className="sr-only">
            Recherche
          </label>
          <div className="mt-2 shadow-sm">
            <input
              id="search"
              type="search"
              placeholder="Ex: sirius, zimbabwe"
              className="block w-full border-0 p-1.5 pl-8 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm text-black font-title h-10"
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
      </div>
      <div className="flex-1 overflow-y-auto px-6 custom-scrollbar">
        <div className="mb-6">
          <button
            onClick={() =>
              handleFilterChange(
                "coupDeCoeur",
                "Coup de cœur",
                "solar:heart-bold",
              )
            }
            className={`w-full flex items-center justify-between px-4 py-3 border transition-all duration-300 ${
              selectedFilters.coupDeCoeur
                ? "bg-or/10 border-or text-or"
                : "bg-white border-red-500 text-gray-600 hover:border-red-600"
            }`}
          >
            <span className="font-bold flex items-center gap-2 text-red-500">
              <Icon
                icon="solar:heart-bold"
                width="20"
                height="20"
                className={
                  selectedFilters.coupDeCoeur ? "text-red-500" : "text-gray-400"
                }
              />
              Coup de cœur
            </span>
            {/* Petit indicateur d'état */}
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedFilters.coupDeCoeur ? "border-red-500 bg-red-500" : "border-gray-300"}`}
            >
              {selectedFilters.coupDeCoeur && (
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              )}
            </div>
          </button>
        </div>
        <div className="my-4">
          <fieldset>
            <legend className="border-b border-or w-full mb-2">Matières</legend>
            {categories?.map((category) => (
              <div key={category.id}>
                <div className="relative flex items-center my-2">
                  <div className="flex items-center">
                    <input
                      id={category.id}
                      name={category.id}
                      type="checkbox"
                      aria-describedby={category.label}
                      className="h-4 w-4 border-gray-300 accent-or focus:ring-or"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryChange(category, true)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor={category.id} className="font-medium">
                      {category.label.charAt(0).toUpperCase() +
                        category.label.slice(1).toLowerCase()}
                    </label>
                  </div>
                </div>
                {category.children
                  .sort((a, b) => a.label.localeCompare(b.label)) // Tri alphabétique
                  .map((child) => {
                    return (
                      <div
                        className="relative flex items-start ml-5"
                        key={child.id}
                      >
                        <div className="flex items-center">
                          <input
                            id={child.id}
                            name={child.id}
                            type="checkbox"
                            aria-describedby={child.label}
                            className="h-4 w-4 border-gray-300 accent-or focus:ring-or"
                            checked={selectedCategories.includes(child.id)}
                            onChange={() => handleCategoryChange(child)}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor={child.id} className="font-medium">
                            {child.label.charAt(0).toUpperCase() +
                              child.label.slice(1).toLowerCase()}
                          </label>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ))}
          </fieldset>
        </div>
        <div className="my-4">
          <fieldset>
            <legend className="border-b border-or w-full mb-2">
              Epaisseurs
            </legend>
            {thiknesses?.map((thikness) => {
              return (
                <div className="relative flex items-start" key={thikness.id}>
                  <div className="flex h-6 items-center">
                    <input
                      name={thikness.label}
                      id={thikness.label}
                      type="checkbox"
                      checked={selectedThiknesses.includes(thikness.id)}
                      aria-describedby={"coup de coeur"}
                      className="h-4 w-4 border-gray-300 accent-or focus:ring-or"
                      onChange={() => handleThiknessChange(thikness)}
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
            {finitions?.map((finition) => {
              return (
                <div className="relative flex items-start" key={finition.id}>
                  <div className="flex h-6 items-center">
                    <input
                      name={finition.label}
                      id={finition.label}
                      type="checkbox"
                      checked={selectedFinitions.includes(finition.id)}
                      aria-describedby={finition.label}
                      className="h-4 w-4 border-gray-300 accent-or focus:ring-or"
                      onChange={() => handleFinitionChange(finition)}
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label
                      htmlFor={finition.label}
                      className="font-medium flex space-x-1 items-center"
                    >
                      <span className="">{finition.web_label}</span>
                    </label>
                  </div>
                </div>
              );
            })}
          </fieldset>
        </div>
        <div className="my-4">
          <fieldset>
            <legend className="border-b border-or w-full mb-2">Motifs</legend>
            {motifs.map((motif, index) => {
              return (
                <div className="relative flex items-start" key={index}>
                  <div className="flex h-6 items-center">
                    <input
                      name={motif.name}
                      id={motif.name}
                      type="checkbox"
                      checked={selectedMotifs.includes(motif.slug)}
                      aria-describedby={"coup de coeur"}
                      className="h-4 w-4 border-gray-300 accent-or focus:ring-or"
                      onChange={() => handleMotifChange(motif)}
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label
                      htmlFor={motif.name}
                      className="font-medium flex space-x-1 items-center"
                    >
                      <span>{motif.web_label}</span>
                    </label>
                  </div>
                </div>
              );
            })}
          </fieldset>
        </div>
        <div className="my-4">
          <fieldset className="mt-3">
            <legend className="border-b border-or w-full mb-2">Couleurs</legend>
            {colors.map((color, index) => (
              <div className="space-y-5" key={index}>
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id={index}
                      name={index}
                      type="checkbox"
                      checked={selectedColors.includes(color.name)}
                      aria-describedby={color.name}
                      className="h-4 w-4 border-gray-300 accent-or focus:ring-or"
                      onChange={() => handleColorChange(color)}
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
  );
};

export default FilterMenus;
