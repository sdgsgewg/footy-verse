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

interface Props {
  mode: "create" | "edit";
  clubTeam?: ClubTeamEditResponse;

  loading?: boolean;

  onSubmit: (payload: UpsertClubTeamInput) => void;
}

const ClubTeamForm = ({ mode, clubTeam, loading = false, onSubmit }: Props) => {
  const t = useTranslations("");
  const tClubTeams = useTranslations("dashboard.clubTeams");

  const { form, setForm, canSubmit, buildPayload } = useClubTeamForm(clubTeam);

  const squadTypeOptions = getSquadTypeOptions(t);
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
          label={tClubTeams("form.labels.squadType")}
          name="squad_type"
          placeholder={tClubTeams("form.placeholders.squadType")}
          options={squadTypeOptions}
          value={form.squad_type || ""}
          onChange={(value) =>
            setForm({ ...form, squad_type: value as SquadType })
          }
          required
        />

        {/* Age Group */}
        <SelectField
          label={tClubTeams("form.labels.ageGroup")}
          name="age_griup"
          placeholder={tClubTeams("form.placeholders.ageGroup")}
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

export default ClubTeamForm;
