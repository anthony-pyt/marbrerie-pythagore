import MainMenu from "@/app/components/MainMenu";
import Footer from "../components/Footer";
import ServiceCard from "../components/services/serviceCard";

export default function Page() {
  return (
    <main className="min-h-screen">
      <MainMenu />
      <div className="p-4">
        <h2>
          Nos services pour les <span className="text-or">professionnels</span>{" "}
        </h2>
        <div className="flex items-stretch justify-center lg:justify-start flex-wrap my-12 mx-6">
          <ServiceCard title="Conseil" type="conseil">
            <ul>
              <li>- Sur les produits</li>
              <li>- Les caractéristiques des matières</li>
              <li>- La bonne utilisation de sproduits pour chaque agencement</li>
            </ul>
          </ServiceCard>
          <ServiceCard title="Formation" type="formation">
            <ul>
              <li>- Pour les installateurs pour des agencements</li>
              <li>
                - Connaissances des impératifs techniques nécessaires pour
                garantir une installation optimale
              </li>
            </ul>
          </ServiceCard>
          <ServiceCard title="Prestation complète" type="prestation">
            <ul>
              <li>- Prise de cote</li>
              <li>- Fabrication</li>
              <li>- Pose des agencements sur mesure</li>
            </ul>
          </ServiceCard>
        </div>
        <div className="flex items-stretch justify-center lg:justify-start flex-wrap my-12 mx-6">
          <ServiceCard title="SAV" type="sav">
            <p>
              Notre service après-vente est à votre disposition pour répondre à
              toutes vos demandes.
            </p>
          </ServiceCard>
          <ServiceCard title="Choix et disponibilité produits" type="choix">
            Nous sommes présents pour vous accompagner dans le choix des
            produits et garantir leur disponibilité.
          </ServiceCard>
          <ServiceCard title="Outils d'aide à la vente" type="outils">
            <ul>
              <li>
                - Un catalogue répertoriant toutes nos références et leurs
                caractéristiques détaillées
              </li>
              <li>- Des échantillons de matériaux</li>
              <li>
                - Un espace professionnel vous permettant de réaliser des devis en
                ligne rapidement
              </li>
            </ul>
          </ServiceCard>
        </div>
      </div>
      <Footer />
    </main>
  );
}
