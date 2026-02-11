"use client";
import clsx from "clsx";
import { useState } from "react";
const Textarea = ({ id, placeholder, onInputChange, className }) => {

  const [value, setValue] = useState("");

  // Gérer le changement de la valeur du textarea
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue); // Met à jour l'état local
    onInputChange(newValue); // Transmet la nouvelle valeur au parent
  };

  return (
    <div className={clsx([className, "relative inline-block w-full"])}>
      <textarea
        name={id}
        id={id}
        value={value} // Liaison de la valeur
        onChange={handleChange} // Gestionnaire de changement
        className="border border-gray-300 px-4 py-2 text-sm w-full h-full focus:outline-none shadow-sm transition duration-300 ease-in-out resize-none"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Textarea;
