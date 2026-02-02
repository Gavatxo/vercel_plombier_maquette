import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import { SessionProvider } from "next-auth/react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Si pas de session et pas sur la page login, rediriger
  if (!session?.user) {
    // Le middleware gère la redirection, mais on double-check ici
    return (
      <SessionProvider>
        {children}
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </SessionProvider>
  );
}
