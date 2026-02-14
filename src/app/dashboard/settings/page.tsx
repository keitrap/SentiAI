import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Settings</h2>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                <h3 className="mb-4 text-lg font-medium text-white">Account Management</h3>
                <UserProfile
                    appearance={{
                        elements: {
                            rootBox: "w-full",
                            card: "bg-transparent shadow-none w-full",
                            navbar: "hidden",
                            headerTitle: "hidden",
                            headerSubtitle: "hidden",
                            viewSectionTitle: "text-white",
                            userPreviewMainIdentifier: "text-white",
                            userPreviewSecondaryIdentifier: "text-slate-400",
                        }
                    }}
                />
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 opacity-50">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-white">Cloud Provider Configuration</h3>
                        <p className="text-sm text-slate-400">Manage AWS/Azure credentials (Coming Soon)</p>
                    </div>
                    <button disabled className="rounded-lg bg-slate-700 px-4 py-2 text-sm text-slate-300">
                        Configure
                    </button>
                </div>
            </div>
        </div>
    );
}
