"use client";

import * as React from "react";
import { Check, ChevronDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Option } from "@/types/option";
import { useTranslations } from "next-intl";
import { Entity } from "@/config/entities";
import { Field, FieldLabel } from "@/components/ui/field";
import ComboboxFieldImage from "./ComboboxFieldImage";

interface ComboboxFieldProps {
  label?: string;
  name: string;

  entityKey: Entity;

  value: string | null | undefined;
  onChange: (value: string) => void;
  options: Option[];

  placeholder?: string;

  disabled?: boolean;
  loading?: boolean;

  className?: string;
}

const ComboboxField: React.FC<ComboboxFieldProps> = ({
  label,
  name,

  entityKey,

  value,
  onChange,
  options,

  placeholder = "Select option",

  disabled = false,
  loading = false,

  className,
}) => {
  const tCommon = useTranslations("common");
  const tEntities = useTranslations("entities");
  const tCommonStates = useTranslations("common.states");

  const searchPlaceholder = tCommon("combobox.searchEntity", {
    entity: tEntities(entityKey).toLowerCase(),
  });

  const emptyMessage = tCommon("combobox.noEntityFound", {
    entity: tEntities(entityKey).toLowerCase(),
  });

  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((item) => item.value === value);

  return (
    <Field className={cn(className)}>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger id={name} asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled || loading}
            className="h-10 w-full justify-between rounded-xl font-normal"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              {selectedOption?.imageUrl && (
                <ComboboxFieldImage
                  src={selectedOption.imageUrl}
                  alt={selectedOption.label}
                  entityKey={entityKey}
                />
              )}

              <span className="truncate">
                {loading
                  ? tCommonStates("loading")
                  : (selectedOption?.label ?? placeholder)}
              </span>
            </div>

            {loading ? (
              <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-[--radix-popover-trigger-width] p-0"
          onWheel={(e) => e.stopPropagation()}
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />

            <CommandList className="max-h-60 overflow-y-auto">
              <CommandEmpty>{emptyMessage}</CommandEmpty>

              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0",
                      )}
                    />

                    <div className="flex items-center gap-2">
                      {option.imageUrl && (
                        <ComboboxFieldImage
                          src={option.imageUrl}
                          alt={option.label}
                          entityKey={entityKey}
                        />
                      )}

                      <span>{option.label}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Field>
  );
};

export default ComboboxField;
