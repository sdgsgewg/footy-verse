import {
  deleteClubService,
  getClubByIdService,
  updateClubService,
} from "@/lib/services/clubs.service";
import {
  tryDeleteClubImage,
  uploadClubImage,
} from "@/lib/services/storage.service";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

type ClubRouteContext = {
  params: Promise<{ id: string }>;
};

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

export async function GET(_request: Request, context: ClubRouteContext) {
  try {
    const { id } = await context.params;
    const data = await getClubByIdService(id);

    if (!data) {
      return NextResponse.json({ error: "Club not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: ClubRouteContext) {
  try {
    const { id } = await context.params;
    if (!isFormDataRequest(request)) {
      const body = await request.json();
      const data = await updateClubService(id, body);

      return NextResponse.json({ success: true, data });
    }

    const formData = await request.formData();
    const currentClub = await getClubByIdService(id);

    if (!currentClub) {
      return NextResponse.json({ error: "Club not found" }, { status: 404 });
    }

    const name = String(formData.get("name") ?? "");
    const file = formData.get("image");
    let image = currentClub.image;

    if (file instanceof File && file.size > 0) {
      image = await uploadClubImage(file, name);
    }

    try {
      const data = await updateClubService(id, { name, image });

      return NextResponse.json({ success: true, data });
    } catch (error) {
      if (image && image !== currentClub.image) {
        await tryDeleteClubImage(image);
      }

      throw error;
    }
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, context: ClubRouteContext) {
  try {
    const { id } = await context.params;

    await deleteClubService(id);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
