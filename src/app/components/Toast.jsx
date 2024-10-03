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
        return "bg-green-600 text-white";
      case "error":
        return "bg-red-600 text-white";
      case "warning":
        return "bg-yellow-600 text-black";
      case "info":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <div
      className={`${getColor()} fixed top-5 right-5 px-4 py-2 rounded shadow-lg flex items-center justify-between space-x-2 z-50 transition-all duration-500 ease-in-out transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <p>{message}</p>
      <button onClick={() => setIsVisible(false)} className="font-bold ml-4">
        X
      </button>
    </div>
  );
};

export default Toast;
