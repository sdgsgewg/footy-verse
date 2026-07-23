"use client";

import { useTranslations } from "next-intl";
import FormWrapper from "../base/FormWrapper";
import FormHeader from "../base/FormHeader";
import FormContentWrapper from "../base/FormContentWrapper";
import { SelectField } from "../fields";
import { AgeGroup } from "@/enums/AgeGroup";
import {
  getAgeGroupOptions,
  getTeamCategoryOptions,
} from "@/lib/constants/options";
import {
  NationalTeamEditResponse,
  UpsertNationalTeamInput,
} from "@/types/national-team";
import { useNationalTeamForm } from "@/hooks/dashboard/national-teams";
import { TeamCategory } from "@/enums/TeamCategory";

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
  const tNationalTeams = useTranslations("dashboard.nationalTeams");

  const { form, setForm, canSubmit, buildPayload } =
    useNationalTeamForm(nationalTeam);

  const teamCategoryOptions = getTeamCategoryOptions(t);
  const ageGroupOptions = getAgeGroupOptions(t);

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
        {/* Squad Type */}
        <SelectField
          label={tNationalTeams("form.labels.squadType")}
          name="squad_type"
          placeholder={tNationalTeams("form.placeholders.squadType")}
          options={teamCategoryOptions}
          value={form.team_category || ""}
          onChange={(value) =>
            setForm({ ...form, team_category: value as TeamCategory })
          }
          required
        />

        {/* Age Group */}
        <SelectField
          label={tNationalTeams("form.labels.ageGroup")}
          name="age_griup"
          placeholder={tNationalTeams("form.placeholders.ageGroup")}
          options={ageGroupOptions}
          value={form.age_group || ""}
          onChange={(value) =>
            setForm({ ...form, age_group: value as AgeGroup })
          }
          required
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default NationalTeamForm;
