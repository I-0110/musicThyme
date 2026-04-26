"use client";

// TODO: Delete this line and create a new file on ui folders to import here
export const dynamic = "force-dynamic";

import { InboxArrowDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    // Always show success — never reveal if email exists
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-thyme-100 rounded-lg p-8">
        {submitted ? (
          <div className="text-center">
            <InboxArrowDownIcon className="w-4 h-4" />
            <h1 className="text-2xl font-bold text-thyme-500 mb-2">
              Check your email
            </h1>
            <p className="text-thyme-300">
              If an account exists for that email, we sent a reset link.
              It expires in 1 hour!
            </p>
            <p className="text-thyme-300 text-sm mt-4">
              Didn&apos;t get it? Check your spam folder.
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-thyme-500 mb-2">
              Forgot password?
            </h1>
            <p className="text-thyme-300 text-sm mb-6">
              Enter your email and we&apos;ll send you a reset link.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="peer w-full border border-gray-300 rounded p-3 pt-5
                    focus:outline-none focus:border-thyme-500"
                  required
                />
                <label className="absolute left-3 top-1 text-xs text-thyme-400
                  pointer-events-none transition-all duration-200
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                  peer-focus:top-1 peer-focus:text-xs">
                  Email address
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-thyme-500 text-white py-2 rounded disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>
            <p className="text-center text-sm text-thyme-300 mt-4">
              Remember it?{" "}
              <a href="/login" className="text-thyme-500 hover:underline">
                Back to login
              </a>
            </p>
          </>
        )}
      </div>
    </main>
  );
}