"use client";

import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import FormContentWrapper from "../base/FormContentWrapper";
import { SelectField, TextField } from "../fields";
import { PositionEditResponse, UpsertPositionInput } from "@/types/position";
import { usePositionForm } from "@/hooks/dashboard/positions";
import { usePositionCategoryOptions } from "@/hooks/dashboard/position-categories";
import { FormMode } from "@/types/form";
import { useCrudFormState, useCrudFormTranslations } from "@/hooks/crud";

interface Props {
  mode: FormMode;
  position?: PositionEditResponse;

  loading?: boolean;

  onSubmit: (payload: UpsertPositionInput) => void;
}

const PositionForm = ({ mode, position, loading = false, onSubmit }: Props) => {
  const { tLabels, tPlaceholders, tCommonLabels, tCommonPlaceholders } =
    useCrudFormTranslations("position");

  const form = usePositionForm({ position, onSubmit });

  const { isDirty, canSubmit } = useCrudFormState({
    form,
  });

  const { positionCategoryOptions, loading: isPositionCategoryLoading } =
    usePositionCategoryOptions();

  return (
    <FormWrapper isDirty={isDirty}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <FormHeader loading={loading} mode={mode} canSubmit={canSubmit} />

        <FormContentWrapper className="space-y-5">
          {/* Name */}
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

          {/* Category */}
          <form.Field name="position_category_id">
            {(field) => (
              <SelectField
                field={field}
                label={tLabels("category")}
                placeholder={tPlaceholders("category")}
                loading={isPositionCategoryLoading}
                options={positionCategoryOptions}
                required
              />
            )}
          </form.Field>
        </FormContentWrapper>
      </form>
    </FormWrapper>
  );
};

export default PositionForm;
