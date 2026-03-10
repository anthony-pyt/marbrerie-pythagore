import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Logique de gestion de l'affichage et du timer
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Configuration visuelle par type
  const config = {
    success: {
      bg: "bg-white/90",
      border: "border-emerald-500",
      text: "text-slate-800",
      icon: "solar:check-circle-bold-duotone",
      iconColor: "text-emerald-500",
      accent: "bg-emerald-500",
    },
    error: {
      bg: "bg-white/90",
      border: "border-rose-500",
      text: "text-slate-800",
      icon: "solar:danger-circle-bold-duotone",
      iconColor: "text-rose-500",
      accent: "bg-rose-500",
    },
    warning: {
      bg: "bg-white/90",
      border: "border-amber-500",
      text: "text-slate-800",
      icon: "solar:bell-bing-bold-duotone",
      iconColor: "text-amber-500",
      accent: "bg-amber-500",
    },
    info: {
      bg: "bg-white/90",
      border: "border-blue-500",
      text: "text-slate-800",
      icon: "solar:info-circle-bold-duotone",
      iconColor: "text-blue-500",
      accent: "bg-blue-500",
    },
    default: {
      bg: "bg-white/90",
      border: "border-slate-500",
      text: "text-slate-800",
      icon: "solar:notification-lines-remove-bold-duotone",
      iconColor: "text-slate-500",
      accent: "bg-slate-500",
    },
  };

  const style = config[type] || config.default;

  return (
    <div
      className={`
        fixed bottom-5 right-5 z-[100]
        flex items-center min-w-[320px] max-w-md
        ${style.bg} border-l-4 ${style.border} backdrop-blur-xl
        py-6 px-8 shadow-[0_10px_40px_rgba(0,0,0,0.15)]
        rounded-none transition-all duration-500 ease-out transform
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}
    >
      {/* Icône Design */}
      <div className={`flex-shrink-0 ${style.iconColor}`}>
        <Icon icon={style.icon} width="28" height="28" />
      </div>

      {/* Message */}
      <div className="ml-4 mr-6">
        <p
          className={`text-sm font-bold uppercase tracking-widest ${style.text}`}
        >
          {type}
        </p>
        <p className="text-slate-600 text-sm mt-0.5 leading-relaxed font-medium">
          {message}
        </p>
      </div>

      {/* Bouton Fermer */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 p-1 hover:bg-slate-100 transition-colors text-slate-400"
      >
        <Icon icon="heroicons:x-mark-20-solid" width="16" height="16" />
      </button>

      {/* Barre de progression subtile en bas (optionnelle) */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-slate-100 w-full overflow-hidden">
        <div
          className={`h-full ${style.accent} transition-all duration-[3000ms] linear`}
          style={{ width: isVisible ? "0%" : "100%" }}
        />
      </div>
    </div>
  );
};

export default Toast;
