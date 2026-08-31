"use client";

import { UpsertPlayerNationalTeamCareerInput } from "@/types/player-national-team-career";
import { useTranslations } from "next-intl";
import React, { Dispatch, SetStateAction } from "react";
import FormSection from "../../base/FormSection";
import { ComboboxField, DateField } from "../../fields";
import { useNationalTeams } from "@/hooks/national-teams";
import { getNationalTeamOptions } from "@/lib/national-teams/options";

interface Props {
  form: UpsertPlayerNationalTeamCareerInput;

  setForm: Dispatch<SetStateAction<UpsertPlayerNationalTeamCareerInput>>;
}

const PlayerCareerSection = ({ form, setForm }: Props) => {
  const tForm = useTranslations(
    "dashboard.playerNationalTeamCareers.form.career",
  );

  const tLabels = useTranslations(
    "dashboard.playerNationalTeamCareers.form.labels.career",
  );
  const tPlaceholders = useTranslations(
    "dashboard.playerNationalTeamCareers.form.placeholders.career",
  );

  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  const { national_team_id } = form;
  const { joined_at, left_at } = form.career;

  const { nationalTeams, loading: nationalTeamLoading } = useNationalTeams();
  const nationalTeamOptions = getNationalTeamOptions(nationalTeams);

  return (
    <FormSection title={tForm("title")}>
      {/* Nation */}
      <ComboboxField
        label={tLabels("nation")}
        name={`national_team`}
        options={nationalTeamOptions}
        placeholder={tPlaceholders("nation") || ""}
        loading={nationalTeamLoading}
        searchPlaceholder={tCommon("combobox.searchEntity", {
          entity: tEntities("nationality").toLowerCase(),
        })}
        emptyMessage={tCommon("combobox.noEntityFound", {
          entity: tEntities("nationality").toLowerCase(),
        })}
        value={national_team_id}
        onChange={(value) =>
          setForm((prev) => ({
            ...prev,
            national_team_id: value,
          }))
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
          setForm((prev) => ({
            ...prev,

            career: {
              ...prev.career,
              joined_at: value,
            },
          }))
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
          setForm((prev) => ({
            ...prev,

            career: {
              ...prev.career,
              left_at: value,
            },
          }))
        }
      />
    </FormSection>
  );
};

export default PlayerCareerSection;
