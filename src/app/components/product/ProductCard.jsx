import { Icon } from "@iconify/react";
import { useState } from "react";
import { ModalProduct } from "./ModalProduct";

const ProductCard = ({ product, animationDelay }) => {
  console.log(product);
  
  const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = (value) => {
      setIsOpenModal(value);
    };
  return (
    <>
      {isOpenModal && (
        <ModalProduct
          openModal={openModal}
          open={isOpenModal}
          setOpen={openModal}
          product={product}
        />
      )}
      <div className="relative max-w-72 min-w-72 min-h-64 bg-white rounded-xl drop-shadow-xl border m-8 flex flex-col justify-between">
        <div>
          <div className="flex justify-center">
            <button
              onClick={() => openModal(true)}
              // className="group relative h-48 bg-primary w-11/12 flex items-center justify-center rounded-xl shadow-lg -mt-6 overflow-hidden animate__animated animate__backInDown"
              className="group relative h-48 bg-primary w-11/12 flex items-center justify-center rounded-xl shadow-lg -mt-6 overflow-hidden"
              style={{ animationDelay }}
            >
              {product.image_url && (
                <img
                  lazy="true"
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
                {product.product.category.logo_url != null ? (
                  <img
                    src={product.category.logo_url}
                    className="h-4 p-0.5 bg-white rounded px-2"
                  />
                ) : (
                  <div className="border border-or inline-block px-2 rounded-lg leading-3 bg-white">
                    <span className="text-or text-xs">
                      {product.product.category.label}
                    </span>
                  </div>
                )}
              </div>
            </button>
          </div>
          <div className="px-4 py-2 overflow-hidden">
            <p className="font-semibold font-title mb-0.5">{product.label}</p>
          </div>
        </div>
        <div className="p-3 space-y-1">
          <div className="flex flex-wrap items-center space-x-1 text-xs">
            <Icon icon="solar:sticker-square-outline" width="18" height="18" />
            {product.finitions.map((item, index) => (
              <div
                className="lowercase bg-primary/25 px-2 py-0.5 rounded"
                key={item.finition.id}
              >
                <span className="text-secondary">{item.finition.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center space-x-1 text-xs">
            <Icon icon="solar:ruler-angular-outline" width="18" height="18" />
            {product?.thiknesses.map((item, index) => (
              <div
                className="lowercase bg-primary/25 px-2 py-0.5 rounded"
                key={item.thikness_plan.id}
              >
                <span className="text-secondary">{item.thikness_plan.label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-1 absolute right-3 bottom-3 ">
            {product.eco === 1 && (
              <Icon
                icon="mdi:ecology"
                width="24"
                height="24"
                className="drop-shadow text-green-600"
              />
            )}
            {product.heart === 1 && (
              <Icon
                icon="solar:heart-bold"
                width="20"
                height="20"
                style={{ color: "#ff0000" }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
