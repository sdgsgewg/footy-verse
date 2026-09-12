"use client";

import { useTranslations } from "next-intl";
import FormWrapper from "../base/FormWrapper";
import FormHeader from "../base/FormHeader";
import FormContentWrapper from "../base/FormContentWrapper";
import { SelectField } from "../fields";
import { getAgeGroupOptions, getGenderOptions } from "@/lib/constants/options";
import {
  NationalTeamEditResponse,
  UpsertNationalTeamInput,
} from "@/types/national-team";
import { useNationalTeamForm } from "@/hooks/dashboard/national-teams";
import { getNationalTeamTypeOptions } from "@/lib/national-teams/options";
import { useCrudFormState } from "@/hooks/crud";
import { FormMode } from "@/types/form";

interface Props {
  mode: FormMode;
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

  const form = useNationalTeamForm({ nationalTeam, onSubmit });

  const { isDirty, canSubmit } = useCrudFormState({ form });

  const genderOptions = getGenderOptions(t);
  const ageGroupOptions = getAgeGroupOptions(t);
  const teamTypeOptions = getNationalTeamTypeOptions(t);

  return (
    <FormWrapper isDirty={isDirty}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FormHeader loading={loading} mode={mode} canSubmit={canSubmit} />

        <FormContentWrapper className="space-y-5">
          {/* Gender */}
          <form.Field name="gender">
            {(field) => (
              <SelectField
                field={field}
                label={tLabels("gender")}
                placeholder={tPlaceholders("gender")}
                options={genderOptions}
                required
              />
            )}
          </form.Field>

          {/* Age Group */}
          <form.Field name="age_group">
            {(field) => (
              <SelectField
                field={field}
                label={tLabels("ageGroup")}
                placeholder={tPlaceholders("ageGroup")}
                options={ageGroupOptions}
                required
              />
            )}
          </form.Field>

          {/* Team type */}
          <form.Field name="team_type">
            {(field) => (
              <SelectField
                field={field}
                label={tLabels("teamType")}
                placeholder={tPlaceholders("teamType")}
                options={teamTypeOptions}
                required
              />
            )}
          </form.Field>
        </FormContentWrapper>
      </form>
    </FormWrapper>
  );
};

export default NationalTeamForm;
