import {
  deletePositionService,
  getPositionByIdService,
  updatePositionService,
} from "@/lib/services/positions.service";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

type PositionRouteContext = {
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

export async function GET(_request: Request, context: PositionRouteContext) {
  try {
    const { id } = await context.params;
    const data = await getPositionByIdService(id);

    if (!data) {
      return NextResponse.json({ error: "Position not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: PositionRouteContext) {
  try {
    const { id } = await context.params;
    if (!isFormDataRequest(request)) {
      const body = await request.json();
      const data = await updatePositionService(id, body);

      return NextResponse.json({ success: true, data });
    }

    const formData = await request.formData();
    const currentPosition = await getPositionByIdService(id);

    if (!currentPosition) {
      return NextResponse.json({ error: "Position not found" }, { status: 404 });
    }

    const name = String(formData.get("name") ?? "");

    try {
      const data = await updatePositionService(id, { name });

      return NextResponse.json({ success: true, data });
    } catch (error) {
      throw error;
    }
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, context: PositionRouteContext) {
  try {
    const { id } = await context.params;

    await deletePositionService(id);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
