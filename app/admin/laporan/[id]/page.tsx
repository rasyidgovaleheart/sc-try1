import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import ReportStatusForm from "./ReportStatusForm";
export const dynamic="force-dynamic";
export default async function ReportDetailPage({params}:{params:Promise<{id:string}>}) {
 const {id}=await params; const r=await prisma.report.findUnique({where:{id},include:{files:true,division:true,proker:true}});
 if(!r) notFound();
 return <><div className="admin-page-header"><div><Link href="/admin/laporan" className="back-link">← Kembali ke laporan</Link><span className="eyebrow">DETAIL LAPORAN</span><h1>{r.title}</h1><p>Dikirim {formatDate(r.createdAt)}</p></div></div><div className="detail-grid"><section className="admin-panel detail-content"><h2>Informasi kegiatan</h2><dl className="detail-list"><dt>Nama pelapor</dt><dd>{r.reporterName}</dd><dt>Email</dt><dd>{r.reporterEmail||"—"}</dd><dt>Program kerja</dt><dd>{r.proker?.name||"—"}</dd><dt>Divisi</dt><dd>{r.division?.name||"—"}</dd><dt>Tanggal kegiatan</dt><dd>{r.eventDate?formatDate(r.eventDate):"—"}</dd><dt>Deskripsi</dt><dd className="preserve-lines">{r.description}</dd></dl><h2>Dokumentasi ({r.files.length})</h2><div className="evidence-grid">{r.files.map(f=><a href={f.url} target="_blank" rel="noreferrer" key={f.id} className="evidence-item">{f.mimeType.startsWith("image/")?<img src={f.url} alt={f.filename}/>:<video src={f.url} controls/>}<span>{f.filename}</span></a>)}{r.files.length===0&&<p>Belum ada dokumentasi.</p>}</div></section><aside className="admin-panel"><h2>Status laporan</h2><ReportStatusForm id={r.id} status={r.status} notes={r.adminNotes||""}/></aside></div></>;
}
