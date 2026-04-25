import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { validateToken, deleteToken } from "@/app/lib/auth/tokens";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const result = await validateToken(token, "EMAIL_VERIFICATION");

    if (!result.valid) {
        return NextResponse.redirect(
            new URL(`/verify-email?error=${result.error}`,
            process.env.NEXT_PUBLIC_APP_URL!)
        );
    }

    // Mark email as verified
    await prisma.user.update({
        where: { email: result.email },
        data: { emailVerified: new Date() },
    });

    // Delete used token 
    await deleteToken(token);

    return NextResponse.redirect(
        new URL("/verify-email?success=true",
        process.env.NEXT_PUBLIC_APP_URL!)
    );
}