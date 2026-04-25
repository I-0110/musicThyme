"use client";

import { ExclamationTriangleIcon, InboxArrowDownIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import Link  from "next/link";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const error = searchParams.get("error");

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-thyme-100 rounded-lg p-8 text-center">
        {success ? (
          <>
            <MusicalNoteIcon className="w-4 h-4" />
            <h1 className="text-2xl font-bold text-thyme-500 mb-2">
              Email verified!
            </h1>
            <p className="text-thyme-300 mb-6">
              Your account is ready. You can now log in.
            </p>
            <Link
              href="/login"
              className="bg-thyme-500 text-white px-6 py-2 rounded hover:bg-thyme-600"
            >
              Go to login
            </Link>
          </>
        ) : error ? (
          <>
            <ExclamationTriangleIcon className="w-4 h-4" />
            <h1 className="text-2xl font-bold text-thyme-500 mb-2">
              Link expired
            </h1>
            <p className="text-thyme-300 mb-6">
              This verification link has expired or already been used.
              Sign up again to get a new one.
            </p>
            <Link
              href="/signup"
              className="bg-thyme-500 text-white px-6 py-2 rounded hover:bg-thyme-600"
            >
              Back to signup
            </Link>
          </>
        ) : (
          <>
            <InboxArrowDownIcon className="w-4 h-4" />
            <h1 className="text-2xl font-bold text-thyme-500 mb-2">
              Check your email!
            </h1>
            <p className="text-thyme-300">
              We sent a verification link to your email address.
              Click it to activate your account.
            </p>
            <p className="text-thyme-300 text-sm mt-4">
              Didn&apos;t get it? Check your spam folder.
            </p>
          </>
        )}
      </div>
    </main>
  );
}