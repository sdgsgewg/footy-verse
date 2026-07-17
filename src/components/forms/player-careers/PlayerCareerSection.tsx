"use client";

import { Dispatch, SetStateAction } from "react";
import InputDate from "@/components/ui/InputDate";
import InputSelect from "@/components/ui/InputSelect";
import { useTranslations } from "next-intl";
import { UpsertPlayerCareerInput } from "@/types/player-career";
import { ClubListItem } from "@/types/club";
import FormSection from "../base/FormSection";

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

  return (
    <FormSection title={tForm("title")}>
      <>
        <InputSelect
          label={tLabels("club")}
          name={`club`}
          placeholder={tPlaceholders("club") || ""}
          options={clubs}
          value={form.club_id}
          onChange={(value) => setForm({ ...form, club_id: value })}
          required
        />

        <InputDate
          label={tLabels("joinedAt")}
          name={`joined-at`}
          placeholder={tPlaceholders("joinedAt") || ""}
          value={form.joined_at}
          onChange={(value) => setForm({ ...form, joined_at: value })}
          required
        />

        <InputDate
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
