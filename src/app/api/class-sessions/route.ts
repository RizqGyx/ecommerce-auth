import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classTypeSlug = searchParams.get("classType");

  const sessions = await prisma.classSession.findMany({
    where: classTypeSlug ? { classType: { slug: classTypeSlug } } : undefined,
    include: { classType: true, coach: true },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
  });

  return NextResponse.json(sessions);
}
