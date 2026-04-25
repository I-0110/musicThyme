import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const { id } = await params;
    const { title, description, targetMins } = await req.json();

    const goal = await prisma.goal.update({
        where: { id },
        data: { title, description, targetMins },
    });

    return NextResponse.json(goal);
}

export async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ id:string }> }
) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.goal.delete({ where: { id } });
    return NextResponse.json({ success: true });
}