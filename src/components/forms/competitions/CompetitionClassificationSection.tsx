"use client";

import { useTranslations } from "next-intl";
import FormSection from "../base/FormSection";
import { UpsertCompetitionInput } from "@/types/competition";
import { SelectField } from "../fields";
import { getAgeGroupOptions, getGenderOptions } from "@/lib/constants/options";
import { getParticipantTypeOptions } from "@/lib/competitions/options";
import { getCompetitionCategoryOptions } from "@/lib/competition-categories/options";
import { useCompetitionCategories } from "@/hooks/dashboard/competition-categories";
import { AgeGroup } from "@/enums/AgeGroup";
import { Gender } from "@/enums/Gender";
import { ParticipantType } from "@/enums/ParticipantType";
import { FormErrors, FormState } from "@/types/form";

interface Props {
  form: FormState<UpsertCompetitionInput>;

  updateField: <K extends keyof UpsertCompetitionInput>(
    field: K,
    value: UpsertCompetitionInput[K],
  ) => void;

  errors: FormErrors<keyof UpsertCompetitionInput & string>;
}

const CompetitionClassificationSection = ({
  form,
  updateField,
  errors,
}: Props) => {
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

  const { competitionCategories } = useCompetitionCategories();
  const competitionCategoryOptions = getCompetitionCategoryOptions(
    competitionCategories,
  );

  const { gender, age_group, participant_type, competition_category_id } = form;

  return (
    <FormSection title={tForm("title")}>
      {/* Gender */}
      <SelectField
        label={tLabels("gender")}
        name="gender"
        placeholder={tPlaceholders("gender")}
        options={genderOptions}
        value={gender || ""}
        onChange={(value) => updateField("gender", value as Gender)}
        error={errors.gender}
        required
      />

      {/* Age Group */}
      <SelectField
        label={tLabels("ageGroup")}
        name="age_group"
        placeholder={tPlaceholders("ageGroup")}
        options={ageGroupOptions}
        value={age_group || ""}
        onChange={(value) => updateField("age_group", value as AgeGroup)}
        error={errors.age_group}
        required
      />

      {/* Participant Type */}
      <SelectField
        label={tLabels("participantType")}
        name="participant_type"
        placeholder={tPlaceholders("participantType")}
        options={participantTypeOptions}
        value={participant_type || ""}
        onChange={(value) =>
          updateField("participant_type", value as ParticipantType)
        }
        error={errors.participant_type}
        required
      />

      {/* Competition Category */}
      <SelectField
        label={tLabels("category")}
        name="competition_category_id"
        placeholder={tPlaceholders("category")}
        options={competitionCategoryOptions}
        value={competition_category_id || ""}
        onChange={(value) => updateField("competition_category_id", value)}
        error={errors.competition_category_id}
        required
      />
    </FormSection>
  );
};

export default CompetitionClassificationSection;
