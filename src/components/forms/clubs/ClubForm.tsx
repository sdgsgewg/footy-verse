"use client";

import { ClubEditResponse } from "@/types/club";
import { FormMode } from "@/types/form";

import { useClubForm } from "@/hooks/dashboard/clubs";
import { useNationalityOptions } from "@/hooks/nationalities";

import { ComboboxField, ImageField, TextField } from "../fields";

import { FormHeader, FormWrapper, SideBySideFormContentWrapper } from "../base";
import { useCrudFormState, useCrudFormTranslations } from "@/hooks/crud";

interface Props {
  mode: FormMode;
  club?: ClubEditResponse;

  loading?: boolean;

  onSubmit: (payload: FormData) => void;
}

const ClubForm = ({ mode, club, loading = false, onSubmit }: Props) => {
  const { tLabels, tPlaceholders, tCommonLabels, tCommonPlaceholders } =
    useCrudFormTranslations("club");

  const form = useClubForm({ club, onSubmit });

  const { isDirty, canSubmit } = useCrudFormState({ form });

  const { nationalityOptions, loading: isNationalityLoading } =
    useNationalityOptions();

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
              imageClassName="object-contain"
            />
          )}
        </form.Field>
      </>
    );
  };

  const RightSideContent = () => {
    return (
      <>
        {/* Full Name */}
        <form.Field name="full_name">
          {(field) => (
            <TextField
              field={field}
              label={tCommonLabels("fullName")}
              placeholder={tCommonPlaceholders("fullName")}
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

        {/* Nation */}
        <form.Field name="nation_id">
          {(field) => (
            <ComboboxField
              field={field}
              entityKey="nationality"
              label={tLabels("nation")}
              options={nationalityOptions}
              placeholder={tPlaceholders("nation")}
              loading={isNationalityLoading}
              required
            />
          )}
        </form.Field>
      </>
    );
  };

  return (
    <FormWrapper isDirty={isDirty}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
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

export default ClubForm;
