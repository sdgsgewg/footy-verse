import React from "react";

interface LabelProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  readonly?: boolean;
}

const Label = ({ label, required, optional = false, readonly }: LabelProps) => {
  return (
    <span className="flex gap-1 text-sm font-medium">
      <span className="text-muted-foreground ml-1">
        {label}
      </span>
      {!readonly &&
        (required ? (
          <span className="text-red-500">*</span>
        ) : optional ? (
          <span className="text-gray-500">{"(optional)"}</span>
        ) : null)}
    </span>
  );
};

export default Label;
