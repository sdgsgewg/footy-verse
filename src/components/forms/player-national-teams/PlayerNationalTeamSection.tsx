"use client";

import { Dispatch, SetStateAction } from "react";
import { NationalityListItem } from "@/types/nationality";
import { useTranslations } from "next-intl";
import DynamicFormSection from "../base/DynamicFormSection";
import { getNationalityOptions } from "@/lib/nationalities/options";
import { ComboboxField, DateField, NumberField } from "../fields";
import { PlayerNationalTeamCreateInput } from "@/types/player";

type NationalTeam = NonNullable<PlayerNationalTeamCreateInput>[number];

interface Props {
  form: PlayerNationalTeamCreateInput;
  setForm: Dispatch<SetStateAction<PlayerNationalTeamCreateInput>>;
  nationalities: NationalityListItem[];
}

const PlayerNationalTeamSection = ({ form, setForm, nationalities }: Props) => {
  const tForm = useTranslations("dashboard.playerNationalTeams.form");
  const tLabels = useTranslations("dashboard.playerNationalTeams.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.playerNationalTeams.form.placeholders",
  );

  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  const nationOptions = getNationalityOptions(nationalities);

  return (
    <DynamicFormSection<NationalTeam>
      title={tForm("title")}
      noData={tForm("noData")}
      items={form ?? []}
      createItem={() => ({
        national_team_id: "",
        start_date: "",
        end_date: "",
        shirt_number: 1,
      })}
      onChange={(items) => setForm(items)}
      renderItem={(item, index, updateItem) => (
        <>
          {/* National Team */}
          <ComboboxField
            label={tLabels("nation")}
            name={`nationality-${index}`}
            options={nationOptions}
            placeholder={tPlaceholders("nation") || ""}
            searchPlaceholder={tCommon("combobox.searchEntity", {
              entity: tEntities("nationality").toLowerCase(),
            })}
            emptyMessage={tCommon("combobox.noEntityFound", {
              entity: tEntities("nationality").toLowerCase(),
            })}
            value={item.national_team_id}
            onChange={(v) => updateItem(index, "national_team_id", v as string)}
            required
          />

          <DateField
            label={tLabels("startDate")}
            name={`start-date-${index}`}
            placeholder={tPlaceholders("startDate") || ""}
            value={item.start_date}
            onChange={(v) => updateItem(index, "start_date", v)}
            required
          />

          <DateField
            label={tLabels("endDate")}
            name={`end-date-${index}`}
            placeholder={tPlaceholders("endDate") || ""}
            value={item.end_date ?? ""}
            onChange={(v) => updateItem(index, "end_date", v)}
          />

          <NumberField
            label={tLabels("shirtNumber")}
            name={`shirt-number-${index}`}
            placeholder={tPlaceholders("shirtNumber") || ""}
            value={item.shirt_number}
            onChange={(v) => updateItem(index, "shirt_number", v ?? 1)}
            required
          />
        </>
      )}
    />
  );
};

export default PlayerNationalTeamSection;
