const ProductCard = ({ product, animationDelay }) => {
  return (
    <div className="overflow-hidden">
      <div className="max-w-72 min-w-72 min-h-72 bg-white rounded-xl shadow-xl border m-8">
        <div className="flex justify-center">
          <div
            className="relative bg-secondary h-48 w-11/12 flex items-center justify-center rounded-xl shadow-lg -mt-6 overflow-hidden animate__animated animate__backInDown"
            style={{ animationDelay }}
          >
            {/* <img
            className="w-full h-48 object-cover"
            src={`/images/${type}.jpg`}
            loading="lazy"
          /> */}
            <div className="absolute bottom-1 left-1 flex items-center space-x-1 text-xs lowercase">
              <div className="bg-white rounded-full px-2 shadow-lg">
                {product?.finition?.label}
              </div>
              <div className="bg-white rounded-full px-2 shadow-lg">
                {product?.thikness?.label}
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 overflow-hidden">
          <p className="font-semibold mb-0.5">{product.label}</p>
          <div className="border border-or inline-block px-2 rounded-full leading-3">
            <span className="text-or text-xs">{product.category.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
