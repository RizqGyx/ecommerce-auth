import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const classType = await prisma.classType.findUnique({ where: { slug } });

  if (!classType) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(classType);
}
