"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-thyme-100 rounded-lg p-8 text-center">
          <ExclamationTriangleIcon className="w-4 h-4" />
          <h1 className="text-2xl font-bold text-thyme-500 mb-2">
            Invalid link
          </h1>
          <p className="text-thyme-300 mb-6">
            This reset link is invalid. Please request a new one.
          </p>
          <a href="/forgot-password"
            className="bg-thyme-500 text-white px-6 py-2 rounded">
            Request new link
          </a>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-thyme-100 rounded-lg p-8">
        <h1 className="text-2xl font-bold text-thyme-500 mb-6">
          Reset password
        </h1>
        {success ? (
          <p className="text-green-500">
            Password updated! Redirecting to login...
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                placeholder=" "
                value={form.newPassword}
                onChange={e => setForm({ ...form, newPassword: e.target.value })}
                className="peer w-full border border-gray-300 rounded p-3 pt-5
                  focus:outline-none focus:border-thyme-500"
                minLength={8}
                required
              />
              <label className="absolute left-3 top-1 text-xs text-thyme-400
                pointer-events-none transition-all duration-200
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                peer-focus:top-1 peer-focus:text-xs">
                New password
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder=" "
                value={form.confirmPassword}
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                className="peer w-full border border-gray-300 rounded p-3 pt-5
                  focus:outline-none focus:border-thyme-500"
                required
              />
              <label className="absolute left-3 top-1 text-xs text-thyme-400
                pointer-events-none transition-all duration-200
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                peer-focus:top-1 peer-focus:text-xs">
                Confirm new password
              </label>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-thyme-500 text-white py-2 rounded disabled:opacity-50"
            >
              {loading ? "Updating..." : "Reset password"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}