"use client";

import { useTranslations } from "next-intl";
import FormSection from "../base/FormSection";
import { SelectField } from "../fields";
import { getAgeGroupOptions, getGenderOptions } from "@/lib/constants/options";
import { getParticipantTypeOptions } from "@/lib/competitions/options";
import { useCompetitionCategoryOptions } from "@/hooks/dashboard/competition-categories";
import { CompetitionForm } from "@/hooks/dashboard/competitions";

interface Props {
  form: CompetitionForm;
}

const CompetitionClassificationSection = ({ form }: Props) => {
  const t = useTranslations();
  const tForm = useTranslations("dashboard.competitions.form.classification");
  const tLabels = useTranslations(
    "dashboard.competitions.form.labels.classification",
  );
  const tPlaceholders = useTranslations(
    "dashboard.competitions.form.placeholders.classification",
  );

  const genderOptions = getGenderOptions(t);

  const ageGroupOptions = getAgeGroupOptions(t);

  const participantTypeOptions = getParticipantTypeOptions(t);

  const { competitionCategoryOptions, loading: isCompetitionCategoryLoading } =
    useCompetitionCategoryOptions();

  return (
    <FormSection title={tForm("title")}>
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

      {/* Participant Type */}
      <form.Field name="participant_type">
        {(field) => (
          <SelectField
            field={field}
            label={tLabels("participantType")}
            placeholder={tPlaceholders("participantType")}
            options={participantTypeOptions}
            required
          />
        )}
      </form.Field>

      {/* Competition Category */}

      <form.Field name="competition_category_id">
        {(field) => (
          <SelectField
            field={field}
            label={tLabels("category")}
            placeholder={tPlaceholders("category")}
            loading={isCompetitionCategoryLoading}
            options={competitionCategoryOptions}
            required
          />
        )}
      </form.Field>
    </FormSection>
  );
};

export default CompetitionClassificationSection;
