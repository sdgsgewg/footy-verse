"use client";

import { Dispatch, SetStateAction } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputDate from "@/components/ui/InputDate";
import InputNumber from "@/components/ui/InputNumber";
import InputSelect from "@/components/ui/InputSelect";
import { UpsertPlayerInput } from "@/types/player";
import { NationalityListItem } from "@/types/nationality";
import InputText from "@/components/ui/InputText";
import { useTranslations } from "next-intl";

type NationalTeam = NonNullable<UpsertPlayerInput["national_teams"]>[number];

interface Props {
  form: UpsertPlayerInput;
  setForm: Dispatch<SetStateAction<UpsertPlayerInput>>;
  nationalities: NationalityListItem[];
}

const PlayerNationalTeamSection = ({ form, setForm, nationalities }: Props) => {
  const tForm = useTranslations("manage.players.form.nationalTeams");
  const tCommonActions = useTranslations("common.actions");
  const tLabels = useTranslations("manage.players.form.labels.nationalTeams");
  const tPlaceholders = useTranslations(
    "manage.players.form.placeholders.nationalTeams",
  );

  const addNationalTeam = () => {
    setForm((prev) => ({
      ...prev,
      national_teams: [
        ...(prev.national_teams ?? []),
        {
          nation_id: "",
          label: "",
          start_date: "",
          end_date: "",
          shirt_number: 1,
        },
      ],
    }));
  };

  const removeNationalTeam = (index: number) => {
    setForm((prev) => ({
      ...prev,
      national_teams: (prev.national_teams ?? []).filter((_, i) => i !== index),
    }));
  };

  const updateNationalTeam = <K extends keyof NationalTeam>(
    index: number,
    key: K,
    value: NationalTeam[K],
  ) => {
    setForm((prev) => {
      const national_teams = [...(prev.national_teams ?? [])];

      national_teams[index] = {
        ...national_teams[index],
        [key]: value,
      };

      return {
        ...prev,
        national_teams,
      };
    });
  };

  return (
    <div className="rounded-xl border border-border p-4 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{tForm("title")}</h2>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addNationalTeam}
        >
          <Plus className="w-4 h-4 mr-2" />
          {tCommonActions("add")}
        </Button>
      </div>

      {form.national_teams && form.national_teams.length === 0 && (
        <div className="rounded-xl border border-dashed p-6 text-center text-muted-foreground">
          {tForm("noData")}
        </div>
      )}

      {form.national_teams &&
        form.national_teams.map((item, index) => (
          <div key={index} className="rounded-xl border p-4 space-y-4">
            {/* Nation */}
            <InputSelect
              label={tLabels("nation")}
              name={`nationality-${index}`}
              placeholder={tPlaceholders("nation") || ""}
              options={nationalities}
              value={item.nation_id}
              onChange={(value) =>
                updateNationalTeam(index, "nation_id", value as string)
              }
              required
            />

            {/* Label */}
            <InputText
              label={tLabels("label")}
              name={`label-${index}`}
              placeholder={tPlaceholders("label") || ""}
              value={item.label}
              onChange={(value) =>
                updateNationalTeam(index, "label", value as string)
              }
              required
            />

            <InputDate
              label={tLabels("startDate")}
              name={`start-date-${index}`}
              placeholder={tPlaceholders("startDate") || ""}
              value={item.start_date}
              onChange={(value) =>
                updateNationalTeam(index, "start_date", value)
              }
              required
            />

            <InputDate
              label={tLabels("endDate")}
              name={`end-date-${index}`}
              placeholder={tPlaceholders("endDate") || ""}
              value={item.end_date ?? ""}
              onChange={(value) => updateNationalTeam(index, "end_date", value)}
            />

            <InputNumber
              label={tLabels("shirtNumber")}
              name={`shirt-number-${index}`}
              placeholder={tPlaceholders("shirtNumber") || ""}
              value={item.shirt_number}
              onChange={(value) =>
                updateNationalTeam(index, "shirt_number", value ?? 1)
              }
              required
            />

            <div className="flex justify-end">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeNationalTeam(index)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {tCommonActions("remove")}
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PlayerNationalTeamSection;
