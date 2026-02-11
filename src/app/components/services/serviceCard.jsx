import { Icon } from "@iconify/react";

const ServiceCard = ({ title, children, image }) => {
  return (
    <div className="md:w-96 w-full bg-white border border-gray-100 h-full group flex flex-col transition-all duration-500 hover:border-or/70">
      {/* Conteneur Image avec effet de zoom au survol */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={image}
          loading="lazy"
          alt={title}
        />
        {/* Overlay subtil qui s'estompe au survol */}
        <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      <div className="p-8 flex-grow flex flex-col">
        {/* Titre avec ligne décorative */}
        <div className="mb-6">
          <h4 className="text-xl font-light uppercase tracking-[0.2em] text-secondary leading-tight">
            {title}
          </h4>
          <div className="h-[2px] w-12 bg-or mt-4 transition-all duration-500 group-hover:w-20" />
        </div>

        {/* Contenu (les listes stylisées précédemment) */}
        <div className="text-sm text-gray-600">{children}</div>
      </div>

      {/* Finition discrète en bas de carte */}
      <div className="h-1 w-full bg-gray-50 group-hover:bg-or/20 transition-colors duration-500" />
    </div>
  );
};

export default ServiceCard;
