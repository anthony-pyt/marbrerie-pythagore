"use client";

import { useEffect, useState } from "react";
import MainMenu from "../components/MainMenu";
import PageTitle from "../components/PageTitle";
import useWarantyServices from "@/api/services/warantiesServices";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Footer from "../components/Footer";

export default function Page() {
  const { fetchWaranties } = useWarantyServices();
  const [waranties, setWaranties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWaranties = async () => {
      try {
        const response = await fetchWaranties();
        setWaranties(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des garanties :", error);
      } finally {
        setLoading(false);
      }
    };
    getWaranties();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      <MainMenu />
      <PageTitle title="Nos garanties" />

      <div className="max-w-6xl mx-auto px-4">
        {loading ? (
          <p className="text-center text-gray-500">
            Chargement des garanties...
          </p>
        ) : (
          <div>
            <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center my-6">
              <div>
                <img
                  src="/images/logo_pythagore_texte_noir_dore.png"
                  alt="logo pythagore noir"
                  className="h-24 mb-4"
                />
              </div>
              <h3 className="text-lg font-semibold">GARANTIE PYTHAGORE</h3>
              <p className="text-gray-600 text-sm mt-2">
                Nous offrons une garantie sur l’ensemble des matériaux
                manufacturés et posés par nos équipes ou simplement livrés ;
                ceci sous réserve que ces matériaux soient transformés et
                installés dans le respect des bonnes pratiques.{" "}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {waranties?.map((waranty) => (
                <div
                  key={waranty.id}
                  className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center"
                >
                  <img
                    src={waranty.imageSrc}
                    alt={waranty.title}
                    className="h-24 mb-4"
                  />
                  <h3 className="text-lg font-semibold">{waranty.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {waranty.description}
                  </p>
                  {waranty.url && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center text-sm">
                      <p className="text-sm text-gray-700 font-medium">
                        Votre garantie produit n'est pas encore activée ?
                      </p>
                      <Link
                        href={waranty.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-2 px-2 py-1 text-blue-950 bg-or-light hover:bg-or hover:text-white rounded-lg transition"
                      >
                        <span>Activez-la dès maintenant</span>
                        <Icon
                          icon="si:arrow-right-duotone"
                          width="20"
                          height="20"
                        />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
