import { redirect } from "next/navigation";
import { currentAdmin } from "@/lib/auth";
import LoginForm from "./LoginForm";
export default async function LoginPage() {
  if (await currentAdmin()) redirect("/admin/dashboard");
  return <main className="login-page"><div className="login-card"><a className="admin-brand login-brand" href="/"><span className="brand-mark">PK</span><span><b>PROKER</b><small>Admin Panel</small></span></a><span className="eyebrow">AREA ADMINISTRATOR</span><h1>Masuk ke dashboard</h1><p>Gunakan akun administrator untuk melanjutkan.</p><LoginForm/></div></main>;
}
