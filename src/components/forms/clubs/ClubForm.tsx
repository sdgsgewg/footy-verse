"use client";

import { useClubForm } from "@/hooks/dashboard/clubs";
import { useTranslations } from "next-intl";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import ImageUpload from "@/components/shared/ImageUpload";
import { ClubEditResponse } from "@/types/club";
import InputText from "@/components/ui/InputText";
import { ClubType } from "@/enums/ClubType";
import { useNationalities } from "@/hooks/dashboard/nationalities";
import SelectField from "../fields/SelectField";
import ComboboxField from "../fields/ComboboxField";
import FormContentWrapper from "../base/FormContentWrapper";
import { getClubTypeOptions, getClubOptions } from "@/lib/clubs/options";
import { getNationalityOptions } from "@/lib/nationalities/options";
import { useClubs } from "@/hooks/clubs";

interface Props {
  mode: "create" | "edit";
  club?: ClubEditResponse;

  loading?: boolean;

  onSubmit: (payload: FormData) => void;
}

const ClubForm = ({ mode, club, loading = false, onSubmit }: Props) => {
  const t = useTranslations("dashboard.clubs");
  const tClubType = useTranslations("dashboard.clubs.form.options.clubType");
  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  const { form, setForm, canSubmit, buildPayload } = useClubForm(club);

  const { clubs } = useClubs();
  const { nationalities } = useNationalities();

  const isCreate = mode === "create";

  const clubTypeOptions = getClubTypeOptions(tClubType);
  const nationalityOptions = getNationalityOptions(nationalities);
  const clubOptions = getClubOptions(clubs);

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
        <InputText
          label={t("form.labels.name")}
          name="name"
          placeholder={t("form.placeholders.name") || ""}
          value={(form.name as string) ?? ""}
          onChange={(value) => setForm({ ...form, name: value })}
          required
        />

        {/* Club Type */}
        <SelectField
          label={t("form.labels.clubType")}
          name="club_type"
          placeholder={t("form.placeholders.clubType")}
          options={clubTypeOptions}
          value={form.club_type || ""}
          onChange={(value) =>
            setForm({ ...form, club_type: value as ClubType })
          }
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

        {/* Parent Club */}
        <ComboboxField
          label={t("form.labels.parentClub")}
          name={`parent_club`}
          options={clubOptions}
          placeholder={t("form.placeholders.parentClub")}
          searchPlaceholder={tCommon("combobox.searchEntity", {
            entity: tEntities("club").toLowerCase(),
          })}
          emptyMessage={tCommon("combobox.noEntityFound", {
            entity: tEntities("club").toLowerCase(),
          })}
          value={form.parent_club_id || null}
          onChange={(value) =>
            setForm({ ...form, parent_club_id: value || null })
          }
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default ClubForm;
