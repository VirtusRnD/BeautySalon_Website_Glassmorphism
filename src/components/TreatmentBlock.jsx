import React from "react";
import { FiFeather } from "react-icons/fi";
import { motion } from "framer-motion";

// 👑 Now receives both configData (images, booleans) and textData (translated text)
const TreatmentBlock = ({ configData, textData }) => {
  const isLeft = configData.imageLeft;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className={`relative flex flex-col gap-12 lg:gap-0 items-center ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
    >
      <div
        className={`w-full lg:w-1/2 flex justify-center ${isLeft ? "lg:justify-end lg:pr-10" : "lg:justify-start lg:pl-10"}`}
      >
        <div className="relative flex-shrink-0 w-[260px] md:w-[300px] lg:w-[320px]">
          <div className="w-full aspect-[4/5] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl z-0">
            <img
              src={configData.imageSrc}
              alt={textData.titleBold}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className={`absolute top-10 md:top-14 z-10 ${isLeft ? "-right-6 md:-right-10" : "-left-6 md:-left-10"} bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl py-3 px-5 md:py-4 md:px-7 flex flex-col items-center justify-center`}
          >
            <span className="font-sans text-xl md:text-2xl font-medium text-ocean-dark">
              {textData.durationText}
            </span>
            <span className="font-sans text-xs md:text-sm font-light text-ocean-dark/70 mt-1">
              {textData.durationLabel}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left max-w-sm lg:max-w-md mx-auto lg:mx-0 ${isLeft ? "lg:pl-10" : "lg:pr-10"}`}
      >
        <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 w-full">
          <FiFeather className="text-ocean-main" size={14} />
          <span className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ocean-dark/80">
            {textData.overlineText}
          </span>
        </div>

        <h3 className="font-script text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-ocean-dark mb-4 tracking-wide text-center lg:text-left">
          <span className="block">{textData.titleBold}</span>
          <span className="text-ocean-main block">{textData.titleLight}</span>
        </h3>

        <p className="font-sans font-light text-ocean-dark/70 leading-relaxed text-sm md:text-base mb-8 text-center lg:text-left">
          {textData.description}
        </p>

        <a
          href={configData.buttonLink}
          className="group relative overflow-hidden bg-ocean-main/10 backdrop-blur-md border border-ocean-main/30 text-ocean-dark px-6 py-2.5 rounded-full font-sans text-sm font-medium tracking-wide transition-all duration-300 shadow-sm hover:shadow-lg hover:text-white hover:border-transparent"
        >
          <span className="absolute inset-0 bg-ocean-main opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
          <span className="relative z-10">{textData.buttonText}</span>
        </a>
      </div>
    </motion.div>
  );
};

export default TreatmentBlock;
