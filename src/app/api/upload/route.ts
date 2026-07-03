import { uploadClubImage } from "@/lib/services/storage.service";
import { NextResponse } from "next/server";

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

  const path = await uploadClubImage(file, clubName);

  return NextResponse.json({
    path,
  });
}
