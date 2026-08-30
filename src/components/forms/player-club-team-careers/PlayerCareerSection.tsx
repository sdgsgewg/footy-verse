"use client";

import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import FormSection from "../base/FormSection";
import ComboboxField from "../fields/ComboboxField";
import DateField from "../fields/DateField";
import { UpsertPlayerClubTeamCareerInput } from "@/types/player-club-team-career";
import { useClubTeams } from "@/hooks/club-teams";
import { getClubTeamOptions } from "@/lib/club-teams/options";
import { FormErrors } from "@/types/form";

interface Props {
  form: UpsertPlayerClubTeamCareerInput;

  setForm: Dispatch<SetStateAction<UpsertPlayerClubTeamCareerInput>>;

  errors: FormErrors;
}

const PlayerClubTeamCareerSection = ({ form, setForm, errors }: Props) => {
  const tForm = useTranslations("dashboard.playerClubTeamCareers.form.career");
  const tLabels = useTranslations(
    "dashboard.playerClubTeamCareers.form.labels.career",
  );
  const tPlaceholders = useTranslations(
    "dashboard.playerClubTeamCareers.form.placeholders.career",
  );

  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  const { club_team_id } = form;
  const { joined_at, left_at } = form.career;

  const { clubTeams } = useClubTeams();
  const clubTeamOptions = getClubTeamOptions(clubTeams);

  return (
    <FormSection title={tForm("title")}>
      {/* Club Team */}
      <ComboboxField
        label={tLabels("club")}
        name="club"
        options={clubTeamOptions}
        value={club_team_id}
        placeholder={tPlaceholders("club")}
        searchPlaceholder={tCommon("combobox.searchEntity", {
          entity: tEntities("club").toLowerCase(),
        })}
        emptyMessage={tCommon("combobox.noEntityFound", {
          entity: tEntities("club").toLowerCase(),
        })}
        onChange={(value) =>
          setForm((prev) => ({
            ...prev,
            club_team_id: value,
          }))
        }
        error={errors.club_team_id}
        required
      />

      {/* Join Date */}
      <DateField
        label={tLabels("joinedAt")}
        name={`joined_at`}
        placeholder={tPlaceholders("joinedAt") || ""}
        value={joined_at}
        onChange={(value) =>
          setForm((prev) => ({
            ...prev,
            career: {
              ...prev.career,
              joined_at: value,
            },
          }))
        }
        error={errors["career.joined_at"]}
        required
      />

      {/* Left Date */}
      <DateField
        label={tLabels("leftAt")}
        name={`left_at`}
        placeholder={tPlaceholders("leftAt") || ""}
        value={left_at ?? ""}
        onChange={(value) =>
          setForm((prev) => ({
            ...prev,
            career: {
              ...prev.career,
              left_at: value,
            },
          }))
        }
        error={errors["career.left_at"]}
      />
    </FormSection>
  );
};

export default PlayerClubTeamCareerSection;
