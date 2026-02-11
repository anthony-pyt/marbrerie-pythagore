"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

const Input = ({ icon, type, id, placeholder, onInputChange, className }) => {
  const [value, setValue] = useState("");

  // Gérer le changement de la valeur de l'input
  const handleChange = (e) => {
    const newValue = type != "file" ? e.target.value : e.target.files[0];

    setValue(newValue); // Met à jour l'état local
    onInputChange(newValue); // Transmet la nouvelle valeur au parent
  };

  return (
    <div className={clsx("relative m-1", className)}>
      <input
        type={type}
        name={id}
        id={id}
        {...(type !== "file" ? { value } : {})}
        onChange={handleChange} // Gestionnaire de changement
        className="border border-gray-300 px-4 py-2 text-sm w-full focus:outline-none shadow-sm transition duration-300 ease-in-out"
        placeholder={placeholder}
      />
      <Icon
        icon={icon}
        width="30"
        height="30"
        className="absolute transform -translate-y-1/2 top-1/2 right-2 text-gray-300 hover:text-or transition-colors duration-200 ease-in-out"
      />
    </div>
  );
};

export default Input;
