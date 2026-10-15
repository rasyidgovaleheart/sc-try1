import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ReportForm from "@/components/ReportForm";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export default async function LaporPage() {
  const [prokers, divisions] = await Promise.all([
    prisma.proker.findMany({ where: { status: "Aktif" }, select: { id: true, name: true }, orderBy: { name: "asc" } }),
    prisma.division.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } })
  ]);
  return <><SiteHeader/><main className="page-main container"><div className="page-heading"><span className="eyebrow">FORMULIR PELAPORAN</span><h1>Kirim laporan kegiatan</h1><p>Lengkapi informasi di bawah ini agar laporan dapat ditinjau dengan baik.</p></div><ReportForm prokers={prokers} divisions={divisions}/></main><SiteFooter/></>;
}
