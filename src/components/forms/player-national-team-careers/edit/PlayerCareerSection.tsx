"use client";

import { useTranslations } from "next-intl";
import FormSection from "../../base/FormSection";
import { ComboboxField, DateField } from "../../fields";
import { useNationalTeams } from "@/hooks/national-teams";
import { getNationalTeamOptions } from "@/lib/national-teams/options";
import { EditPlayerNationalTeamCareerForm } from "@/hooks/dashboard/player-national-teams";

interface Props {
  form: EditPlayerNationalTeamCareerForm;
}

const PlayerCareerSection = ({ form }: Props) => {
  const tForm = useTranslations(
    "dashboard.playerNationalTeamCareers.form.career",
  );

  const tLabels = useTranslations(
    "dashboard.playerNationalTeamCareers.form.labels.career",
  );
  const tPlaceholders = useTranslations(
    "dashboard.playerNationalTeamCareers.form.placeholders.career",
  );

  const { nationalTeams, loading: isNationalTeamLoading } = useNationalTeams();
  const nationalTeamOptions = getNationalTeamOptions(nationalTeams);

  return (
    <FormSection title={tForm("title")}>
      {/* Nation */}
      <form.Field name="national_team_id">
        {(field) => (
          <ComboboxField
            field={field}
            entityKey="nationalTeam"
            label={tLabels("nation")}
            options={nationalTeamOptions}
            placeholder={tPlaceholders("nation")}
            loading={isNationalTeamLoading}
            required
          />
        )}
      </form.Field>

      {/* Join Date */}
      <form.Field name="career.joined_at">
        {(field) => (
          <DateField
            field={field}
            label={tLabels("joinedAt")}
            placeholder={tPlaceholders("joinedAt") || ""}
            required
          />
        )}
      </form.Field>

      {/* Left Date */}
      <form.Field name="career.left_at">
        {(field) => (
          <DateField
            field={field}
            label={tLabels("leftAt")}
            placeholder={tPlaceholders("leftAt") || ""}
          />
        )}
      </form.Field>
    </FormSection>
  );
};

export default PlayerCareerSection;
