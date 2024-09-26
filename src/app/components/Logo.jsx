import Image from "next/image";

export default function Logo({ theme }) {
  let url;

  if (theme === "color") {
    url = "/images/logo_pythagore_texte_noir_dore.png";
  } else if (theme === "white") {
    url = "/images/logo_pythagore_texte_blanc.png";
  } else if (theme === "black") {
    url = "/images/logo_pythagore_texte_noir.png";
  } else {
    url = "/images/logo_pythagore_texte_noir_dore.png";
  }
  return (
    <div className="group relative">
      <a href="/" as="div">
        <img
          src={url}
          alt="Logo pythagore"
          className={`transform duration-300 `}
        />
      </a>
    </div>
  );
}
