import {
  deleteNationalityService,
  getNationalityByIdService,
  updateNationalityService,
} from "@/lib/services/nationalities.service";
import {
  tryDeleteNationalityImage,
  uploadNationalityImage,
} from "@/lib/services/storage.service";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

type NationalityRouteContext = {
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

export async function GET(_request: Request, context: NationalityRouteContext) {
  try {
    const { id } = await context.params;
    const data = await getNationalityByIdService(id);

    if (!data) {
      return NextResponse.json({ error: "Nationality not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: NationalityRouteContext) {
  try {
    const { id } = await context.params;
    if (!isFormDataRequest(request)) {
      const body = await request.json();
      const data = await updateNationalityService(id, body);

      return NextResponse.json({ success: true, data });
    }

    const formData = await request.formData();
    const currentNationality = await getNationalityByIdService(id);

    if (!currentNationality) {
      return NextResponse.json({ error: "Nationality not found" }, { status: 404 });
    }

    const name = String(formData.get("name") ?? "");
    const file = formData.get("image");
    let image = currentNationality.image;

    if (file instanceof File && file.size > 0) {
      image = await uploadNationalityImage(file, name);
    }

    try {
      const data = await updateNationalityService(id, { name, image });

      return NextResponse.json({ success: true, data });
    } catch (error) {
      if (image && image !== currentNationality.image) {
        await tryDeleteNationalityImage(image);
      }

      throw error;
    }
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, context: NationalityRouteContext) {
  try {
    const { id } = await context.params;

    await deleteNationalityService(id);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
