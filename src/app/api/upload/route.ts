import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/services/storage.service";
import { STORAGE_BUCKETS } from "@/lib/storage";

export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get("file") as File;
  const clubName = formData.get("clubName") as string;

  if (!(file instanceof File)) {
    return NextResponse.json(
      {
        message: "Invalid file",
      },
      {
        status: 400,
      },
    );
  }

  const path = await uploadImage(file, clubName, STORAGE_BUCKETS.CLUBS);

  return NextResponse.json({
    path,
  });
}
