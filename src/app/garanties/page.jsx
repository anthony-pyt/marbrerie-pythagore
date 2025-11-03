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
            <div className="bg-white shadow-xl rounded-3xl p-8 flex flex-col items-center text-center my-6 border border-gray-100">
              <img
                src="/images/logo_pythagore_texte_noir_dore.png"
                alt="logo pythagore noir"
                className="h-20 mb-6 opacity-90"
              />

              <h3 className="text-xl font-semibold tracking-wide text-gray-800 mb-4">
                GARANTIE PYTHAGORE
              </h3>

              <div className="space-y-4 text-gray-600 text-sm leading-relaxed max-w-prose">
                <p>
                  Nos agencements sont garantis 2 ans en cas de défaut avéré
                  concernant la matière, le façonnage et l&apos;installation (le
                  cas échéant), effectués par Pythagore.
                </p>

                <p>
                  Pour les surfaces minérales reconstituées, les fabricants de
                  matériaux partenaires de Pythagore offrent une extension de
                  garantie, jusqu&apos;à 25 ans, en cas de défaut du matériau
                  (Hors refabrication & installation).
                </p>

                <p>
                  Pour activer l&apos;extension de garantie, pensez à vous
                  enregistrer sur le site internet du fabricant, dans les 30
                  jours suivants l&apos;installation.
                </p>

                <p className="text-gray-800 text-[0.95rem] font-medium pt-2">
                  Retrouvez les liens d&apos;enregistrement de nos partenaires
                  ci-dessous.
                </p>
              </div>
            </div>
            <div className="flex justify-center my-8">
              <h3 className="font-title">Extensions de garanties de nos partenaires fabricants</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {waranties?.map((waranty) => (
                <div
                  key={waranty.id}
                  className="relative bg-white shadow-xl rounded-3xl p-2 flex flex-col items-center text-center border border-gray-100 transition hover:shadow-2xl hover:-translate-y-0.5 duration-300"
                >
                  <div className="absolute top-3 right-3">
                    <img
                      src={waranty.logoSrc}
                      alt={waranty.title}
                      className="object-contain opacity-90 max-w-20"
                    />
                  </div>

                  <div className="gap-6 mb-6">
                    <img
                      src={waranty.imageSrc}
                      alt={waranty.title}
                      className="h-36 object-contain opacity-90"
                    />
                  </div>

                  {waranty.url && (
                    <div className="mt-auto w-full p-4 bg-blue-50 border border-blue-200 rounded-2xl text-sm">
                      <p className="text-gray-700 font-medium">
                        Votre garantie produit n&apos;est pas encore activée ?
                      </p>

                      <Link
                        href={waranty.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center justify-center gap-2 px-3 py-2 text-blue-900 bg-or-light hover:bg-or hover:text-white rounded-lg transition-colors duration-200"
                      >
                        <span>Activer l&apos;extension de garantie</span>
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
