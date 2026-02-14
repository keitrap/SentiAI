import { UserButton } from "@clerk/nextjs";
import { ShieldCheck, LayoutDashboard, History, Settings } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-800 bg-slate-950 px-4 py-8">
                <div className="flex items-center gap-2 px-2 text-xl font-bold tracking-tight text-white">
                    <ShieldCheck className="h-8 w-8 text-indigo-500" />
                    <span>SentinAI</span>
                </div>

                <nav className="mt-8 flex flex-col gap-2">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 rounded-md bg-indigo-500/10 px-3 py-2 text-sm font-medium text-indigo-400"
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Overview
                    </Link>
                    <Link
                        href="/dashboard/audits"
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-white"
                    >
                        <History className="h-4 w-4" />
                        Audit History
                    </Link>
                    <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-white"
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="pl-64">
                <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/50 px-8 backdrop-blur-sm">
                    <h1 className="text-lg font-semibold text-white">Dashboard</h1>
                    <UserButton afterSignOutUrl="/" />
                </header>

                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
