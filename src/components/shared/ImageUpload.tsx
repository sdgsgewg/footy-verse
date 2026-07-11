"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Label from "../forms/fields/Label";

interface Props {
  name: string;
  label: string;
  required?: boolean;
  readOnly?: boolean;
  value?: string;
  onChange: (file: File) => void;
}

export default function ImageUpload({
  name,
  label,
  required,
  readOnly,
  value,
  onChange,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [value]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    onChange(file);
  }

  return (
    <div className="space-y-4">
      <Label label={label} required={required} readOnly={readOnly} />

      {value && (
        <div className="relative h-40 w-40 overflow-hidden rounded-lg border">
          <Image
            src={value!}
            alt="Preview"
            sizes="100%"
            fill
            className="object-cover"
          />
        </div>
      )}

      <input
        name={name}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
    </div>
  );
}
