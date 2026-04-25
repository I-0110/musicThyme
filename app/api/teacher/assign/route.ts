import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";

// POST - Assign student to teacher by name and email
export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const teacher = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!teacher || (teacher.role !== "TEACHER" && teacher.role !== "ADMIN")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { name, email } = await req.json();

    if (!name || !email) {
        return NextResponse.json(
            { error: "Name and email are required" },
            { status: 400 }
        );
    }

    // Find student by email
    const student = await prisma.user.findUnique({
        where: { email },
    });

    if (!student) {
        return NextResponse.json(
            { error: `No account found for ${email}. Ask your student to sign up first.` },
        );
    }

    // Check name matches (case insensitive)
    if (student.name?.toLowerCase() !== name.toLowerCase()) {
        return NextResponse.json(
            { error: "Name and email don't match. Please check spelling with your student's name and email." },
            { status: 400 }
        );
    }

    // Already assigned to another teacher
    if (student.teacherId && student.teacherId !== teacher.id) {
        return NextResponse.json(
            { error: "This student is already assigned to another teacher."},
            { status: 400 }
        );
    }

    // Assign student to teacher
    const updated = await prisma.user.update({
        where: { id: student.id },
        data: { teacherId: teacher.id },
    });

    return NextResponse.json({
        sucess: true,
        student: {
            id: updated.id,
            name: updated.name,
            email: updated.email,
        },
    });
}

// DELETE - Unlink student from teacher
export async function DELETE(req: Request) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const teacher = await prisma.user.findUnique({ 
        where: { email: session.user.email },
    });

    if (!teacher || (teacher.role !== "TEACHER" && teacher.role !== "ADMIN")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { studentId } = await req.json();

    // Make sure student belongs to this teacher
    const student = await prisma.user.findUnique({
        where: { id: studentId },
    });

    if (!student || student.teacherId !== teacher.id) {
        return NextResponse.json(
            { error: "Student not found in your class." },
            { status: 404 }
        );
    }

    await prisma.user.update({
        where: { id: studentId },
        data: { teacherId: null },
    });

    return NextResponse.json({ sucess: true });
}