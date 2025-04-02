import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  retardInterval,
  titleSize = "text-2xl",
}) => {
  const [active, setActive] = useState(0);
  const [rotateValues, setRotateValues] = useState([]);
  const [isPaused, setIsPaused] = useState(false); // État pour gérer la pause

  useEffect(() => {
    setRotateValues(testimonials.map(() => randomRotateY()));
  }, []);

  const handleNext = () => {
    if (!isPaused) {
      setActive((prev) => (prev + 1) % testimonials.length);
    }
  };

  const handlePrev = () => {
    if (!isPaused) {
      setActive(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      );
    }
  };

  useEffect(() => {
    if (autoplay && !isPaused) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, isPaused]);

  const randomRotateY = () => {
    if (typeof window === "undefined") return 0; // Valeur fixe côté serveur
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="max-w-sm md:max-w-7xl mx-auto antialiased font-sans lg:px-12 py-12">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-96 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotateValues[index] || 0,
                  }}
                  animate={{
                    opacity: index === active ? 1 : 0.7,
                    scale: index === active ? 1 : 0.95,
                    z: index === active ? 0 : -100,
                    rotate: index === active ? 0 : rotateValues[index], // Fixe la rotation
                    zIndex:
                      index === active ? 10 : testimonials.length + 2 - index,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotateValues[index], // Fixe la rotation
                  }}
                  transition={{
                    duration: isPaused ? undefined : 0.4,
                    ease: "easeInOut",
                  }}
                  onMouseEnter={() => setIsPaused(true)} // Activer la pause
                  onMouseLeave={() => setIsPaused(false)} // Désactiver la pause
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={750}
                    height={750}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        {/* Texte et boutons */}
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: isPaused ? undefined : 20,
              opacity: isPaused ? undefined : 0,
            }}
            animate={{
              y: isPaused ? undefined : 0,
              opacity: isPaused ? undefined : 1,
            }}
            exit={{
              y: isPaused ? undefined : -20,
              opacity: isPaused ? undefined : 0,
            }}
            transition={{
              duration: isPaused ? undefined : 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className={`${titleSize} font-bold text-black`}>
              {testimonials[active].name}
            </h3>
            <p className="text-sm">{testimonials[active].designation}</p>
            <motion.p className="mt-8">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: isPaused ? undefined : 0,
                    y: isPaused ? undefined : 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: isPaused ? undefined : 1,
                    y: isPaused ? undefined : 0,
                  }}
                  transition={{
                    duration: isPaused ? undefined : 0.2,
                    ease: "easeInOut",
                    delay: isPaused ? undefined : index * 0.02,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          {/* Boutons de navigation */}
          <div className="flex justify-end gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center group/button"
            >
              <IconArrowLeft className="h-5 w-5 text-black group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center group/button"
            >
              <IconArrowRight className="h-5 w-5 text-black group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;
