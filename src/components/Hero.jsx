import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { config } from "../config";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"; // 👑 Added Framer Motion

const Hero = () => {
  const { hero } = config;
  const { t } = useTranslation();

  // 👑 Luxury Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-start pt-32 pb-16 overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hero.bgImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-ocean-dark/10" />

      {/* 👑 CONTENT LAYER (Staggered Animation) */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center mt-10 md:mt-16"
      >
        <motion.h1
          variants={fadeUp}
          className="font-script text-4xl md:text-5xl lg:text-[4.5rem] leading-[1.1] text-white drop-shadow-lg mb-6"
        >
          <span className="block">{t("hero.titleFirstLine")}</span>
          <span className="block">{t("hero.titleSecondLine")}</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="font-sans font-light text-sm md:text-base text-white/90 max-w-2xl leading-relaxed mb-10 drop-shadow-md"
        >
          {t("hero.description")}
        </motion.p>

        <motion.a
          variants={fadeUp}
          href={hero.ctaLink}
          className="group flex items-center gap-3 px-8 py-3 rounded-full border text-white border-white/40 bg-white/10 backdrop-blur-md hover:bg-white hover:text-ocean-dark transition-all duration-300 shadow-lg"
        >
          <span className="font-sans font-medium text-sm tracking-wide">
            {t("hero.ctaText")}
          </span>
          <div className="w-8 h-8 bg-white text-ocean-dark rounded-full flex items-center justify-center group-hover:bg-ocean-dark group-hover:text-white transition-colors duration-300">
            <FiArrowUpRight size={18} />
          </div>
        </motion.a>
      </motion.div>

      {/* 👑 FAN IMAGES (Animated entry) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex justify-center items-end mt-16 md:mt-24 px-4 h-[300px] md:h-[450px]">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, rotate: 0, x: 50, y: 50 }}
          animate={{ opacity: 1, rotate: -12, x: 0, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="w-[30%] md:w-64 aspect-[3/4] absolute left-[5%] md:left-[15%] bottom-0 origin-bottom-right rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl transition-transform duration-500 hover:rotate-0 hover:z-20"
        >
          <img
            src={hero.fanImages[0].src}
            alt="Salon preview 1"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Center Image */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="w-[40%] md:w-80 aspect-[4/5] absolute bottom-4 z-10 rounded-[2rem] overflow-hidden border-4 border-white/30 shadow-2xl transition-transform duration-500 hover:scale-105"
        >
          <img
            src={hero.fanImages[1].src}
            alt="Salon preview 2"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, rotate: 0, x: -50, y: 50 }}
          animate={{ opacity: 1, rotate: 12, x: 0, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="w-[30%] md:w-64 aspect-[3/4] absolute right-[5%] md:right-[15%] bottom-0 origin-bottom-left rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl transition-transform duration-500 hover:rotate-0 hover:z-20"
        >
          <img
            src={hero.fanImages[2].src}
            alt="Salon preview 3"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
