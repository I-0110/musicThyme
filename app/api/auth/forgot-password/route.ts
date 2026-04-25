import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { generateToken } from "@/app/lib/auth/tokens";
import { sendPasswordResetEmail } from "@/app/lib/auth/email";

export async function POST(req: Request) {
    const { email } = await req.json();

    // Always return success and never reveal if email exists
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
        const token = await generateToken(email, "PASSWORD_RESET");
        await sendPasswordResetEmail(email, token);
    }

    return NextResponse.json({
        sucess: true,
        message: "If an account exists for that email, a reset link has been sent.",
    });
}