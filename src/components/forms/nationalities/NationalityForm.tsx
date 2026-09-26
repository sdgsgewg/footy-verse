"use client";

import { NationalityEditResponse } from "@/types/nationality";
import { FormMode } from "@/types/form";

import { useNationalityForm } from "@/hooks/dashboard/nationalities";
import { useConfederationOptions } from "@/hooks/confederations/useConfederationOptions";

import { ImageField, SelectField, TextField } from "../fields";

import { FormHeader, FormWrapper, SideBySideFormContentWrapper } from "../base";
import { useCrudFormState, useCrudFormTranslations } from "@/hooks/crud";
import { useRegionOptions } from "@/hooks/dashboard/regions";

interface Props {
  mode: FormMode;
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
  const { tLabels, tPlaceholders, tCommonLabels, tCommonPlaceholders } =
    useCrudFormTranslations("nationality");

  const form = useNationalityForm(nationality, onSubmit);

  const { isDirty, canSubmit } = useCrudFormState({ form });

  const { confederationOptions, loading: isConfederationLoading } =
    useConfederationOptions();

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

        {/* Fifa Code */}
        <form.Field name="fifa_code">
          {(field) => (
            <TextField
              field={field}
              label={tLabels("fifaCode")}
              placeholder={tPlaceholders("fifaCode") || ""}
              required
            />
          )}
        </form.Field>

        {/* Confederation */}
        <form.Field name="confederation_id">
          {(field) => (
            <SelectField
              field={field}
              label={tCommonLabels("confederation")}
              placeholder={tCommonPlaceholders("confederation")}
              loading={isConfederationLoading}
              options={confederationOptions}
              required
            />
          )}
        </form.Field>

        {/* Region */}
        <form.Field name="region_id">
          {(field) => (
            <SelectField
              field={field}
              label={tCommonLabels("region")}
              placeholder={tCommonPlaceholders("region")}
              loading={isRegionLoading}
              options={regionOptions}
            />
          )}
        </form.Field>
      </>
    );
  };

  return (
    <FormWrapper isDirty={isDirty}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <FormHeader loading={loading} mode={mode} canSubmit={canSubmit} />

        <SideBySideFormContentWrapper
          left={LeftSideContent()}
          right={RightSideContent()}
        />
      </form>
    </FormWrapper>
  );
};

export default NationalityForm;
