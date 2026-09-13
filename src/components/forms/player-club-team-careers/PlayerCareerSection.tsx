"use client";

import { useTranslations } from "next-intl";
import FormSection from "../base/FormSection";
import ComboboxField from "../fields/ComboboxField";
import DateField from "../fields/DateField";
import { useClubTeams } from "@/hooks/club-teams";
import { getClubTeamOptions } from "@/lib/club-teams/options";
import { PlayerClubTeamCareerForm } from "@/hooks/dashboard/player-club-team-careers";
import { parseDateString } from "@/lib/utils/date";

interface Props {
  form: PlayerClubTeamCareerForm;
}

const PlayerClubTeamCareerSection = ({ form }: Props) => {
  const tForm = useTranslations("dashboard.playerClubTeamCareers.form.career");

  const tLabels = useTranslations(
    "dashboard.playerClubTeamCareers.form.labels.career",
  );

  const tPlaceholders = useTranslations(
    "dashboard.playerClubTeamCareers.form.placeholders.career",
  );

  const { clubTeams, loading: isClubTeamLoading } = useClubTeams();
  const clubTeamOptions = getClubTeamOptions(clubTeams);

  return (
    <FormSection title={tForm("title")}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Club Team */}
        <form.Field
          name="club_team_id"
          listeners={{
            onChange: ({ value }) => {
              form.setFieldValue(`transfer.to_club_team_id`, value);
            },
          }}
        >
          {(field) => (
            <ComboboxField
              field={field}
              entityKey="club"
              label={tLabels("club")}
              options={clubTeamOptions}
              placeholder={tPlaceholders("club")}
              loading={isClubTeamLoading}
              required
            />
          )}
        </form.Field>

        {/* Join Date */}
        <form.Field name="career.left_at">
          {(leftAtField) => (
            <form.Field
              name="career.joined_at"
              listeners={{
                onChange: ({ value }) => {
                  const transfer = form.getFieldValue(`transfer`);

                  if (!transfer.transfer_date) {
                    form.setFieldValue(`transfer.transfer_date`, value);
                  }
                },
              }}
            >
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

export default PlayerClubTeamCareerSection;
