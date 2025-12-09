import { NextRequest, NextResponse } from "next/server";
import { spiritsMock } from "./_mocks";
import {
  spiritsListSchema,
  captureRequestSchema,
  captureResponseSchema,
} from "@/shared/models";
import { MOCK_ERROR_RATE, captureDelayMs } from "@/shared/config";
import { delay } from "@/shared/lib";

export async function GET() {
  const validatedSpirits = spiritsListSchema.parse(spiritsMock);

  return NextResponse.json(validatedSpirits, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validatedRequest = captureRequestSchema.parse(body);

  await delay(captureDelayMs);

  const spirit = spiritsMock.find((s) => s.id === validatedRequest.spiritId);

  if (!spirit) {
    return NextResponse.json({ error: "Spirit not found" }, { status: 404 });
  }

  if (Math.random() < MOCK_ERROR_RATE) {
    return NextResponse.json(
      { error: "Failed to capture spirit" },
      { status: 500 }
    );
  }

  const capturedSpirit = {
    ...spirit,
    status: "Captured" as const,
  };

  const response = captureResponseSchema.parse({
    success: true,
    spirit: capturedSpirit,
  });

  return NextResponse.json(response, { status: 200 });
}
