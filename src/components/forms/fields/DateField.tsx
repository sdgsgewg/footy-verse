"use client";

import { Input } from "@/components/ui/input";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

interface DateFieldProps {
  label: string;
  name: string;

  value: string;
  onChange: (value: string) => void;

  placeholder?: string;

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
  placeholder,
  required,
  readOnly,
  disabled,
  className,
  error,
}: DateFieldProps) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <Label label={label} required={required} readOnly={readOnly} />

      <Input
        type="date"
        name={name}
        aria-invalid={!!error}
        aria-describedby={errorId}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled || readOnly}
        className={className}
        onChange={(e) => {
          const v = e.target.value;

          if (!v) {
            onChange("");
            return;
          }

          const timestamp = Date.parse(v);
          if (Number.isNaN(timestamp)) return;

          onChange(v);
        }}
      />

      {error && <ErrorMessage id={errorId} message={error} />}
    </div>
  );
}
