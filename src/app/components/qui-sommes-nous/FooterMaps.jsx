"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import des icônes
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const FooterMaps = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || mapInstance.current) return;

    // SOLUTION : Configuration manuelle et sécurisée de l'icône
    // On utilise les assets standards de Leaflet via CDN pour éviter les problèmes d'import locaux
    const defaultIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    // Initialisation de la carte
    mapInstance.current = L.map(mapRef.current, {
      center: [47.5, 1.0],
      zoom: 6,
      scrollWheelZoom: false,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "© OSM",
      },
    ).addTo(mapInstance.current);

    // Ajout des marqueurs avec l'icône forcée
    zones.forEach((zone) => {
      // On s'assure que l'icône est bien passée ici
      const marker = L.marker(zone.position, { icon: defaultIcon })
        .addTo(mapInstance.current)
        .bindPopup(
          `
          <div class="p-2 min-w-[200px] bg-white text-black">
             <div class="flex justify-center w-full mb-4">
              <img src="${zone.img}" style="height: 24px; width: auto; object-fit: contain;" />
            </div>
            <h4 style="font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 4px;">${zone.name}</h4>
            <p style="font-size: 10px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">${zone.address}</p>
            <a style="font-size: 9px; text-transform: uppercase; color: #C5A059; text-decoration: none; border-bottom: 1px solid rgba(197, 160, 89, 0.3);" href="${zone.url}" target="_blank">Itinéraire →</a>
          </div>
        `,
          { className: "custom-popup" },
        );

      if (zone.id === "laniscat") {
        setTimeout(() => marker.openPopup(), 1200);
      }
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 bg-secondary grayscale-[0.5] hover:grayscale-0 transition-all duration-1000">
      <div ref={mapRef} className="h-full w-full custom-map" />

      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 0 !important;
        }
        .custom-map {
          filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
        }
        /* Pour que les images dans les popups ne soient pas inversées */
        .leaflet-popup-content img {
          filter: invert(100%) hue-rotate(180deg);
        }
      `}</style>
    </div>
  );
};

export const zones = [
  {
    id: "laniscat",
    name: "Siège social et atelier",
    address: "ZA Pen Ar Hoat 22570 Laniscat",
    position: [48.236577, -3.132568],
    img: "/images/logo_pythagore_texte_noir.png",
    url: "https://maps.google.com",
  },
  {
    id: "rouen",
    name: "Dépôt Normandie",
    address: "ZA de Caillemare, 27310 St-Ouen-de-Thouberville",
    position: [49.35622, 0.88304],
    img: "/images/logo_pythagore_texte_noir.png",
    url: "https://maps.google.com",
  },
  {
    id: "carrara",
    name: "Carrara Marbrerie",
    address: "206 rue du Revermont 01440 Viriate",
    position: [46.226431, 5.25396],
    img: "/images/logos/carrara/Logo_CARRARA_fin.png",
    url: "https://maps.google.com",
  },
];

export default FooterMaps;
