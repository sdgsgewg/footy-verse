"use client";

import { useEffect, useState } from "react";

interface UseImageFieldOptions {
  initialPreviewUrl?: string | null;
}

export function useImageField({
  initialPreviewUrl = null,
}: UseImageFieldOptions = {}) {
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

  const updatePreview = (file: File) => {
    const url = URL.createObjectURL(file);

    setPreviewUrl(url);
  };

  const clearPreview = () => {
    setPreviewUrl(null);
  };

  return {
    previewUrl,
    updatePreview,
    clearPreview,
  };
}
