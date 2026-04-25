import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "@/app/lib/auth/tokens";
import { sendVerificationEmail } from "@/app/lib/auth/email";

export async function POST(req: Request) {
  try {
    const { name, email, password, confirmPassword } = await req.json();

    // Check passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords don't match" },
        { status: 400 }
      );
    }

    // Check password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      if (!existing.emailVerified) {
        // Resend verification email
        const token = await generateToken(email, "EMAIL_VERIFICATION");
        await sendVerificationEmail(email, token);
        return NextResponse.json(
          { error: "Account exists but not verified. Check your email for a new verification link. Token expires in an hour!" },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);

    // Create unverified account
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        emailVerified: null, // not verified yet
      },
    });

    // Send verification email
    const token = await generateToken(email, "EMAIL_VERIFICATION");
    await sendVerificationEmail(email, token);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}