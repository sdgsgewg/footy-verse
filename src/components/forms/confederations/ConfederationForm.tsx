"use client";

import { useTranslations } from "next-intl";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { DateField, ImageField, SelectField, TextField } from "../fields";
import { useRegionOptions } from "@/hooks/dashboard/regions";
import { ConfederationEditResponse } from "@/types/confederation";
import { useConfederationForm } from "@/hooks/dashboard/confederations";
import { SideBySideFormContentWrapper } from "../base";
import { useCrudFormState, useCrudFormTranslations } from "@/hooks/crud";
import { FormMode } from "@/types/form";

interface Props {
  mode: FormMode;
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

  const { tCommonLabels, tCommonPlaceholders } = useCrudFormTranslations();

  const form = useConfederationForm(confederation, onSubmit);

  const { isDirty, canSubmit } = useCrudFormState({ form });

  const { regionOptions, loading: isRegionLoading } = useRegionOptions();

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

        {/* Short Name */}
        <form.Field name="short_name">
          {(field) => (
            <TextField
              field={field}
              label={tCommonLabels("shortName")}
              placeholder={tCommonPlaceholders("shortName")}
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
              required
            />
          )}
        </form.Field>

        {/* Founded Date */}
        <form.Field name="founded">
          {(field) => (
            <DateField
              field={field}
              label={tLabels("founded")}
              placeholder={tPlaceholders("founded") || ""}
            />
          )}
        </form.Field>

        {/* Headquarters */}
        <form.Field name="headquarters">
          {(field) => (
            <TextField
              field={field}
              label={tLabels("headquarters")}
              placeholder={tPlaceholders("headquarters") || ""}
            />
          )}
        </form.Field>

        {/* Website */}
        <form.Field name="website">
          {(field) => (
            <TextField
              field={field}
              label={tLabels("website")}
              placeholder={tPlaceholders("website") || ""}
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

export default ConfederationForm;
