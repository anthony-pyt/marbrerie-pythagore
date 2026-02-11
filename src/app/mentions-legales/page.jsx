"use client";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import MainMenu from "../components/MainMenu";
import PageTitle from "../components/PageTitle";
import Footer from "@/components/Footer";

export default function MentionsLegales() {
  const sections = [
    {
      title: "Édition du site",
      content:
        "Le présent site est édité par la société Marbrerie Pythagore, société à responsabilité limitée au capital de 179 400 €, inscrite au Registre du Commerce et des Sociétés de Saint-Brieuc sous le numéro 399 797 166. Le siège social est situé au Z.A. de Pen Ar Hoat, 22570 LANISCAT.",
    },
    {
      title: "Responsable de publication",
      content:
        "Le responsable de la publication du site est la direction de la Marbrerie Pythagore. Pour toute demande concernant le contenu du site, vous pouvez nous contacter à l'adresse email suivante : contact@marbrerie-pythagore.fr.",
    },
    {
      title: "Hébergement",
      content:
        "Le site est hébergé par la société Vercel Inc., située au 340 S Lemon Ave #1135 Walnut, CA 91789, USA. Les serveurs de stockage sont situés au sein de l'Union Européenne.",
    },
    {
      title: "Propriété intellectuelle",
      content:
        "L'ensemble des contenus présents sur ce site (textes, images, logos, design) est la propriété exclusive de la Marbrerie Pythagore, sauf mention contraire. Toute reproduction ou représentation, intégrale ou partielle, du site ou de l'un des éléments qui le composent, sans l'autorisation préalable de l'Éditeur, est interdite.",
    },
    {
      title: "Limitations de responsabilité",
      content:
        "L'Éditeur s'efforce d'assurer l'exactitude des informations diffusées sur le site. Toutefois, il ne peut garantir l'exhaustivité des contenus. L'Éditeur décline toute responsabilité en cas d'interruption du service, de bogues ou de dommages résultant d'une intrusion frauduleuse d'un tiers.",
    },
  ];

  return (
    <main className="min-h-screen">
      <MainMenu />

      <PageTitle title="Mentions Légales" subtitle="Légalité" />

      {/* En-tête avec les infos clés */}
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
      </div>
      <Footer />
    </main>
  );
}
