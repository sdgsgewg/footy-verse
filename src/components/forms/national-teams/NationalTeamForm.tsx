"use client";

import { useTranslations } from "next-intl";
import FormWrapper from "../base/FormWrapper";
import FormHeader from "../base/FormHeader";
import FormContentWrapper from "../base/FormContentWrapper";
import { SelectField } from "../fields";
import { AgeGroup } from "@/enums/AgeGroup";
import { getAgeGroupOptions, getGenderOptions } from "@/lib/constants/options";
import {
  NationalTeamEditResponse,
  UpsertNationalTeamInput,
} from "@/types/national-team";
import { useNationalTeamForm } from "@/hooks/dashboard/national-teams";
import { getNationalTeamTypeOptions } from "@/lib/national-teams/options";
import { NationalTeamType } from "@/enums/NationalTeamType";
import { Gender } from "@/enums/Gender";

interface Props {
  mode: "create" | "edit";
  nationalTeam?: NationalTeamEditResponse;

  loading?: boolean;

  onSubmit: (payload: UpsertNationalTeamInput) => void;
}

const NationalTeamForm = ({
  mode,
  nationalTeam,
  loading = false,
  onSubmit,
}: Props) => {
  const t = useTranslations("");
  const tLabels = useTranslations("dashboard.nationalTeams.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.nationalTeams.form.placeholders",
  );

  const { form, setForm, canSubmit, buildPayload } =
    useNationalTeamForm(nationalTeam);

  const genderOptions = getGenderOptions(t);
  const ageGroupOptions = getAgeGroupOptions(t);
  const teamTypeOptions = getNationalTeamTypeOptions(t);

  const isCreate = mode === "create";

  const handleSubmit = () => {
    onSubmit(buildPayload());
  };

  return (
    <FormWrapper>
      <FormHeader
        loading={loading}
        isCreate={isCreate}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-5">
        {/* Gender */}
        <SelectField
          label={tLabels("gender")}
          name="gender"
          placeholder={tPlaceholders("gender")}
          options={genderOptions}
          value={form.gender || ""}
          onChange={(value) => setForm({ ...form, gender: value as Gender })}
          required
        />

        {/* Age Group */}
        <SelectField
          label={tLabels("ageGroup")}
          name="age_group"
          placeholder={tPlaceholders("ageGroup")}
          options={ageGroupOptions}
          value={form.age_group || ""}
          onChange={(value) =>
            setForm({ ...form, age_group: value as AgeGroup })
          }
          required
        />

        {/* Team type */}
        <SelectField
          label={tLabels("teamType")}
          name="team_type"
          placeholder={tPlaceholders("teamType")}
          options={teamTypeOptions}
          value={form.team_type || ""}
          onChange={(value) =>
            setForm({ ...form, team_type: value as NationalTeamType })
          }
          required
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default NationalTeamForm;
