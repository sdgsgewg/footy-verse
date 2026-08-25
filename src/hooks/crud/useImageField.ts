"use client";

import { useEffect, useState } from "react";

interface UseImageFieldOptions {
  initialFile?: File | null;
  initialPreviewUrl?: string | null;

  onChange?: (file: File) => void;
}

export function useImageField({
  initialFile = null,
  initialPreviewUrl = null,
  onChange,
}: UseImageFieldOptions = {}) {
  const [imageFile, setImageFile] = useState<File | null>(initialFile);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialPreviewUrl,
  );

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const updateImage = (file: File) => {
    const url = URL.createObjectURL(file);

    setImageFile(file);
    setPreviewUrl(url);

    onChange?.(file);
  };

  const clearImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  return {
    imageFile,
    previewUrl,

    updateImage,
    clearImage,
  };
}
