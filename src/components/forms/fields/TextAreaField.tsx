"use client";

import { Textarea } from "@/components/ui/textarea";
import Label from "./Label";

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
}: TextAreaFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label label={label} required={required} readOnly={readOnly} />

      <Textarea
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        rows={rows}
        className={className}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
