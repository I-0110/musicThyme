import Link from "next/link";
import MusicLogo from "../ui/music-logo";
import { Suspense } from "react";
import { Metadata } from "next";
import SignupForm from "../ui/signup-form";
import { Button } from "@/app/ui/buttons";

export const metadata: Metadata = {
    title: 'Signup',
    description: 'Practice makes perfect! Start your practice track here.'
}

export default function SignupPage() {
    return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mt-3 flex w-full max-w-md flex-col space-y-2.5 p-4 bg-thyme-150">
        <div className="flex h-20 w-full items-end rounded-lg bg-thyme-400 p-3 md:h-36">
          <div className="w-32 text-thyme-100 md:w-36">
            <Link href={"/"}>
              <MusicLogo />
            </Link>
          </div>
        </div>
        <Suspense>
            <SignupForm />
        </Suspense>
        <p className="text-center text-sm text-thyme-300 mt-4">
          Already have an account?
          <Button className="w-full">
            <Link href={"/login"}>
              Login here!
            </Link>
          </Button>
        </p>
      </div>
    </main>
    );
}   