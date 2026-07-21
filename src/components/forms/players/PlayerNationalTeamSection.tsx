"use client";

import { Dispatch, SetStateAction } from "react";
import InputDate from "@/components/ui/InputDate";
import InputNumber from "@/components/ui/InputNumber";
import { UpsertPlayerInput } from "@/types/player";
import { NationalityListItem } from "@/types/nationality";
import { useTranslations } from "next-intl";
import DynamicFormSection from "../base/DynamicFormSection";
import ComboboxField from "../fields/ComboboxField";
import { getNationalityOptions } from "@/lib/nationalities/options";
import TextField from "../fields/TextField";

type NationalTeam = NonNullable<UpsertPlayerInput["national_teams"]>[number];

interface Props {
  form: UpsertPlayerInput;
  setForm: Dispatch<SetStateAction<UpsertPlayerInput>>;
  nationalities: NationalityListItem[];
}

const PlayerNationalTeamSection = ({ form, setForm, nationalities }: Props) => {
  const tForm = useTranslations("dashboard.players.form.nationalTeams");
  const tLabels = useTranslations(
    "dashboard.players.form.labels.nationalTeams",
  );
  const tPlaceholders = useTranslations(
    "dashboard.players.form.placeholders.nationalTeams",
  );

  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  const nationOptions = getNationalityOptions(nationalities);

  return (
    <DynamicFormSection<NationalTeam>
      title={tForm("title")}
      noData={tForm("noData")}
      items={form.national_teams ?? []}
      createItem={() => ({
        nation_id: "",
        label: "",
        start_date: "",
        end_date: "",
        shirt_number: 1,
      })}
      onChange={(items) =>
        setForm((prev) => ({
          ...prev,
          national_teams: items,
        }))
      }
      renderItem={(item, index, updateItem) => (
        <>
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
            value={item.nation_id}
            onChange={(v) => updateItem(index, "nation_id", v as string)}
            required
          />

          <TextField
            label={tLabels("label")}
            name={`label-${index}`}
            placeholder={tPlaceholders("label") || ""}
            value={item.label}
            onChange={(v) => updateItem(index, "label", v)}
            required
          />

          <InputDate
            label={tLabels("startDate")}
            name={`start-date-${index}`}
            placeholder={tPlaceholders("startDate") || ""}
            value={item.start_date}
            onChange={(v) => updateItem(index, "start_date", v)}
            required
          />

          <InputDate
            label={tLabels("endDate")}
            name={`end-date-${index}`}
            placeholder={tPlaceholders("endDate") || ""}
            value={item.end_date ?? ""}
            onChange={(v) => updateItem(index, "end_date", v)}
          />

          <InputNumber
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
