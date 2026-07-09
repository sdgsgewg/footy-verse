export type ImagePayload = {
  imageUrl: string | null; // public URL untuk preview
  imageFile: File | null; // file yang dipilih user
  previewUrl: string | null; // URL untuk preview sementara sebelum diupload
};