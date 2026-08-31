"use client";

import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import DynamicFormSection from "../base/DynamicFormSection";
import { UpsertPlayerClubTeamCareerInput } from "@/types/player-club-team-career";
import { DateField, NumberField } from "../fields";
import { FormErrors } from "@/types/form";

type ShirtNumber = NonNullable<
  UpsertPlayerClubTeamCareerInput["shirt_numbers"]
>[number];

interface Props {
  form: UpsertPlayerClubTeamCareerInput;

  setForm: Dispatch<SetStateAction<UpsertPlayerClubTeamCareerInput>>;

  errors: FormErrors;
}

const PlayerShirtNumberSection = ({ form, setForm, errors }: Props) => {
  const tForm = useTranslations(
    "dashboard.playerClubTeamCareers.form.shirtNumbers",
  );

  const tLabels = useTranslations(
    "dashboard.playerClubTeamCareers.form.labels.shirtNumbers",
  );

  const tPlaceholders = useTranslations(
    "dashboard.playerClubTeamCareers.form.placeholders.shirtNumbers",
  );

  const getShirtNumberError = (index: number, field: keyof ShirtNumber) => {
    return errors[`contracts.${index}.${String(field)}`];
  };

  return (
    <DynamicFormSection<ShirtNumber>
      title={tForm("title")}
      noData={tForm("noData")}
      items={form.shirt_numbers ?? []}
      minItems={0}
      createItem={() => ({
        shirt_number: null,
        start_date:
          (form.shirt_numbers?.length ?? 0) === 0 ? form.career.joined_at : "",
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
            error={getShirtNumberError(index, "shirt_number")}
          />

          {/* Start Date */}
          <DateField
            label={tLabels("startDate")}
            name={`start-date-${index}`}
            placeholder={tPlaceholders("startDate") || ""}
            value={item.start_date}
            onChange={(v) => updateItem(index, "start_date", v)}
            error={getShirtNumberError(index, "start_date")}
          />

          {/* End Date */}
          <DateField
            label={tLabels("endDate")}
            name={`end-date-${index}`}
            placeholder={tPlaceholders("endDate") || ""}
            value={item.end_date ?? ""}
            onChange={(v) => updateItem(index, "end_date", v)}
            error={getShirtNumberError(index, "end_date")}
            startMonth={
              item.start_date
                ? new Date(
                    Number(item.start_date.slice(0, 4)),
                    Number(item.start_date.slice(5, 7)) - 1,
                    Number(item.start_date.slice(8, 10)),
                  )
                : undefined
            }
            endMonth={new Date(2100, 11, 31)}
          />
        </>
      )}
    />
  );
};

export default PlayerShirtNumberSection;
