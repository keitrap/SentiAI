import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <main className="relative z-10 flex flex-col items-center text-center px-4">
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20 shadow-lg ring-1 ring-indigo-500/50">
          <ShieldCheck className="h-8 w-8 text-indigo-500" />
        </div>

        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          SentinAI
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          The Autonomous Cloud Compliance Auditor. <br />
          Describe your policy in plain English. Let AI verify your infrastructure.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="https://github.com"
            className="rounded-lg border border-slate-700 px-8 py-3.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            View Demo
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-8 text-sm text-slate-600">
        &copy; 2026 SentinAI Security. All rights reserved.
      </footer>
    </div>
  );
}
