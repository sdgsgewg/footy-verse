"use client";

import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { UpsertPlayerCareerInput } from "@/types/player-career";
import { ClubListItem } from "@/types/club";
import FormSection from "../base/FormSection";
import ComboboxField from "../fields/ComboboxField";
import { getClubOptions } from "@/lib/clubs/options";
import DateField from "../fields/DateField";

interface Props {
  form: UpsertPlayerCareerInput;
  setForm: Dispatch<SetStateAction<UpsertPlayerCareerInput>>;
  clubs: ClubListItem[];
}

const PlayerCareerSection = ({ form, setForm, clubs }: Props) => {
  const tForm = useTranslations("dashboard.playerCareers.form.career");
  const tLabels = useTranslations("dashboard.playerCareers.form.labels.career");
  const tPlaceholders = useTranslations(
    "dashboard.playerCareers.form.placeholders.career",
  );

  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  const clubOptions = getClubOptions(clubs);

  return (
    <FormSection title={tForm("title")}>
      <>
        {/* Club */}
        <ComboboxField
          label={tLabels("club")}
          name="club"
          options={clubOptions}
          value={form.club_id}
          placeholder={tPlaceholders("club")}
          searchPlaceholder={tCommon("combobox.searchEntity", {
            entity: tEntities("club").toLowerCase(),
          })}
          emptyMessage={tCommon("combobox.noEntityFound", {
            entity: tEntities("club").toLowerCase(),
          })}
          onChange={(value) =>
            setForm({
              ...form,
              club_id: value,
            })
          }
          required
        />

        {/* Join Date */}
        <DateField
          label={tLabels("joinedAt")}
          name={`joined-at`}
          placeholder={tPlaceholders("joinedAt") || ""}
          value={form.joined_at}
          onChange={(value) => setForm({ ...form, joined_at: value })}
          required
        />

        {/* Left Date */}
        <DateField
          label={tLabels("leftAt")}
          name={`left-at`}
          placeholder={tPlaceholders("leftAt") || ""}
          value={form.left_at ?? ""}
          onChange={(value) => setForm({ ...form, left_at: value })}
        />
      </>
    </FormSection>
  );
};

export default PlayerCareerSection;
