import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SiteHeader() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  return <header className="site-header"><Link href="/" className="brand">
    {settings?.headerLogoUrl ? <img src={settings.headerLogoUrl} alt="Logo" className="brand-logo" /> : <span className="brand-mark">PK</span>}
    <span>{settings?.siteName || "Laporan Program Kerja"}</span>
  </Link><nav><Link href="/">Beranda</Link><Link href="/lapor" className="nav-cta">Buat Laporan</Link></nav></header>;
}
