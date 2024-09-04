import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product, animationDelay }) => {
  return (
    <Link
      href={`/matieres/catalogue/produit/${product.id}`}
      className="max-w-72 min-w-72 min-h-64 bg-white rounded-xl shadow-xl border m-8 flex flex-col justify-between group cursor-pointer"
    >
      <div>
        <div className="flex justify-center">
          <div
            className="relative h-48 bg-primary w-11/12 flex items-center justify-center rounded-xl shadow-lg -mt-6 overflow-hidden animate__animated animate__backInDown"
            style={{ animationDelay }}
          >
            {product.image_url && (
              <img
                width={300}
                height={300}
                src={product.image_url}
                loading="lazy"
                alt={product.label}
                className="object-cover w-full h-full"
              />
            )}

            {/* Overlay qui apparaît au survol */}
            <div className="absolute inset-0 bg-secondary/80 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col items-center justify-center">
              <Icon
                icon="solar:link-round-angle-outline"
                color="#fff"
                width="48"
                height="48"
              />
              <span className="text-white font-thin font-sans text-xs">
                Plus de détails
              </span>
            </div>

            <div className="absolute top-1 right-1">
              {product.category.logo_url != null ? (
                <img src={product.category.logo_url} className="h-4 p-0.5 bg-white rounded px-2" />
              ) : (
                <div className="border border-or inline-block px-2 rounded-full leading-3 bg-white">
                  <span className="text-or text-xs">
                    {product.category.label}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-4 py-2 overflow-hidden">
          <p className="font-semibold font-title mb-0.5">{product.label}</p>
        </div>
      </div>
      <div className="p-3 space-y-1">
        <div className="flex flex-wrap items-center space-x-1 text-xs">
          <Icon icon="solar:sticker-square-outline" width="18" height="18" />
          {product?.finition.map((finition, index) => (
            <div
              className="lowercase bg-primary/25 px-2 py-0.5 rounded"
              key={finition.id}
            >
              <span className="text-secondary">{finition.label}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center space-x-1 text-xs">
          <Icon icon="solar:ruler-angular-outline" width="18" height="18" />
          {product?.thikness.map((thikness, index) => (
            <div
              className="lowercase bg-primary/25 px-2 py-0.5 rounded"
              key={thikness.id}
            >
              <span className="text-secondary">{thikness?.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
