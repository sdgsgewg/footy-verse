"use client";

import { useClubTeamForm } from "@/hooks/dashboard/club-teams";
import { getSquadTypeOptions } from "@/lib/clubs/options";
import { ClubTeamEditResponse, UpsertClubTeamInput } from "@/types/club-team";
import { useTranslations } from "next-intl";
import FormWrapper from "../base/FormWrapper";
import FormHeader from "../base/FormHeader";
import FormContentWrapper from "../base/FormContentWrapper";
import { SelectField } from "../fields";
import { SquadType } from "@/enums/SquadType";
import { AgeGroup } from "@/enums/AgeGroup";
import { getAgeGroupOptions } from "@/lib/constants/options";
import { FormMode } from "@/types/form";

interface Props {
  mode: FormMode;
  clubTeam?: ClubTeamEditResponse;

  loading?: boolean;

  onSubmit: (payload: UpsertClubTeamInput) => void;
}

const ClubTeamForm = ({ mode, clubTeam, loading = false, onSubmit }: Props) => {
  const t = useTranslations("");
  const tClubTeams = useTranslations("dashboard.clubTeams");

  const {
    form,
    isDirty,
    errors,
    updateField,
    validate,
    canSubmit,
    buildPayload,
  } = useClubTeamForm(clubTeam);

  const squadTypeOptions = getSquadTypeOptions(t);
  const ageGroupOptions = getAgeGroupOptions(t);

  const isCreate = mode === "create";

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    onSubmit(buildPayload());
  };

  return (
    <FormWrapper isDirty={isDirty}>
      <FormHeader
        loading={loading}
        isCreate={isCreate}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-5">
        {/* Squad Type */}
        <SelectField
          label={tClubTeams("form.labels.squadType")}
          name="squad_type"
          placeholder={tClubTeams("form.placeholders.squadType")}
          options={squadTypeOptions}
          value={form.squad_type || ""}
          onChange={(value) => updateField("squad_type", value as SquadType)}
          error={errors.squad_type}
          required
        />

        {/* Age Group */}
        <SelectField
          label={tClubTeams("form.labels.ageGroup")}
          name="age_group"
          placeholder={tClubTeams("form.placeholders.ageGroup")}
          options={ageGroupOptions}
          value={form.age_group || ""}
          onChange={(value) => updateField("age_group", value as AgeGroup)}
          error={errors.age_group}
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default ClubTeamForm;
