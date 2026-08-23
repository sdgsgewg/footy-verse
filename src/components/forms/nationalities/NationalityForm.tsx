"use client";

import { useNationalityForm } from "@/hooks/dashboard/nationalities";
import { useTranslations } from "next-intl";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import FormContentWrapper from "../base/FormContentWrapper";
import { ImageField, SelectField, TextField } from "../fields";
import { NationalityEditResponse } from "@/types/nationality";
import { useConfederationOptions } from "@/hooks/confederations/useConfederationOptions";
import UnsavedChangesGuard from "../base/UnsavedChangesGuard";

interface Props {
  mode: "create" | "edit";
  nationality?: NationalityEditResponse;

  loading?: boolean;

  onSubmit: (payload: FormData) => void;
}

const NationalityForm = ({
  mode,
  nationality,
  loading = false,
  onSubmit,
}: Props) => {
  const tLabels = useTranslations("dashboard.nationalities.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.nationalities.form.placeholders",
  );

  const {
    form,
    errors,
    updateField,
    updateImage,
    canSubmit,
    isDirty,
    buildPayload,
    validate,
  } = useNationalityForm(nationality);

  const isCreate = mode === "create";

  const { confederationOptions } = useConfederationOptions();

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    onSubmit(buildPayload());
  };

  return (
    <FormWrapper>
      <UnsavedChangesGuard when={isDirty} />

      <FormHeader
        loading={loading}
        isCreate={isCreate}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-5">
        {/* Image */}
        <ImageField
          label={tLabels("image")}
          name="image"
          value={(form.previewUrl ?? form.imageUrl) as string}
          onChange={updateImage}
          error={errors.image}
        />

        {/* Name */}
        <TextField
          label={tLabels("name")}
          name="name"
          placeholder={tPlaceholders("name") || ""}
          value={(form.name as string) ?? ""}
          onChange={(value) => updateField("name", value)}
          error={errors.name}
          required
        />

        {/* Fifa Code */}
        <TextField
          label={tLabels("fifaCode")}
          name="fifa_code"
          placeholder={tPlaceholders("fifaCode") || ""}
          value={(form.fifa_code as string) ?? ""}
          onChange={(value) => updateField("fifa_code", value)}
          error={errors.fifa_code}
          required
        />

        {/* Confederation */}
        <SelectField
          label={tLabels("confederation")}
          name={`confederation`}
          placeholder={tPlaceholders("confederation")}
          options={confederationOptions}
          value={form.confederation_id || ""}
          onChange={(value) => updateField("confederation_id", value)}
          error={errors.confederation_id}
          required
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default NationalityForm;
