"use client";

import { useState } from "react";
import { Send, Loader2, AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";

export default function AuditForm() {
    const { user } = useUser();
    const [policy, setPolicy] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleAudit = async () => {
        if (!policy.trim()) return;

        setLoading(true);
        setResult(null);

        try {
            // 1. Run Audit via Python Backend
            const res = await fetch("/api/py/audit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ policy, cloud_provider: "mock" }),
            });
            const data = await res.json();
            setResult(data);

            // 2. Save to Supabase (History)
            if (user && data) {
                // We interact with Supabase client-side here.
                // Ensure RLS policies allow authenticated inserts.
                await supabase.from("audits").insert({
                    user_id: user.id,
                    policy_input: policy,
                    risk_score: data.risk_score,
                    findings: data.findings,
                    provider: "mock"
                });
            }

        } catch (error) {
            console.error("Audit failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-8 transition-all duration-500 hover:border-indigo-500/40">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white">Start New Autonomous Audit</h2>
                    <p className="text-slate-400">Describe your compliance policy in plain English to begin.</p>
                </div>

                <div className="flex gap-4">
                    <input
                        type="text"
                        value={policy}
                        onChange={(e) => setPolicy(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAudit()}
                        placeholder="e.g., 'Ensure all databases are encrypted and no S3 buckets are public'"
                        className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                        disabled={loading}
                    />
                    <button
                        onClick={handleAudit}
                        disabled={loading || !policy.trim()}
                        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                        {loading ? "Auditing..." : "Start Audit"}
                    </button>
                </div>
            </div>

            {result && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Audit Results</h3>
                        <div className="flex items-center gap-2 rounded-full bg-slate-800 px-4 py-1 text-sm text-slate-300">
                            <span>Risk Score:</span>
                            <span className={`font-bold ${result.risk_score < 70 ? 'text-rose-500' : 'text-emerald-500'}`}>
                                {result.risk_score}/100
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {result.findings.length === 0 ? (
                            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-emerald-400 flex items-center gap-3">
                                <CheckCircle className="h-5 w-5" />
                                <span>No violations found for this policy.</span>
                            </div>
                        ) : (
                            result.findings.map((finding: any, idx: number) => (
                                <div key={idx} className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-4">
                                    <div className="flex items-start gap-3">
                                        <ShieldAlert className="h-5 w-5 text-rose-500 mt-0.5" />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-medium text-rose-400">{finding.id}</h4>
                                                <span className="rounded px-1.5 py-0.5 text-[10px] uppercase font-bold bg-rose-500/20 text-rose-400">
                                                    {finding.severity}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-slate-300">{finding.message}</p>
                                            <p className="mt-2 text-xs font-mono text-slate-500">Resource: {finding.resource}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
