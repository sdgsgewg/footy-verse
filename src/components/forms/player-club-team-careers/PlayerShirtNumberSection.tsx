"use client";

import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import DynamicFormSection from "../base/DynamicFormSection";
import { UpsertPlayerClubTeamCareerInput } from "@/types/player-club-team-career";
import { DateField, NumberField } from "../fields";

type ShirtNumber = NonNullable<
  UpsertPlayerClubTeamCareerInput["shirt_numbers"]
>[number];

interface Props {
  form: UpsertPlayerClubTeamCareerInput;
  setForm: Dispatch<SetStateAction<UpsertPlayerClubTeamCareerInput>>;
}

const PlayerShirtNumberSection = ({ form, setForm }: Props) => {
  const tForm = useTranslations(
    "dashboard.playerClubTeamCareers.form.shirtNumbers",
  );
  const tLabels = useTranslations(
    "dashboard.playerClubTeamCareers.form.labels.shirtNumbers",
  );
  const tPlaceholders = useTranslations(
    "dashboard.playerClubTeamCareers.form.placeholders.shirtNumbers",
  );

  return (
    <DynamicFormSection<ShirtNumber>
      title={tForm("title")}
      noData={tForm("noData")}
      items={form.shirt_numbers ?? []}
      minItems={0}
      createItem={() => ({
        shirt_number: 1,
        start_date: "",
        end_date: "",
      })}
      onChange={(items) =>
        setForm((prev) => ({
          ...prev,
          shirt_numbers: items,
        }))
      }
      renderItem={(item, index, updateItem) => (
        <>
          {/* Shirt Number */}
          <NumberField
            label={tLabels("shirtNumber")}
            name={`shirt-number-${index}`}
            placeholder={tPlaceholders("shirtNumber") || ""}
            value={item.shirt_number}
            onChange={(v) => updateItem(index, "shirt_number", v ?? 1)}
          />

          {/* Start Date */}
          <DateField
            label={tLabels("startDate")}
            name={`start-date-${index}`}
            placeholder={tPlaceholders("startDate") || ""}
            value={item.start_date}
            onChange={(v) => updateItem(index, "start_date", v)}
          />

          {/* End Date */}
          <DateField
            label={tLabels("endDate")}
            name={`end-date-${index}`}
            placeholder={tPlaceholders("endDate") || ""}
            value={item.end_date ?? ""}
            onChange={(v) => updateItem(index, "end_date", v)}
          />
        </>
      )}
    />
  );
};

export default PlayerShirtNumberSection;
