import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { auth } from '@/auth';

// GET - Fetch all students assigned to this teacher
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  const teacher = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
        students: {
            include: {
                entries: {
                    orderBy: { date: "desc" },
                    take: 6, // last 6 entries per student
                },
            },
        },
    },
  });

  if (!teacher || (teacher.role !== "TEACHER" && teacher.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  return NextResponse.json(teacher.students);
}

// POST - Assign a student to this teacher by name and email
export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
    }

    const teacher = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!teacher || (teacher.role !== "TEACHER" && teacher.role !== "ADMIN")) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { name, email } = await req.json();

    // Find student by email
    const student = await prisma.user.findUnique({
        where: { email },
    });

    if (!student) {
        return NextResponse.json(
            { error: `No account found for ${email}. Ask your student to sign up first!`},
            { status: 404 }
        );
    }

    // Check name matches (case insensitive)
    if (student.name?.toLowerCase() !== name.toLowerCase()) {
        return NextResponse.json(
            { error: "Name and email don't match. Please check with your student." },
            { status: 400 }
        );
    }

    // Check student isn't already assigned to another teacher
    if (student.teacherId && student.teacherId !== teacher.id) {
        return NextResponse.json(
            { error: "This student is already assigned to another teacher." },
            { status: 400 }
        );
    }

    // Assign student to teacher
    const updated = await prisma.user.update({
        where: { id: student.id },
        data: { teacherId: teacher.id},
    });

  return NextResponse.json({ sucess: true, student: updated });
}

// DELETE - Remove a student from this teacher
export async function DELETE(req: Request) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const { studentId } = await req.json();

    await prisma.user.update({
        where: { id: studentId },
        data: { teacherId: null },
    });

    return NextResponse.json({ success: true });
}