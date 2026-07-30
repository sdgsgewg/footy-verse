"use client";

import { Dispatch, SetStateAction } from "react";
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

interface Props {
  form: UpsertCompetitionInput;
  setForm: Dispatch<SetStateAction<UpsertCompetitionInput>>;
}

const CompetitionClassificationSection = ({ form, setForm }: Props) => {
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
        onChange={(value) => setForm({ ...form, gender: value as Gender })}
        required
      />

      {/* Age Group */}
      <SelectField
        label={tLabels("ageGroup")}
        name="age_group"
        placeholder={tPlaceholders("ageGroup")}
        options={ageGroupOptions}
        value={age_group || ""}
        onChange={(value) => setForm({ ...form, age_group: value as AgeGroup })}
        required
      />

      {/* Age Group */}
      <SelectField
        label={tLabels("participantType")}
        name="participant_type"
        placeholder={tPlaceholders("participantType")}
        options={participantTypeOptions}
        value={participant_type || ""}
        onChange={(value) =>
          setForm({ ...form, participant_type: value as ParticipantType })
        }
        required
      />

      {/* Competition Category */}
      <SelectField
        label={tLabels("category")}
        name="competition_category_id"
        placeholder={tPlaceholders("category")}
        options={competitionCategoryOptions}
        value={competition_category_id || ""}
        onChange={(value) =>
          setForm({ ...form, competition_category_id: value })
        }
        required
      />
    </FormSection>
  );
};

export default CompetitionClassificationSection;
