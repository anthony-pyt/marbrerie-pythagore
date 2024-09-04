"use client";

import { Icon } from "@iconify/react";
import Logo from "./Logo";
import Button from "./Button";
import { listMenu } from "../../../mainMenuItems";
import Link from "next/link";
import { Hamburger } from "./Hamburger";
import { useEffect, useState } from "react";

export default function MainMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // État pour gérer l'animation de fermeture

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      <div
        className={`${
          scrolling ? "bg-slate-50" : "bg-white"
        } m-5 rounded-xl p-3 shadow-lg flex items-center justify-between transform duration-500 sticky top-0 z-50 animate__animated animate__bounceInDown animate__delay`}
      >
        <button className="block xl:hidden" onClick={toggleOpenMenu}>
          <Hamburger />
        </button>
        <div
          className={`flex-0.5 ${
            scrolling ? "scale-90" : "scale-100"
          } transition-transform duration-300`}
        >
          <Logo theme="color" />
        </div>
        <div className="hidden xl:flex justify-center w-full flex-1">
          <div className="flex items-center justify-center space-x-2">
            {listMenu.map((item) => (
              <div
                key={item.label}
                className="hover:bg-secondary rounded-lg group relative transform duration-200 z-50 cursor-pointer"
              >
                <Link
                  href={item.link}
                  className="group-hover:text-primary text-secondary transform duration-500 flex items-center space-x-1 px-4 py-2"
                >
                  <Icon
                    icon={item.icon}
                    width="20"
                    height="20"
                    className="cursor-pointer group-hover:text-primary text-secondary transform duration-700 delay-300"
                  />
                  <span className="group-hover:text-primary text-secondary transform duration-500">
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
          <div className="flex items-center justify-center space-x-2 mb-12">
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
