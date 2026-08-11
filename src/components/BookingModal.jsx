import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheckCircle } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const BookingModal = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // 👑 SCROLL LOCK & HASH LISTENER MAGIC
  useEffect(() => {
    // 1. Lock/Unlock scrolling based on modal state
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // 2. Listen for ANY button clicking a href="#booking"
    const handleHashChange = () => {
      if (window.location.hash === "#booking") {
        setIsOpen(true);
        // Clean up the URL hash so it doesn't stay there
        window.history.replaceState(null, null, window.location.pathname);
      }
    };

    // Check on mount in case they loaded the page with the hash
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [isOpen]);

  // Framer Motion Variants for that luxury feel
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const services = t("booking.services", { returnObjects: true }) || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 md:px-0">
          {/* 👑 BLURRED DARK OVERLAY */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setIsOpen(false)} // Close when clicking outside
            className="absolute inset-0 bg-ocean-dark/70 backdrop-blur-sm cursor-pointer"
          />

          {/* 👑 GLASSMORPHISM MODAL BOX */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="relative w-full max-w-2xl bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_20px_60px_rgb(0,0,0,0.3)] rounded-[2.5rem] p-8 md:p-12 z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/40 hover:bg-ocean-main hover:text-white rounded-full flex items-center justify-center text-ocean-dark transition-colors duration-300 border border-white/50"
            >
              <FiX size={20} />
            </button>

            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="font-script text-4xl md:text-5xl text-ocean-dark mb-3">
                {t("booking.title")}
              </h2>
              <p className="font-sans font-light text-sm md:text-base text-ocean-dark/70 max-w-md mx-auto">
                {t("booking.subtitle")}
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsOpen(false);
              }}
              className="flex flex-col gap-4"
            >
              {/* Name & Phone */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <input
                  type="text"
                  placeholder={t("booking.namePlaceholder")}
                  required
                  className="w-full bg-white/50 border border-white/60 text-ocean-dark placeholder-ocean-dark/50 px-5 py-3.5 rounded-2xl font-sans text-sm outline-none focus:bg-white/90 focus:border-ocean-main transition-all shadow-sm"
                />
                <input
                  type="tel"
                  placeholder={t("booking.phonePlaceholder")}
                  required
                  className="w-full bg-white/50 border border-white/60 text-ocean-dark placeholder-ocean-dark/50 px-5 py-3.5 rounded-2xl font-sans text-sm outline-none focus:bg-white/90 focus:border-ocean-main transition-all shadow-sm"
                />
              </div>

              {/* Service Dropdown */}
              <select
                required
                defaultValue=""
                className="w-full bg-white/50 border border-white/60 text-ocean-dark px-5 py-3.5 rounded-2xl font-sans text-sm outline-none focus:bg-white/90 focus:border-ocean-main transition-all shadow-sm appearance-none"
              >
                <option value="" disabled>
                  {t("booking.servicePlaceholder")}
                </option>
                {services.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>

              {/* Date & Time */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <input
                  type="date"
                  required
                  className="w-full bg-white/50 border border-white/60 text-ocean-dark px-5 py-3.5 rounded-2xl font-sans text-sm outline-none focus:bg-white/90 focus:border-ocean-main transition-all shadow-sm"
                />
                <input
                  type="time"
                  required
                  className="w-full bg-white/50 border border-white/60 text-ocean-dark px-5 py-3.5 rounded-2xl font-sans text-sm outline-none focus:bg-white/90 focus:border-ocean-main transition-all shadow-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2 bg-ocean-dark hover:bg-ocean-main text-white px-8 py-4 rounded-2xl font-sans font-medium text-sm transition-all duration-300 shadow-xl mt-4"
              >
                {t("booking.buttonText")}
                <FiCheckCircle
                  className="group-hover:scale-110 transition-transform duration-300"
                  size={18}
                />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
