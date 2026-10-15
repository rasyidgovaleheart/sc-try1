import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
export const dynamic = "force-dynamic";
export default async function DashboardPage() {
  const [total,pending,approved,prokers,latest] = await Promise.all([
    prisma.report.count(), prisma.report.count({where:{status:"Menunggu"}}), prisma.report.count({where:{status:"Disetujui"}}), prisma.proker.count(),
    prisma.report.findMany({take:6,orderBy:{createdAt:"desc"},include:{division:true,proker:true}})
  ]);
  return <><div className="admin-page-header"><div><span className="eyebrow">OVERVIEW</span><h1>Dashboard</h1><p>Ringkasan laporan dan program kerja.</p></div><Link href="/admin/laporan" className="button primary">Lihat Laporan</Link></div><div className="stat-grid"><div className="stat-card"><span>Total Laporan</span><strong>{total}</strong><small>Semua laporan masuk</small></div><div className="stat-card"><span>Menunggu</span><strong>{pending}</strong><small>Perlu ditinjau</small></div><div className="stat-card"><span>Disetujui</span><strong>{approved}</strong><small>Laporan disetujui</small></div><div className="stat-card"><span>Program Kerja</span><strong>{prokers}</strong><small>Terdaftar di sistem</small></div></div><section className="admin-panel"><div className="panel-heading"><div><h2>Laporan terbaru</h2><p>Enam laporan yang terakhir dikirim.</p></div><Link href="/admin/laporan">Lihat semua →</Link></div><div className="table-wrap"><table><thead><tr><th>Judul</th><th>Pelapor</th><th>Divisi</th><th>Tanggal masuk</th><th>Status</th></tr></thead><tbody>{latest.map(r=><tr key={r.id}><td><Link href={`/admin/laporan/${r.id}`} className="table-link">{r.title}</Link></td><td>{r.reporterName}</td><td>{r.division?.name || "—"}</td><td>{formatDate(r.createdAt)}</td><td><span className={`status status-${r.status.toLowerCase().replace(/\s/g,"-")}`}>{r.status}</span></td></tr>)}{latest.length===0&&<tr><td colSpan={5} className="empty-cell">Belum ada laporan.</td></tr>}</tbody></table></div></section></>;
}
