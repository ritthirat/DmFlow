import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/app/lib/session";

const parseDocumentId = async (context: {
  params: Promise<{ id: string }>;
}): Promise<number | null> => {
  const { id } = await context.params;
  const docId = Number(id);

  return Number.isInteger(docId) && docId > 0 ? docId : null;
};

const isPrismaNotFoundError = (error: unknown): boolean => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2025"
  );
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const docId = await parseDocumentId(context);

  if (docId === null) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }

  try {
    const document = await prisma.document.findUnique({
      where: { id: docId },
    });

    if (!document) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    return NextResponse.json(document);
  } catch {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const docId = await parseDocumentId(context);

  if (docId === null) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }

  try {
    await prisma.document.delete({
      where: { id: docId },
    });

    return NextResponse.json({ message: "deleted" });
  } catch (error) {
    if (isPrismaNotFoundError(error)) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const docId = await parseDocumentId(context);

  if (docId === null) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }

  try {
    const body = await req.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "invalid body" }, { status: 400 });
    }

    const { id: _ignoredId, ...safeBody } = body;

    const updatedDocument = await prisma.document.update({
      where: { id: docId },
      data: safeBody,
    });

    return NextResponse.json(updatedDocument);
  } catch (error) {
    if (isPrismaNotFoundError(error)) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "invalid json" }, { status: 400 });
    }

    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}