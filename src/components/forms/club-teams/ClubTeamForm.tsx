"use client";

import { useClubTeamForm } from "@/hooks/dashboard/club-teams";
import { getSquadTypeOptions } from "@/lib/clubs/options";
import { ClubTeamEditResponse, UpsertClubTeamInput } from "@/types/club-team";
import { useTranslations } from "next-intl";
import FormWrapper from "../base/FormWrapper";
import FormHeader from "../base/FormHeader";
import FormContentWrapper from "../base/FormContentWrapper";
import { SelectField } from "../fields";
import { getAgeGroupOptions } from "@/lib/constants/options";
import { FormMode } from "@/types/form";
import { useCrudFormState } from "@/hooks/crud";

interface Props {
  mode: FormMode;
  clubTeam?: ClubTeamEditResponse;

  loading?: boolean;

  onSubmit: (payload: UpsertClubTeamInput) => void;
}

const ClubTeamForm = ({ mode, clubTeam, loading = false, onSubmit }: Props) => {
  const t = useTranslations("");

  const tLabels = useTranslations("dashboard.clubTeams.form.labels");

  const tPlaceholders = useTranslations(
    "dashboard.clubTeams.form.placeholders",
  );

  const form = useClubTeamForm({ clubTeam, onSubmit });

  const { isDirty, canSubmit } = useCrudFormState({ form });

  const squadTypeOptions = getSquadTypeOptions(t);
  const ageGroupOptions = getAgeGroupOptions(t);

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
          {/* Squad Type */}
          <form.Field name="squad_type">
            {(field) => (
              <SelectField
                field={field}
                label={tLabels("squadType")}
                placeholder={tPlaceholders("squadType")}
                options={squadTypeOptions}
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
        </FormContentWrapper>
      </form>
    </FormWrapper>
  );
};

export default ClubTeamForm;
