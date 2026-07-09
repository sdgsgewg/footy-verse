import React from "react";

interface InputDateProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const InputDate: React.FC<InputDateProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div key={name} className="flex flex-col gap-2">
      <label className="text-sm font-medium text-muted-foreground ml-1">
        {label}
      </label>
      <input
        type="date"
        placeholder={placeholder || ""}
        value={value || ""}
        onChange={(e) => {
          const v = e.target.value;
          if (!v) {
            onChange("");
            return;
          }
          const num = Date.parse(v);
          if (Number.isNaN(num)) return;
          onChange(v);
        }}
        className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
      />
    </div>
  );
};

export default InputDate;
