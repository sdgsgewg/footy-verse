import { SelectField } from "@/components/forms/fields";
import { getClubTeamOptions } from "@/lib/club-teams/options";
import { ClubTeamListItem } from "@/types/club-team";
import { GroupedPlayerFilter } from "@/types/player";
import { useTranslations } from "next-intl";

interface Props {
  clubTeams: ClubTeamListItem[];

  filters: GroupedPlayerFilter;

  updateFilter: <K extends keyof GroupedPlayerFilter>(
    key: K,
    value: GroupedPlayerFilter[K],
  ) => void;
}

const ClubFilterSection = ({ clubTeams, filters, updateFilter }: Props) => {
  const tLabels = useTranslations("public.clubs.detail.filter.labels");
  const tPlaceholders = useTranslations(
    "public.clubs.detail.filter.placeholders",
  );

  const clubTeamOptions = getClubTeamOptions(clubTeams);

  return (
    <div className="w-full">
      <SelectField
        label={tLabels("clubTeam")}
        name="club_team"
        placeholder={tPlaceholders("clubTeam")}
        options={clubTeamOptions}
        value={filters.clubTeamId || ""}
        onChange={(value) => updateFilter("clubTeamId", value || undefined)}
        className="max-w-48"
      />
    </div>
  );
};

export default ClubFilterSection;
