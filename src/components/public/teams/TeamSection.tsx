import { ArrowRight, Database } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { TeamItem } from "@/types/team";
import EmptyState from "@/components/feedback/EmptyState";
import TeamCardWrapper from "./cards/TeamCardWrapper";
import TeamCardSkeleton from "./cards/TeamCardSkeleton";
import TeamCard from "./cards/TeamCard";

interface Props {
  title: string;
  description: string;

  teams: TeamItem[];

  loading?: boolean;
  showAllData?: boolean;

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
  showAllData = false,
  empty,
  showMore,
}: Props) {
  const t = useTranslations("public.teams");

  const modifiedTeams = showAllData ? teams : teams.slice(0, 10);

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
      ) : teams.length === 0 && empty ? (
        <EmptyState
          icon={Database}
          title={empty.title ?? t("empty.title")}
          description={empty.description ?? t("empty.description")}
        />
      ) : (
        <>
          {/* Grid */}
          <TeamCardWrapper>
            {modifiedTeams.map((team) => (
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
