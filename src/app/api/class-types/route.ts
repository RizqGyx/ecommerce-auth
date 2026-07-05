import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const classTypes = await prisma.classType.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(classTypes);
}
