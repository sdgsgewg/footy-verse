"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Label from "./Label";
import ErrorMessage from "./ErrorMessage";
import { useLocale } from "next-intl";

interface DateFieldProps {
  label: string;
  name: string;

  value: string;
  onChange: (value: string) => void;

  placeholder?: string;

  startMonth?: Date;
  endMonth?: Date;

  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;

  className?: string;
  error?: string;
}

export default function DateField({
  label,
  name,
  value,
  onChange,
  placeholder = "Select date",
  startMonth,
  endMonth,
  required,
  readOnly,
  disabled,
  className,
  error,
}: DateFieldProps) {
  const [open, setOpen] = React.useState(false);

  const errorId = error ? `${name}-error` : undefined;

  const date = React.useMemo(() => {
    if (!value) return undefined;

    const [year, month, day] = value.split("-").map(Number);

    if (!year || !month || !day) return undefined;

    return new Date(year, month - 1, day);
  }, [value]);

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      onChange("");
      return;
    }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");

    onChange(`${year}-${month}-${day}`);
    setOpen(false);
  };

  const locale = useLocale();

  const formattedDate = date
    ? date.toLocaleDateString(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  const isDisabled = disabled || readOnly;

  return (
    <div className="flex flex-col gap-2">
      <Label label={label} required={required} readOnly={readOnly} />

      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          if (!isDisabled) {
            setOpen(nextOpen);
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button
            id={name}
            name={name}
            type="button"
            variant="outline"
            disabled={isDisabled}
            aria-invalid={!!error}
            aria-describedby={errorId}
            className={`w-full justify-start font-normal ${
              !date ? "text-muted-foreground" : ""
            } ${className ?? ""}`}
          >
            {formattedDate || placeholder}
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

      {error && <ErrorMessage id={errorId} message={error} />}
    </div>
  );
}
