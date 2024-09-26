import Image from "next/image";
import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-secondary mt-16 py-8 px-4 flex lg:flex-row flex-col space-y-4 lg:space-y-0 items-center lg:items-start justify-between text-white">
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
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* <p>Suivez nous !</p> */}
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
          <Link href={"/contact"} className="text-sm lg:text-base">Contact</Link>
          <Link href={"/mentions-legales"} className="text-sm lg:text-base">Mentions légales</Link>
          <Link href={"/politique-de-confidentialite"} className="text-sm lg:text-base">
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
