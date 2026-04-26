"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { Button } from "./buttons";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      router.push("/verify-email"); // ← just redirect, nothing else needed
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg">
        <h1 className="mb-3 text-2xl text-thyme-400">
          Your first step to track your practice starts here!
        </h1>

        {/* Name */}
        <div className="relative mb-3">
          <input
            id="name"
            type="text"
            placeholder=" "
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="peer w-full border rounded p-3 pt-5 focus:outline-none border-thyme-500"
            required
          />
          <label htmlFor="name" className="absolute left-3 top-1 text-xs text-thyme-400
            pointer-events-none transition-all duration-200
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
            peer-focus:top-1 peer-focus:text-xs peer-focus:text-thyme-500">
            Full Name
          </label>
        </div>

        {/* Email */}
        <div className="relative mb-3">
          <input
            id="email"
            type="email"
            placeholder=" "
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="peer w-full border rounded p-3 pt-5 focus:outline-none border-thyme-500"
            required
          />
          <label htmlFor="email" className="absolute left-3 top-1 text-xs text-thyme-400
            pointer-events-none transition-all duration-200
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
            peer-focus:top-1 peer-focus:text-xs peer-focus:text-thyme-500">
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative mb-3">
          <input
            id="password"
            type="password"
            placeholder=" "
            minLength={8}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            className="peer w-full border border-thyme-500 rounded p-3 pt-5 focus:outline-none"
            required
          />
          <label htmlFor="password" className="absolute left-3 top-1 text-xs text-thyme-400
            pointer-events-none transition-all duration-200
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
            peer-focus:top-1 peer-focus:text-xs peer-focus:text-thyme-500">
            Password (8 characters minimum)
          </label>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-3">
          <input
            id="confirmPassword"
            type="password"
            placeholder=" "
            minLength={8}
            onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="peer w-full border border-thyme-500 rounded p-3 pt-5 focus:outline-none"
            required
          />
          <label htmlFor="confirmPassword" className="absolute left-3 top-1 text-xs text-thyme-400
            pointer-events-none transition-all duration-200
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
            peer-focus:top-1 peer-focus:text-xs peer-focus:text-thyme-500">
            Confirm Password
          </label>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="mt-4 w-full"
        >
          {loading ? "Creating account..." : "Create account"}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-thyme-100" />
        </Button>
      </div>
    </form>
  );
}