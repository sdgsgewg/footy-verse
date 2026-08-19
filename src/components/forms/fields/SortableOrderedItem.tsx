"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical, Star, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface SortableOrderedItemValue {
  id: string;
  imageUrl?: string | null;
  label: string;
  display_order: number;
}

interface SortableOrderedItemProps {
  item: SortableOrderedItemValue;
  disabled?: boolean;
  showPrimary?: boolean;
  onRemove?: (itemId: string) => void;
}

const SortableOrderedItem = ({
  item,
  disabled = false,
  showPrimary = false,
  onRemove,
}: SortableOrderedItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex min-h-12 items-center gap-3 rounded-lg border bg-background px-3 py-2 shadow-xs transition-colors",
        isDragging && "z-10 border-primary bg-primary/5 shadow-md",
      )}
    >
      <button
        type="button"
        className="inline-flex size-8 shrink-0 cursor-grab items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 active:cursor-grabbing disabled:pointer-events-none disabled:opacity-50"
        aria-label={`Reorder ${item.label}`}
        disabled={disabled}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-4" />
      </button>

      <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground">
        {item.display_order}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {item.imageUrl && (
            <Image
              src={item.imageUrl}
              alt={item.label}
              width={20}
              height={20}
              className="rounded-full object-cover shrink-0"
            />
          )}

          <span className="truncate text-sm font-medium">{item.label}</span>
          {item.display_order === 1 && showPrimary && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-[11px] font-medium text-primary">
              <Star className="size-3 fill-current" />
              Primary
            </span>
          )}
        </div>
      </div>

      {onRemove && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          disabled={disabled}
          aria-label={`Remove ${item.label}`}
          onClick={() => onRemove(item.id)}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </Button>
      )}
    </li>
  );
};

export default SortableOrderedItem;
