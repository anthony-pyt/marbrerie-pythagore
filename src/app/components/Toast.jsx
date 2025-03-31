import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Affiche le toast dès que le composant est monté
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false); // Cache le toast après la durée
      setTimeout(onClose, 500); // Attendre la fin de l'animation de sortie
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border rounded-xl border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border rounded-xl border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border rounded-xl border-yellow-200 text-yellow-800";
      case "info":
        return "bg-blue-50 border rounded-xl border-blue-200 text-blue-800";
      default:
        return "bg-gray-50 border rounded-xl border-gray-200 text-gray-800";
    }
  };

  return (
    <div
      className={`${getColor()} fixed bottom-5 right-5 py-8 px-12 rounded shadow-lg flex items-center justify-between space-x-2 z-50 transition-all duration-500 ease-in-out transform 
      ${ isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0" }
      `}
    >
      <p>{message}</p>
      <button onClick={() => setIsVisible(false)} className="font-bold ml-4 absolute top-1 right-1">
        <Icon icon="mdi:close" width="16" height="16" />
      </button>
    </div>
  );
};

export default Toast;
