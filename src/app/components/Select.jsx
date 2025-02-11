"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

const Select = ({ icon, id, options, placeholder, onSelectChange, className, error }) => {
  const [selected, setSelected] = useState("");

  // Gérer le changement de la valeur sélectionnée
  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelected(newValue); // Met à jour l'état local
    onSelectChange(newValue); // Transmet la nouvelle valeur au parent
  };

  return (
    <div className={clsx("relative inline-block m-1", className)}>
      <select
        name={id}
        id={id}
        value={selected} // Liaison de la valeur
        onChange={handleChange} // Gestionnaire de changement
        className={`border border-gray-300 rounded-full px-4 py-2 text-sm w-full focus:outline-none shadow-sm transition duration-300 ease-in-out 
            ${selected ? "text-gray-900" : "text-gray-400"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon
        icon={icon}
        width="30"
        height="30"
        className="absolute transform -translate-y-1/2 top-1/2 right-1 text-gray-300 hover:text-or transition-colors duration-200 ease-in-out"
      />
    </div>
  );
};

export default Select;
