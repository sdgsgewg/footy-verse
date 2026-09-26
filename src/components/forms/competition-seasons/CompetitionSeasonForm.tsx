"use client";

import { FormMode } from "@/types/form";
import { DateField, TextField } from "../fields";
import { useCrudFormState, useCrudFormTranslations } from "@/hooks/crud";
import {
  CompetitionSeasonEditResponse,
  UpsertCompetitionSeasonInput,
} from "@/types/competition-season";
import { useCompetitionSeasonForm } from "@/hooks/dashboard/competition-seasons";
import { FormContentWrapper, FormHeader, FormWrapper } from "../base";
import { parseDateString } from "@/lib/utils/date";

interface Props {
  mode: FormMode;
  competitionSeason?: CompetitionSeasonEditResponse;

  loading?: boolean;

  onSubmit: (payload: UpsertCompetitionSeasonInput) => void;
}

const CompetitionSeasonForm = ({
  mode,
  competitionSeason,
  loading = false,
  onSubmit,
}: Props) => {
  const { tLabels, tPlaceholders, tCommonLabels, tCommonPlaceholders } =
    useCrudFormTranslations("competitionSeason");

  const form = useCompetitionSeasonForm({ competitionSeason, onSubmit });

  const { isDirty, canSubmit } = useCrudFormState({ form });

  const handleSubmit = () => {
    form.handleSubmit();
  };

  return (
    <FormWrapper isDirty={isDirty}>
      <FormHeader
        loading={loading}
        mode={mode}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-5">
        {/* Name */}
        <form.Field name="name">
          {(field) => (
            <TextField
              field={field}
              label={tCommonLabels("name")}
              placeholder={tCommonPlaceholders("name")}
            />
          )}
        </form.Field>

        {/* Season Label */}
        <form.Field name="season_label">
          {(field) => (
            <TextField
              field={field}
              label={tLabels("seasonLabel")}
              placeholder={tPlaceholders("seasonLabel")}
              required
            />
          )}
        </form.Field>

        {/* Start Date */}
        <form.Field name="end_date">
          {(endDateField) => (
            <form.Field name="start_date">
              {(startDateField) => (
                <DateField
                  field={startDateField}
                  label={tCommonLabels("startDate")}
                  placeholder={tCommonPlaceholders("startDate") || ""}
                  endMonth={new Date(2100, 11, 31)}
                  maxDate={parseDateString(endDateField.state.value)}
                  required
                />
              )}
            </form.Field>
          )}
        </form.Field>

        {/* End Date */}
        <form.Field name="start_date">
          {(startDateField) => (
            <form.Field name="end_date">
              {(endDateField) => (
                <DateField
                  field={endDateField}
                  label={tCommonLabels("endDate")}
                  placeholder={tCommonPlaceholders("endDate") || ""}
                  startMonth={parseDateString(startDateField.state.value)}
                  endMonth={new Date(2100, 11, 31)}
                  minDate={parseDateString(startDateField.state.value)}
                  required
                />
              )}
            </form.Field>
          )}
        </form.Field>
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default CompetitionSeasonForm;
