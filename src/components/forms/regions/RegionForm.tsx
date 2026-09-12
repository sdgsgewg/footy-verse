"use client";

import { useTranslations } from "next-intl";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { ImageField, SelectField, TextField } from "../fields";
import { RegionEditResponse } from "@/types/region";
import { useRegionForm, useRegionOptions } from "@/hooks/dashboard/regions";
import { getRegionTypeOptions } from "@/lib/regions/options";
import { FormMode } from "@/types/form";
import { SideBySideFormContentWrapper } from "../base";
import { useCrudFormState, useCrudFormTranslations } from "@/hooks/crud";

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

  const { tCommonLabels, tCommonPlaceholders } = useCrudFormTranslations();

  const form = useRegionForm(region, onSubmit);

  const { isDirty, canSubmit } = useCrudFormState({ form });

  const { regionOptions, loading: isRegionLoading } = useRegionOptions();

  const regionTypeOptions = getRegionTypeOptions(tRegionType);

  const LeftSideContent = () => {
    return (
      <>
        {/* Image */}
        <form.Field name="image">
          {(field) => (
            <ImageField
              field={field}
              label={tCommonLabels("image")}
              existingImageUrl={form.state.values.imageUrl}
            />
          )}
        </form.Field>
      </>
    );
  };

  const RightSideContent = () => {
    return (
      <>
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

        {/* Region Type */}
        <form.Field name="region_type">
          {(field) => (
            <SelectField
              field={field}
              label={tLabels("regionType")}
              placeholder={tPlaceholders("regionType")}
              options={regionTypeOptions}
              required
            />
          )}
        </form.Field>

        {/* Parent Region */}
        <form.Field name="parent_region_id">
          {(field) => (
            <SelectField
              field={field}
              label={tLabels("parentRegion")}
              placeholder={tPlaceholders("parentRegion")}
              loading={isRegionLoading}
              options={regionOptions}
              required
            />
          )}
        </form.Field>
      </>
    );
  };

  return (
    <FormWrapper isDirty={isDirty}>
      <FormHeader loading={loading} mode={mode} canSubmit={canSubmit} />

      <SideBySideFormContentWrapper
        left={LeftSideContent()}
        right={RightSideContent()}
      />
    </FormWrapper>
  );
};

export default RegionForm;
