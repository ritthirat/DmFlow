// app/api/documents/[id]/route.ts
import { documents } from "@/lib/mockData";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params; // 🔥 ต้อง await

  const doc = documents.find((d) => d.id === id);

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
  const docIndex = documents.findIndex((d) => d.id === id);

  if (docIndex === -1) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  documents.splice(docIndex, 1);
  return NextResponse.json({ message: "Document deleted" });
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const docIndex = documents.findIndex((d) => d.id === id);

  if (docIndex === -1) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  try {
    const body = await req.json();

    // ✅ validation ง่ายๆ
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "title and content required" },
        { status: 400 },
      );
    }
    documents[docIndex] = {
      ...documents[docIndex],
      title: body.title,
      content: body.content,
      toOrg: body.toOrg || documents[docIndex].toOrg,
      status: body.status || documents[docIndex].status,
    };

    return NextResponse.json(documents[docIndex]);
  } catch (error) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
}
