"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Upload, ImagePlus } from "lucide-react";

import Label from "./Label";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  name: string;
  label: string;
  required?: boolean;
  readOnly?: boolean;
  value?: string;
  onChange: (file: File) => void;
}

export default function ImageField({
  name,
  label,
  required,
  readOnly,
  value,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [value]);

  function handleChooseFile() {
    if (readOnly) return;

    inputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    onChange(file);
  }

  return (
    <div className="space-y-3">
      <Label label={label} required={required} readOnly={readOnly} />

      <Card
        onClick={handleChooseFile}
        className={[
          "group w-52 cursor-pointer overflow-hidden p-0 transition",
          !readOnly && "hover:border-primary",
          readOnly && "cursor-default opacity-70",
        ].join(" ")}
      >
        <CardContent className="relative flex aspect-square items-center justify-center overflow-hidden p-0 bg-muted">
          {value ? (
            <>
              <Image
                src={value}
                alt="Preview"
                fill
                sizes="208px"
                className="object-cover"
              />

              {!readOnly && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex items-center gap-2 rounded-lg bg-background/90 px-4 py-2 text-sm font-medium">
                    <Upload className="h-4 w-4" />
                    Change Image
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
              <div className="rounded-full bg-background p-4 shadow-sm">
                <ImagePlus className="h-7 w-7" />
              </div>

              <div>
                <p className="font-medium text-foreground">Click to upload</p>

                <p className="text-sm">PNG, JPG, WEBP</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {!readOnly && (
        <>
          <input
            ref={inputRef}
            hidden
            name={name}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          <p className="text-xs text-muted-foreground">
            Supported formats: PNG, JPG, JPEG, WEBP
          </p>
        </>
      )}
    </div>
  );
}
