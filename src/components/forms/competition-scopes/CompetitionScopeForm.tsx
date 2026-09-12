"use client";

import { TextAreaField, TextField } from "../fields";
import { useCompetitionScopeForm } from "@/hooks/dashboard/competition-scopes";
import { useCrudFormState, useCrudFormTranslations } from "@/hooks/crud";
import CrudListPageForm from "@/components/templates/crud/CrudListPageForm";

interface Props {
  form: ReturnType<typeof useCompetitionScopeForm>["form"];

  loading?: boolean;

  isEditing: boolean;

  buttonText: string;

  resetForm: () => void;
}

const CompetitionScopeForm = ({
  form,
  loading = false,
  isEditing,
  buttonText,
  resetForm,
}: Props) => {
  const { tCommonLabels, tCommonPlaceholders } =
    useCrudFormTranslations("competitionScope");

  const { isDirty, canSubmit } = useCrudFormState({
    form,
  });

  return (
    <CrudListPageForm
      isDirty={isDirty}
      isEditing={isEditing}
      isSubmitting={loading}
      buttonText={buttonText}
      resetForm={resetForm}
      canSubmit={canSubmit}
      onSubmit={() => form.handleSubmit()}
    >
      <form.Field name="name">
        {(field) => (
          <TextField
            field={field}
            label={tCommonLabels("name")}
            placeholder={tCommonPlaceholders("name")}
            required
          />
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <TextAreaField
            field={field}
            label={tCommonLabels("description")}
            placeholder={tCommonPlaceholders("description")}
          />
        )}
      </form.Field>
    </CrudListPageForm>
  );
};

export default CompetitionScopeForm;
