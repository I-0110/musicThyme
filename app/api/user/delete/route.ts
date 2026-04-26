import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export async function DELETE(req: Request) {
    const session = await auth();
    if (!session.user?.email) {
        return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const { password } = await req.json();

    // Require password confirmatino before deleting
    const user = await prisma.user.findUnique({
        where: { email: session?.user.email },
    });

    if (!user || !user.password) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    // Delete everything related to the user
    await prisma.practiceEntry.deleteMany({ where: { userId: user.id } });
    await prisma.goal.deleteMany({ where: { studentId: user.id } });
    await prisma.goal.deleteMany({ where: {teacherId: user.id} });
    await prisma.verificationRequest.deleteMany({ where: { email: user.email } });
    await prisma.session.deleteMany({ where: { userId: user.id } });
    await prisma.account.deleteMany({ where: { userId: user.id } });
    await prisma.user.delete({ where: { id: user.id } });

    return NextResponse.json({ success: true });
}

