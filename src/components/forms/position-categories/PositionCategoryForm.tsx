"use client";

import { TextField } from "../fields";
import { usePositionCategoryForm } from "@/hooks/dashboard/position-categories";
import { useCrudFormState, useCrudFormTranslations } from "@/hooks/crud";
import CrudListPageForm from "@/components/templates/crud/CrudListPageForm";

interface Props {
  form: ReturnType<typeof usePositionCategoryForm>["form"];

  loading?: boolean;

  isEditing: boolean;

  buttonText: string;

  resetForm: () => void;
}

const PositionCategoryForm = ({
  form,
  loading = false,
  isEditing,
  buttonText,
  resetForm,
}: Props) => {
  const { tCommonLabels, tCommonPlaceholders } =
    useCrudFormTranslations("positionCategory");

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
    </CrudListPageForm>
  );
};

export default PositionCategoryForm;
