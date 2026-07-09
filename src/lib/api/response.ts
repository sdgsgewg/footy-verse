import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status },
  );
}

export function noContentResponse() {
  return new Response(null, {
    status: 204,
  });
}

export function createdResponse<T>(data: T) {
  return successResponse(data, 201);
}

export function errorResponse(error: unknown, status = 400) {
  const message =
    error instanceof ZodError
      ? error.issues.map((issue) => issue.message).join(", ")
      : error instanceof Error
        ? error.message
        : "Internal Server Error";

  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status },
  );
}
