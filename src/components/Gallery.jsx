import React from "react";
import { config } from "../config";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"; // 👑 Added Framer Motion

const Gallery = () => {
  const { gallery } = config;
  const { t } = useTranslation();

  const SparkleIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-ocean-main"
    >
      <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
    </svg>
  );

  // 👑 Reusable fade-up animation for scroll reveal
  const scrollReveal = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="gallery"
      className="relative w-full py-20 md:py-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${gallery.bgImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-white/50 backdrop-blur-lg" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-24 flex flex-col items-center">
        {/* 👑 HEADER SECTION (Animated on scroll) */}
        <motion.div
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // Triggers slightly before it fully enters the screen
          className="flex flex-col items-center text-center mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <SparkleIcon />
            <span className="font-sans text-xs md:text-sm font-semibold tracking-[0.15em] uppercase text-ocean-main">
              {t("gallery.overline")}
            </span>
            <SparkleIcon />
          </div>

          <h2 className="font-script text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.1] font-normal text-ocean-dark tracking-wide">
            {t("gallery.title")}
          </h2>
        </motion.div>

        {/* 👑 MASONRY GRID SECTION */}
        <div className="w-full flex flex-col lg:flex-row gap-4 md:gap-6 h-auto lg:h-[650px]">
          {/* LEFT BLOCK */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-6 h-[500px] lg:h-full"
          >
            <div className="flex w-full h-[40%] gap-4 md:gap-6">
              <div className="w-[60%] h-full rounded-2xl md:rounded-3xl overflow-hidden relative group border border-white/40 shadow-xl bg-white/20">
                <img
                  src={gallery.images[0].src}
                  alt={`${t("gallery.title")} 1`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ocean-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
              <div className="w-[40%] h-full rounded-2xl md:rounded-3xl overflow-hidden relative group border border-white/40 shadow-xl bg-white/20">
                <img
                  src={gallery.images[1].src}
                  alt={`${t("gallery.title")} 2`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ocean-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>

            <div className="w-full h-[60%] rounded-2xl md:rounded-3xl overflow-hidden relative group border border-white/40 shadow-xl bg-white/20">
              <img
                src={gallery.images[2].src}
                alt={`${t("gallery.title")} 3`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ocean-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </motion.div>

          {/* RIGHT BLOCK */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex gap-4 md:gap-6 h-[500px] lg:h-full"
          >
            <div className="w-1/2 h-full flex flex-col gap-4 md:gap-6">
              <div className="w-full h-[55%] rounded-2xl md:rounded-3xl overflow-hidden relative group border border-white/40 shadow-xl bg-white/20">
                <img
                  src={gallery.images[3].src}
                  alt={`${t("gallery.title")} 4`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ocean-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
              <div className="w-full h-[45%] rounded-2xl md:rounded-3xl overflow-hidden relative group border border-white/40 shadow-xl bg-white/20">
                <img
                  src={gallery.images[4].src}
                  alt={`${t("gallery.title")} 5`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ocean-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>

            <div className="w-1/2 h-full flex flex-col gap-4 md:gap-6">
              <div className="w-full h-[55%] rounded-2xl md:rounded-3xl overflow-hidden relative group border border-white/40 shadow-xl bg-white/20">
                <img
                  src={gallery.images[5].src}
                  alt={`${t("gallery.title")} 6`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ocean-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
              <div className="w-full h-[45%] rounded-2xl md:rounded-3xl overflow-hidden relative group border border-white/40 shadow-xl bg-white/20">
                <img
                  src={gallery.images[6].src}
                  alt={`${t("gallery.title")} 7`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ocean-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
