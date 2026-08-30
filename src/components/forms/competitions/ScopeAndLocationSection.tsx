"use client";

import { useTranslations } from "next-intl";
import FormSection from "../base/FormSection";
import { UpsertCompetitionInput } from "@/types/competition";
import { SelectField } from "../fields";
import { useNationalityOptions } from "@/hooks/nationalities";
import { useRegionOptions } from "@/hooks/dashboard/regions";
import { useConfederationOptions } from "@/hooks/confederations/useConfederationOptions";
import { FormErrors } from "@/types/form";
import { useCompetitionScopeOptions } from "@/hooks/dashboard/competition-scopes";

interface Props {
  form: UpsertCompetitionInput;

  updateField: <K extends keyof UpsertCompetitionInput>(
    field: K,
    value: UpsertCompetitionInput[K],
  ) => void;

  errors: FormErrors<keyof UpsertCompetitionInput & string>;
}

const ScopeAndLocationSection = ({ form, updateField, errors }: Props) => {
  const tForm = useTranslations("dashboard.competitions.form.scopeAndLocation");
  const tLabels = useTranslations(
    "dashboard.competitions.form.labels.scopeAndLocation",
  );
  const tPlaceholders = useTranslations(
    "dashboard.competitions.form.placeholders.scopeAndLocation",
  );

  const { competitionScopeOptions } = useCompetitionScopeOptions();

  const { confederationOptions } = useConfederationOptions();

  const { nationalityOptions } = useNationalityOptions();

  const { regionOptions } = useRegionOptions();

  const { competition_scope_id, confederation_id, nationality_id, region_id } =
    form;

  return (
    <FormSection title={tForm("title")}>
      {/* Competition Scope */}
      <SelectField
        label={tLabels("scope")}
        name="competition_scope_id"
        placeholder={tPlaceholders("scope")}
        options={competitionScopeOptions}
        value={competition_scope_id || ""}
        onChange={(value) => updateField("competition_scope_id", value)}
        error={errors.competition_scope_id}
        required
      />

      {/* Confederation */}
      <SelectField
        label={tLabels("confederation")}
        name="confederation_id"
        placeholder={tPlaceholders("confederation")}
        options={confederationOptions}
        value={confederation_id || ""}
        onChange={(value) => updateField("confederation_id", value)}
        error={errors.confederation_id}
      />

      {/* Nationality */}
      <SelectField
        label={tLabels("nationality")}
        name="nationality_id"
        placeholder={tPlaceholders("nationality")}
        options={nationalityOptions}
        value={nationality_id || ""}
        onChange={(value) => updateField("nationality_id", value)}
        error={errors.nationality_id}
      />

      {/* Region */}
      <SelectField
        label={tLabels("region")}
        name="region_id"
        placeholder={tPlaceholders("region")}
        options={regionOptions}
        value={region_id || ""}
        onChange={(value) => updateField("region_id", value)}
        error={errors.region_id}
      />
    </FormSection>
  );
};

export default ScopeAndLocationSection;
