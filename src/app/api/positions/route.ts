import {
  createPositionService,
  getPositionsService,
} from "@/lib/services/positions.service";
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
    };

    const data = await getPositionsService(query);

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    if (!isFormDataRequest(request)) {
      const body = await request.json();
      const data = await createPositionService(body);

      return NextResponse.json({ success: true, data }, { status: 201 });
    }

    const formData = await request.formData();
    const name = String(formData.get("name") ?? "");

    try {
      const data = await createPositionService({ name });

      return NextResponse.json({ success: true, data }, { status: 201 });
    } catch (error) {
      throw error;
    }
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
