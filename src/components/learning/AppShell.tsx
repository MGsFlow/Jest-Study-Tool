import { Sidebar } from "@/components/learning/Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-slate-50">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
