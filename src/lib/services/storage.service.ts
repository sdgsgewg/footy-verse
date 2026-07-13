import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/utils/supabase/server";
import { slugify } from "@/utils/string";

async function createStorageClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceRoleKey) {
    return createSupabaseClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return createServerClient();
}

export async function uploadImage(
  file: File,
  baseName: string,
  bucketName: string,
) {
  const supabase = await createStorageClient();

  const slug = slugify(baseName);

  const extension = file.name.split(".").pop() || "png";

  const fileName = `${slug}-${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const filePath = fileName;

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return filePath;
}

function getStoragePath(filePathOrUrl: string, bucketName: string) {
  if (!filePathOrUrl) return null;

  if (!URL.canParse(filePathOrUrl)) {
    return filePathOrUrl.replace(`${bucketName}/`, "");
  }

  const url = new URL(filePathOrUrl);
  const bucketPaths = [
    `/storage/v1/object/public/${bucketName}/`,
    `/storage/v1/object/sign/${bucketName}/`,
    `/storage/v1/object/${bucketName}/`,
  ];
  const bucketPath = bucketPaths.find((path) => url.pathname.includes(path));

  if (!bucketPath) {
    return null;
  }

  const bucketIndex = url.pathname.indexOf(bucketPath);

  return decodeURIComponent(
    url.pathname.slice(bucketIndex + bucketPath.length),
  );
}

export async function deleteImage(filePath: string, bucketName: string) {
  const supabase = await createStorageClient();
  const storagePath = getStoragePath(filePath, bucketName);

  if (!storagePath) {
    return;
  }

  const { error } = await supabase.storage
    .from(bucketName)
    .remove([storagePath]);

  if (error) {
    throw new Error(error.message);
  }
}

export async function tryDeleteImage(
  filePath: string | null,
  bucketName: string,
) {
  if (!filePath) return;

  try {
    await deleteImage(filePath, bucketName);
  } catch (error) {
    console.warn("Failed to delete image from bucket", {
      filePath,
      error,
    });
  }
}

export async function renameImage(
  oldPath: string,
  newName: string,
  bucketName: string,
) {
  const supabase = await createStorageClient();
  const oldStoragePath = getStoragePath(oldPath, bucketName);

  if (!oldStoragePath) {
    return oldPath;
  }

  const slug = slugify(newName);
  const extension = oldStoragePath.split(".").pop() || "png";
  const newFileName = `${slug}-${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(bucketName)
    .move(oldStoragePath, newFileName);

  if (error) {
    throw new Error(error.message);
  }

  return newFileName;
}
