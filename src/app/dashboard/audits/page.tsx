"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
import { Loader2, Calendar, ShieldAlert, CheckCircle } from "lucide-react";

export default function AuditHistoryPage() {
    const { user } = useUser();
    const [audits, setAudits] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAudits() {
            if (!user) return;

            const { data, error } = await supabase
                .from("audits")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching audits:", error);
            } else {
                setAudits(data || []);
            }
            setLoading(false);
        }

        fetchAudits();
    }, [user]);

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Audit History</h2>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                    Total: {audits.length}
                </span>
            </div>

            <div className="grid gap-4">
                {audits.length === 0 ? (
                    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400">
                        No audits found. Run your first audit from the dashboard!
                    </div>
                ) : (
                    audits.map((audit) => (
                        <div
                            key={audit.id}
                            className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-indigo-500/30 hover:bg-slate-900/80"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-white">{audit.policy_input}</h3>
                                    </div>
                                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(audit.created_at).toLocaleDateString()}
                                        </div>
                                        <div>Provider: {audit.provider}</div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${audit.risk_score < 70 ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500"
                                        }`}>
                                        {audit.risk_score < 70 ? <ShieldAlert className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                                        Score: {audit.risk_score}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
