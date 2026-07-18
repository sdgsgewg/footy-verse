"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import Label from "./Label";

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
import { SelectOption } from "@/types/select";
import Image from "next/image";

interface ComboboxFieldProps {
  label: string;
  name: string;

  value: string | null | undefined;

  options: SelectOption[];

  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;

  disabled?: boolean;
  required?: boolean;

  className?: string;

  onChange: (value: string) => void;
}

const ComboboxField: React.FC<ComboboxFieldProps> = ({
  label,
  name,

  value,

  options,

  placeholder = "Select option",
  searchPlaceholder = "Search...",
  emptyMessage = "No data found.",

  disabled = false,
  required = false,

  className,

  onChange,
}) => {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((item) => item.value === value);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label label={label} required={required} />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="h-10 w-full justify-between rounded-xl font-normal"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              {selectedOption?.imageUrl && (
                <Image
                  src={selectedOption.imageUrl}
                  alt={selectedOption.label}
                  width={20}
                  height={20}
                  className="rounded-full object-cover shrink-0"
                />
              )}

              <span className="truncate">
                {selectedOption?.label ?? placeholder}
              </span>
            </div>

            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-[--radix-popover-trigger-width] p-0"
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />

            <CommandList>
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
                        <Image
                          src={option.imageUrl}
                          alt={option.label}
                          width={20}
                          height={20}
                          className="rounded-full object-cover shrink-0"
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
    </div>
  );
};

export default ComboboxField;
