import ProductItem from "./../inspiration/ProductItem";

const InspirationWidget = () => {
  return (
    <div className="my-16 flex flex-col items-center">
      <h2 className="text-center mb-8">Inspirez vous</h2>
      <div className="flex items-center justify-around w-10/12 flex-wrap space-y-6 sm:space-y-0">
        {/* <div></div> */}
        <ProductItem link="/images/romantic.jpg" />
        <ProductItem link="/images/versailles.jpg" />
        <ProductItem link="/images/IMG-4058.JPG" />
        <ProductItem link="/images/IMG-4058.JPG" />S
      </div>
    </div>
  );
};

export default InspirationWidget;
