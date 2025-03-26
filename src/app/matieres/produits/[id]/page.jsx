"use client";

import { Icon } from "@iconify/react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import MainMenu from "@/components/MainMenu";
import PageTitle from "@/components/PageTitle";
import Footer from "@/components/Footer";
import Slider from "@/components/product/Slider";
import Link from "next/link";

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
      <div className="p-8 max-w-7xl mx-auto">
        {product.image_url && (
          <div className="rounded-lg overflow-hidden flex flex-col items-center mb-8">
            <img
              src={product.image_url}
              className="w-full object-cover h-[350px]"
            />
          </div>
        )}
        <div className="text-center lg:text-left flex flex-col items-stretch justify-between lg:flex-row ">
          <div className="flex-1 bg-primary/20 rounded-xl p-3 my-2 mr-2">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-xl flex items-center space-x-4">
                Plus d'infos...
              </h3>
              <div className="m-2">
                {product.product.category.logo_url ? (
                  <img
                    src={product.product.category.logo_url}
                    className="h-8 p-0.5 bg-white rounded px-2"
                  />
                ) : (
                  <div className="border border-or inline-block px-2 rounded-full leading-3 bg-white">
                    <span className="text-or">
                      {product.product.category.label}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="divide-y divide-gray-300 divi text-sm">
              <div className="flex flex-wrap justify-between items-center p-2">
                <p>Matériau</p>
                <div className="font-bold">
                  <span className="text-secondary">
                    {product.product.category.parent.label ?? "Non spécifié"}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-between items-center p-2">
                <p>Finitions</p>
                <div className="flex items-center space-x-1">
                  {product?.finitions.map((item) => (
                    <div
                      className="lowercase border shadow px-2 py-0.5 rounded"
                      key={item.id}
                    >
                      <span className="text-secondary">
                        {item.finition.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap justify-between items-center p-2">
                <p>Épaisseurs</p>
                <div className="flex items-center space-x-1">
                  {product?.thiknesses.map((item) => (
                    <div
                      className="lowercase border shadow px-2 py-0.5 rounded"
                      key={item.id}
                    >
                      <span className="text-secondary">
                        {item.thikness_plan.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap justify-between items-center p-2">
                <p>Couleurs</p>
                {product.colories.length > 0 ? (
                  product.colories.map((color, index) => (
                    <div
                      className="lowercase border shadow px-2 py-0.5 rounded"
                      key={index}
                    >
                      <span className="text-secondary">{color.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="border shadow px-2 py-0.5 rounded">
                    <span className="text-secondary">Non spécifié</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap justify-between items-center p-2">
                <p>Motif</p>
                <div className="border shadow px-2 py-0.5 rounded">
                  <span className="text-secondary">
                    {product.motif ?? "Non spécifié"}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-between items-center p-2">
                <p>Origine</p>
                <div className="border shadow px-2 py-0.5 rounded">
                  <span className="text-secondary">
                    {product.origine ?? "Non spécifié"}
                  </span>
                </div>
              </div>
              {/* <div className="flex flex-wrap items-center space-x-1">
              <Icon icon="arcticons:rocksndiamonds" width="18" height="18" />
              <div className="border shadow px-2 py-0.5 rounded">
                <span className="text-secondary">
                  {product.type_materiau ?? "Non spécifié"}
                </span>
              </div>
            </div> */}
            </div>
            {product.durable == 1 && (
              <div className="flex items-center justify-end mt-4 space-x-2 text-sm">
                <span>Produit durable</span>
                <Icon
                  icon="mdi:ecology"
                  width="24"
                  height="24"
                  className="text-green-600"
                />
              </div>
            )}
          </div>
          <div className="flex-1 bg-primary/20 rounded-xl p-3 my-2 ml-2 flex flex-col justify-between">
            {product.product.category.waranty && (
              <div className="flex flex-col items-center space-x-4 justify-center h-full">
                <div className="flex justify-end">
                  <img
                    src={`${product.product.category.waranty.imageSrc}`}
                    loading="lazy"
                    alt={product.product.category.waranty.title}
                    className="object-cover min-w-48 max-w-48 min-h-48 max-h-48 rounded-full p-2"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-justify">
                    {product.product.category.waranty.description}
                  </p>
                </div>
                {product.product.category.waranty.url && (
                  <div className="mt-4 p-4 bg-white border rounded-lg text-center text-sm">
                    <p className="text-sm text-gray-700 font-medium">
                      Votre garantie produit n'est pas encore activée ?
                    </p>
                    <Link
                      href={product.product.category.waranty.url}
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
            )}
          </div>
        </div>
        <div className="my-8">
          <Slider images={product.images} principal_image={product.image_url} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
