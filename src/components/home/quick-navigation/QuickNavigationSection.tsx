"use client";

import { Link } from "@/navigation";
import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { ENTITY_CONFIG } from "@/config/entities";
import {
  CenteredContentSection,
  CenteredContentSectionProps,
} from "../Section";

const navigationItems = [
  {
    key: "players",
    href: ENTITY_CONFIG["player"]["publicRoute"],
    icon: ENTITY_CONFIG["player"]["icon"],
  },
  {
    key: "clubs",
    href: ENTITY_CONFIG["club"]["publicRoute"],
    icon: ENTITY_CONFIG["club"]["icon"],
  },
  {
    key: "nations",
    href: ENTITY_CONFIG["nationality"]["publicRoute"],
    icon: ENTITY_CONFIG["nationality"]["icon"],
  },
  {
    key: "competitions",
    href: ENTITY_CONFIG["competition"]["publicRoute"],
    icon: ENTITY_CONFIG["competition"]["icon"],
  },
];

const QuickNavigationSection = () => {
  const t = useTranslations("public.home.quickNavigation");

  const getContent = () => {
    return (
      <>
        {/* Navigation Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link key={item.key} href={item.href}>
                <Card className="group h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex h-full items-center gap-4 p-5">
                    {/* Icon */}
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-6" />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold">
                        {t(`navigation.${item.key}.title`)}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {t(`navigation.${item.key}.description`)}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </>
    );
  };

  const data: CenteredContentSectionProps = {
    title: t("title"),
    subtitle: t("subtitle"),
    children: getContent(),
  };

  return <CenteredContentSection {...data} />;
};

export default QuickNavigationSection;
