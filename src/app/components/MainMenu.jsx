"use client";

import { Icon } from "@iconify/react";
import Logo from "./Logo";
import Button from "./Button";
import { listMenu } from "../../../mainMenuItems";
import Link from "next/link";
import { Hamburger } from "./Hamburger";
import { useEffect, useState } from "react";

export default function MainMenu({ page }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isHeightReduced, setIsHeightReduced] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const scrollThreshold = 100; // Le seuil de scroll que tu souhaites
  const scrollTolerance = 50; // La tolérance de défilement

  const toggleOpenMenu = () => {
    if (isOpen) {
      setIsClosing(true); // Activer l'animation de fermeture
      setTimeout(() => {
        setIsOpen(false); // Fermer le menu après l'animation
        setIsClosing(false); // Réinitialiser l'état de fermeture
      }, 300); // Correspond à la durée de l'animation
    } else {
      setIsOpen(true); // Ouvrir le menu
    }
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Vérification du seuil avec une tolérance
    if (scrollTop > scrollThreshold + scrollTolerance && !isHeightReduced) {
      setIsHeightReduced(true); // Réduire la hauteur si on dépasse le seuil + tolérance
    } else if (
      scrollTop < scrollThreshold - scrollTolerance &&
      isHeightReduced
    ) {
      setIsHeightReduced(false); // Remettre la hauteur initiale si on redescend sous le seuil - tolérance
    }
    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop); // Éviter les valeurs négatives
  };

  useEffect(() => {
    // Ajoute l'écouteur d'événements pour le scroll
    window.addEventListener("scroll", handleScroll);

    // Nettoyage lors de la destruction du composant
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHeightReduced]); // L'effet dépend de l'état `isHeightReduced`

  return (
    <div
      className={`fixed w-full top-0 z-20 rounded-xl mx-auto transform duration-100`}
    >
      <div
        className={` ${
          isHeightReduced
            ? "h-16 m-0 bg-white shadow-lg sticky top-0"
            : "h-32 m-2 rounded-xl"
        }
        {${page} === 'home' ? '':''} 
          p-3  flex items-center justify-between transform duration-500 top-0 z-50 animate__animated animate__bounceInDown animate__delay`}
      >
        <button className="block xl:hidden" onClick={toggleOpenMenu}>
          <Hamburger />
        </button>
        <div
          className={`flex-0.5 transition-transform duration-300 ${
            isHeightReduced
              ? "ml-6 w-20"
              : page === "home"
              ? "w-80 absolute top-2 left-2"
              : "w-44"
          }`}
        >
          <Logo
            theme={
              page == "home" ? (isHeightReduced ? "color" : "white") : "color"
            }
            scroll={isHeightReduced}
          />
        </div>
        <div className="hidden xl:flex justify-center w-full flex-1">
          <div className="flex items-center justify-center space-x-2">
            {listMenu.map((item) => (
              <div
                key={item.label}
                className={`${
                  page == "home"
                    ? isHeightReduced
                      ? "hover:bg-secondary"
                      : "hover:bg-or-light"
                    : "hover:bg-secondary"
                } rounded-lg group relative transform duration-200 z-50 cursor-pointer`}
              >
                <Link
                  href={item.link}
                  className="group-hover:text-primary text-secondary transform duration-500 flex items-center space-x-1 px-4 py-2"
                >
                  <Icon
                    icon={item.icon}
                    width="24"
                    height="24"
                    className={`${
                      page == "home"
                        ? isHeightReduced
                          ? "group-hover:text-primary text-secondary"
                          : "group-hover:text-black text-white"
                        : "group-hover:text-primary text-secondary"
                    } cursor-pointer transform duration-700 delay-300`}
                  />
                  <span
                    className={`${
                      page == "home"
                        ? isHeightReduced
                          ? "group-hover:text-primary text-secondary"
                          : "group-hover:text-black text-white text-lg"
                        : "group-hover:text-primary text-secondary"
                    } transform duration-500`}
                  >
                    {item.label}
                  </span>
                </Link>
                {item.children?.length > 0 && (
                  <div className="absolute top-full left-0 hidden group-hover:block overflow-hidden">
                    <div className="mt-2 p-4 w-96 bg-white border rounded-xl shadow-lg ">
                      <div>
                        {item.children.map((child) => (
                          <Link
                            href={child.link}
                            className="flex items-center space-x-3 px-4 py-2 hover:bg-secondary hover:text-primary text-secondary rounded-lg duration-150 transform"
                            key={child.label}
                          >
                            <Icon icon={child.icon} width="20" height="20" />
                            <div>{child.label}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center justify-end space-x-4 flex-0.5">
          <a href="/contact">
            <Button color="primary" text="Contact" size="small" />
          </a>
          <a href="https://extranet.marbrerie-pythagore.fr">
            <Button color="or" text="Espace pro" size="small" />
          </a>
        </div>
      </div>
      {isOpen && (
        <div
          className={`fixed inset-0 h-screen w-screen bg-white z-50 shadow-xl p-3 flex flex-col justify-between overflow-y-auto ${
            isClosing
              ? "animate__animated animate__bounceOutLeft"
              : "animate__animated animate__bounceInLeft"
          }`}
        >
          <button onClick={toggleOpenMenu} className="absolute top-4 right-8">
            <Icon icon="solar:close-circle-outline" className="h-12 w-12" />
          </button>
          <div>
            <div className="">
              <h3 className="text-3xl">Menu principal</h3>
            </div>
            <div>
              {listMenu.map((item) => (
                <div key={item.label} className="my-1 p-1">
                  <div className="flex items-center space-x-1">
                    <Link href={item.link} className="text-3xl">
                      {item.label}
                    </Link>
                  </div>
                  {item.children?.length > 0 && (
                    <div className="">
                      <div>
                        <div>
                          {item.children.map((child) => (
                            <div className="px-4 text-xl" key={child.label}>
                              <Link href={child.link} className="">
                                {child.label}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <a href="/contact">
              <Button color="primary" text="Contact" size="small" />
            </a>
            <a href="https://extranet.marbrerie-pythagore.fr">
              <Button color="or" text="Espace pro" size="small" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
