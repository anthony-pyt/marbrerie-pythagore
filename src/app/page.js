"use client";
import Button from "@/app/components/Button";
import HomeSwipper from "@/app/components/HomeSwipper";
import MainMenu from "@/app/components/MainMenu";
import ProductItem from "./components/inspiration/ProductItem";
import BubbleIcon from "./components/BubbleIcon";
import AvisClient from "./components/AvisClient";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <MainMenu />
      <section className="flex justify-center animate__animated animate__fadeInDownBig">
        <div className="bg-white flex h-auto lg:h-[500px] justify-between rounded-xl overflow-hidden my-3 shadow-lg flex-wrap w-11/12">
          <div className="flex-1">
            <div className=" py-12 lg:py-20 px-4 lg:px-20">
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
        <div className="flex items-center justify-around w-10/12 flex-wrap space-y-6">
          {/* <div></div> */}
          <ProductItem link="/images/romantic.jpg" />
          <ProductItem link="/images/versailles.jpg" />
          <ProductItem link="/images/IMG-4058.JPG" />
        </div>
      </section>
      <section className="bg-primary py-24">
        <h2 className="text-center mb-12 text-secondary">Services pour les professionnels</h2>
        <div className="flex flex-col md:flex-row flex-wrap items-center 2xl:justify-around justify-center">
          <div>
            <BubbleIcon icon="solar:user-speak-outline" link="/nos-services">
              <p>Conseil et formation</p>
            </BubbleIcon>
          </div>
          <div>
            <BubbleIcon
              icon="solar:notebook-minimalistic-outline"
              link="/nos-services"
            >
              <p>Choix et disponibilité des produits</p>
              <p>Outils d&apos;aide à la vente</p>
            </BubbleIcon>
          </div>
          <div>
            <BubbleIcon
              icon="solar:settings-minimalistic-outline"
              link="/nos-services"
            >
              <p>Prestation complète</p>
              <p>SAV</p>
            </BubbleIcon>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-center my-8">Avis de nos clients</h2>
        <div className="flex items-start justify-evenly flex-wrap">
          <AvisClient
            note={5}
            name="Alain Connu"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          e et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequa"
            date="07/08/2024"
          />
          <AvisClient
            note={5}
            name="Jean Neymar"
            text="Lorem ipsum dolor sit amet, consecte, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequa"
            date="24/06/2024"
          />
          <AvisClient
            note={4}
            name="Guy Tare"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exer"
            date="17/04/2024"
          />
          <AvisClient
            note={5}
            name="Gérard Manvussa"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor iagna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequa"
            date="07/02/2024"
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
