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
        <div className="flex items-stretch justify-center flex-wrap my-12 mx-6">
          <ServiceCard title="Suivi commercial" image="/images/conseil.jpg">
            <ul className="list-disc ml-4">
              <li>Suivi de votre réalisation du devis à la commande</li>
              <li>
                Accompagnement technique pour une adaptation du produit à votre
                réalisation
              </li>
            </ul>
          </ServiceCard>
          <ServiceCard title="Formation" image="/images/formation.jpg">
            <ul className="list-disc ml-4">
              <li>En magasin ou en nos locaux</li>
              <li>Des concepteurs</li>
              <li>Des installateurs</li>
              <li>
                Transmission des impératifs techniques pour une garantie
                maximale de votre ouvrage
              </li>
            </ul>
          </ServiceCard>
          <ServiceCard
            title="Un service sur mesure"
            image="/images/prestation.jpg"
          >
            <ul className="list-disc ml-4">
              <li>De la prise de mesures à la pose.</li>
              <li>Nos équipes totalement
              internalisées vous accompagnent au quotidien. </li>
              <li>Selon votre besoin
              nous adaptons notre offre</li>
            </ul>
          </ServiceCard>
        </div>
        <div className="flex items-stretch justify-center flex-wrap my-12 mx-6">
          <ServiceCard title="Service après-vente" image="/images/sav.jpg">
            <ul className="list-disc ml-4">
              <li>Assistance technique</li>
              <li>Ecoute</li>
              <li>Réactivité</li>
            </ul>
          </ServiceCard>
          <ServiceCard
            title="Produits & disponibilités"
            image="/images/choix.jpg"
          >
            <ul className="list-disc ml-4">
              <li>
                Granit, Quartzite, Marbres, Pierre reconstituées, Céramiques
              </li>
              <li>
                Selon votre utilisation, nous vous conseillons dans votre choix
              </li>
              <li>Un stock permanent pour une meilleure réactivité</li>
            </ul>
          </ServiceCard>
          <ServiceCard
            title="Outils d'aide à la vente"
            image="/images/outils.jpg"
          >
            <ul className="list-disc ml-4">
              <li>Un catalogue synthétisant toutes les offres Produits</li>
              <li>
                Possiblité de télécharger notre catalogue sur Cyncly (Winner)
              </li>
              <li>Un logiciel de chiffrage en ligne via notre "Extranet"</li>
              <li>Un-e chargé-e de clientèle sur votre secteur</li>
              <li>un ADV pour un suivi personnalisé</li>
              <li>Échnatillonnage selon votre besoin</li>
            </ul>
          </ServiceCard>
        </div>
      </div>
      <Footer />
    </main>
  );
}
