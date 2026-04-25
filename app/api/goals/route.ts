import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";

// GET - fetch goals for a specific student
export async function GET(req: Request) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

    const goals = await prisma.goal.findMany({
        where: { studentId: studentId ?? undefined },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(goals);
}

// POST - Create a new goal for a student
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

    const body = await req.json();
    const { studentId, studentIds, title, description, targetMins } = body;

    // Assigning goals to multiple students
    if (studentIds && Array.isArray(studentIds)) {
        const result = await prisma.goal.createMany({
            data: studentIds.map((id: string) => ({
                teacherId: teacher.id,
                studentId: id,
                title,
                description,
                targetMins,
            })),
        });

        return NextResponse.json({ count: result.count });
    }

    // Assigning goal to one student at the time
    if (studentId) {
        const goal = await prisma.goal.create({
            data: {
                teacherId: teacher.id,
                studentId,
                title,
                description,
                targetMins,
            },
        });

        return NextResponse.json(goal);
    }

    // Goals without a student?
    return NextResponse.json(
        { error: "Selecting student(s) is required" },
        { status: 400 }
    );
 }