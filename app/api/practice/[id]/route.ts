import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";

// PUT - Update an existing entry
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  const { id } = await params;
  const { date, ...rest } = await req.json();

  const entry = await prisma.practiceEntry.update({
    where: { id },
    data: {
      ...rest,
      date: new Date(date),
    }
  });

  return NextResponse.json(entry);
}

// DELETE - Remove an entry
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }
  const { id } = await params;
  await prisma.practiceEntry.delete({ where: { id } });
  return NextResponse.json({ success: true });
}