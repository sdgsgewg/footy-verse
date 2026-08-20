"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/navigation";
import { DASHBOARD_CONTENT_ITEMS } from "@/constants/dashboard-navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function QuickActions() {
  const t = useTranslations("dashboard.home.quickActions");

  return (
    <Card className="lg:max-h-110">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>

        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {DASHBOARD_CONTENT_ITEMS.map((action) => {
          const Icon = action.icon;

          return (
            <Button
              key={action.href}
              variant="outline"
              className="w-full justify-start"
              asChild
            >
              <Link href={action.href}>
                <Icon className="mr-3 size-4" />

                {t(action.key)}
              </Link>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
