// app/api/documents/route.ts
import { documents , type Document  } from "@/lib/mockData";
import { NextResponse } from "next/server";



export async function GET() {
  return NextResponse.json(documents);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ validation ง่ายๆ
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "title and content required" },
        { status: 400 },
      );
    }

    const newDoc: Document = {
      id: Date.now().toString(),
      title: body.title,
      toOrg: body.toOrg ,
      content: body.content,
      status: "draft",
      createdAt: new Date().toISOString(),
    };

    documents.push(newDoc);

    return NextResponse.json(newDoc, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
}
