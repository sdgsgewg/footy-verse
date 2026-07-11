import React from "react";
import { ChevronDown } from "lucide-react";
import Label from "../forms/fields/Label";

interface InputSelectProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  options: { id: string; name: string }[];
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange: (value: string) => void;
  className?: string;
}

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  name,
  placeholder,
  value,
  options = [],
  // loading = false,
  disabled = false,
  required = false,
  onChange,
  className,
}) => {
  return (
    <div key={name} className={`flex flex-col gap-2 ${className || ""}`}>
      <Label label={label} required={required} />

      {/* Wrapper biar icon bisa absolute */}
      <div className="relative">
        <select
          disabled={disabled}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="flex h-10 w-full rounded-xl border border-input bg-background px-3 pr-10 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all appearance-none"
        >
          <option value="" disabled className="bg-background">
            {placeholder}
          </option>

          {options.map((opt) => (
            <option
              key={opt.id}
              value={opt.id}
              className="bg-background text-foreground"
            >
              {opt.name}
            </option>
          ))}
        </select>

        {/* Chevron icon */}
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};

export default InputSelect;
