import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next"; // 👑 Translation Hook

const FaqSection = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  // 👑 Fetch the translated array and provide a fallback [] to prevent crashes
  const faqItems = t("faq.items", { returnObjects: true }) || [];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
      id="faq"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-8 md:px-16 lg:px-0 flex flex-col items-center">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <SparkleIcon />
            <span className="font-sans text-xs md:text-sm font-semibold tracking-[0.15em] uppercase text-ocean-main">
              {t("faq.overline")}
            </span>
            <SparkleIcon />
          </div>

          <h2 className="font-script text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.1] font-normal text-ocean-dark mb-6 tracking-wide">
            {t("faq.title")}
          </h2>

          <p className="font-sans font-light text-ocean-dark/70 leading-relaxed text-sm md:text-base max-w-lg">
            {t("faq.description")}
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full flex flex-col gap-4"
        >
          {/* 👑 Map over the fetched translation array instead of config! */}
          {faqItems.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                variants={fadeUp}
                key={index}
                className={`flex flex-col border ${
                  isOpen
                    ? "border-gold-accent bg-white/60 shadow-lg"
                    : "border-gold-accent/40 bg-white/30 hover:bg-white/50 hover:shadow-md"
                } backdrop-blur-md transition-all duration-300 rounded-[2rem] overflow-hidden`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between px-6 py-5 md:px-8 md:py-6 text-left group"
                >
                  {/* 👑 Direct reference to the item's question */}
                  <span className="font-sans text-base md:text-lg font-medium text-ocean-dark pr-6 transition-colors duration-300 group-hover:text-ocean-main">
                    {item.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0 text-ocean-dark/70 group-hover:text-ocean-main transition-colors duration-300"
                  >
                    <FiPlus size={22} strokeWidth={2} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* 👑 Direct reference to the item's answer */}
                      <div className="px-6 pb-6 md:px-8 md:pb-8 pt-2 font-sans font-light text-ocean-dark/70 leading-relaxed text-sm md:text-base">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
