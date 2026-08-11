import React from "react";
import { config } from "../config";
import { FiMail, FiPhone, FiArrowRight } from "react-icons/fi";
import { FaGoogle, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Footer = () => {
  const { footer } = config;
  const { t } = useTranslation();

  const companyLinksText =
    t("footer.links.company", { returnObjects: true }) || [];
  const companyUrls = footer.links.companyUrls || [];

  const supportLinksText =
    t("footer.links.support", { returnObjects: true }) || [];
  const supportUrls = footer.links.supportUrls || [];

  const contactInfo = t("contact.info", { returnObjects: true }) || [];
  const addressText = contactInfo[0]?.text || "";

  const renderSocialIcon = (id) => {
    switch (id) {
      case "google":
        return <FaGoogle size={14} />;
      case "facebook":
        return <FaFacebookF size={14} />;
      case "twitter":
        return <FaTwitter size={14} />;
      case "instagram":
        return <FaInstagram size={14} />;
      default:
        return null;
    }
  };

  return (
    <footer className="relative w-full flex flex-col justify-end mt-20">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${footer.bgImage})` }}
      />

      {/* NEWSLETTER SECTION */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-32 pb-24 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-3xl bg-black/30 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 md:p-14 text-center shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            {t("footer.newsletter.title")}
          </h2>
          <p className="font-sans text-sm md:text-base text-white/80 max-w-xl mx-auto mb-8 font-light">
            {t("footer.newsletter.description")}
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row items-center w-full max-w-lg mx-auto gap-4 sm:gap-0 sm:bg-white/10 sm:border sm:border-white/20 sm:rounded-full sm:p-1.5 sm:backdrop-blur-md focus-within:border-gold-accent transition-colors duration-300"
          >
            <input
              type="email"
              placeholder={t("footer.newsletter.placeholder")}
              className="w-full bg-white/10 sm:bg-transparent border border-white/20 sm:border-transparent rounded-full sm:rounded-none text-white placeholder-white/50 px-6 py-3.5 sm:py-3 font-sans text-sm outline-none text-center sm:text-left focus:border-gold-accent sm:focus:border-transparent transition-colors backdrop-blur-md sm:backdrop-blur-none"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto flex flex-shrink-0 items-center justify-center gap-2 bg-ocean-light hover:bg-gold-accent text-white px-8 py-3.5 sm:py-3 rounded-full font-medium text-sm transition-colors duration-300 shadow-md"
            >
              {t("footer.newsletter.buttonText")}
              <div className="w-5 h-5 bg-white text-ocean-dark rounded-full flex items-center justify-center ml-1">
                <FiArrowRight size={12} strokeWidth={3} />
              </div>
            </button>
          </form>
        </motion.div>
      </div>

      {/* MAIN DARK FOOTER */}
      <div className="relative z-10 w-full bg-black/75 backdrop-blur-2xl border-t border-white/10 pt-16 pb-6 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col">
            <h3 className="font-script text-4xl text-white mb-6 tracking-wide">
              {t("navbar.logo")}
            </h3>
            <p className="font-sans text-sm text-white/70 leading-relaxed font-light mb-6 pr-4">
              {t("footer.brand.description")}
            </p>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${footer.brand.email}`}
                className="flex items-center gap-3 text-white/80 hover:text-gold-accent transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <FiMail size={14} />
                </div>
                <span className="font-sans text-sm">{footer.brand.email}</span>
              </a>
              <a
                href={`tel:${footer.brand.phone}`}
                className="flex items-center gap-3 text-white/80 hover:text-gold-accent transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <FiPhone size={14} />
                </div>
                <span className="font-sans text-sm">{footer.brand.phone}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="lg:col-span-3 flex flex-col lg:pl-8">
            <h4 className="font-sans font-semibold text-gold-accent mb-6">
              {t("footer.headings.company")} {/* 👑 FIXED */}
            </h4>
            <ul className="flex flex-col gap-4">
              {companyLinksText.map((link, index) => (
                <li key={index}>
                  <a
                    href={companyUrls[index] || "#"}
                    className="font-sans text-sm font-light text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-sans font-semibold text-gold-accent mb-6">
              {t("footer.headings.support")} {/* 👑 FIXED */}
            </h4>
            <ul className="flex flex-col gap-4">
              {supportLinksText.map((link, index) => (
                <li key={index}>
                  <a
                    href={supportUrls[index] || "#"}
                    className="font-sans text-sm font-light text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="font-sans font-semibold text-gold-accent mb-6">
              {t("footer.headings.contact")} {/* 👑 FIXED */}
            </h4>
            <p className="font-sans text-sm font-light text-white/70 leading-relaxed mb-6">
              {addressText}
            </p>
            <div className="flex items-center gap-3">
              {footer.contact.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-gold-accent hover:border-gold-accent transition-all duration-300"
                  aria-label={social.id}
                >
                  {renderSocialIcon(social.id)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 text-center">
          <p className="font-sans text-xs font-light text-white/50 tracking-wider">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
