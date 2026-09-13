import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import FormSection from "./FormSection";

interface DynamicFormSectionProps {
  title: string;
  noData: string;

  itemCount: number;

  minItems?: number;
  maxItems?: number;

  onAdd: () => void;
  onRemove: (index: number) => void;

  children: (index: number) => React.ReactNode;
}

export default function DynamicFormSection({
  title,
  noData,
  itemCount,
  minItems = 0,
  maxItems,
  onAdd,
  onRemove,
  children,
}: DynamicFormSectionProps) {
  const tCommonActions = useTranslations("common.actions");

  const canAdd = maxItems === undefined || itemCount < maxItems;

  const canRemove = itemCount > minItems;

  const modifiedTitle =
    minItems > 0 ? `${title} (min ${minItems})` : `${title} (optional)`;

  return (
    <FormSection
      title={modifiedTitle}
      action={
        <Button type="button" onClick={onAdd} disabled={!canAdd}>
          <Plus className="mr-2 h-4 w-4" />
          {tCommonActions("add")}
        </Button>
      }
    >
      {itemCount === 0 && (
        <div className="rounded-xl border border-dashed p-6 text-center">
          {noData}
        </div>
      )}

      <div className="space-y-4">
        {Array.from({ length: itemCount }, (_, index) => (
          <div key={index} className="rounded-xl border p-4 space-y-4">
            {children(index)}

            {canRemove && (
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => onRemove(index)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {tCommonActions("remove")}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </FormSection>
  );
}
