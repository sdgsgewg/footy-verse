"use client";

import { Dispatch, SetStateAction } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import InputDate from "@/components/ui/InputDate";
import InputNumber from "@/components/ui/InputNumber";
import InputSelect from "@/components/ui/InputSelect";

import { Nationality } from "@/lib/repositories/nationalities.repo";
import { UpsertPlayer } from "@/types/players/UpsertPlayer";

interface Props {
  form: UpsertPlayer;
  setForm: Dispatch<SetStateAction<UpsertPlayer>>;
  nationalities: Nationality[];
}

const PlayerNationalTeamSection = ({ form, setForm, nationalities }: Props) => {
  const addNationalTeam = () => {
    setForm((prev) => ({
      ...prev,
      nationalities: [
        ...prev.player_national_teams,
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
      nationalities: prev.player_national_teams.filter((_, i) => i !== index),
    }));
  };

  const updateNationalTeam = <
    K extends keyof UpsertPlayer["player_national_teams"][number],
  >(
    index: number,
    key: K,
    value: UpsertPlayer["player_national_teams"][number][K],
  ) => {
    setForm((prev) => {
      const nationalities = [...prev.player_national_teams];

      nationalities[index] = {
        ...nationalities[index],
        [key]: value,
      };

      return {
        ...prev,
        nationalities,
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

      {form.player_national_teams.length === 0 && (
        <div className="rounded-xl border border-dashed p-6 text-center text-muted-foreground">
          No national team history added.
        </div>
      )}

      {form.player_national_teams.map((item, index) => (
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
            onChange={(value) => updateNationalTeam(index, "start_date", value)}
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
