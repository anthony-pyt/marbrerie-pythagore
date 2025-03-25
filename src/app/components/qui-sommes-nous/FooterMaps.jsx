import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix pour les icônes Leaflet qui ne s'affichent pas dans Next.js
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Configuration de l'icône par défaut
const defaultIcon = L.icon({
  iconUrl: markerIconPng.src,
  shadowUrl: markerShadowPng.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const FooterMaps = () => {
  const markerRefs = useRef({
    laniscat: null,
    rouen: null,
  });

  useEffect(() => {
    // Fix pour s'assurer que Leaflet fonctionne bien dans Next.js
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: markerIconPng.src,
      shadowUrl: markerShadowPng.src,
    });

    // Ouvrir les popups après un délai plus long
    const timer = setTimeout(() => {
      markerRefs.current.laniscat.openPopup();
    }, 500); // Augmentez le délai si nécessaire

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full absolute inset-0">
      <MapContainer
        center={[48.99604006779647, -1.261240943902487]}
        zoom={7}
        className="h-full w-full opacity-80"
        scrollWheelZoom={false}
      >
        {/* Fond de carte OpenStreetMap */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {zones.map((zone) => (
          <Marker
            key={zone.id}
            position={zone.position}
            icon={defaultIcon}
            ref={(ref) => (markerRefs.current[zone.id] = ref)}
          >
            <Popup>
              <div>
                <div className="flex justify-center w-full my-4">
                    <img src={zone.img} alt="" className="h-8 w-auto"/>
                </div>
                {zone.name}
                <br />
                {zone.address}
              </div>
              <a
                className="underline underline-offset-2"
                href={zone.url}
                target="_blank"
              >
                Voir sur Google
              </a>
            </Popup>
          </Marker>
        ))}       
      </MapContainer>
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
    url: "https://www.google.fr/maps/place/Pythagore/@48.2380163,-3.1308951,16.54z/data=!4m6!3m5!1s0x4811b862bc91a1cd:0xc20dcfe6332b25b7!8m2!3d48.2363331!4d-3.1331111!16s%2Fg%2F1tj9bdl0?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
  },
  {
    id: "rouen",
    name: "Dépot logisitque de Rouen",
    address:
      "ZA de Caillemare, 3 Pl. Caillemare, 27310 Saint-Ouen-de-Thouberville",
    position: [49.35622727147632, 0.8830444288355398],
    address: "ZA Pen Ar Hoat 22570 Laniscat",
    img: "/images/logo_pythagore_texte_noir.png",
    url: "https://www.google.fr/maps/place/Pythagore+Normandie/@49.3560945,0.8804588,17z/data=!3m1!4b1!4m6!3m5!1s0x47e11d4aac9a4ce1:0x68331a7b936e18f0!8m2!3d49.356091!4d0.8830337!16s%2Fg%2F11vylz5_74?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
  },
];
