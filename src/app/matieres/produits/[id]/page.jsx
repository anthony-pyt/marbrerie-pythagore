"use client";

import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import MainMenu from "@/components/MainMenu";
import PageTitle from "@/components/PageTitle";
import Footer from "@/components/Footer";
import Slider from "@/components/product/Slider";
import Link from "next/link";

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_STOCK_URL}/external-products/${params.id}`,
        );
        setProduct(data);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <img
          src="/images/loaders/loader-pythagore.gif"
          className="h-24 mb-4"
          alt="Chargement"
        />
        <p className="text-gray-500 animate-pulse tracking-widest uppercase text-xs">
          Chargement de la matière
        </p>
      </div>
    );
  }
if (!product || Object.keys(product).length === 0) {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <MainMenu />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-8 p-6 bg-gray-50 rounded-full">
          <Icon
            icon="solar:confounded-circle-outline"
            className="text-gray-300"
            width="80"
          />
        </div>

        <h1 className="text-3xl font-light text-secondary uppercase tracking-tighter mb-4">
          Matière introuvable
        </h1>

        <p className="text-gray-500 max-w-md mx-auto mb-10 leading-relaxed">
          Désolé, nous ne parvenons pas à trouver les détails de cette
          référence. Il est possible qu&apos;elle ne soit plus disponible dans notre
          stock actuel.
        </p>

        <Link
          href="/matieres/nos-produits"
          className="group flex items-center gap-3 px-8 py-4 bg-secondary text-white text-xs uppercase tracking-widest font-bold hover:bg-or transition-all duration-300 shadow-xl"
        >
          <Icon
            icon="si:arrow-left-duotone"
            className="group-hover:-translate-x-1 transition-transform"
            width="20"
          />
          Retour aux produits
        </Link>
      </div>
      <Footer />
    </main>
  );
}

  return (
    <main className="min-h-screen bg-white">
      <MainMenu />

      <PageTitle
        title={product.label}
        subtitle={product.product?.category?.label}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* SECTION PRINCIPALE : IMAGE & INFOS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* GAUCHE : VISUEL PRINCIPAL */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-[16/9] overflow-hidden shadow-2xl border border-gray-100">
              <img
                src={product.image_url}
                className="w-full h-full object-cover"
                alt={product.label}
              />
              {product.eco === 1 && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg">
                  <Icon
                    icon="mdi:ecology"
                    className="text-green-600"
                    width="24"
                  />
                </div>
              )}
            </div>

            {/* SLIDER / GALERIE */}
            {product.images?.length > 0 && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <Slider
                  images={product.images}
                  principal_image={product.image_url}
                />
              </div>
            )}
          </div>

          {/* DROITE : CARACTÉRISTIQUES */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-gray-100 p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-6">
                <div>
                  <h2 className="text-sm uppercase tracking-widest text-gray-400 font-bold mb-1">
                    Détails techniques
                  </h2>
                  <p className="text-2xl font-light text-secondary uppercase tracking-tighter">
                    Fiche Matière
                  </p>
                </div>
                {product.product.category.logo_url && (
                  <img
                    src={product.product.category.logo_url}
                    className="h-10 object-contain grayscale hover:grayscale-0 transition"
                    alt="Logo marque"
                  />
                )}
              </div>

              <div className="space-y-5">
                <SpecItem
                  icon="arcticons:rocksndiamonds"
                  label="Matériau"
                  value={product.product.category.parent.label}
                />

                <SpecItem icon="solar:sticker-square-outline" label="Finitions">
                  <div className="flex flex-wrap gap-2">
                    {product.finitions.map((f) => (
                      <Tag key={f.id}>{f.finition.label}</Tag>
                    ))}
                  </div>
                </SpecItem>

                <SpecItem icon="solar:ruler-angular-outline" label="Épaisseurs">
                  <div className="flex flex-wrap gap-2">
                    {product.thiknesses.map((t) => (
                      <span
                        key={t.id}
                        className="text-secondary font-bold text-sm"
                      >
                        {t.thikness_plan.label}
                      </span>
                    ))}
                  </div>
                </SpecItem>

                <SpecItem icon="fluent:color-24-regular" label="Nuances">
                  <div className="flex flex-wrap gap-2">
                    {product.colories.length > 0 ? (
                      product.colories.map((c, i) => (
                        <Tag key={i}>{c.name}</Tag>
                      ))
                    ) : (
                      <span className="text-gray-400 italic">
                        Nuances naturelles
                      </span>
                    )}
                  </div>
                </SpecItem>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                  <SpecItem
                    icon="icon-park-outline:lattice-pattern"
                    label="Motif"
                    value={product.motif}
                  />
                  <SpecItem
                    icon="mdi:planet"
                    label="Origine"
                    value={product.origine}
                  />
                </div>
              </div>
            </div>

            {/* BLOC GARANTIE */}
            {product.product.category.waranty && (
              <div className="bg-secondary text-white p-10 relative overflow-hidden group border border-white/5">
                {/* Décoration de fond : Cercle de lumière subtil */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-or/10 rounded-full blur-3xl" />

                <div className="relative z-10 h-full flex flex-col">
                  {/* HEADER : Badge & Titre */}
                  <div className="flex flex-col items-start gap-6 mb-8">
                    <div className="relative">
                      <img
                        src={product.product.category.waranty.imageSrc}
                        className="h-20 w-20 object-contain brightness-0 invert opacity-90 transition-transform duration-500 group-hover:scale-110"
                        alt="Logo Garantie"
                      />
                      {/* Petite décoration dorée sous le logo */}
                      <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-or" />
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-or font-bold mb-1 block">
                        Engagement Qualité
                      </span>
                      <h3 className="text-xl font-light uppercase tracking-[0.15em] leading-tight">
                        Garantie <br />
                        <span className="font-bold">Sérénité</span>
                      </h3>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-gray-400 leading-relaxed mb-8 text-justify font-light">
                    {product.product.category.waranty.description}
                  </p>

                  {/* ACTION : Bouton raffiné */}
                  {product.product.category.waranty.url && (
                    <div className="mt-auto">
                      <Link
                        href={product.product.category.waranty.url}
                        target="_blank"
                        className="group/btn relative flex items-center justify-between w-full py-4 px-6 border border-white/20 hover:border-or transition-all duration-500 overflow-hidden"
                      >
                        {/* Effet de remplissage au hover */}
                        <div className="absolute inset-0 bg-or translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />

                        <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] font-bold group-hover/btn:text-secondary transition-colors duration-500">
                          Activer ma garantie
                        </span>
                        <Icon
                          icon="solar:arrow-right-up-outline"
                          className="relative z-10 group-hover/btn:text-secondary group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all duration-500"
                          width="18"
                        />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Icône de fond stylisée */}
                <Icon
                  icon="solar:shield-check-outline"
                  className="absolute -top-6 -right-6 text-white/[0.03] w-48 h-48 -rotate-12 pointer-events-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

// Composants utilitaires pour la clarté
const SpecItem = ({ icon, label, value, children }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 bg-gray-50 p-1.5 text-gray-400">
      <Icon icon={icon} width="18" />
    </div>
    <div className="flex-1">
      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">
        {label}
      </p>
      {value ? (
        <p className="text-sm text-secondary font-medium">{value}</p>
      ) : (
        children
      )}
    </div>
  </div>
);

const Tag = ({ children }) => (
  <span className="text-[11px] px-2.5 py-1 bg-gray-50 border border-gray-100 text-secondary uppercase tracking-tighter font-medium">
    {children}
  </span>
);
