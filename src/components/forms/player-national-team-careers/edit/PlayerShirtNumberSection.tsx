"use client";

import { UpsertPlayerNationalTeamCareerInput } from "@/types/player-national-team-career";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import DynamicFormSection from "../../base/DynamicFormSection";
import { DateField, NumberField } from "../../fields";

type ShirtNumber = NonNullable<
  UpsertPlayerNationalTeamCareerInput["shirt_numbers"]
>[number];

interface Props {
  form: UpsertPlayerNationalTeamCareerInput;
  setForm: Dispatch<SetStateAction<UpsertPlayerNationalTeamCareerInput>>;
}

const PlayerShirtNumberSection = ({ form, setForm }: Props) => {
  const tForm = useTranslations(
    "dashboard.playerNationalTeamCareers.form.shirtNumbers",
  );

  const tLabels = useTranslations(
    "dashboard.playerNationalTeamCareers.form.labels.shirtNumbers",
  );
  const tPlaceholders = useTranslations(
    "dashboard.playerNationalTeamCareers.form.placeholders.shirtNumbers",
  );

  return (
    <DynamicFormSection<ShirtNumber>
      title={tForm("title")}
      noData={tForm("noData")}
      items={form.shirt_numbers ?? []}
      minItems={1}
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
            required
          />

          {/* Start Date */}
          <DateField
            label={tLabels("startDate")}
            name={`start-date-${index}`}
            placeholder={tPlaceholders("startDate") || ""}
            value={item.start_date}
            onChange={(v) => updateItem(index, "start_date", v)}
            required
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
