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
    <main className="min-h-screen bg-white">
      <MainMenu />
      <PageTitle
        title="Garanties"
        subtitle="L'engagement Pythagore"
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="animate-pulse text-secondary uppercase tracking-widest text-xs">
              Chargement...
            </div>
          </div>
        ) : (
          <div className="space-y-24">
            {/* --- SECTION 1 : GARANTIE GÉNÉRALE PYTHAGORE --- */}
            <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* GAUCHE : TEXTES PRINCIPAUX */}
              <div className="lg:col-span-5 space-y-8">
                <div className="inline-block">
                  <img
                    src="/images/logo_pythagore_texte_noir_dore.png"
                    alt="logo pythagore"
                    className="h-16 mb-4 opacity-90"
                  />
                  <div className="h-[2px] w-12 bg-or" />
                </div>

                <h2 className="text-3xl font-light uppercase tracking-[0.2em] text-secondary leading-tight">
                  Garantie <br /> <span className="font-bold">Pythagore</span>
                </h2>

                <div className="space-y-6 text-sm text-gray-600 leading-relaxed text-justify max-w-md">
                  <p>
                    Nos agencements sont garantis{" "}
                    <span className="text-secondary font-bold">2 ans</span> en
                    cas de défaut avéré concernant la matière, le façonnage et
                    l&apos;installation, réalisés par nos soins.
                  </p>
                  <p>
                    Pour les surfaces minérales reconstituées, nos fabricants
                    partenaires offrent une extension de garantie allant
                    jusqu&apos;à{" "}
                    <span className="text-secondary font-bold">25 ans</span>.
                  </p>
                  <p className="italic border-l-2 border-or/30 pl-4 py-2 bg-gray-50 text-[13px]">
                    Important : Pensez à activer votre extension sur le site du
                    fabricant dans les 30 jours suivant l&apos;installation.
                  </p>
                </div>
              </div>

              {/* DROITE : CHARTE GRAPHIQUE (Remplace la photo) */}
              <div className="lg:col-span-7 bg-gray-50/50 border border-gray-100 p-10 md:p-16 relative overflow-hidden group min-h-[450px] flex flex-col justify-center">
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Item 1 */}
                  <div className="space-y-4">
                    <Icon
                      icon="solar:medal-star-square-outline"
                      className="text-or"
                      width="32"
                    />
                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-secondary">
                      Excellence Matière
                    </h4>
                    <p className="text-[11px] leading-relaxed text-gray-500 uppercase tracking-wider">
                      Sélection rigoureuse des tranches auprès de nos
                      fournisseurs.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="space-y-4">
                    <Icon
                      icon="solar:ruler-cross-pen-outline"
                      className="text-or"
                      width="32"
                    />
                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-secondary">
                      Précision Façonnage
                    </h4>
                    <p className="text-[11px] leading-relaxed text-gray-500 uppercase tracking-wider">
                      Découpe numérique et finitions main dans nos ateliers de
                      production.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="space-y-4">
                    <Icon
                      icon="solar:home-smile-outline"
                      className="text-or"
                      width="32"
                    />
                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-secondary">
                      Pose Certifiée
                    </h4>
                    <p className="text-[11px] leading-relaxed text-gray-500 uppercase tracking-wider">
                      Installation réalisée par nos propres équipes de poseurs.
                    </p>
                  </div>

                  {/* Item 4 */}
                  <div className="space-y-4">
                    <Icon
                      icon="solar:shield-check-outline"
                      className="text-or"
                      width="32"
                    />
                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-secondary">
                      Suivi Client
                    </h4>
                    <p className="text-[11px] leading-relaxed text-gray-500 uppercase tracking-wider">
                      Accompagnement et conseils d&apos;entretien pour la
                      pérennité de vos surfaces.
                    </p>
                  </div>
                </div>

                {/* Bordure décorative animée en bas */}
                <div className="absolute bottom-0 left-0 h-1 bg-or transition-all duration-700 w-0 group-hover:w-full" />
              </div>
            </section>

            {/* --- SECTION 2 : GRID DES PARTENAIRES --- */}
            <section className="space-y-12">
              <div className="text-center">
                <p className="text-or text-[10px] uppercase tracking-[0.4em] font-bold mb-2">
                  Partenaires
                </p>
                <h3 className="text-xl font-light uppercase tracking-[0.2em] text-secondary">
                  Extensions Fournisseurs
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {waranties?.map((waranty) => (
                  <div
                    key={waranty.id}
                    className="bg-white border border-gray-100 group flex flex-col transition-all duration-500 hover:shadow-2xl hover:border-or/50"
                  >
                    {/* Image du matériau avec Overlay */}
                    <div className="relative h-64 w-full overflow-hidden bg-gray-50">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src={waranty.imageSrc}
                        alt={waranty.title}
                      />
                      <div className="absolute inset-0 bg-secondary/5 group-hover:bg-transparent transition-colors duration-500" />

                      {/* Logo Partenaire flottant */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 shadow-sm">
                        <img
                          src={waranty.logoSrc}
                          alt={waranty.title}
                          className="h-6 w-auto object-contain"
                        />
                      </div>
                    </div>

                    <div className="p-8 flex-grow flex flex-col">
                      <div className="mb-6">
                        <h4 className="text-lg font-light uppercase tracking-[0.15em] text-secondary leading-tight">
                          {waranty.title || "Garantie Matière"}
                        </h4>
                        <div className="h-[1px] w-8 bg-or mt-3 transition-all duration-500 group-hover:w-16" />
                      </div>

                      <p className="text-xs text-gray-500 leading-relaxed mb-8 flex-grow">
                        {waranty.description ||
                          "Bénéficiez de l'expertise et de la protection longue durée du fabricant pour votre plan de travail."}
                      </p>

                      {waranty.url && (
                        <Link
                          href={waranty.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between w-full py-4 border-t border-gray-100 text-secondary hover:text-or transition-colors duration-300 group/link"
                        >
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                            Activer ma garantie
                          </span>
                          <Icon
                            icon="si:arrow-right-duotone"
                            className="transform group-hover/link:translate-x-1 transition-transform"
                            width="20"
                          />
                        </Link>
                      )}
                    </div>
                    {/* Ligne de finition */}
                    <div className="h-1 w-full bg-gray-50 group-hover:bg-or/30 transition-colors duration-500" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
