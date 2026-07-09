import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface MultiSelectOption {
  id: string;
  name: string;
}

interface InputMultiSelectProps<T extends MultiSelectOption> {
  label: string;

  placeholder?: string;

  value: string[];

  options: T[];

  disabled?: boolean;

  className?: string;

  onChange: (value: string[]) => void;
}

const InputMultiSelect = <T extends MultiSelectOption>({
  label,
  placeholder = "Select...",
  value,
  options,
  disabled = false,
  className,
  onChange,
}: InputMultiSelectProps<T>) => {
  const [open, setOpen] = React.useState(false);

  const selectedItems = React.useMemo(
    () => options.filter((o) => value.includes(o.id)),
    [options, value],
  );

  const toggleOption = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((x) => x !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const removeOption = (id: string) => {
    onChange(value.filter((x) => x !== id));
  };

  const selectAll = () => {
    onChange(options.map((o) => o.id));
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="text-sm font-medium text-muted-foreground ml-1">
        {label}
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className="min-h-10 h-auto w-full justify-between rounded-xl px-3 py-2"
          >
            <div className="flex flex-wrap gap-2 text-left">
              {selectedItems.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                selectedItems.map((item) => (
                  <Badge
                    key={item.id}
                    variant="secondary"
                    className="gap-1 pr-1"
                  >
                    {item.name}

                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                    removeOption(item.id);
                      }}
                    />
                  </Badge>
                ))
              )}
            </div>

            <ChevronDown className="w-4 h-4 opacity-60" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-87.5 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search..." />

            <CommandList>
              <CommandEmpty>No data found.</CommandEmpty>

              <CommandGroup>
                <div className="flex items-center justify-between px-2 py-2 border-b">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={selectAll}
                  >
                    Select All
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                  >
                    Clear
                  </Button>
                </div>

                <ScrollArea className="h-60">
                  {options.map((option) => {
                    const checked = value.includes(option.id);

                    return (
                      <CommandItem
                        key={option.id}
                        value={option.name}
                        onSelect={() => toggleOption(option.id)}
                        className="cursor-pointer"
                      >
                        <Checkbox checked={checked} className="mr-2" />

                        <span className="flex-1">{option.name}</span>

                        {checked && <Check className="w-4 h-4" />}
                      </CommandItem>
                    );
                  })}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default InputMultiSelect;
