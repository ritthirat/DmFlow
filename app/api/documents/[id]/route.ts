// app/api/documents/[id]/route.ts
import { documents } from "@/lib/mockData";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const docId = Number(id);
  const doc = await prisma.document.findUnique({
    where: {
      id: docId, // replace second `id` with your actual ID variable
    },
  });
  if (Number.isNaN(doc)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }
  if (!doc) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json(doc);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const docId = Number(id);
  try {
    await prisma.document.delete({ where: { id: docId } });
    return NextResponse.json({ message: "deleted" });
  } catch (e) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  // const docIndex = documents.findIndex((d) => d.id === id);
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const docId = Number(id);
    const body = await req.json();
    const updatedDoc = await prisma.document.update({
      where: { id: docId },
      data: body,
    });
    if (updatedDoc) return NextResponse.json(updatedDoc);
  } catch (e) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
}
