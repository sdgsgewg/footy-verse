"use client";

import { Textarea } from "@/components/ui/textarea";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

interface TextAreaFieldProps {
  label: string;
  name: string;

  value: string;
  onChange: (value: string) => void;

  placeholder?: string;

  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;

  rows?: number;
  className?: string;
  error?: string;
}

export default function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  readOnly,
  disabled,
  rows = 4,
  className,
  error,
}: TextAreaFieldProps) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <Label label={label} required={required} readOnly={readOnly} />

      <Textarea
        name={name}
        aria-invalid={!!error}
        aria-describedby={errorId}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        rows={rows}
        className={className}
        onChange={(e) => onChange(e.target.value)}
      />

      {error && <ErrorMessage id={errorId} message={error} />}
    </div>
  );
}
