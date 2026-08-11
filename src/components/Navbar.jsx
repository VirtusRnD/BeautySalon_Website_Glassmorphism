import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // 👑 Translation Hook
import LanguageSwitcher from "./LanguageSwitcher"; // 👑 Your Switcher

const Navbar = () => {
  // 👑 Initialize translation (No more config.js needed here!)
  const { t } = useTranslation();

  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = () => {
    setNav(!nav);
  };

  const scrollToSection = (sectionId) => {
    if (nav) setNav(false);
    setActiveSection(sectionId);

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // 👑 Fetch the links array directly from the active JSON translation file
  const navLinks = t("navbar.links", { returnObjects: true });

  return (
    <>
      {/* 👑 MAIN NAVBAR WRAPPER */}
      <div className="fixed top-0 left-0 w-full z-[100] flex justify-center pointer-events-none">
        <motion.div
          layout
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full flex justify-center ${
            scrolled ? "pt-0 px-0" : "pt-4 md:pt-6 px-4 md:px-8"
          }`}
        >
          <motion.div
            layout
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-auto flex justify-center w-full border backdrop-blur-md overflow-hidden transition-colors duration-500 ${
              scrolled
                ? "max-w-full rounded-none bg-ocean-dark/95 border-white/5 shadow-2xl py-4"
                : "max-w-7xl rounded-full bg-white/10 border-white/20 shadow-lg py-3"
            }`}
          >
            <div className="w-full max-w-7xl flex justify-between items-center px-6 md:px-8">
              {/* LOGO */}
              <div
                onClick={() => scrollToSection("home")}
                className="font-script text-3xl md:text-4xl text-white cursor-pointer select-none tracking-wide pt-1"
              >
                {t("navbar.logo")}
              </div>

              {/* DESKTOP MENU LINKS */}
              <ul className="hidden lg:flex items-center gap-8">
                {navLinks.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`font-sans text-sm tracking-wide transition-all duration-300 ${
                        activeSection === item.id
                          ? "text-white font-medium drop-shadow-md"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* DESKTOP RIGHT BUTTONS */}
              <div className="hidden lg:flex items-center gap-6">
                {/* 👑 Language Switcher placed seamlessly next to buttons */}
                <LanguageSwitcher />

                <div className="flex items-center gap-4">
                  <button className="font-sans text-sm text-white/90 hover:text-white transition-colors">
                    {t("navbar.signInText")}
                  </button>
                  <button className="font-sans text-sm font-medium bg-white text-ocean-dark px-6 py-2 rounded-full hover:bg-gold-accent hover:text-white transition-colors duration-300 shadow-md">
                    {t("navbar.signUpText")}
                  </button>
                </div>
              </div>

              {/* MOBILE HAMBURGER ICON */}
              <div className="flex lg:hidden items-center gap-4">
                {/* Switcher is also visible on mobile next to the hamburger menu! */}
                <LanguageSwitcher />
                <button
                  onClick={handleNav}
                  className="text-white p-2 focus:outline-none"
                >
                  <AiOutlineMenu size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* MOBILE MENU BACKGROUND OVERLAY */}
      <div
        onClick={handleNav}
        className={`fixed inset-0 w-full h-full bg-ocean-dark/60 backdrop-blur-sm z-[140] transition-opacity duration-300 ${
          nav ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* MOBILE MENU DRAWER */}
      <div
        className={`fixed top-0 right-0 h-screen w-[80%] max-w-[320px] bg-ocean-dark border-l border-white/10 z-[150] shadow-2xl flex flex-col p-8 transition-transform duration-500 ease-in-out ${
          nav ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-12">
          <div className="font-script text-3xl text-white pt-1">
            {t("navbar.logo")}
          </div>
          <button
            onClick={handleNav}
            className="text-white/70 hover:text-white p-1"
          >
            <AiOutlineClose size={26} />
          </button>
        </div>

        <ul className="flex flex-col gap-6 flex-grow">
          {navLinks.map((item) => (
            <li key={item.id} className="border-b border-white/10 pb-4">
              <button
                onClick={() => scrollToSection(item.id)}
                className={`font-sans text-lg tracking-wide transition-colors ${
                  activeSection === item.id
                    ? "text-gold-accent font-medium"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* MOBILE BUTTONS */}
        <div className="flex flex-col gap-4 mt-8">
          <button className="w-full font-sans py-3 border border-white/30 rounded-full text-white hover:bg-white/10 transition-colors">
            {t("navbar.signInText")}
          </button>
          <button className="w-full font-sans py-3 bg-white text-ocean-dark rounded-full font-medium shadow-md">
            {t("navbar.signUpText")}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
