import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import FormSection from "./FormSection";

interface DynamicFormSectionProps<T> {
  title: string;
  noData: string;

  items: T[];

  createItem: () => T;

  onChange: (items: T[]) => void;

  renderItem: (
    item: T,
    index: number,
    updateItem: <K extends keyof T>(index: number, key: K, value: T[K]) => void,
  ) => React.ReactNode;
}

export default function DynamicFormSection<T>({
  title,
  noData,
  items,
  createItem,
  onChange,
  renderItem,
}: DynamicFormSectionProps<T>) {
  const tCommonActions = useTranslations("common.actions");

  const addItem = () => {
    onChange([...items, createItem()]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = <K extends keyof T>(
    index: number,
    key: K,
    value: T[K],
  ) => {
    const newItems = [...items];

    newItems[index] = {
      ...newItems[index],
      [key]: value,
    };

    onChange(newItems);
  };

  return (
    <FormSection
      title={title}
      action={
        <Button type="button" onClick={addItem}>
          <Plus className="mr-2 h-4 w-4" />
          {tCommonActions("add")}
        </Button>
      }
    >
      {items.length === 0 && (
        <div className="rounded-xl border border-dashed p-6 text-center">
          {noData}
        </div>
      )}

      {items.map((item, index) => (
        <div key={index} className="rounded-xl border p-4 space-y-4">
          {renderItem(item, index, updateItem)}

          <div className="flex justify-end">
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeItem(index)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {tCommonActions("remove")}
            </Button>
          </div>
        </div>
      ))}
    </FormSection>
  );
}
