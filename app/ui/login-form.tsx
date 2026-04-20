"use client";

import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/buttons";

export default function LoginForm() {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error");

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(urlError ? "Invalid email or password" : "");

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await signIn("credentials", {
        ...form,
        redirect: false,
        });

        const session = await getSession();

        if (!session) {
        setError("Invalid email or password");
        } else {
        window.location.href = "/practice";
        }
    } catch {
        setError("Invalid email or password");
        window.location.href = "/login?error=1";
    }};

    return (
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex-1 rounded-lg">
                    <h1 className="mb-3 text-2xl text-thyme-400">
                        Your first step to track your practice starts here!
                    </h1>
                    <div className="w-full">
                        <div className="relative mb-3">
                            <input
                                id="email"
                                type="email"
                                placeholder=""
                                className="peer w-full border rounded p-3 pt-5 focus:outline-none border-thyme-500"
                                onChange={e => setForm({ ...form, email: e.target.value })}
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
                                placeholder=""
                                className="peer w-full border border-thyme-500 rounded p-3 pt-5 focus:outline-none"
                                onChange={e => setForm({ ...form, password: e.target.value })}
                            />
                            <label
                                htmlFor="Password"
                                className="absolute left-3 top-3 text-thyme-400 text-sm transition-all duration-200
                                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-thyme-400
                                peer-focus:top-1 peer-focus:text-xs peer-focus:text-thyme-500"
                            >
                                Password
                            </label>
                        </div>
                    </div>
                </div>
                {error && <p>{error}</p>}
                <Button 
                    type="submit"
                    className="mt-4 w-full"
                >
                    Login
                    <ArrowRightIcon className="ml-auto h-5 w-5 text-thyme-100" />
                </Button>
            </form>
    );
}   