import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/utils/supabase/server";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { slugify } from "@/common/utils/slug.util";

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

export async function uploadClubImage(file: File, clubName: string) {
  const supabase = await createStorageClient();

  const slug = slugify(clubName);

  const extension = file.name.split(".").pop() || "png";

  const fileName = `${slug}-${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const filePath = fileName;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKETS.CLUBS)
    .upload(filePath, file, {
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return filePath;
}

function getStoragePath(filePathOrUrl: string) {
  if (!filePathOrUrl) return null;

  if (!URL.canParse(filePathOrUrl)) {
    return filePathOrUrl.replace(`${STORAGE_BUCKETS.CLUBS}/`, "");
  }

  const url = new URL(filePathOrUrl);
  const bucketPaths = [
    `/storage/v1/object/public/${STORAGE_BUCKETS.CLUBS}/`,
    `/storage/v1/object/sign/${STORAGE_BUCKETS.CLUBS}/`,
    `/storage/v1/object/${STORAGE_BUCKETS.CLUBS}/`,
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

export async function deleteClubImage(filePath: string) {
  const supabase = await createStorageClient();
  const storagePath = getStoragePath(filePath);

  if (!storagePath) {
    return;
  }

  const { error } = await supabase.storage
    .from(STORAGE_BUCKETS.CLUBS)
    .remove([storagePath]);

  if (error) {
    throw new Error(error.message);
  }
}

export async function tryDeleteClubImage(filePath: string | null) {
  if (!filePath) return;

  try {
    await deleteClubImage(filePath);
  } catch (error) {
    console.warn("Failed to delete club image from bucket", {
      filePath,
      error,
    });
  }
}

export async function renameClubImage(oldPath: string, newClubName: string) {
  const supabase = await createStorageClient();
  const oldStoragePath = getStoragePath(oldPath);

  if (!oldStoragePath) {
    return oldPath;
  }

  const slug = slugify(newClubName);
  const extension = oldStoragePath.split(".").pop() || "png";
  const newFileName = `${slug}-${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKETS.CLUBS)
    .move(oldStoragePath, newFileName);

  if (error) {
    throw new Error(error.message);
  }

  return newFileName;
}

