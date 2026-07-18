"use client";

import { useClubForm, useClubs } from "@/hooks/dashboard/clubs";
import { useTranslations } from "next-intl";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import ImageUpload from "@/components/shared/ImageUpload";
import { ClubDetailResponse } from "@/types/club";
import InputText from "@/components/ui/InputText";
import { ClubType } from "@/enums/ClubType";
import { useNationalities } from "@/hooks/dashboard/nationalities";
import { SelectOption } from "@/types/select";
import SelectField from "../fields/SelectField";
import { toNationalityOptions } from "@/lib/nationalities/mapper";
import ComboboxField from "../fields/ComboboxField";
import { toClubOptions } from "@/lib/clubs/mapper";
import FormContentWrapper from "../base/FormContentWrapper";

interface Props {
  mode: "create" | "edit";
  club?: ClubDetailResponse;

  loading?: boolean;

  onSubmit: (payload: FormData) => void;
}

const ClubForm = ({ mode, club, loading = false, onSubmit }: Props) => {
  const t = useTranslations("dashboard.clubs");
  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  const { form, setForm, canSubmit, buildPayload } = useClubForm(club);

  const { clubs } = useClubs();
  const { nationalities } = useNationalities();

  const isCreate = mode === "create";

  const clubTypeOptions: SelectOption[] = [
    {
      id: ClubType.FIRST_TEAM,
      name: t("form.options.clubType.firstTeam"),
    },
    {
      id: ClubType.B_TEAM,
      name: t("form.options.clubType.bTeam"),
    },
    {
      id: ClubType.RESERVE,
      name: t("form.options.clubType.reserve"),
    },
    {
      id: ClubType.U23,
      name: t("form.options.clubType.u23"),
    },
    {
      id: ClubType.U21,
      name: t("form.options.clubType.u21"),
    },
    {
      id: ClubType.U19,
      name: t("form.options.clubType.u19"),
    },
    {
      id: ClubType.U18,
      name: t("form.options.clubType.u18"),
    },
    {
      id: ClubType.U17,
      name: t("form.options.clubType.u17"),
    },
    {
      id: ClubType.ACADEMY,
      name: t("form.options.clubType.academy"),
    },
  ];

  const nationalityOptions = toNationalityOptions(nationalities);
  const clubOptions = toClubOptions(clubs);

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
