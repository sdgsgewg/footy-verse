"use client";

import { useTranslations } from "next-intl";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { DateField, ImageField, SelectField, TextField } from "../fields";
import { useRegionOptions } from "@/hooks/dashboard/regions";
import { ConfederationEditResponse } from "@/types/confederation";
import { useConfederationForm } from "@/hooks/dashboard/confederations";
import { SideBySideFormContentWrapper } from "../base";

interface Props {
  mode: "create" | "edit";
  confederation?: ConfederationEditResponse;

  loading?: boolean;

  onSubmit: (payload: FormData) => void;
}

const ConfederationForm = ({
  mode,
  confederation,
  loading = false,
  onSubmit,
}: Props) => {
  const tLabels = useTranslations("dashboard.confederations.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.confederations.form.placeholders",
  );

  const {
    form,
    isDirty,
    errors,
    updateField,
    updateImage,
    validate,
    canSubmit,
    buildPayload,
  } = useConfederationForm(confederation);

  const isCreate = mode === "create";

  const { regionOptions } = useRegionOptions();

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    onSubmit(buildPayload());
  };

  const LeftSideContent = () => {
    return (
      <>
        {/* Image */}
        <ImageField
          label={tLabels("image")}
          name="image"
          value={(form.previewUrl ?? form.imageUrl) as string}
          onChange={updateImage}
          imageClassName="object-contain"
          error={errors.image}
        />
      </>
    );
  };

  const RightSideContent = () => {
    return (
      <>
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

        {/* Short Name */}
        <TextField
          label={tLabels("shortName")}
          name="short_name"
          placeholder={tPlaceholders("shortName") || ""}
          value={(form.short_name as string) ?? ""}
          onChange={(value) => updateField("short_name", value)}
          error={errors.short_name}
          required
        />

        {/* Region */}
        <SelectField
          label={tLabels("region")}
          name={`region_id`}
          placeholder={tPlaceholders("region")}
          options={regionOptions}
          value={form.region_id || ""}
          onChange={(value) => updateField("region_id", value)}
          error={errors.region_id}
        />

        {/* Founded Date */}
        <DateField
          label={tLabels("founded")}
          name="founded"
          placeholder={tPlaceholders("founded") || ""}
          value={(form.founded as string) ?? ""}
          onChange={(value) => updateField("founded", value)}
          error={errors.founded}
        />

        {/* Headquarters */}
        <TextField
          label={tLabels("headquarters")}
          name="headquarters"
          placeholder={tPlaceholders("headquarters") || ""}
          value={(form.headquarters as string) ?? ""}
          onChange={(value) => updateField("headquarters", value)}
          error={errors.headquarters}
        />

        {/* Website */}
        <TextField
          label={tLabels("website")}
          name="website"
          placeholder={tPlaceholders("website") || ""}
          value={(form.website as string) ?? ""}
          onChange={(value) => updateField("website", value)}
          error={errors.website}
        />
      </>
    );
  };

  return (
    <FormWrapper isDirty={isDirty}>
      <FormHeader
        loading={loading}
        isCreate={isCreate}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <SideBySideFormContentWrapper
        left={LeftSideContent()}
        right={RightSideContent()}
      />
    </FormWrapper>
  );
};

export default ConfederationForm;
