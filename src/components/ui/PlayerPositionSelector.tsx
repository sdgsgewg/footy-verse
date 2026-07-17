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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Check, ChevronDown, ListOrdered, Plus, RotateCcw } from "lucide-react";

import SortablePositionItem, {
  SortablePositionItemValue,
} from "@/components/ui/SortablePositionItem";
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
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export interface PositionOption {
  id: string;
  name: string;
}

export interface PlayerPositionValue {
  position_id: string;
  display_order: number;
}

interface PlayerPositionSelectorProps<TPosition extends PositionOption> {
  label: string;
  placeholder?: string;
  options: TPosition[];
  value: PlayerPositionValue[];
  disabled?: boolean;
  className?: string;
  onChange: (value: PlayerPositionValue[]) => void;
}

function normalizePositions(value: PlayerPositionValue[]) {
  return value.map((item, index) => ({
    ...item,
    display_order: index + 1,
  }));
}

const PlayerPositionSelector = <TPosition extends PositionOption>({
  label,
  placeholder = "Select position...",
  options,
  value,
  disabled = false,
  className,
  onChange,
}: PlayerPositionSelectorProps<TPosition>) => {
  const [open, setOpen] = React.useState(false);

  const tForm = useTranslations("dashboard.players.form.positions");
  const tCommonActions = useTranslations("common.actions");

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

  const optionById = React.useMemo(
    () => new Map(options.map((option) => [option.id, option])),
    [options],
  );

  const selectedPositions = React.useMemo<SortablePositionItemValue[]>(() => {
    return [...value]
      .sort((a, b) => a.display_order - b.display_order)
      .map((item, index) => {
        const option = optionById.get(item.position_id);

        return {
          id: item.position_id,
          name: option?.name ?? "Unknown position",
          display_order: index + 1,
        };
      });
  }, [optionById, value]);

  const selectedIds = React.useMemo(
    () => new Set(value.map((item) => item.position_id)),
    [value],
  );

  const availableOptions = React.useMemo(
    () => options.filter((option) => !selectedIds.has(option.id)),
    [options, selectedIds],
  );

  const emitOrderedIds = (ids: string[]) => {
    onChange(
      ids.map((positionId, index) => ({
        position_id: positionId,
        display_order: index + 1,
      })),
    );
  };

  const addPosition = (positionId: string) => {
    if (selectedIds.has(positionId)) return;

    onChange(
      normalizePositions([
        ...value,
        {
          position_id: positionId,
          display_order: value.length + 1,
        },
      ]),
    );
    setOpen(false);
  };

  const removePosition = (positionId: string) => {
    onChange(
      normalizePositions(
        value.filter((item) => item.position_id !== positionId),
      ),
    );
  };

  const clearPositions = () => {
    onChange([]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = selectedPositions.findIndex(
      (position) => position.id === active.id,
    );
    const newIndex = selectedPositions.findIndex(
      (position) => position.id === over.id,
    );

    if (oldIndex === -1 || newIndex === -1) return;

    emitOrderedIds(
      arrayMove(selectedPositions, oldIndex, newIndex).map(
        (position) => position.id,
      ),
    );
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-muted-foreground ml-1">
          {label}
        </label>

        {selectedPositions.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            disabled={disabled}
            onClick={clearPositions}
            className="text-muted-foreground"
          >
            <RotateCcw className="size-3" />
            {tCommonActions("clear")}
          </Button>
        )}
      </div>

      <div className="rounded-xl border bg-card p-3 shadow-xs">
        <div className="flex items-center gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                disabled={disabled || availableOptions.length === 0}
                className="min-w-0 flex-1 justify-between rounded-lg"
              >
                <span className="truncate text-left text-muted-foreground">
                  {availableOptions.length === 0
                    ? "All positions selected"
                    : placeholder}
                </span>
                <ChevronDown className="size-4 opacity-60" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80 p-0" align="start">
              <Command>
                <CommandInput placeholder="Search position..." />
                <CommandList>
                  <CommandEmpty>No position found.</CommandEmpty>
                  <CommandGroup>
                    <ScrollArea className="h-60">
                      {availableOptions.map((option) => (
                        <CommandItem
                          key={option.id}
                          value={option.name}
                          onSelect={() => addPosition(option.id)}
                          className="cursor-pointer"
                        >
                          <Plus className="size-4 text-muted-foreground" />
                          <span className="min-w-0 flex-1 truncate">
                            {option.name}
                          </span>
                          <Check className="size-4 opacity-0" />
                        </CommandItem>
                      ))}
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {selectedPositions.length === 0 ? (
          <div className="mt-3 flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/20 px-4 py-6 text-center text-sm text-muted-foreground">
            <ListOrdered className="size-5" />
            <span>{tForm("instruction")}</span>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={selectedPositions.map((position) => position.id)}
              strategy={verticalListSortingStrategy}
            >
              <ol className="mt-3 space-y-2">
                {selectedPositions.map((position) => (
                  <SortablePositionItem
                    key={position.id}
                    position={position}
                    disabled={disabled}
                    onRemove={removePosition}
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

export default PlayerPositionSelector;
