import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  // Safely fallback to 'en' if language isn't detected yet
  const currentLang = i18n.language || "en";
  const isTurkish = currentLang.toLowerCase().startsWith("tr");

  const toggleLanguage = () => {
    const nextLang = isTurkish ? "en" : "tr";
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      // Changed hover color to gold-accent to match the salon theme
      className="text-sm tracking-[0.2em] py-[0.1em] uppercase font-bold text-white/90 hover:text-gold-accent transition-colors duration-300 cursor-pointer"
      aria-label="Language Switcher"
    >
      {isTurkish ? "TR" : "EN"}
    </button>
  );
};

export default LanguageSwitcher;
