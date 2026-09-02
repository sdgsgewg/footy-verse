"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SearchEmpty() {
  const t = useTranslations("public.search.empty");

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <Search className="h-6 w-6 text-muted-foreground" />
      </div>

      <h2 className="text-xl font-semibold">{t("title")}</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {t("description")}
      </p>
    </div>
  );
}
