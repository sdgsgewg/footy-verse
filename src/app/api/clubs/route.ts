import {
  createClubService,
  getClubsService,
} from "@/lib/services/clubs.service";
import {
  tryDeleteClubImage,
  uploadClubImage,
} from "@/lib/services/storage.service";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

function errorResponse(error: unknown) {
  const message =
    error instanceof ZodError
      ? error.issues.map((issue) => issue.message).join(", ")
      : error instanceof Error
        ? error.message
        : "Internal Server Error";

  return NextResponse.json({ error: message }, { status: 400 });
}

function isFormDataRequest(request: Request) {
  return request.headers.get("content-type")?.includes("multipart/form-data");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      name: searchParams.get("name") || undefined,
      slug: searchParams.get("slug") || undefined,
    };

    const data = await getClubsService(query);

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    if (!isFormDataRequest(request)) {
      const body = await request.json();
      const data = await createClubService(body);

      return NextResponse.json({ success: true, data }, { status: 201 });
    }

    const formData = await request.formData();
    const name = String(formData.get("name") ?? "");
    const file = formData.get("image");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { error: "Club image is required" },
        { status: 400 },
      );
    }

    const image = await uploadClubImage(file, name);

    try {
      const data = await createClubService({ name, image });

      return NextResponse.json({ success: true, data }, { status: 201 });
    } catch (error) {
      await tryDeleteClubImage(image);

      throw error;
    }
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
