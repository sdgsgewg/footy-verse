"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Upload, ImagePlus } from "lucide-react";

import Label from "./Label";
import { Card, CardContent } from "@/components/ui/card";
import ErrorMessage from "./ErrorMessage";
import { useTranslations } from "next-intl";

interface Props {
  label: string;
  name: string;

  value?: string;
  onChange: (file: File) => void;

  required?: boolean;
  readOnly?: boolean;

  error?: string;
}

export default function ImageField({
  label,
  name,
  value,
  onChange,
  required,
  readOnly,
  error,
}: Props) {
  const t = useTranslations("common.form.fields.image");

  const inputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = "PNG, JPG, JPEG, WEBP";

  const errorId = error ? `${name}-error` : undefined;
  const helpId = `${name}-help`;

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
                className="object-contain"
              />

              {!readOnly && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex items-center gap-2 rounded-lg bg-background/90 px-4 py-2 text-sm font-medium">
                    <Upload className="h-4 w-4" />
                    {t("change")}
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
                <p className="font-medium text-foreground">
                  {t("clickToUpload")}
                </p>

                {/* <p className="text-sm">PNG, JPG, WEBP</p> */}
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
            aria-invalid={!!error}
            aria-describedby={[errorId, helpId].filter(Boolean).join(" ")}
            onChange={handleFileChange}
          />

          <div className="space-y-1">
            {error && <ErrorMessage id={errorId} message={error} />}

            <p id={helpId} className="text-xs text-muted-foreground">
              {t("supportedFormats", {
                formats: supportedFormats,
              })}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
