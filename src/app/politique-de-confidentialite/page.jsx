"use client";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import MainMenu from "../components/MainMenu";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Nature des données collectées",
      content:
        "Dans le cadre de l’utilisation du Site, l’Éditeur est susceptible de collecter les catégories de données suivantes concernant ses Utilisateurs : Données d’état-civil, d’identité, d’identification, ainsi que des données de connexion (adresses IP, journaux d’événements…).",
    },
    {
      title: "Communication des données personnelles",
      content:
        "Vos données ne font l’objet d’aucune communication à des tiers. Elles pourront toutefois être divulguées en application d’une loi, d’un règlement ou en vertu d’une décision d’une autorité réglementaire ou judiciaire compétente. En cas de fusion ou acquisition, votre consentement préalable sera recueilli.",
    },
    {
      title: "Finalité de la collecte",
      content:
        "Les données sont collectées pour la gestion de la relation client (contrats, commandes, factures), le suivi de la relation (enquêtes de satisfaction, SAV), et la gestion des demandes de droit d'accès et de rectification.",
    },
    {
      title: "Cookies et Données Techniques",
      content:
        "Conformément aux recommandations de la CNIL, la durée maximale de conservation des cookies est de 13 mois. Les données techniques (IP, configuration matérielle) sont collectées automatiquement à des fins de fourniture de service, de statistiques et de personnalisation publicitaire via nos partenaires comme Clickio.",
    },
    {
      title: "Vos Droits et Conservation",
      content:
        "Les données sont conservées pendant la durée de la relation contractuelle et jusqu'à 3 ans après la dernière activité. Vous disposez d'un droit d'accès, de rectification, de portabilité et de suppression de vos données sur simple demande auprès de l'Éditeur.",
    },
  ];

  return (
    <main className="min-h-screen">
      <MainMenu />

      <PageTitle
        title="Politique de Confidentialité"
        subtitle="Confidentialité"
      />

      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-white/10 pb-12 mb-12"
      >
        <div className="flex flex-col md:flex-row justify-center md:space-x-12 space-y-6 md:space-y-0 text-sm font-light bg-secondary text-white p-8">
          <div className="space-y-1">
            <p className="uppercase tracking-widest text-xs mb-2 text-or">
              Entreprise
            </p>
            <p className="font-medium text-white uppercase tracking-wider">
              Marbrerie Pythagore
            </p>
            <p>Z.A. de Pen Ar Hoat</p>
            <p>22570 LANISCAT</p>
          </div>
          <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-12">
            <p className="uppercase tracking-widest text-xs mb-2 text-or">
              Identité
            </p>
            <p>SIREN : 399 797 166</p>
            <p>RCS Saint-Brieuc</p>
            <p>Code APE : 2370Z</p>
          </div>
        </div>
      </motion.div>
      <div className="max-w-4xl mx-auto">
        {/* Corps du texte */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <h2 className="text-or text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-or/30 group-hover:w-12 transition-all"></span>
                {section.title}
              </h2>
              <p className="text-gray-800 font-light leading-relaxed text-sm md:text-base">
                {section.content}
              </p>
            </motion.section>
          ))}
        </div>

        {/* Clause d'arbitrage & Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-8 bg-white/5 border border-white/10 italic text-sm  font-light"
        >
          <p>
            Tout litige né de l’exécution des présentes sera soumis à une
            procédure d’arbitrage d’un commun accord. Pour toute question
            concernant vos données :{" "}
            <span className=" underline">contact@marbrerie-pythagore.fr</span>
          </p>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
