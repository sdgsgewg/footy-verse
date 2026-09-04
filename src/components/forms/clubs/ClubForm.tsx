"use client";

import { useClubForm } from "@/hooks/dashboard/clubs";
import { useTranslations } from "next-intl";
import { ClubEditResponse } from "@/types/club";
import { ComboboxField, ImageField, TextField } from "../fields";
import { useNationalityOptions } from "@/hooks/nationalities";
import { FormHeader, FormWrapper, SideBySideFormContentWrapper } from "../base";
import { FormMode } from "@/types/form";

interface Props {
  mode: FormMode;
  club?: ClubEditResponse;

  loading?: boolean;

  onSubmit: (payload: FormData) => void;
}

const ClubForm = ({ mode, club, loading = false, onSubmit }: Props) => {
  const tLabels = useTranslations("dashboard.clubs.form.labels");
  const tPlaceholders = useTranslations("dashboard.clubs.form.placeholders");

  const tCommonLabels = useTranslations("common.form.labels");
  const tCommonPlaceholders = useTranslations("common.form.placeholders");

  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  const {
    form,
    isDirty,
    errors,
    updateField,
    updateImage,
    validate,
    canSubmit,
    buildPayload,
  } = useClubForm(club);

  const isCreate = mode === "create";

  const { nationalityOptions } = useNationalityOptions();

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
          label={tCommonLabels("image")}
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
        {/* Full Name */}
        <TextField
          label={tCommonLabels("fullName")}
          name="full_name"
          placeholder={tCommonPlaceholders("fullName") || ""}
          value={(form.full_name as string) ?? ""}
          onChange={(value) => updateField("full_name", value)}
          error={errors.full_name}
          required
        />

        {/* Short Name */}
        <TextField
          label={tCommonLabels("shortName")}
          name="short_name"
          placeholder={tCommonPlaceholders("shortName") || ""}
          value={(form.short_name as string) ?? ""}
          onChange={(value) => updateField("short_name", value)}
          error={errors.short_name}
          required
        />

        {/* Nation */}
        <ComboboxField
          label={tLabels("nation")}
          name={`nationality`}
          options={nationalityOptions}
          placeholder={tPlaceholders("nation")}
          searchPlaceholder={tCommon("combobox.searchEntity", {
            entity: tEntities("nationality").toLowerCase(),
          })}
          emptyMessage={tCommon("combobox.noEntityFound", {
            entity: tEntities("nationality").toLowerCase(),
          })}
          value={form.nation_id || null}
          onChange={(value) => updateField("nation_id", value)}
          error={errors.nation_id}
          required
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

export default ClubForm;
