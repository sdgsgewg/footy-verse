"use client";

import { useTranslations } from "next-intl";
import FormSection from "../../base/FormSection";
import { ComboboxField, DateField } from "../../fields";
import { useNationalTeams } from "@/hooks/national-teams";
import { getNationalTeamOptions } from "@/lib/national-teams/options";
import { EditPlayerNationalTeamCareerForm } from "@/hooks/dashboard/player-national-teams";
import { parseDateString } from "@/lib/utils/date";

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
        <form.Field name="career.left_at">
          {(leftAtField) => (
            <form.Field name="career.joined_at">
              {(joinedAtField) => (
                <DateField
                  field={joinedAtField}
                  label={tLabels("joinedAt")}
                  placeholder={tPlaceholders("joinedAt") || ""}
                  endMonth={new Date(2100, 11, 31)}
                  maxDate={parseDateString(leftAtField.state.value)}
                  required
                />
              )}
            </form.Field>
          )}
        </form.Field>

        {/* Left Date */}
        <form.Field name="career.joined_at">
          {(joinedAtField) => (
            <form.Field name="career.left_at">
              {(leftAtField) => (
                <DateField
                  field={leftAtField}
                  label={tLabels("leftAt")}
                  placeholder={tPlaceholders("leftAt") || ""}
                  startMonth={parseDateString(joinedAtField.state.value)}
                  endMonth={new Date(2100, 11, 31)}
                  minDate={parseDateString(joinedAtField.state.value)}
                />
              )}
            </form.Field>
          )}
        </form.Field>
      </div>
    </FormSection>
  );
};

export default PlayerCareerSection;
