"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Upload, ImagePlus } from "lucide-react";
import type { AnyFieldApi } from "@tanstack/react-form";

import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { useImageField } from "@/hooks/crud/useImageField";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface Props {
  field: AnyFieldApi;

  label: string;
  existingImageUrl?: string | null;

  required?: boolean;
  readOnly?: boolean;

  imageClassName?: string;
}

export default function ImageField({
  field,
  label,
  existingImageUrl = null,
  required,
  readOnly,
  imageClassName = "object-cover",
}: Props) {
  const t = useTranslations("common.form.fields.image");

  const inputRef = useRef<HTMLInputElement>(null);

  const { previewUrl, updatePreview } = useImageField({
    initialPreviewUrl: existingImageUrl,
  });

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const value = previewUrl ?? existingImageUrl;

  useEffect(() => {
    if (!value && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [value]);

  const handleChooseFile = () => {
    if (readOnly) return;

    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    field.handleChange(file);
    updatePreview(file);
  };

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel>
        {label}
        {required && <span className="text-destructive">*</span>}
      </FieldLabel>

      <Card
        onClick={handleChooseFile}
        className={cn(
          "group w-52 cursor-pointer overflow-hidden p-0 transition",
          !readOnly && "hover:border-primary",
          readOnly && "cursor-default opacity-70",
        )}
      >
        <CardContent className="relative flex aspect-square items-center justify-center overflow-hidden p-0 bg-muted">
          {value ? (
            <>
              <Image
                src={value}
                alt="Preview"
                fill
                sizes="208px"
                className={imageClassName}
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
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
          />

          <FieldDescription>
            {t("supportedFormats", {
              formats: "PNG, JPG, JPEG, WEBP",
            })}
          </FieldDescription>
        </>
      )}

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
