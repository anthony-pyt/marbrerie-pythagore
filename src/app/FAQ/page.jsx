"use client";

import { useState } from "react";
import MainMenu from "../components/MainMenu";
import PageTitle from "../components/PageTitle";

const faqData = [
  {
    question: "Comment obtenir un devis ?",
    answer:
      "En répondant au formulaire contact en étant le plus précis possible.",
  },
  {
    question: "Comment se déroule le règlement ?",
    answer: "Les modalités de règlement seront précisées lors de la commande.",
  },
  {
    question: "Quels sont les délais de fabrication ?",
    answer:
      "Les délais varient en fonction du projet. Contactez-nous pour plus d’informations.",
  },
  {
    question: "Comment se passe la commande ?",
    answer:
      "Toute commande est enregistrée après validation du devis. Ensuite, nous planifions la prise de mesures, puis dans un second temps l’installation de votre agencement en pierre.",
  },
  {
    question: "Comment obtenir des échantillons ?",
    answer:
      "En contactant votre chargé(e) de clientèle qui s’occupera de vous apporter les échantillons demandés. Si vous n’êtes pas en contact avec un ou une chargé(e) de clientèle, vous pouvez vous rapprocher de notre service administratif des ventes via le formulaire contact.",
  },
  {
    question: "Comment entretenir son plan de travail au quotidien ?",
    answer:
      "Que votre plan de travail soit en pierre ou en céramique, vous pouvez le nettoyer avec un savon PH neutre et rincer avec de l’eau claire. Pour une pierre naturelle, appliquez de l’hydrofuge environ une fois par an.",
  },
  {
    question: "Quelles sont vos horaires d’ouverture ?",
    answer:
      "Nous sommes ouverts seulement sur rendez-vous du lundi au jeudi de 9h00 à 13h00 et de 14h00 à 17h30 et le vendredi de 9h00 à 13h00 et de 14h00 à 16h30.",
  },
];

export default function Page() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen">
      <MainMenu />
      <PageTitle title="Foire aux questions" />
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 ease-in-out"
          >
            <button
              className="w-full text-left py-4 px-6 flex justify-between items-center focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-gray-800">{item.question}</span>
              <span className="text-gray-500 transition-transform duration-300 ease-in-out transform">
                {openIndex === index ? (
                  <svg
                    className="w-5 h-5 rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                )}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600 bg-gray-50 py-4 text-justify">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
