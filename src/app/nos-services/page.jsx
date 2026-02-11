"use client";

import MainMenu from "./../components/MainMenu";
import Footer from "../components/Footer";
import ServiceCard from "../components/services/serviceCard";
import PageTitle from "../components/PageTitle";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <MainMenu />

      {/* En-tête de page avec espacement généreux */}
      <div className="pt-24 pb-12">
        <PageTitle title={"Nos services pour les professionnels"} />
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* Section unique pour une grille fluide et cohérente */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 justify-items-center">
          <ServiceCard
            title="Suivi commercial"
            image="/images/nos-services/suivi_commercial.jpg"
          >
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                <span className="text-or font-medium mr-2">—</span>
                Suivi de votre réalisation du devis à la commande.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                <span className="text-or font-medium mr-2">—</span>
                Accompagnement technique pour une adaptation optimale du produit
                à votre projet.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                <span className="text-or font-medium mr-2">—</span>
                Accueil client sur rendez-vous pour valider le matériau et la
                tranche choisie.
              </p>
            </div>
          </ServiceCard>

          <ServiceCard
            title="Formation"
            image="/images/nos-services/formation_poseurs.JPEG"
          >
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <p className="text-[10px] uppercase tracking-widest text-or font-semibold">
                Lieux : En magasin ou en nos locaux
              </p>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                <span className="text-or font-medium mr-2">—</span>
                Formation dédiée des concepteurs et installateurs.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                <span className="text-or font-medium mr-2">—</span>
                Transmission des impératifs techniques pour une garantie
                maximale de l&apos;ouvrage.
              </p>
            </div>
          </ServiceCard>

          <ServiceCard
            title="Service sur mesure"
            image="/images/savoir-faire/neolith_san_simone.png"
          >
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed font-light italic">
                De la prise de mesures à la pose finale.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                <span className="text-or font-medium mr-2">—</span>
                Équipes totalement internalisées pour un accompagnement
                quotidien.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                <span className="text-or font-medium mr-2">—</span>
                Adaptation précise de notre offre selon vos besoins spécifiques.
              </p>
            </div>
          </ServiceCard>

          <ServiceCard
            title="Service après-vente"
            image="/images/nos-services/SAV.jpg"
          >
            <div className="grid grid-cols-1 gap-2 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 bg-or rotate-45" />
                <span className="text-sm uppercase tracking-widest text-secondary">
                  Assistance technique
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 bg-or rotate-45" />
                <span className="text-sm uppercase tracking-widest text-secondary">
                  Écoute & Réactivité
                </span>
              </div>
            </div>
          </ServiceCard>

          <ServiceCard
            title="Produits & disponibilités"
            image="/images/nos-services/showroom_3.jpg"
          >
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                Granit, Quartzite, Marbre, Pierre reconstituée, Céramique
              </p>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Conseil personnalisé selon l&apos;utilisation et stock permanent
                pour une réactivité optimale.
              </p>
            </div>
          </ServiceCard>

          <ServiceCard
            title="Outils d'aide à la vente"
            image="/images/nos-services/magazines.png"
          >
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                <span className="text-or font-medium mr-2">—</span> Catalogue
                complet & Cyncly (Winner).
              </p>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                <span className="text-or font-medium mr-2">—</span> Chiffrage en
                ligne via Extranet.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                <span className="text-or font-medium mr-2">—</span> Chargé de
                clientèle & ADV dédiés.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                <span className="text-or font-medium mr-2">—</span>{" "}
                Échantillonnage personnalisé.
              </p>
            </div>
          </ServiceCard>
        </div>
      </div>

      <Footer />
    </main>
  );
}
