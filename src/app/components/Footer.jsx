import Image from "next/image";
import Logo from "./Logo";
import Link from "next/link";
import InfiniteMovingLogos from "./ui/infinite-moving-logos";
import { fournisseurs } from "../datas/fournisseurs";

const Footer = () => {
  return (
    <footer className="bg-secondary mt-8">
      <div className="flex flex-col antialiased items-center justify-center relative overflow-hidden bg-white">
        <InfiniteMovingLogos
          items={fournisseurs}
          direction="right"
          speed="slow"
        />
      </div>
      <div className="py-8 px-4 flex lg:flex-row flex-col space-y-4 lg:space-y-0 items-center lg:items-start justify-between text-white">
        <div className="flex-1 flex flex-col items-center justify-center">
          <img
            className="w-48"
            src={"/images/logo_pythagore_texte_blanc.png"}
            alt="Logo de Pythagore"
          />
          <div className="text-sm mt-2 font-title">
            <p>Zone artisanale de Pen Ar Hoat</p>
            <p>
              22570 Laniscat | <a href="tel:0296249898">02.96.24.98.98</a>
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          {/* <p>Suivez nous !</p> */}
          <div className="flex flex-col items-center">
            <p className="font-semibold">Horaires d'ouverture (sur RDV)</p>
            <p className="text-sm">
              Du lundi au jeudi : 9h00-13h00, 14h00-17h30
            </p>
            <p className="text-sm">Vendredi : 9h00-13h00, 14h00-16h30</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="https://www.instagram.com/pythagoremarbrerie/"
              target="_blank"
            >
              <img
                className="w-12 h-12"
                src="/images/instagram.png"
                alt="instagram"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/company/marbrerie-pythagore"
              target="_blank"
            >
              <img
                className="w-12 h-12"
                src="/images/linkedin.png"
                alt="linkedin"
              />
            </Link>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="flex flex-col items-start">
            <Link href={"/garanties"} className="text-sm lg:text-base">
              Garanties
            </Link>
            <Link href={"/contact"} className="text-sm lg:text-base">
              Contact
            </Link>
            <Link href={"/mentions-legales"} className="text-sm lg:text-base">
              Mentions légales
            </Link>
            <Link
              href={"/politique-de-confidentialite"}
              className="text-sm lg:text-base"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
