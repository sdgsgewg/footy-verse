import { useTranslations } from "next-intl";
import React from "react";

const FooterLogo = () => {
  const tHome = useTranslations("public.home.hero");

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold text-lg bg-linear-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
        FootyVerse
      </h3>
      <p className="text-sm text-muted-foreground">{tHome("subtitle")}</p>
    </div>
  );
};

export default FooterLogo;
