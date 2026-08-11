import React, { useState } from "react";
import { config } from "../config";
import { FiArrowRight, FiArrowUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { toDynamicUpperCase } from "../utils/stringHelpers"; // 👑 Imported your helper!

const AboutUs = () => {
  const { aboutUs } = config;
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  const paragraphs = t("aboutUs.paragraphs", { returnObjects: true }) || [];
  const stats = t("aboutUs.expanded.stats", { returnObjects: true }) || [];

  const SparkleIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-ocean-light"
    >
      <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
    </svg>
  );

  return (
    <section
      id="about"
      className="relative w-full py-12 md:py-12 my-16 md:my-24 overflow-hidden bg-[#0f0f11] shadow-2xl"
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-ocean-main/40 blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-ocean-light/30 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* 👑 LEFT SIDE: TEXT CONTENT (Animated Slide Right) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-1/2 flex flex-col items-start text-left"
        >
          <div className="flex items-center gap-3 mb-5">
            <SparkleIcon />
            {/* 👑 HELPER APPLIED: Removed Tailwind 'uppercase', applied JS helper */}
            <span className="font-sans text-xs md:text-sm font-semibold tracking-[0.15em] text-ocean-light">
              {toDynamicUpperCase(t("aboutUs.overline"))}
            </span>
            <SparkleIcon />
          </div>

          <h2 className="font-script text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] font-normal text-white mb-6 tracking-wide drop-shadow-md">
            {t("aboutUs.title")}
          </h2>

          <div className="flex flex-col gap-4 mb-10">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="font-sans font-light text-white/70 leading-relaxed text-sm md:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <AnimatePresence>
            {!isExpanded && (
              <motion.button
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsExpanded(true)}
                className="group flex items-center gap-4 px-6 py-2.5 rounded-full border border-white/20 hover:border-ocean-light bg-white/5 backdrop-blur-sm transition-all duration-300 shadow-lg"
              >
                <span className="font-sans text-sm font-medium text-white group-hover:text-ocean-light transition-colors">
                  {t("aboutUs.ctaText")}
                </span>
                <div className="w-8 h-8 rounded-full bg-ocean-light text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FiArrowRight size={16} strokeWidth={2.5} />
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 👑 RIGHT SIDE: MASONRY IMAGE GRID (Animated Slide Left) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="w-full lg:w-1/2 mt-12 lg:mt-0"
        >
          <div className="grid grid-cols-2 gap-3 md:gap-5 h-[380px] sm:h-[450px] lg:h-[520px]">
            <div className="col-span-1 row-span-2 relative w-full h-full group">
              <div className="absolute top-3 left-3 md:top-5 md:left-5 right-0 bottom-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-tl-[5rem] md:rounded-tl-[7rem] rounded-tr-xl rounded-br-[2.5rem] rounded-bl-xl z-0 transition-all duration-700 group-hover:translate-x-2 group-hover:translate-y-2" />
              <div className="absolute top-0 left-0 right-3 bottom-3 md:right-5 md:bottom-5 overflow-hidden rounded-tl-[5rem] md:rounded-tl-[7rem] rounded-tr-xl rounded-br-[2.5rem] rounded-bl-xl border border-white/10 shadow-2xl z-10">
                <img
                  src={aboutUs.images[0].src}
                  alt="About 1"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ocean-dark/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              </div>
            </div>

            <div className="col-span-1 row-span-1 relative w-full h-full group">
              <div className="absolute top-3 left-3 md:top-5 md:left-5 right-0 bottom-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-tr-[4rem] md:rounded-tr-[5rem] rounded-tl-xl rounded-br-xl rounded-bl-xl z-0 transition-all duration-700 group-hover:translate-x-2 group-hover:translate-y-2" />
              <div className="absolute top-0 left-0 right-3 bottom-3 md:right-5 md:bottom-5 overflow-hidden rounded-tr-[4rem] md:rounded-tr-[5rem] rounded-tl-xl rounded-br-xl rounded-bl-xl border border-white/10 shadow-xl z-10">
                <img
                  src={aboutUs.images[1].src}
                  alt="About 2"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ocean-dark/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              </div>
            </div>

            <div className="col-span-1 row-span-1 relative w-full h-full group">
              <div className="absolute top-3 left-3 md:top-5 md:left-5 right-0 bottom-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-t-xl rounded-b-[2.5rem] md:rounded-b-[3.5rem] z-0 transition-all duration-700 group-hover:translate-x-2 group-hover:translate-y-2" />
              <div className="absolute top-0 left-0 right-3 bottom-3 md:right-5 md:bottom-5 overflow-hidden rounded-t-xl rounded-b-[2.5rem] md:rounded-b-[3.5rem] border border-white/10 shadow-xl z-10">
                <img
                  src={aboutUs.images[2].src}
                  alt="About 3"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ocean-dark/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 pt-20 pb-8 flex flex-col items-center">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 w-full mb-16">
                <div className="w-full lg:w-1/2 flex flex-col items-start">
                  <h3 className="font-script text-4xl md:text-5xl text-ocean-faint mb-6">
                    {t("aboutUs.expanded.title")}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {t("aboutUs.expanded.paragraphs", {
                      returnObjects: true,
                    }).map((para, i) => (
                      <p
                        key={i}
                        className="font-sans font-light text-white/70 leading-relaxed text-sm md:text-base"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                  {stats.map((stat, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 text-center"
                    >
                      <span className="font-sans text-3xl md:text-4xl font-medium text-white mb-2">
                        {stat.value}
                      </span>
                      {/* 👑 HELPER APPLIED: Removed Tailwind 'uppercase', applied JS helper */}
                      <span className="font-sans text-xs md:text-sm font-light text-ocean-faint tracking-wider">
                        {toDynamicUpperCase(stat.label)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="group flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors duration-300"
              >
                {/* 👑 HELPER APPLIED: Removed Tailwind 'uppercase', applied JS helper */}
                <span className="font-sans text-xs font-semibold tracking-widest">
                  {toDynamicUpperCase(t("aboutUs.expanded.closeText"))}
                </span>
                <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center group-hover:bg-ocean-light group-hover:border-ocean-light group-hover:-translate-y-1 transition-all duration-300">
                  <FiArrowUp size={18} />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AboutUs;
