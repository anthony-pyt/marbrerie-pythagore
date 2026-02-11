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

  if (!product) return null;

  return (
    <main className="min-h-screen bg-white">
      <MainMenu />

      <PageTitle
        title={product.label}
        subtitle={product.product.category.label}
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
              <div className="bg-secondary text-white p-8 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={product.product.category.waranty.imageSrc}
                      className="h-16 w-16 rounded-full border-2 border-white/20 p-1 bg-white"
                      alt="Garantie"
                    />
                    <h3 className="font-bold tracking-tight italic">
                      Garantie & Sérénité
                    </h3>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed mb-6 text-justify">
                    {product.product.category.waranty.description}
                  </p>

                  {product.product.category.waranty.url && (
                    <Link
                      href={product.product.category.waranty.url}
                      target="_blank"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-or text-secondary text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors"
                    >
                      Activer ma garantie{" "}
                      <Icon icon="si:arrow-right-duotone" width="18" />
                    </Link>
                  )}
                </div>
                {/* Décoration en arrière-plan */}
                <Icon
                  icon="mdi:shield-check"
                  className="absolute -bottom-4 -right-4 text-white/5 w-32 h-32 rotate-12"
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
