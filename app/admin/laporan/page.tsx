import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
export const dynamic = "force-dynamic";
export default async function ReportsPage({searchParams}:{searchParams:Promise<{status?:string}>}) {
  const sp=await searchParams; const status=sp.status;
  const reports=await prisma.report.findMany({where:status?{status}:undefined,orderBy:{createdAt:"desc"},include:{division:true,proker:true}});
  return <><div className="admin-page-header"><div><span className="eyebrow">MANAJEMEN DATA</span><h1>Laporan</h1><p>Tinjau laporan dan perbarui statusnya.</p></div></div><div className="filter-row"><Link href="/admin/laporan" className={!status?"filter active":"filter"}>Semua</Link>{["Menunggu","Diproses","Disetujui","Ditolak"].map(s=><Link key={s} href={`/admin/laporan?status=${encodeURIComponent(s)}`} className={status===s?"filter active":"filter"}>{s}</Link>)}</div><section className="admin-panel"><div className="table-wrap"><table><thead><tr><th>Judul laporan</th><th>Pelapor</th><th>Program kerja</th><th>Divisi</th><th>Tanggal masuk</th><th>Status</th></tr></thead><tbody>{reports.map(r=><tr key={r.id}><td><Link href={`/admin/laporan/${r.id}`} className="table-link">{r.title}</Link></td><td>{r.reporterName}</td><td>{r.proker?.name||"—"}</td><td>{r.division?.name||"—"}</td><td>{formatDate(r.createdAt)}</td><td><span className={`status status-${r.status.toLowerCase().replace(/\s/g,"-")}`}>{r.status}</span></td></tr>)}{reports.length===0&&<tr><td colSpan={6} className="empty-cell">Tidak ada laporan untuk filter ini.</td></tr>}</tbody></table></div></section></>;
}
