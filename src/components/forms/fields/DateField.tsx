"use client";

import { useMemo, useState } from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import { CalendarDays, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import { cn } from "@/lib/utils";

interface DateFieldProps {
  field: AnyFieldApi;

  label: string;
  placeholder?: string;

  startMonth?: Date;
  endMonth?: Date;

  minDate?: Date;
  maxDate?: Date;

  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  clearable?: boolean;

  className?: string;
  hideLabel?: boolean;
}

export default function DateField({
  field,
  label,
  placeholder = "Select date",
  startMonth,
  endMonth = new Date(2100, 11, 31),
  minDate,
  maxDate,
  required,
  readOnly,
  disabled,
  clearable = true,
  className,
  hideLabel = false,
}: DateFieldProps) {
  const locale = useLocale();
  const tCommonActions = useTranslations("common.actions");

  const [open, setOpen] = useState(false);

  const value = field.state.value as string;

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const date = useMemo(() => {
    if (!value) return undefined;

    const [year, month, day] = value.split("-").map(Number);

    if (!year || !month || !day) return undefined;

    return new Date(year, month - 1, day);
  }, [value]);

  const formattedDate = date
    ? date.toLocaleDateString(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  const handleClear = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    field.handleChange("");
    field.handleBlur();
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      handleClear();
      setOpen(false);
      return;
    }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");

    field.handleChange(`${year}-${month}-${day}`);
    setOpen(false);
  };

  const isDisabled = disabled || readOnly;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel
        htmlFor={field.name}
        className={hideLabel ? "sr-only" : undefined}
      >
        {label}
        {!hideLabel && required && <span className="text-destructive">*</span>}
      </FieldLabel>

      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          if (isDisabled) return;

          setOpen(nextOpen);

          if (!nextOpen) {
            field.handleBlur();
          }
        }}
      >
        <div className="relative w-full">
          <PopoverTrigger asChild>
            <Button
              id={field.name}
              name={field.name}
              type="button"
              variant="outline"
              disabled={isDisabled}
              aria-invalid={isInvalid}
              className={cn(
                "w-full flex items-center justify-between font-normal",
                date && !isDisabled && clearable && "pr-8",
                !date && "text-muted-foreground",
                className,
              )}
            >
              <span className="truncate">{formattedDate || placeholder}</span>
              <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
            </Button>
          </PopoverTrigger>

          {date && !isDisabled && clearable && (
            <button
              type="button"
              aria-label={tCommonActions("clear")}
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date ?? minDate ?? maxDate}
            captionLayout="dropdown"
            startMonth={startMonth}
            endMonth={endMonth}
            disabled={(calendarDate) => {
              if (minDate && calendarDate < minDate) {
                return true;
              }
              if (maxDate && calendarDate > maxDate) {
                return true;
              }
              return false;
            }}
            onSelect={handleSelect}
          />

          {date && !isDisabled && clearable && (
            <div className="flex items-center justify-between border-t border-border px-3 py-2 bg-muted/20">
              <span className="text-xs text-muted-foreground">
                {formattedDate}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleClear();
                  setOpen(false);
                }}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1.5 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                {tCommonActions("clear")}
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
