"use client";

import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PositionPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tPosition = useTranslations("dashboard.positions");
  const tPositionCategory = useTranslations("dashboard.positionCategories");

  const pathname = usePathname();

  const positionPageRoute = ROUTES.DASHBOARD.CONTENT.POSITIONS.BASE;
  const categoryPageRoute = ROUTES.DASHBOARD.CONTENT.POSITIONS.CATEGORIES.BASE;

  // Gunakan ROUTES constants untuk konsistensi
  const isPositionsActive = pathname === positionPageRoute;
  const isCategoriesActive = pathname.startsWith(categoryPageRoute);

  return (
    <div className="min-h-screen bg-background space-y-6">
      <Tabs value={isCategoriesActive ? "categories" : "positions"}>
        <TabsList>
          <TabsTrigger value="positions" asChild>
            <Link
              href={positionPageRoute}
              aria-current={isPositionsActive ? "page" : undefined}
            >
              {tPosition("navLabel")}
            </Link>
          </TabsTrigger>

          <TabsTrigger value="categories" asChild>
            <Link
              href={categoryPageRoute}
              aria-current={isCategoriesActive ? "page" : undefined}
            >
              {tPositionCategory("navLabel")}
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <main className="space-y-6">{children}</main>
    </div>
  );
}
