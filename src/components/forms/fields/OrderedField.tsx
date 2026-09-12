"use client";

import * as React from "react";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { ListOrdered } from "lucide-react";
import { AnyFieldApi } from "@tanstack/react-form";

// Fields
import SortableOrderedItem from "./SortableOrderedItem";

import { cn } from "@/lib/utils";
import { OrderedEntity, OrderedItem, OrderedFieldProps } from "@/types/ordered";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

const OrderedField = <T extends OrderedEntity>({
  field,
  label,
  items,
  getId,
  getLabel,
  getImageUrl,
  instruction,
  disabled = false,
  required = true,
  className,
}: OrderedFieldProps<T>) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const fieldValue = field.state.value as string[];

  const error =
    field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? String(field.state.meta.errors[0])
      : undefined;

  const errorId = error ? `${field.name.replace(/\./g, "-")}-error` : undefined;

  const itemMap = React.useMemo(
    () => new Map(items.map((item) => [getId(item), item])),
    [items, getId],
  );

  const orderedItems = React.useMemo<OrderedItem[]>(
    () =>
      fieldValue
        .map((id) => itemMap.get(id))
        .filter((item): item is T => item !== undefined)
        .map((item, index) => ({
          id: getId(item),
          imageUrl: getImageUrl?.(item) ?? null,
          label: getLabel(item),
          display_order: index + 1,
        })),
    [fieldValue, itemMap, getId, getLabel, getImageUrl],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (disabled) return;

    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = orderedItems.findIndex((item) => item.id === active.id);

    const newIndex = orderedItems.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(orderedItems, oldIndex, newIndex);

    field.handleChange(reordered.map((item) => item.id));

    field.handleBlur();
  };

  return (
    <Field data-invalid={isInvalid} className={cn(className)}>
      <FieldLabel htmlFor={field.name}>
        {label}
        {required && <span className="text-destructive">*</span>}
      </FieldLabel>

      <div
        className={cn(
          "rounded-xl border bg-card p-3",
          error && "border-destructive",
        )}
      >
        {orderedItems.length === 0 ? (
          <div className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-4">
            <ListOrdered className="size-5" />

            <span className="text-sm text-center">{instruction}</span>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              strategy={verticalListSortingStrategy}
              items={orderedItems.map((item) => item.id)}
            >
              <ol className="space-y-2">
                {orderedItems.map((item) => (
                  <SortableOrderedItem
                    key={item.id}
                    item={item}
                    disabled={disabled}
                  />
                ))}
              </ol>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

export default OrderedField;
