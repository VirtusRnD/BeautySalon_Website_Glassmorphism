import React, { useState } from "react";
import { config } from "../config";
import { submitForm } from "../lib/submitForm";
import { FiMapPin, FiPhone, FiClock, FiSend } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const ContactSection = () => {
  const { contact } = config;
  const { t } = useTranslation(); // 👑 Added
  const [status, setStatus] = useState("idle"); // idle | sending | sent | mailto | error

  async function handleSubmit(e) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    try {
      setStatus(await submitForm(values, { email: config.footer.brand.email, subject: t("contact.title") }));
    } catch {
      setStatus("error");
    }
  }

  // 👑 Fetch the text info array safely
  const infoTexts = t("contact.info", { returnObjects: true }) || [];
  const infoIcons = contact.infoIcons || [];

  const renderIcon = (id) => {
    switch (id) {
      case "address":
        return <FiMapPin size={18} />;
      case "phone":
        return <FiPhone size={18} />;
      case "hours":
        return <FiClock size={18} />;
      default:
        return null;
    }
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

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex flex-col lg:flex-row items-center justify-center">
        {/* LEFT SIDE: MASSIVE IMAGE CANVAS */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-7/12 relative group z-0"
        >
          <div className="absolute inset-0 translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8 bg-ocean-main/10 rounded-[3rem] blur-2xl z-0" />

          <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-square rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl z-10">
            <img
              src={contact.imageSrc} // Image from config
              alt="Salon Contact"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/40 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* RIGHT SIDE: OVERLAPPING GLASS FORM */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="w-[92%] sm:w-[85%] lg:w-5/12 -mt-16 sm:-mt-24 lg:mt-0 lg:-ml-24 relative z-20"
        >
          <div className="w-full bg-white/60 backdrop-blur-md border border-white/60 shadow-[0_20px_50px_rgb(0,0,0,0.1)] rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <SparkleIcon />
              <span className="font-sans text-xs md:text-sm font-semibold tracking-[0.15em] uppercase text-ocean-main">
                {t("contact.overline")}
              </span>
            </div>

            <h2 className="font-script text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-normal text-ocean-dark mb-4 tracking-wide">
              {t("contact.title")}
            </h2>

            <p className="font-sans font-light text-ocean-dark/70 leading-relaxed text-sm mb-8">
              {t("contact.description")}
            </p>

            <div className="flex flex-col gap-4 mb-8 pb-8 border-b border-ocean-dark/10">
              {/* 👑 Map over the structural Icons, but grab the Text from infoTexts array */}
              {infoIcons.map((iconId, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 text-ocean-dark/80"
                >
                  <div className="w-10 h-10 rounded-full bg-ocean-main/10 flex items-center justify-center text-ocean-main">
                    {renderIcon(iconId)}
                  </div>
                  <span className="font-sans text-sm font-medium">
                    {infoTexts[index]?.text}
                  </span>
                </div>
              ))}
            </div>

            {status === "sent" || status === "mailto" ? (
<p className="font-sans font-medium text-sm md:text-base py-4">{t(status === "sent" ? "contact.form.success" : "contact.form.mailto")}</p>
) : (
<form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <input name="name"
                  type="text"
                  placeholder={t("contact.form.namePlaceholder")}
                  className="w-full bg-white/40 border border-white/60 text-ocean-dark placeholder-ocean-dark/40 px-5 py-3.5 rounded-xl font-sans text-sm outline-none focus:bg-white/80 focus:border-ocean-main transition-all duration-300 shadow-sm"
                  required
                />
                <input name="email"
                  type="email"
                  placeholder={t("contact.form.emailPlaceholder")}
                  className="w-full bg-white/40 border border-white/60 text-ocean-dark placeholder-ocean-dark/40 px-5 py-3.5 rounded-xl font-sans text-sm outline-none focus:bg-white/80 focus:border-ocean-main transition-all duration-300 shadow-sm"
                  required
                />
              </div>

              <input name="service"
                type="text"
                placeholder={t("contact.form.servicePlaceholder")}
                className="w-full bg-white/40 border border-white/60 text-ocean-dark placeholder-ocean-dark/40 px-5 py-3.5 rounded-xl font-sans text-sm outline-none focus:bg-white/80 focus:border-ocean-main transition-all duration-300 shadow-sm"
              />

              <textarea name="message"
                placeholder={t("contact.form.messagePlaceholder")}
                rows="4"
                className="w-full bg-white/40 border border-white/60 text-ocean-dark placeholder-ocean-dark/40 px-5 py-3.5 rounded-xl font-sans text-sm outline-none resize-none focus:bg-white/80 focus:border-ocean-main transition-all duration-300 shadow-sm"
                required
              ></textarea>

              {status === "error" && (

                <p role="alert" className="text-red-600 text-sm font-medium">{t("contact.form.error")}</p>

              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="group w-full flex items-center justify-center gap-3 bg-ocean-dark hover:bg-ocean-main text-white px-8 py-4 rounded-xl font-sans font-medium text-sm transition-all duration-300 shadow-lg mt-2"
              >
                {t("contact.form.buttonText")}
                <FiSend
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  size={16}
                />
              </button>
            </form>
)}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
