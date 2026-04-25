"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
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
            setError("Password don't match!");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Step 1: Create the account
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

            // Step 2: Redirect to check email page instead of auto-login
            router.push("/verify-email");

            //  Step 3: Confirm session exists after login
            const session = await getSession();
            if (session) {
                window.location.href = "/practice";
            } else {
                setError("Login failed after signup");
                window.location.href = "/login";
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex-1 rounded-lg">
                    <h1 className="mb-3 text-2xl text-thyme-400">
                        Your first step to track your practice starts here!
                    </h1>
                    <div className="w-full">
                        <div className="relative mb-3">
                            <input 
                                placeholder="" 
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="peer w-full border rounded p-3 pt-5 focus:outline-none border-thyme-500"
                                required 
                            />
                            <label
                                htmlFor="Full Name"
                                className="absolute left-3 top-3 text-thyme-400 text-sm transition-all duration-200
                                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-thyme-400
                                peer-focus:top-1 peer-focus:text-xs peer-focus:text-thyme-500"
                            >
                                Full Name 
                            </label>
                        </div>
                        <div className="w-full">
                        <div className="relative mb-3">
                            <input
                                id="email"
                                type="email"
                                placeholder=" "
                                className="peer w-full border rounded p-3 pt-5 focus:outline-none border-thyme-500" onChange={e => setFormData({ ...formData, email: e.target.value })} 
                                required
                            />
                            <label
                                htmlFor="Email"
                                className="absolute left-3 top-3 text-thyme-400 text-sm transition-all duration-200
                                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-thyme-400
                                peer-focus:top-1 peer-focus:text-xs peer-focus:text-thyme-500"
                            >
                                Email 
                            </label>
                        </div>
                        <div className="relative gap-3">
                            <input
                                id="password"
                                type="password"
                                placeholder=" "
                                className="peer w-full border border-thyme-500 rounded p-3 pt-5 focus:outline-none"
                                minLength={8} 
                                onChange={e => setFormData({ ...formData, password: e.target.value })} 
                                required
                            />
                            <label
                                htmlFor="Password"
                                className="absolute left-3 top-3 text-thyme-400 text-sm transition-all duration-200
                                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-thyme-400
                                peer-focus:top-1 peer-focus:text-xs peer-focus:text-thyme-500"
                            >
                                Password (8 characters minimum)
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder=" "
                                className="peer w-full border border-thyme-500 rounded p-3 pt-5 focus:outline-none"
                                minLength={8} 
                                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} 
                                required
                            />
                            <label
                                htmlFor="Password"
                                className="absolute left-3 top-3 text-thyme-400 text-sm transition-all duration-200
                                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-thyme-400
                                peer-focus:top-1 peer-focus:text-xs peer-focus:text-thyme-500"
                            >
                                Confirm Password
                            </label>
                        </div>
                    </div>
                </div>
                {error && <p>{error}</p>}
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
        </>
    );
}