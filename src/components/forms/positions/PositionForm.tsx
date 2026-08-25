"use client";

import { useTranslations } from "next-intl";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import FormContentWrapper from "../base/FormContentWrapper";
import { SelectField, TextField } from "../fields";
import { PositionEditResponse, UpsertPositionInput } from "@/types/position";
import { usePositionForm } from "@/hooks/dashboard/positions";
import { usePositionCategories } from "@/hooks/dashboard/position-categories";
import { getPositionCategoryOptions } from "@/lib/position-categories/options";

interface Props {
  mode: "create" | "edit";
  position?: PositionEditResponse;

  loading?: boolean;

  onSubmit: (payload: UpsertPositionInput) => void;
}

const PositionForm = ({ mode, position, loading = false, onSubmit }: Props) => {
  const t = useTranslations("dashboard.positions");

  const {
    form,
    isDirty,
    errors,
    updateField,
    validate,
    canSubmit,
    buildPayload,
  } = usePositionForm(position);

  const isCreate = mode === "create";

  const { positionCategories } = usePositionCategories();
  const categoryOptions = getPositionCategoryOptions(positionCategories);

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    onSubmit(buildPayload());
  };

  return (
    <FormWrapper isDirty={isDirty}>
      <FormHeader
        loading={loading}
        isCreate={isCreate}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-5">
        {/* Name */}
        <TextField
          label={t("form.labels.name")}
          name="name"
          placeholder={t("form.placeholders.name") || ""}
          value={(form.name as string) ?? ""}
          onChange={(value) => updateField("name", value)}
          error={errors.name}
          required
        />

        {/* Category */}
        <SelectField
          label={t("form.labels.category")}
          name={`position_category_id`}
          placeholder={t("form.placeholders.category")}
          options={categoryOptions}
          value={form.position_category_id || ""}
          onChange={(value) => updateField("position_category_id", value)}
          error={errors.position_category_id}
          required
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default PositionForm;
