import { prisma } from "@/app/lib/prisma";
import crypto from "crypto";

export async function generateToken(
  email: string,
  type: "EMAIL_VERIFICATION" | "PASSWORD_RESET"
) {
  // Delete any existing tokens for this email + type
  await prisma.verificationRequest.deleteMany({
    where: { email, type },
  });

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(
    Date.now() + (type === "EMAIL_VERIFICATION" ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000)
    // 24 hours for email verification, 1 hour for password reset
  );

  await prisma.verificationRequest.create({
    data: { email, token, type, expires },
  });

  return token;
}

export async function validateToken(
  token: string,
  type: "EMAIL_VERIFICATION" | "PASSWORD_RESET"
) {
  const record = await prisma.verificationRequest.findUnique({
    where: { token },
  });

  if (!record) return { valid: false, error: "Invalid token" };
  if (record.type !== type) return { valid: false, error: "Invalid token" };
  if (record.expires < new Date()) return { valid: false, error: "Token expired" };

  return { valid: true, email: record.email };
}

export async function deleteToken(token: string) {
  await prisma.verificationRequest.delete({ where: { token } });
}