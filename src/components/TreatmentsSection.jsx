import React from "react";
import { config } from "../config";
import TreatmentBlock from "./TreatmentBlock";
import { useTranslation } from "react-i18next";

const TreatmentsSection = () => {
  const { t } = useTranslation();

  const treatmentTexts = t("treatments.items", { returnObjects: true }) || [];
  const treatmentConfigs = config.treatments.items || [];

  return (
    <section
      id="treatments"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-[5%] left-[-10%] w-[350px] h-[350px] bg-ocean-main/35 blur-[80px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[35%] right-[-5%] w-[450px] h-[450px] bg-ocean-light/30 blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[15%] left-[-5%] w-[300px] h-[300px] bg-ocean-main/30 blur-[60px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-5%] right-[15%] w-[400px] h-[400px] bg-ocean-light/40 blur-[80px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-24 flex flex-col gap-32 md:gap-40">
        {treatmentConfigs.map((configItem, index) => (
          <TreatmentBlock
            key={configItem.id}
            configData={configItem}
            textData={treatmentTexts[index] || {}}
          />
        ))}
      </div>
    </section>
  );
};

export default TreatmentsSection;
