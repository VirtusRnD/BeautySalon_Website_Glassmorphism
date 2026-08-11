import React from "react";
import { config } from "../config";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Reviews = () => {
  const { reviews } = config;
  const { t } = useTranslation();

  // 👑 Fetch both the structural config and the translated text array
  const reviewTexts = t("reviews.items", { returnObjects: true }) || [];
  const reviewConfigs = reviews.items || [];

  const SparkleIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-gold-accent"
    >
      <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
    </svg>
  );
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="reviews"
      className="relative w-full py-24 md:py-32 overflow-hidden bg-ocean-dark shadow-2xl"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] md:w-[800px] h-[300px] bg-gold-accent/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-ocean-light/20 blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-ocean-main/30 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-24 flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-col items-center text-center mb-16 md:mb-20 max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <SparkleIcon />
            <span className="font-sans text-xs md:text-sm font-semibold tracking-[0.15em] uppercase text-gold-accent">
              {t("reviews.overline")}
            </span>
            <SparkleIcon />
          </div>

          <h2 className="font-script text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.1] font-normal text-white mb-6 tracking-wide drop-shadow-md">
            {t("reviews.title")}
          </h2>

          <p className="font-sans font-light text-white/70 leading-relaxed text-sm md:text-base">
            {t("reviews.description")}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
        >
          {reviewConfigs.map((item, index) => {
            // 👑 Match the config item with its translated counterpart
            const text = reviewTexts[index] || {};

            return (
              <motion.div
                variants={fadeUp}
                key={item.id}
                className="group relative flex flex-col p-8 md:p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <FaQuoteLeft className="absolute top-6 right-6 text-white/5 text-6xl md:text-8xl -rotate-12 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />

                <div className="flex gap-1.5 mb-6 relative z-10">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-gold-accent text-sm md:text-base"
                    />
                  ))}
                </div>

                <p className="font-sans font-light text-white/80 leading-relaxed text-sm md:text-base flex-grow mb-8 relative z-10">
                  "{text.review}"
                </p>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                    <img
                      src={item.avatar}
                      alt={text.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-white font-medium tracking-wide">
                      {text.name}
                    </span>
                    <span className="font-sans text-xs text-white/50 tracking-wider uppercase mt-0.5">
                      {text.service}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
