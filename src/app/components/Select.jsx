"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";

const Select = ({ icon, id, options, placeholder, onSelectChange }) => {
  const [selected, setSelected] = useState("");

  // Gérer le changement de la valeur sélectionnée
  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelected(newValue); // Met à jour l'état local
    onSelectChange(newValue); // Transmet la nouvelle valeur au parent
  };

  return (
    <div className="relative inline-block w-80 m-1">
      <select
        name={id}
        id={id}
        value={selected} // Liaison de la valeur
        onChange={handleChange} // Gestionnaire de changement
        className="border border-gray-300 rounded-full px-4 py-2 text-sm w-full focus:outline-none shadow-sm transition duration-300 ease-in-out"
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
