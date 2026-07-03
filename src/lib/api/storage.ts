export async function uploadClubImage(file: File, clubName: string) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("clubName", clubName);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  const { path } = await response.json();

  return path;
}
