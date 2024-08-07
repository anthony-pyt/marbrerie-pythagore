import Image from "next/image";
import Button from "@/app/components/Button";
import HomeSwipper from "@/app/components/HomeSwipper";
import MainMenu from "@/app/components/MainMenu";
import ProductItem from "./components/inspiration/ProductItem";

export default function Home() {
  return (
    <main className="min-h-screen">
      <MainMenu />
      <section className="flex justify-center">
        <div className="bg-white flex h-[500px] justify-between rounded-xl overflow-hidden my-3 shadow-lg flex-wrap w-11/12">
          <div className="flex-1">
            <div className="p-20">
              <h2>
                Un savoir-faire depuis <span className="text-or">1995</span>
              </h2>
              <p className="mt-12">
                <span className="text-or">Pythagore </span>
                est avant tout une équipe d’hommes et de femmes, qui grâce à la
                passion de leur métier, ont su créer l’entreprise que nous
                incarnons aujoud’hui.
              </p>
              <div className="flex justify-end mt-12">
                <Button
                  color="primary"
                  text="Découvrir"
                  size="normal"
                  icon="watch"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 hidden lg:flex">
            <HomeSwipper />
          </div>
        </div>
      </section>
      <section className="my-16 flex flex-col items-center">
        <h2 className="text-center mb-8">Inspirez vous</h2>
        <div className="flex items-center justify-around w-10/12 flex-wrap">
          {/* <div></div> */}
          <ProductItem link="/images/romantic.jpg" />
          <ProductItem link="/images/versailles.jpg" />
          <ProductItem link="/images/IMG-4058.JPG" />
        </div>
      </section>
      <div className="flex justify-center my-12">
        <hr className="border border-or w-7/12" />
      </div>
      <section>
        <h2 className="text-center mb-8">Services pour les professionnels</h2>
      </section>
      <footer className="bg-secondary h-96 my-16"></footer>
    </main>
  );
}
