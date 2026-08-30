"use client";

import { useTranslations } from "next-intl";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { ImageField, SelectField, TextField } from "../fields";
import { RegionEditResponse } from "@/types/region";
import { useRegionForm, useRegionOptions } from "@/hooks/dashboard/regions";
import { getRegionTypeOptions } from "@/lib/regions/options";
import { RegionType } from "@/enums/RegionType";
import { FormMode } from "@/types/form";
import { SideBySideFormContentWrapper } from "../base";

interface Props {
  mode: FormMode;
  region?: RegionEditResponse;

  loading?: boolean;

  onSubmit: (payload: FormData) => void;
}

const RegionForm = ({ mode, region, loading = false, onSubmit }: Props) => {
  const tLabels = useTranslations("dashboard.regions.form.labels");
  const tPlaceholders = useTranslations("dashboard.regions.form.placeholders");
  const tRegionType = useTranslations(
    "dashboard.regions.form.options.regionType",
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
  } = useRegionForm(region);

  const isCreate = mode === "create";

  const { regionOptions } = useRegionOptions();

  const regionTypeOptions = getRegionTypeOptions(tRegionType);

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

        {/* Region Type */}
        <SelectField
          label={tLabels("regionType")}
          name={`region_type`}
          placeholder={tPlaceholders("regionType")}
          options={regionTypeOptions}
          value={form.region_type || ""}
          onChange={(value) => updateField("region_type", value as RegionType)}
          error={errors.region_type}
          required
        />

        {/* Parent Region */}
        <SelectField
          label={tLabels("parentRegion")}
          name={`parent_region_id`}
          placeholder={tPlaceholders("parentRegion")}
          options={regionOptions}
          value={form.parent_region_id || ""}
          onChange={(value) => updateField("parent_region_id", value)}
          error={errors.parent_region_id}
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

export default RegionForm;
