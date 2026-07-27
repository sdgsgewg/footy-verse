"use client";

import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import FormSection from "../base/FormSection";
import ComboboxField from "../fields/ComboboxField";
import DateField from "../fields/DateField";
import { UpsertPlayerClubCareerInput } from "@/types/player-club-career";
import { useClubTeams } from "@/hooks/club-teams";
import { getClubTeamOptions } from "@/lib/club-teams/options";

interface Props {
  form: UpsertPlayerClubCareerInput;
  setForm: Dispatch<SetStateAction<UpsertPlayerClubCareerInput>>;
}

const PlayerClubCareerSection = ({ form, setForm }: Props) => {
  const tForm = useTranslations("dashboard.playerClubCareers.form.career");
  const tLabels = useTranslations(
    "dashboard.playerClubCareers.form.labels.career",
  );
  const tPlaceholders = useTranslations(
    "dashboard.playerClubCareers.form.placeholders.career",
  );

  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  const { club_team_id, career } = form;
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
          setForm({
            ...form,
            club_team_id: value,
          })
        }
        required
      />

      {/* Join Date */}
      <DateField
        label={tLabels("joinedAt")}
        name={`joined_at`}
        placeholder={tPlaceholders("joinedAt") || ""}
        value={joined_at}
        onChange={(value) =>
          setForm({
            ...form,
            career: {
              ...career,
              joined_at: value,
            },
          })
        }
        required
      />

      {/* Left Date */}
      <DateField
        label={tLabels("leftAt")}
        name={`left_at`}
        placeholder={tPlaceholders("leftAt") || ""}
        value={left_at ?? ""}
        onChange={(value) =>
          setForm({
            ...form,
            career: {
              ...career,
              left_at: value,
            },
          })
        }
      />
    </FormSection>
  );
};

export default PlayerClubCareerSection;
