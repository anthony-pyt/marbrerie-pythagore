"use client";

import { Icon } from "@iconify/react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import MainMenu from "../../../components/MainMenu";
import PageTitle from "../../../components/PageTitle";
import Footer from "../../../components/Footer";

export default function Page({ params }) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_STOCK_URL}/external-products/${params.id}`
        );
        console.log(response.data);

        setProduct(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (Object.keys(product).length === 0) {
    return (
      <div className="mt-28 flex flex-col items-center">
        <div className="h-32 overflow-hidden flex justify-center items-center">
          <img src="/images/loaders/loader-pythagore.gif" className="h-40" />
        </div>
        <p>Chargement des données...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title={`${product.product.category.label} ${product.label}`} />
      <div className="p-8 flex flex-col lg:flex-row lg:space-x-6 xl:space-x-12">
        <div className="rounded-lg overflow-hidden flex flex-col items-center">
          <img
            src={product.image_url}
            loading="lazy"
            alt={product.label}
            className="object-cover h-[450px] w-[450px] rounded-lg"
          />
          <div className="flex items-center justify-between w-full mt-2">
            {product.images && product.images.length > 0
              ? product.images.map((image, imageIndex) => (
                  <img
                    src={image.image_url}
                    loading="lazy"
                    alt={product.label}
                    className="object-cover h-[145px] w-[145px] rounded-lg"
                    key={imageIndex}
                  />
                ))
              : [1, 2, 3].map((_, index) => (
                  <img
                    src={product.image_url}
                    loading="lazy"
                    alt={`Image par défaut ${index + 1}`}
                    className="object-cover h-[145px] w-[145px] rounded-lg"
                    key={index}
                  />
                ))}
          </div>
        </div>

        <div className="text-center lg:text-left flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-2xl flex items-center space-x-4">
              {product.eco == 1 && (
                <Icon
                  icon="mdi:ecology"
                  width="24"
                  height="24"
                  className="text-green-600"
                />
              )}
            </h3>
            <div className="absolute top-1 right-1 m-2">
              {product.product.category.logo_url ? (
                <img
                  src={product.product.category.logo_url}
                  className="h-5 p-0.5 bg-white rounded px-2"
                />
              ) : (
                <div className="border border-or inline-block px-2 rounded-full leading-3 bg-white">
                  <span className="text-or">
                    {product.product.category.label}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center space-x-1 m-3">
              <Icon
                icon="solar:sticker-square-outline"
                width="18"
                height="18"
              />
              {product?.finitions.map((item) => (
                <div
                  className="lowercase bg-primary/25 px-2 py-0.5 rounded"
                  key={item.id}
                >
                  <span className="text-secondary">{item.finition.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center space-x-1 m-3">
              <Icon icon="solar:ruler-angular-outline" width="18" height="18" />
              {product?.thiknesses.map((item) => (
                <div
                  className="lowercase bg-primary/25 px-2 py-0.5 rounded"
                  key={item.id}
                >
                  <span className="text-secondary">
                    {item.thikness_plan.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center space-x-1 m-3">
              <Icon icon="fluent:color-24-regular" width="18" height="18" />
              {product.colories.length > 0 ? (
                product.colories.map((color, index) => (
                  <div
                    className="lowercase bg-primary/25 px-2 py-0.5 rounded"
                    key={index}
                  >
                    <span className="text-secondary">{color.name}</span>
                  </div>
                ))
              ) : (
                <div className="bg-primary/25 px-2 py-0.5 rounded">
                  <span className="text-secondary">Non spécifié</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center space-x-1 m-3">
              <Icon
                icon="icon-park-outline:lattice-pattern"
                width="18"
                height="18"
              />
              <div className="bg-primary/25 px-2 py-0.5 rounded">
                <span className="text-secondary">
                  {product.motif ?? "Non spécifié"}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center space-x-1 m-3">
              <Icon icon="mdi:planet" width="18" height="18" />
              <div className="bg-primary/25 px-2 py-0.5 rounded">
                <span className="text-secondary">
                  {product.origine ?? "Non spécifié"}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center space-x-1 m-3">
              <Icon icon="arcticons:rocksndiamonds" width="18" height="18" />
              <div className="bg-primary/25 px-2 py-0.5 rounded">
                <span className="text-secondary">
                  {product.type_materiau ?? "Non spécifié"}
                </span>
              </div>
            </div>
          </div>
          {product.product.category.waranty && (
            <div className="flex flex-col lg:flex-row items-center flex-shrink space-x-4 justify-center bg-primary/40 rounded-xl p-4">
              <div className="flex justify-end">
                <img
                  src={`${product.product.category.waranty.image_url}`}
                  loading="lazy"
                  alt={product.product.category.waranty.title}
                  className="object-cover min-w-48 max-w-48 min-h-48 max-h-48 rounded-full p-4 bg-white"
                />
              </div>
              <div className="flex flex-col items-start">
                <h6>Garantie</h6>
                <p className="text-left">
                  {product.product.category.waranty.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
