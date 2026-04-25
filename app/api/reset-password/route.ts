import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { validateToken, deleteToken } from "@/app/lib/auth/tokens";

export async function POST(req: Request) {
    const { token, newPassword, confirmPassword } = await req.json();

    if (newPassword !== confirmPassword) {
        return NextResponse.json(
            { error: "Password don't match" },
            { status: 400 }
        );
    }

    if (newPassword.length < 8) {
        return NextResponse.json(
            { error: "Password must be at least 8 characters" },
            { status: 400 }
        );
    }

    const result = await validateToken(token, "PASSWORD_RESET");
    if (!result.valid) {
        return NextResponse.json(
            { error: result.error },
            { status: 400 }
        );
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
        where: { email: result.email },
        data: { password: hashed },
    });

    await deleteToken(token);

    return NextResponse.json({ success: true });
}