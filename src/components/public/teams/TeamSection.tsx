import { ArrowRight, Database } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { TeamItem } from "@/types/team";
import { TeamCard, TeamCardSkeleton, TeamCardWrapper } from "./cards";

interface Props {
  title: string;
  description: string;

  teams: TeamItem[];

  loading?: boolean;

  empty?: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  };

  showMore?: {
    visible?: boolean;
    label?: string;
    onClick: () => void;
  };
}

export default function TeamSection({
  title,
  description,
  teams,
  loading = false,
  empty,
  showMore,
}: Props) {
  const t = useTranslations("public.teams");

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>

      {/* Loading */}
      {loading ? (
        <TeamCardWrapper>
          {Array.from({ length: 10 }).map((_, index) => (
            <TeamCardSkeleton key={index} />
          ))}
        </TeamCardWrapper>
      ) : teams.length === 0 ? (
        /* Empty */
        <div className="rounded-2xl border border-dashed py-14 px-6">
          <div className="mx-auto flex max-w-sm flex-col items-center text-center">
            <div className="mb-5 rounded-full bg-primary/10 p-4">
              {empty?.icon ?? <Database className="h-8 w-8 text-primary" />}
            </div>

            <h3 className="text-lg font-semibold">
              {empty?.title ?? t("empty.title")}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {empty?.description ?? t("empty.description")}
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Grid */}
          <TeamCardWrapper>
            {teams.slice(0, 10).map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </TeamCardWrapper>

          {/* Show More */}
          {showMore?.visible && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={showMore.onClick}
                className="gap-2"
              >
                {showMore.label ?? t("showMore")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
