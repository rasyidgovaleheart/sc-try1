import { requireAdmin } from "@/lib/auth";
import AdminNav from "@/components/AdminNav";
export default async function AdminShell({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return <div className="admin-layout"><AdminNav name={admin.name}/><main className="admin-main">{children}</main></div>;
}
