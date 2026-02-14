import AuditForm from "@/components/dashboard/audit-form";
import { ShieldCheck, AlertTriangle, CheckCircle } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-slate-400">Security Score</h3>
                        <ShieldCheck className="h-4 w-4 text-indigo-500" />
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-white">85</span>
                        <span className="text-xs text-emerald-500">+12% from last week</span>
                    </div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-slate-400">Critical Risks</h3>
                        <AlertTriangle className="h-4 w-4 text-rose-500" />
                    </div>
                    <div className="mt-2">
                        <span className="text-3xl font-bold text-white">3</span>
                    </div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-slate-400">Passed Checks</h3>
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="mt-2">
                        <span className="text-3xl font-bold text-white">124</span>
                    </div>
                </div>
            </div>

            {/* Audit Engine Interface */}
            <AuditForm />

        </div>
    );
}
