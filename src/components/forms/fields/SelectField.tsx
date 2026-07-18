"use client";

import React from "react";

import Label from "./Label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectOption } from "@/types/select";

interface SelectFieldProps {
  label: string;
  name: string;

  value: string;

  options: SelectOption[];

  placeholder?: string;

  disabled?: boolean;
  required?: boolean;

  className?: string;

  onChange: (value: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,

  value,

  options,

  placeholder = "Select option",

  disabled = false,
  required = false,

  className,

  onChange,
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <Label label={label} required={required} />

      <Select
        value={value || undefined}
        onValueChange={onChange}
        disabled={disabled}
        name={name}
      >
        <SelectTrigger className="w-full rounded-xl">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectField;
