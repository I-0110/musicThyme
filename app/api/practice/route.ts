import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { auth } from '@/auth';

// GET - Fetch this student's entries 
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      entries: {
        orderBy: { date: "desc" },
      },
    },
  });

  return NextResponse.json(user?.entries ?? []);
}

// POST - Save a new practice entry
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const { instrument, scales, study, piece, solos, notes, startTime, endTime } =
    await req.json();

  const entry = await prisma.practiceEntry.create({
    data: {
      userId: user.id,
      instrument,
      scales,
      study,
      piece,
      solos,
      notes,
      startTime,
      endTime,
    },
  });

  return NextResponse.json(entry);
}