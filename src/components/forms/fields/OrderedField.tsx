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

import Label from "./Label";

import { cn } from "@/lib/utils";

import SortableOrderedItem from "./SortableOrderedItem";
import { OrderedEntity, OrderedItem, OrderedFieldProps } from "@/types/ordered";
import ErrorMessage from "./ErrorMessage";

const OrderedField = <T extends OrderedEntity>({
  label,
  name,
  instruction,
  value,
  getId,
  getLabel,
  getImageUrl,
  disabled = false,
  required = true,
  className,
  error,
  onChange,
}: OrderedFieldProps<T>) => {
  const errorId = error ? `${name}-error` : undefined;

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

  const orderedItems = React.useMemo<OrderedItem[]>(
    () =>
      [...value]
        .sort((a, b) => a.display_order - b.display_order)
        .map((item, index) => ({
          id: getId(item),
          imageUrl: getImageUrl?.(item) ?? null,
          label: getLabel(item),
          display_order: index + 1,
        })),
    [value, getId, getLabel, getImageUrl],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = orderedItems.findIndex((item) => item.id === active.id);

    const newIndex = orderedItems.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(orderedItems, oldIndex, newIndex);

    const itemMap = new Map(value.map((item) => [getId(item), item]));

    onChange(
      reordered.map((item, index) => ({
        ...itemMap.get(item.id)!,
        display_order: index + 1,
      })),
    );
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label label={label} required={required} />

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

      {error && <ErrorMessage id={errorId} message={error} />}
    </div>
  );
};

export default OrderedField;
