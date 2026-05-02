"use client"

import { useState } from "react";

type Props = {
    onAdd: (name: string, email: string) => Promise<void>;
};

export default function AddStudentForm({ onAdd }: Props) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await onAdd(form.name, form.email);
      setForm({ name: "", email: "" });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-thyme-100 rounded-lg p-6 relative">
      <h2 className="text-xl font-bold text-thyme-500 mb-4">Add student</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder=" "
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="peer w-full border border-gray-300 rounded p-3 pt-5
              focus:outline-none focus:border-thyme-500"
            required
          />
          <label className="absolute left-3 top-1 text-xs text-thyme-400 bg-thyme-100
            pointer-events-none transition-all duration-200
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
            peer-focus:top-1 peer-focus:text-xs">
            Student name
          </label>
        </div>
        <div className="relative">
          <input
            type="email"
            placeholder=" "
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="peer w-full border border-gray-300 rounded p-3 pt-5
              focus:outline-none focus:border-thyme-500"
            required
          />
          <label className="absolute left-3 top-1 text-xs text-thyme-400 bg-thyme-100
            pointer-events-none transition-all duration-200
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
            peer-focus:top-1 peer-focus:text-xs">
            Student email
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-thyme-500 text-white py-2 rounded
            disabled:opacity-50 hover:bg-thyme-300"
        >
          {loading ? "Adding..." : "Add to my class"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">Student added! ✓</p>}
      </form>
    </div>
  );
}