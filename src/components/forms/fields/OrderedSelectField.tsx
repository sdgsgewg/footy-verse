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

import { Check, ChevronDown, ListOrdered, Plus, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ScrollArea } from "@/components/ui/scroll-area";

import Label from "./Label";

import { cn } from "@/lib/utils";

import { useTranslations } from "next-intl";

import SortableOrderedItem from "./SortableOrderedItem";
import { OrderedEntity, OrderedItem } from "@/types/ordered";
import { OrderedSelectFieldProps } from "@/types/ordered-select";
import { normalizeOrderedValues } from "@/utils/ordered";
import Image from "next/image";

const OrderedSelectField = <T extends OrderedEntity>({
  label,
  placeholder = "Select...",
  instruction,
  options,
  value,
  getId,
  createValue,
  disabled = false,
  required = true,
  className,
  onChange,
}: OrderedSelectFieldProps<T>) => {
  const [open, setOpen] = React.useState(false);

  const tActions = useTranslations("common.actions");

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

  const optionMap = React.useMemo(
    () => new Map(options.map((item) => [item.value, item])),
    [options],
  );

  const selectedItems = React.useMemo<OrderedItem[]>(() => {
    return [...value]
      .sort((a, b) => a.display_order - b.display_order)
      .map((item, index) => {
        const id = getId(item);

        return {
          id,
          imageUrl: optionMap.get(id)?.imageUrl ?? null,
          label: optionMap.get(id)?.label ?? "Unknown",
          display_order: index + 1,
        };
      });
  }, [value, optionMap, getId]);

  const selectedIds = React.useMemo(
    () => new Set(value.map(getId)),
    [value, getId],
  );

  const availableOptions = React.useMemo(
    () => options.filter((item) => !selectedIds.has(item.value)),
    [options, selectedIds],
  );

  const emit = (ids: string[]) => {
    onChange(ids.map((id, index) => createValue(id, index + 1)));
  };

  const add = (id: string) => {
    if (selectedIds.has(id)) return;

    onChange(
      normalizeOrderedValues([...value, createValue(id, value.length + 1)]),
    );

    setOpen(false);
  };

  const remove = (id: string) => {
    onChange(
      normalizeOrderedValues(value.filter((item) => getId(item) !== id)),
    );
  };

  const clear = () => onChange([]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = selectedItems.findIndex((item) => item.id === active.id);

    const newIndex = selectedItems.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    emit(arrayMove(selectedItems, oldIndex, newIndex).map((item) => item.id));
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <Label label={label} required={required} />

        {selectedItems.length > 0 && (
          <Button
            type="button"
            size="xs"
            variant="ghost"
            disabled={disabled}
            onClick={clear}
          >
            <RotateCcw className="size-3" />
            {tActions("clear")}
          </Button>
        )}
      </div>

      <div className="rounded-xl border bg-card p-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              disabled={disabled || availableOptions.length === 0}
              className="w-full justify-between"
            >
              <span className="truncate">
                {availableOptions.length === 0 ? "All selected" : placeholder}
              </span>

              <ChevronDown className="size-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-80 p-0">
            <Command>
              <CommandInput placeholder="Search..." />

              <CommandList>
                <CommandEmpty>No data.</CommandEmpty>

                <CommandGroup>
                  <ScrollArea className="h-60">
                    {availableOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onSelect={() => add(option.value)}
                      >
                        <Plus className="mr-2 size-4" />

                        {option.imageUrl && (
                          <Image
                            src={option.imageUrl}
                            alt={option.label}
                            width={20}
                            height={20}
                            className="rounded-full object-cover shrink-0"
                          />
                        )}

                        <span>{option.label}</span>

                        <Check className="ml-auto opacity-0" />
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {selectedItems.length === 0 ? (
          <div className="mt-3 flex min-h-24 flex-col items-center justify-center gap-2 p-4 rounded-lg border border-dashed">
            <ListOrdered className="size-5" />
            <span className="text-center">{instruction}</span>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              strategy={verticalListSortingStrategy}
              items={selectedItems.map((item) => item.id)}
            >
              <ol className="mt-3 space-y-2">
                {selectedItems.map((item) => (
                  <SortableOrderedItem
                    key={item.id}
                    item={item}
                    disabled={disabled}
                    showPrimary
                    onRemove={remove}
                  />
                ))}
              </ol>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};

export default OrderedSelectField;
