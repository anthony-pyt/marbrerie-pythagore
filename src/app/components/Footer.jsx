import Image from "next/image";
import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-secondary mt-16 py-8 px-4 flex items-start justify-between text-white">
      <div className="flex-1 flex flex-col items-center justify-center">
        <Image
          src={"/images/logo_pythagore_texte_blanc.png"}
          width={248}
          height={248 / 2.39}
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
            <Image
              src="/images/instagram.png"
              width={48}
              height={48}
              alt="instagram"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/company/marbrerie-pythagore"
            target="_blank"
          >
            <Image
              src="/images/linkedin.png"
              width={48}
              height={48}
              alt="linkedin"
            />
          </Link>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <div className="flex flex-col items-start">
          <Link href={"/contact"}>Contact</Link>
          <Link href={"/mentions-legales"}>Mentions légales</Link>
          <Link href={"/politique-de-confidentialite"}>
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
