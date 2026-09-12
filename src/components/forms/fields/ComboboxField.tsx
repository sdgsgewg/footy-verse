"use client";

import * as React from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
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

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import { Option } from "@/types/option";
import { useTranslations } from "next-intl";
import { Entity } from "@/config/entities";
import { ComboboxFieldImage } from "@/components/shared/fields";

interface ComboboxFieldProps {
  field: AnyFieldApi;
  entityKey: Entity;

  label?: string;

  options: Option[];

  placeholder?: string;

  disabled?: boolean;
  loading?: boolean;
  required?: boolean;

  className?: string;
}

const ComboboxField: React.FC<ComboboxFieldProps> = ({
  field,
  entityKey,
  label,

  options,

  placeholder = "Select option",

  disabled = false,
  loading = false,
  required = false,

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

  const value = field.state.value as string | null | undefined;

  const selectedOption = options.find((item) => item.value === value);

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} className={cn(className)}>
      {label && (
        <FieldLabel htmlFor={field.name}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={field.name}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={isInvalid}
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
                      field.handleChange(option.value);
                      field.handleBlur();
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

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

export default ComboboxField;
