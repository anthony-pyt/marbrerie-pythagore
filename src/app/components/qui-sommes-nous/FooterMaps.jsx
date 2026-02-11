"use client";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix pour les icônes Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIconPng.src,
  shadowUrl: markerShadowPng.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const FooterMaps = () => {
  const markerRefs = useRef({});

  useEffect(() => {
    // Fix Leaflet Next.js
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: markerIconPng.src,
      shadowUrl: markerShadowPng.src,
    });

    // Ouverture automatique de la popup principale
    const timer = setTimeout(() => {
      if (markerRefs.current.laniscat) {
        markerRefs.current.laniscat.openPopup();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 bg-secondary grayscale-[0.5] hover:grayscale-0 transition-all duration-1000">
      <MapContainer
        center={[47.5, 1.0]} // Recentré pour voir Laniscat, Rouen et Carrara
        zoom={6}
        className="h-full w-full custom-map"
        scrollWheelZoom={false}
      >
        {/* Style de carte "CartoDB Positron" - Plus élégant et gris pour le luxe */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />

        {zones.map((zone) => (
          <Marker
            key={zone.id}
            position={zone.position}
            icon={defaultIcon}
            ref={(ref) => (markerRefs.current[zone.id] = ref)}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px] bg-white">
                <div className="flex justify-center w-full mb-4">
                  <img
                    src={zone.img}
                    alt=""
                    className="h-6 w-auto object-contain"
                  />
                </div>

                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-1">
                  {zone.name}
                </h4>

                <p className="text-[10px] text-gray-500 leading-relaxed mb-4 uppercase tracking-wider">
                  {zone.address}
                </p>

                <a
                  className="inline-block text-[9px] uppercase tracking-[0.3em] text-or border-b border-or/30 hover:border-or transition-colors pb-1"
                  href={zone.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Itinéraire →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Styles injectés pour forcer les angles droits sur Leaflet */}
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 0 !important;
          padding: 0 !important;
          box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.1);
        }
        .custom-popup .leaflet-popup-content {
          margin: 0 !important;
        }
        .custom-popup .leaflet-popup-tip {
          display: none; /* Plus minimaliste */
        }
        .custom-map {
          filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
        }
      `}</style>
    </div>
  );
};

export default FooterMaps;

export const zones = [
  {
    id: "laniscat",
    name: "Siège social et atelier",
    address: "ZA Pen Ar Hoat 22570 Laniscat",
    position: [48.236577, -3.132568],
    img: "/images/logo_pythagore_texte_noir.png",
    url: "https://www.google.com/maps?q=Pythagore+Laniscat",
  },
  {
    id: "rouen",
    name: "Dépôt Normandie",
    address: "ZA de Caillemare, 27310 St-Ouen-de-Thouberville",
    position: [49.35622, 0.88304],
    img: "/images/logo_pythagore_texte_noir.png",
    url: "https://www.google.com/maps?q=Pythagore+Normandie",
  },
  {
    id: "carrara",
    name: "Carrara Marbrerie",
    address: "206 rue du Revermont 01440 Viriate",
    position: [46.226431, 5.25396],
    img: "/images/logos/carrara/Logo_CARRARA_fin.png",
    url: "https://www.google.com/maps?q=Carrara+Marbrerie+Viriate",
  },
];
