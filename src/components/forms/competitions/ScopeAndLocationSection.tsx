"use client";

import { useTranslations } from "next-intl";
import FormSection from "../base/FormSection";
import { ComboboxField, SelectField } from "../fields";
import { useNationalityOptions } from "@/hooks/nationalities";
import { useRegionOptions } from "@/hooks/dashboard/regions";
import { useConfederationOptions } from "@/hooks/confederations/useConfederationOptions";
import { useCompetitionScopeOptions } from "@/hooks/dashboard/competition-scopes";
import { CompetitionForm } from "@/hooks/dashboard/competitions";

interface Props {
  form: CompetitionForm;
}

const ScopeAndLocationSection = ({ form }: Props) => {
  const tForm = useTranslations("dashboard.competitions.form.scopeAndLocation");
  const tLabels = useTranslations(
    "dashboard.competitions.form.labels.scopeAndLocation",
  );
  const tPlaceholders = useTranslations(
    "dashboard.competitions.form.placeholders.scopeAndLocation",
  );

  const { competitionScopeOptions, loading: isCompetitionScopeLoading } =
    useCompetitionScopeOptions();

  const { confederationOptions, loading: isConfederationLoading } =
    useConfederationOptions();

  const { nationalityOptions, loading: isNationalityLoading } =
    useNationalityOptions();

  const { regionOptions, loading: isRegionLoading } = useRegionOptions();

  return (
    <FormSection title={tForm("title")}>
      {/* Competition Scope */}
      <form.Field name="competition_scope_id">
        {(field) => (
          <SelectField
            field={field}
            label={tLabels("scope")}
            placeholder={tPlaceholders("scope")}
            loading={isCompetitionScopeLoading}
            options={competitionScopeOptions}
            required
          />
        )}
      </form.Field>

      {/* Confederation */}
      <form.Field name="confederation_id">
        {(field) => (
          <SelectField
            field={field}
            label={tLabels("confederation")}
            placeholder={tPlaceholders("confederation")}
            loading={isConfederationLoading}
            options={confederationOptions}
          />
        )}
      </form.Field>

      {/* Nationality */}
      <form.Field name="nationality_id">
        {(field) => (
          <ComboboxField
            field={field}
            entityKey="nationality"
            label={tLabels("nationality")}
            options={nationalityOptions}
            placeholder={tPlaceholders("nationality")}
            loading={isNationalityLoading}
            required
          />
        )}
      </form.Field>

      {/* Region */}
      <form.Field name="region_id">
        {(field) => (
          <SelectField
            field={field}
            label={tLabels("region")}
            placeholder={tPlaceholders("region")}
            loading={isRegionLoading}
            options={regionOptions}
          />
        )}
      </form.Field>
    </FormSection>
  );
};

export default ScopeAndLocationSection;
