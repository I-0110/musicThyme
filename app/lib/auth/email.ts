import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
  
  await resend.emails.send({
    from: "Music Thyme! <noreply@musicthyme.com>", 
    to: email,
    subject: "Verify your Music Diary account",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4f7c5a;">Welcome to Music Diary! 🎵</h1>
        <p>Please verify your email address by clicking the button below.</p>
        <a href="${url}" 
          style="display: inline-block; background: #4f7c5a; color: white; 
          padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 16px 0;">
          Verify my email
        </a>
        <p style="color: #999; font-size: 14px;">
          This link expires in 1 hour. If you didn't sign up, ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: "Music Thyme! <onboarding@resend.dev>",
    to: email,
    subject: "Reset your Music Thyme! password",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4f7c5a;">Reset your password 🔑</h1>
        <p>Someone requested a password reset for your account.</p>
        <a href="${url}"
          style="display: inline-block; background: #4f7c5a; color: white;
          padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 16px 0;">
          Reset my password
        </a>
        <p style="color: #999; font-size: 14px;">
          This link expires in 10 minutes. If you didn't request this, ignore this email.
        </p>
      </div>
    `,
  });
}