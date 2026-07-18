"use client";

import { NumericFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import Label from "./Label";

interface NumberFieldProps {
  label: string;
  name: string;

  value: number | null | undefined;

  onChange: (value: number | null) => void;

  placeholder?: string;

  required?: boolean;
  readOnly?: boolean;

  thousandSeparator?: string;
  decimalScale?: number;
  allowNegative?: boolean;

  className?: string;
}

export default function NumberField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  readOnly,
  thousandSeparator = ",",
  decimalScale,
  allowNegative = false,
}: NumberFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label label={label} required={required} readOnly={readOnly} />

      <NumericFormat
        customInput={Input}
        name={name}
        value={value ?? ""}
        placeholder={placeholder}
        readOnly={readOnly}
        thousandSeparator={thousandSeparator}
        decimalScale={decimalScale}
        allowNegative={allowNegative}
        allowLeadingZeros={false}
        onValueChange={({ floatValue }) => {
          onChange(floatValue ?? null);
        }}
      />
    </div>
  );
}
