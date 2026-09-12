"use client";

import { useTranslations } from "next-intl";
import FormSection from "../base/FormSection";
import ComboboxField from "../fields/ComboboxField";
import DateField from "../fields/DateField";
import { useClubTeams } from "@/hooks/club-teams";
import { getClubTeamOptions } from "@/lib/club-teams/options";
import { PlayerClubTeamCareerForm } from "@/hooks/dashboard/player-club-team-careers";

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

export default PlayerClubTeamCareerSection;
