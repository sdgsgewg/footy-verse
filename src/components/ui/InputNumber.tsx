import React from "react";

interface InputNumberProps {
  label: string;
  name: string;
  placeholder?: string;
  value: number | null | undefined;
  decimal?: boolean;
  onChange: (value: number | null) => void;
  className?: string;
}

const InputNumber: React.FC<InputNumberProps> = ({
  label,
  name,
  placeholder,
  value,
  decimal = false,
  onChange,
}) => {
  return (
    <div key={name} className="flex flex-col gap-2">
      <label className="text-sm font-medium text-muted-foreground ml-1">
        {label}
      </label>
      <input
        type="number"
        step={decimal ? "0.01" : "1"}
        placeholder={placeholder || ""}
        value={value !== null && value !== undefined ? value : ""}
        onChange={(e) => {
          const v = e.target.value;

          if (v === "") {
            onChange(null);
            return;
          }

          const num = Number(v);

          if (Number.isNaN(num) || num < 0) return;

          if (!decimal && !Number.isInteger(num)) return;

          onChange(num);
        }}
        className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
      />
    </div>
  );
};

export default InputNumber;
