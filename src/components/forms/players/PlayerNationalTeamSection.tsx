"use client";

import { Dispatch, SetStateAction } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputDate from "@/components/ui/InputDate";
import InputNumber from "@/components/ui/InputNumber";
import InputSelect from "@/components/ui/InputSelect";
import { UpsertPlayerInput } from "@/types/player";
import { NationalityListItem } from "@/types/nationality";

type NationalTeam = NonNullable<UpsertPlayerInput["national_teams"]>[number];

interface Props {
  form: UpsertPlayerInput;
  setForm: Dispatch<SetStateAction<UpsertPlayerInput>>;
  nationalities: NationalityListItem[];
}

const PlayerNationalTeamSection = ({ form, setForm, nationalities }: Props) => {
  const addNationalTeam = () => {
    setForm((prev) => ({
      ...prev,
      national_teams: [
        ...(prev.national_teams ?? []),
        {
          nation_id: "",
          start_date: "",
          end_date: "",
          label: "",
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
        <h2 className="text-lg font-semibold">National Team History</h2>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addNationalTeam}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>

      {form.national_teams && form.national_teams.length === 0 && (
        <div className="rounded-xl border border-dashed p-6 text-center text-muted-foreground">
          No national team history added.
        </div>
      )}

      {form.national_teams &&
        form.national_teams.map((item, index) => (
          <div key={index} className="rounded-xl border p-4 space-y-4">
            <InputSelect
              label="National Team"
              name={`nationality-${index}`}
              options={nationalities}
              value={item.nation_id}
              onChange={(value) =>
                updateNationalTeam(index, "nation_id", value as string)
              }
            />

            <InputDate
              label="Start Date"
              name={`start-date-${index}`}
              value={item.start_date}
              onChange={(value) =>
                updateNationalTeam(index, "start_date", value)
              }
            />

            <InputDate
              label="End Date"
              name={`end-date-${index}`}
              value={item.end_date ?? ""}
              onChange={(value) => updateNationalTeam(index, "end_date", value)}
            />

            <InputNumber
              label="Shirt Number"
              name={`shirt-number-${index}`}
              value={item.shirt_number}
              onChange={(value) =>
                updateNationalTeam(index, "shirt_number", value ?? 1)
              }
            />

            <div className="flex justify-end">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeNationalTeam(index)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PlayerNationalTeamSection;
