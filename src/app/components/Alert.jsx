import { useEffect } from "react";
import { Icon } from "@iconify/react";

const Alert = ({
  message,
  type = "info",
  duration = 5000,
  onClose,
  isVisible,
}) => {
  useEffect(() => {
    if (isVisible && duration) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getColor = () => {
    switch (type) {
      case "success":
        return "bg-gradient-to-b from-green-100 to-green-50 border-green-50 text-green-700";
      case "error":
        return "bg-gradient-to-b from-red-100 to-red-50 border-red-50 text-red-700";
      case "warning":
        return "bg-gradient-to-b from-yellow-100 to-yellow-50 border-yellow-50 text-yellow-700";
      case "info":
      default:
        return "bg-gradient-to-b from-blue-100 to-blue-50 border-blue-50 text-blue-700";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "mdi:check-circle-outline";
      case "error":
        return "mdi:alert-circle-outline";
      case "warning":
        return "mdi:alert-outline";
      case "info":
      default:
        return "mdi:information-outline";
    }
  };

  return (
    isVisible && (
      <div
        className={`transition-all transform duration-300 ease-in-out max-w-6xl mx-auto m-2 w-full p-6 rounded-xl shadow-xl flex items-start space-x-3 ${getColor()}`}
      >
        <Icon icon={getIcon()} width="24" height="24" />
        <div className="flex-grow">
          <p className="text-sm">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="font-bold text-lg leading-none text-gray-700"
        >
          &times;
        </button>
      </div>
    )
  );
};

export default Alert;
