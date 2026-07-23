"use client";

import { useClubForm } from "@/hooks/dashboard/clubs";
import { useTranslations } from "next-intl";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import ImageUpload from "@/components/shared/ImageUpload";
import { ClubEditResponse } from "@/types/club";
import { useNationalities } from "@/hooks/dashboard/nationalities";
import FormContentWrapper from "../base/FormContentWrapper";
import { getNationalityOptions } from "@/lib/nationalities/options";
import { ComboboxField, TextField } from "../fields";

interface Props {
  mode: "create" | "edit";
  club?: ClubEditResponse;

  loading?: boolean;

  onSubmit: (payload: FormData) => void;
}

const ClubForm = ({ mode, club, loading = false, onSubmit }: Props) => {
  const t = useTranslations("dashboard.clubs");
  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  const { form, setForm, canSubmit, buildPayload } = useClubForm(club);

  const { nationalities } = useNationalities();

  const isCreate = mode === "create";

  const nationalityOptions = getNationalityOptions(nationalities);

  const handleSubmit = () => {
    onSubmit(buildPayload());
  };

  return (
    <FormWrapper>
      <FormHeader
        loading={loading}
        isCreate={isCreate}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-5">
        {/* Image */}
        <ImageUpload
          label={t("form.labels.image")}
          name="image"
          value={(form.previewUrl ?? form.imageUrl) as string}
          onChange={(file) =>
            setForm((prev) => ({
              ...prev,
              imageFile: file,
              previewUrl: URL.createObjectURL(file),
            }))
          }
          required
        />

        {/* Name */}
        <TextField
          label={t("form.labels.name")}
          name="name"
          placeholder={t("form.placeholders.name") || ""}
          value={(form.name as string) ?? ""}
          onChange={(value) => setForm({ ...form, name: value })}
          required
        />

        {/* Nation */}
        <ComboboxField
          label={t("form.labels.nation")}
          name={`nationality`}
          options={nationalityOptions}
          placeholder={t("form.placeholders.nation")}
          searchPlaceholder={tCommon("combobox.searchEntity", {
            entity: tEntities("nationality").toLowerCase(),
          })}
          emptyMessage={tCommon("combobox.noEntityFound", {
            entity: tEntities("nationality").toLowerCase(),
          })}
          value={form.nation_id || null}
          onChange={(value) => setForm({ ...form, nation_id: value })}
          required
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default ClubForm;
