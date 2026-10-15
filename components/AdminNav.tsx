import Link from "next/link";
import { LayoutDashboard, ClipboardList, CalendarDays, Users, Palette, LogOut, ExternalLink } from "lucide-react";

const links = [
  ["/admin/dashboard", "Dashboard", LayoutDashboard],
  ["/admin/laporan", "Laporan", ClipboardList],
  ["/admin/proker", "Program Kerja", CalendarDays],
  ["/admin/divisi", "Divisi", Users],
  ["/admin/pengaturan/branding", "Branding", Palette]
] as const;

export default function AdminNav({ name }: { name: string }) {
  return <aside className="admin-sidebar"><Link href="/admin/dashboard" className="admin-brand"><span className="brand-mark">PK</span><span><b>PROKER</b><small>Admin Panel</small></span></Link>
    <div className="admin-welcome"><small>LOGIN SEBAGAI</small><strong>{name}</strong></div>
    <nav>{links.map(([href, label, Icon]) => <Link href={href} key={href}><Icon size={18}/>{label}</Link>)}</nav>
    <div className="sidebar-bottom"><Link href="/" target="_blank"><ExternalLink size={17}/> Lihat Website</Link><form action="/api/auth/logout" method="post"><button><LogOut size={17}/> Keluar</button></form></div>
  </aside>;
}
