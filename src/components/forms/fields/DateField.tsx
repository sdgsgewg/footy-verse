"use client";

import { useMemo, useState } from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import { CalendarDays } from "lucide-react";
import { useLocale } from "next-intl";

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

  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;

  className?: string;
}

export default function DateField({
  field,
  label,
  placeholder = "Select date",
  startMonth,
  endMonth,
  required,
  readOnly,
  disabled,
  className,
}: DateFieldProps) {
  const locale = useLocale();

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

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      field.handleChange("");
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
      <FieldLabel htmlFor={field.name}>
        {label}
        {required && <span className="text-destructive">*</span>}
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
              !date && "text-muted-foreground",
              className,
            )}
          >
            {formattedDate || placeholder}
            <CalendarDays />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            startMonth={startMonth}
            endMonth={endMonth}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
