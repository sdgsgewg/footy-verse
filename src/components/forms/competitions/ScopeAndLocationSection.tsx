"use client";

import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import FormSection from "../base/FormSection";
import { UpsertCompetitionInput } from "@/types/competition";
import { SelectField } from "../fields";
import { useCompetitionScopes } from "@/hooks/dashboard/competition-scopes";
import { getCompetitionScopeOptions } from "@/lib/competition-scopes/options";
import { getRegionOptions } from "@/lib/regions/options";
import { useNationalityOptions } from "@/hooks/nationalities";
import { useRegions } from "@/hooks/dashboard/regions";
import { useConfederationOptions } from "@/hooks/confederations/useConfederationOptions";

interface Props {
  form: UpsertCompetitionInput;
  setForm: Dispatch<SetStateAction<UpsertCompetitionInput>>;
}

const ScopeAndLocationSection = ({ form, setForm }: Props) => {
  const tForm = useTranslations("dashboard.competitions.form.scopeAndLocation");
  const tLabels = useTranslations(
    "dashboard.competitions.form.labels.scopeAndLocation",
  );
  const tPlaceholders = useTranslations(
    "dashboard.competitions.form.placeholders.scopeAndLocation",
  );

  const { competitionScopes } = useCompetitionScopes();
  const competitionScopeOptions = getCompetitionScopeOptions(competitionScopes);

  const { confederationOptions } = useConfederationOptions();

  const { nationalityOptions } = useNationalityOptions();

  const { regions } = useRegions();
  const regionOptions = getRegionOptions(regions);

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
        onChange={(value) => setForm({ ...form, competition_scope_id: value })}
        required
      />

      {/* Confederation */}
      <SelectField
        label={tLabels("confederation")}
        name="confederation_id"
        placeholder={tPlaceholders("confederation")}
        options={confederationOptions}
        value={confederation_id || ""}
        onChange={(value) => setForm({ ...form, confederation_id: value })}
      />

      {/* Nationality */}
      <SelectField
        label={tLabels("nationality")}
        name="nationality_id"
        placeholder={tPlaceholders("nationality")}
        options={nationalityOptions}
        value={nationality_id || ""}
        onChange={(value) => setForm({ ...form, nationality_id: value })}
      />

      {/* Region */}
      <SelectField
        label={tLabels("region")}
        name="region_id"
        placeholder={tPlaceholders("region")}
        options={regionOptions}
        value={region_id || ""}
        onChange={(value) => setForm({ ...form, region_id: value })}
      />
    </FormSection>
  );
};

export default ScopeAndLocationSection;
