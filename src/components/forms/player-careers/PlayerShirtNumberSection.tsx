"use client";

import { Dispatch, SetStateAction } from "react";
import InputDate from "@/components/ui/InputDate";
import InputNumber from "@/components/ui/InputNumber";
import { useTranslations } from "next-intl";
import DynamicFormSection from "../base/DynamicFormSection";
import { UpsertPlayerCareerInput } from "@/types/player-career";

type ShirtNumber = NonNullable<
  UpsertPlayerCareerInput["shirt_numbers"]
>[number];

interface Props {
  form: UpsertPlayerCareerInput;
  setForm: Dispatch<SetStateAction<UpsertPlayerCareerInput>>;
}

const PlayerShirtNumberSection = ({ form, setForm }: Props) => {
  const tForm = useTranslations("dashboard.playerCareers.form.shirtNumbers");
  const tLabels = useTranslations(
    "dashboard.playerCareers.form.labels.shirtNumbers",
  );
  const tPlaceholders = useTranslations(
    "dashboard.playerCareers.form.placeholders.shirtNumbers",
  );

  return (
    <DynamicFormSection<ShirtNumber>
      title={tForm("title")}
      noData={tForm("noData")}
      items={form.shirt_numbers ?? []}
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
          <InputNumber
            label={tLabels("shirtNumber")}
            name={`shirt-number-${index}`}
            placeholder={tPlaceholders("shirtNumber") || ""}
            value={item.shirt_number}
            onChange={(v) => updateItem(index, "shirt_number", v ?? 1)}
            required
          />

          {/* Start Date */}
          <InputDate
            label={tLabels("startDate")}
            name={`start-date-${index}`}
            placeholder={tPlaceholders("startDate") || ""}
            value={item.start_date}
            onChange={(v) => updateItem(index, "start_date", v)}
            required
          />

          {/* End Date */}
          <InputDate
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
