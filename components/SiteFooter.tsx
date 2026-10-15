import { prisma } from "@/lib/prisma";
export default async function SiteFooter() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  return <footer className="site-footer">
    {settings?.footerLogoUrl && <img src={settings.footerLogoUrl} alt="Logo footer" className="footer-logo" />}
    <span>{settings?.siteName || "Laporan Program Kerja"}</span><span>{settings?.siteDescription || "Portal pelaporan program kerja."}</span>
  </footer>;
}
