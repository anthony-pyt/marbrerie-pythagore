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
  setSearchTerm
}) => {
  return (
    <div>
      <div className="mb-12">
        <label htmlFor="account-number" className="sr-only">
          Recherche
        </label>
        <div className="relative mt-2 shadow-sm">
          <input
            id="account-number"
            name="account-number"
            type="search"
            placeholder="Ex: sirius, zimbabwe"
            className="block w-full border-0 p-1.5 pl-8 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
            {/* <legend className="border-b border-or w-full mb-2">Filtres</legend> */}
            <div className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id={"coup_de_coeur"}
                  name={"coup_de_coeur"}
                  type="checkbox"
                  aria-describedby={"coup de cœur"}
                  checked={selectedFilters.coupDeCoeur}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
            {/* <div className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id={"eco_responsable"}
                  name={"Produit durable"}
                  type="checkbox"
                  aria-describedby={"Produit durable"}
                  checked={selectedFilters.produitDurable}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  onChange={() =>
                    handleFilterChange(
                      "produitDurable",
                      "Produit durable",
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
                  <span>Produit durable </span>
                  <Icon
                    icon="mdi:ecology"
                    width="20"
                    height="20"
                    className="text-green-600"
                  />
                </label>
              </div>
            </div> */}
          </fieldset>
        </div>
        <div className="my-4">
          <fieldset>
            <legend className="border-b border-or w-full mb-2">Matières</legend>
            {loadCategories && (
              <div className="flex flex-col items-center">
                <Icon icon="ph:spinner-gap" className="w-6 h-6 animate-spin" />
              </div>
            )}
            {categories
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((category) => (
              <div key={category.id}>
                <div className="relative flex items-center my-2">
                  <div className="flex items-center">
                    <input
                      id={category.id}
                      name={category.id}
                      type="checkbox"
                      aria-describedby={category.label}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
            {loadThiknesses && (
              <div className="flex flex-col items-center">
                <Icon icon="ph:spinner-gap" className="w-6 h-6 animate-spin" />
              </div>
            )}
            {thiknesses?.map((thikness) => {
              return (
                <div className="relative flex items-start" key={thikness.id}>
                  <div className="flex h-6 items-center">
                    <input
                      name={thikness.label}
                      id={thikness.label}
                      type="checkbox"
                      aria-describedby={"coup de coeur"}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
                      aria-describedby={finition.label}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
                      aria-describedby={"coup de coeur"}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
                      aria-describedby={color.name}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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

export default FilterMenus