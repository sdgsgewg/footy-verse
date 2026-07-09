import React from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import InputDate from "@/components/ui/InputDate";
import InputNumber from "@/components/ui/InputNumber";
import InputSelect from "../ui/InputSelect";

interface BaseHistoryItem {
  start_date: string;
  end_date?: string | null;
  squad_number: number;
}

interface PlayerHistoryFieldProps<T extends BaseHistoryItem> {
  title: string;

  optionLabel: string;

  options: {
    id: string;
    name: string;
  }[];

  value: T[];

  emptyItem: T;

  optionAccessor: {
    get(item: T): string;
    set(item: T, value: string): T;
  };

  onChange: (items: T[]) => void;
}

const PlayerHistoryField = <T extends BaseHistoryItem>({
  title,
  optionLabel,
  options,
  value,
  emptyItem,
  optionAccessor,
  onChange,
}: PlayerHistoryFieldProps<T>) => {
  const addItem = () => {
    onChange([
      ...value,
      {
        ...emptyItem,
      },
    ]);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateItem = <K extends keyof T>(
    index: number,
    key: K,
    newValue: T[K],
  ) => {
    const clone = [...value];

    clone[index] = {
      ...clone[index],
      [key]: newValue,
    };

    onChange(clone);
  };

  return (
    <div className="rounded-xl border border-solid p-4 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">{title}</h2>

        <Button type="button" variant="outline" size="sm" onClick={addItem}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>

      {value.length === 0 && (
        <div className="rounded-xl border border-dashed p-6 text-center text-muted-foreground">
          No history added.
        </div>
      )}

      {value.map((item, index) => (
        <div key={index} className="rounded-xl border p-4 space-y-4">
          <InputSelect
            label={optionLabel}
            name={`${title}-${index}`}
            options={options}
            value={optionAccessor.get(item)}
            onChange={(selectedValue) => {
              const clone = [...value];

              clone[index] = optionAccessor.set(
                clone[index],
                selectedValue as string,
              );

              onChange(clone);
            }}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputDate
              label="Start Date"
              name={`start-${index}`}
              value={item.start_date}
              onChange={(v) =>
                updateItem(index, "start_date", v as T["start_date"])
              }
            />

            <InputDate
              label="End Date"
              name={`end-${index}`}
              value={item.end_date ?? ""}
              onChange={(v) =>
                updateItem(index, "end_date", v as T["end_date"])
              }
            />
          </div>

          <InputNumber
            label="Squad Number"
            name={`number-${index}`}
            value={item.squad_number}
            onChange={(v) =>
              updateItem(index, "squad_number", v as T["squad_number"])
            }
          />

          <div className="flex justify-end">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => removeItem(index)}
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

export default PlayerHistoryField;
