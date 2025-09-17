'use client'

import MainMenu from "./../components/MainMenu";
import Footer from "../components/Footer";
import ServiceCard from "../components/services/serviceCard";
import PageTitle from "../components/PageTitle";

export default function Page() {
  return (
    <main className="min-h-screen">
      <MainMenu />
      <div className="p-4">
        <PageTitle title={"Nos services pour les professionnels"} />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 my-12 md:gap-16 justify-items-center">
            <ServiceCard
              title="Suivi commercial"
              image="/images/nos-services/suivi_commercial.jpg"
            >
              <ul className="list-disc ml-4">
                <li className="text-justify">
                  Suivi de votre réalisation du devis à la commande
                </li>
                <li className="text-justify">
                  Accompagnement technique pour une adaptation du produit à
                  votre réalisation
                </li>
                <li className="text-justify">
                  Accueil client sur rendez-vous, en accord avec le
                  professionnel en charge du projet, pour valider le matériau et
                  la tranche choisie
                </li>
              </ul>
            </ServiceCard>
            <ServiceCard
              title="Formation"
              image="/images/nos-services/formation_poseurs.JPEG"
            >
              <ul className="list-disc ml-4">
                <li className="text-justify">En magasin ou en nos locaux</li>
                <li className="text-justify">Des concepteurs</li>
                <li className="text-justify">Des installateurs</li>
                <li className="text-justify">
                  Transmission des impératifs techniques pour une garantie
                  maximale de votre ouvrage
                </li>
              </ul>
            </ServiceCard>
            <ServiceCard
              title="service sur mesure"
              image="/images/savoir-faire/neolith_san_simone.png"
            >
              <ul className="list-disc ml-4">
                <li className="text-justify">
                  De la prise de mesures à la pose.
                </li>
                <li className="text-justify">
                  Nos équipes totalement internalisées vous accompagnent au
                  quotidien.{" "}
                </li>
                <li className="text-justify">
                  Selon votre besoin nous adaptons notre offre
                </li>
              </ul>
            </ServiceCard>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 my-12 gap-16 justify-items-center">
            <ServiceCard
              title="Service après-vente"
              image="/images/nos-services/SAV.jpg"
            >
              <ul className="list-disc ml-4">
                <li className="text-justify">Assistance technique</li>
                <li className="text-justify">Ecoute</li>
                <li className="text-justify">Réactivité</li>
              </ul>
            </ServiceCard>
            <ServiceCard
              title="Produits & disponibilités"
              image="/images/nos-services/showroom_3.jpg"
            >
              <ul className="list-disc ml-4">
                <li className="text-justify">
                  Granit, Quartzite, Marbre, Pierre reconstituée, Céramique
                </li>
                <li className="text-justify">
                  Selon votre utilisation, nous vous conseillons dans votre
                  choix
                </li>
                <li className="text-justify">
                  Un stock permanent pour une meilleure réactivité
                </li>
              </ul>
            </ServiceCard>
            <ServiceCard
              title="Outils d'aide à la vente"
              image="/images/nos-services/magazines.png"
            >
              <ul className="list-disc ml-4">
                <li className="text-justify">
                  Un catalogue synthétisant toutes les offres Produits
                </li>
                <li className="text-justify">
                  Possiblité de télécharger notre catalogue sur Cyncly (Winner)
                </li>
                <li className="text-justify">
                  Un logiciel de chiffrage en ligne via notre "Extranet"
                </li>
                <li className="text-justify">
                  Un-e chargé-e de clientèle sur votre secteur
                </li>
                <li className="text-justify">
                  un ADV pour un suivi personnalisé
                </li>
                <li className="text-justify">
                  Échantillonnage selon votre besoin
                </li>
              </ul>
            </ServiceCard>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
