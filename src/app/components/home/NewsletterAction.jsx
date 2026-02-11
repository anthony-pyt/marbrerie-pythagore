"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Button from "@/components/Button";
import NewsletterModal from "./NewsletterModal"; // On va créer ce composant

const NewsletterAction = () => {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | success

  const handleOpenModal = (e) => {
    e.preventDefault();
    if (email) setIsModalOpen(true);
  };

  return (
    <section className="relative w-full flex items-stretch bg-secondary overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/nos-services/suivi_commercial.jpg"
          alt="Atelier Pythagore"
          className="w-full h-full object-cover grayscale-[30%] opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 flex flex-col justify-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-or" />
            <span className="text-or uppercase tracking-[0.5em] text-[11px] font-bold">
              Newsletter
            </span>
          </motion.div>

          <h2 className="text-4xl font-light text-white mb-8">
            Les dernières infos <br />
            <span className="text-or italic">directement chez vous.</span>
          </h2>

          <p className="text-gray-300 text-lg lg:text-xl leading-relaxed mb-12">
            Inscrivez-vous pour recevoir nos sélections exclusives de matières.
          </p>

          <AnimatePresence mode="wait">
            {status !== "success" ? (
              <motion.form
                key="form"
                onSubmit={handleOpenModal}
                className="flex flex-col sm:flex-row gap-4 items-stretch"
              >
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full h-full bg-white/10 backdrop-blur border border-white/20 rounded-none py-3 border-b-or/50 px-6 text-white placeholder:text-gray-400 outline-none focus:bg-white/20 transition-all text-lg"
                  />
                </div>
                <div className="h-full">
                  <Button
                    type="submit"
                    color="primary"
                    text="M'inscrire"
                    size="large"
                    icon="send"
                  />
                </div>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-6 p-8 bg-white/5 border border-or/30 backdrop-blur-xl rounded-lg"
              >
                <Icon
                  icon="solar:check-read-linear"
                  className="text-or text-3xl"
                />
                <div>
                  <h4 className="text-white text-xl font-medium">Merci !</h4>
                  <p className="text-gray-400">
                    Votre inscription est confirmée.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MODALE DE FINALISATION */}
      <NewsletterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialEmail={email}
        onSuccess={() => {
          setIsModalOpen(false);
          setStatus("success");
        }}
      />
    </section>
  );
};

export default NewsletterAction;
