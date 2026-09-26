import { CompetitionSeasonHistoryTable } from "@/components/competitions/table";
import SectionHeader from "@/components/players/sections/SectionHeader";
import { ENTITY_CONFIG } from "@/config/entities";
import { useCompetitionSeasons } from "@/hooks/dashboard/competition-seasons";
import { isDashboardPath } from "@/lib/utils/navigation";
import { usePathname, useRouter } from "@/navigation";
import { CompetitionDetailResponse } from "@/types/competition";
import { useTranslations } from "next-intl";

interface Props {
  competition: CompetitionDetailResponse;
}

const CompetitionSeasonHistory = ({ competition }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = isDashboardPath(pathname);

  const tSeasonTable = useTranslations("dashboard.competitionSeasons.table");

  const { competitionSeasons, loading: isCompetitionSeasonsLoading } =
    useCompetitionSeasons({ competitionId: competition.id });

  const handleAddSeason = () => {
    router.push(
      `${ENTITY_CONFIG["competition"]["dashboardRoute"]}/${competition.slug}/seasons/create`,
    );
  };

  return (
    <div className="w-full">
      {isDashboard ? (
        <SectionHeader title={tSeasonTable("title")} onAdd={handleAddSeason} />
      ) : (
        <SectionHeader title={tSeasonTable("title")} />
      )}

      <CompetitionSeasonHistoryTable
        competitionLookup={competition}
        competitionSeasons={competitionSeasons}
        loading={isCompetitionSeasonsLoading}
        showActions={isDashboard}
      />
    </div>
  );
};

export default CompetitionSeasonHistory;
