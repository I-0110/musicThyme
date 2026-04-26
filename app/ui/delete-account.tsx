"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/user/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Sign out and redirect after deletion
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 border-t border-red-100 pt-6">
      <h3 className="text-sm font-medium text-red-500 mb-1">Danger zone</h3>
      <p className="text-xs text-thyme-300 mb-3">
        Permanently delete your account and all practice data. This cannot be undone.
      </p>

      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="text-sm text-red-500 border border-red-300 px-4 py-2 rounded hover:bg-red-50"
        >
          Delete my account
        </button>
      ) : (
        <form onSubmit={handleDelete} className="space-y-3 bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-600 font-medium">
            Are you sure? This will delete all your practice logs and goals permanently.
          </p>
          <div className="relative">
            <input
              type="password"
              placeholder=" "
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="peer w-full border border-red-300 rounded p-3 pt-5
                focus:outline-none focus:border-red-500"
              required
            />
            <label className="absolute left-3 top-1 text-xs text-red-400
              pointer-events-none transition-all duration-200
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
              peer-focus:top-1 peer-focus:text-xs">
              Confirm your password
            </label>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-red-500 text-white py-2 rounded disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Yes, delete everything"}
            </button>
            <button
              type="button"
              onClick={() => { setOpen(false); setError(null); }}
              className="flex-1 border border-gray-300 text-gray-500 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}