"use client";

import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import TabsNavigation from "@/components/navigations/TabsNavigation";

export default function CompetitionPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tCompetition = useTranslations("dashboard.competitions");
  const tCompetitionCategory = useTranslations(
    "dashboard.competitionCategories",
  );
  const tCompetitionScope = useTranslations("dashboard.competitionScopes");

  return (
    <div className="min-h-screen space-y-6 bg-background">
      <TabsNavigation
        items={[
          {
            value: "competitions",
            label: tCompetition("navLabel"),
            href: ROUTES.DASHBOARD.CONTENT.COMPETITIONS.BASE,
          },
          {
            value: "categories",
            label: tCompetitionCategory("navLabel"),
            href: ROUTES.DASHBOARD.CONTENT.COMPETITIONS.CATEGORIES,
            isActive: (pathname) =>
              pathname.startsWith(
                ROUTES.DASHBOARD.CONTENT.COMPETITIONS.CATEGORIES,
              ),
          },
          {
            value: "scopes",
            label: tCompetitionScope("navLabel"),
            href: ROUTES.DASHBOARD.CONTENT.COMPETITIONS.SCOPES,
            isActive: (pathname) =>
              pathname.startsWith(ROUTES.DASHBOARD.CONTENT.COMPETITIONS.SCOPES),
          },
        ]}
      />

      <main className="space-y-6">{children}</main>
    </div>
  );
}
