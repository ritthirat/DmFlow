// app/api/documents/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/app/lib/session";

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const docs = await prisma.document.findMany();
  return NextResponse.json(docs);
}

export async function POST(req: Request) {
  try {
    if (!(await getSession())) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!body.title || !body.content) {
      return NextResponse.json({ error: "title and content required" }, { status: 400 });
    }

    const newDoc = await prisma.document.create({
      data: {
        title: body.title,
        toOrg: body.toOrg ?? null,
        content: body.content,
        status: body.status ?? "draft",
      },
    });

    return NextResponse.json(newDoc, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
}
