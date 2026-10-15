import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileText, ShieldCheck } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const [settings, prokerCount, divisionCount] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "main" } }),
    prisma.proker.count(),
    prisma.division.count()
  ]);
  return <><SiteHeader/><main>
    <section className="hero container"><div className="hero-copy"><span className="eyebrow">PORTAL ORGANISASI</span><h1>{settings?.siteName || "Laporan Program Kerja"}</h1><p>{settings?.siteDescription || "Sampaikan laporan pelaksanaan program kerja secara rapi, terstruktur, dan mudah ditinjau."}</p><div className="hero-actions"><Link href="/lapor" className="button primary">Buat Laporan <ArrowRight size={18}/></Link><a href="#alur" className="button secondary">Pelajari Alur</a></div><div className="hero-note"><ShieldCheck size={17}/> Laporan akan ditinjau oleh administrator.</div></div><div className="hero-visual"><div className="visual-top"><span className="dot"/><span className="dot"/><span className="dot"/><span className="visual-title">Ringkasan Program</span></div><div className="visual-icon"><ClipboardCheck size={42}/></div><h3>Pelaporan lebih terstruktur</h3><p>Dokumentasi kegiatan tersimpan dalam satu portal.</p><div className="visual-stats"><div><strong>{prokerCount}</strong><small>Program Kerja</small></div><div><strong>{divisionCount}</strong><small>Divisi</small></div></div><div className="visual-line"/></div></section>
    <section className="feature-section"><div className="container"><div className="section-heading"><span className="eyebrow">MUDAH DAN TERATUR</span><h2>Semua laporan dalam satu tempat</h2><p>Mulai dari pengiriman laporan hingga peninjauan oleh admin.</p></div><div className="feature-grid"><article className="feature-card"><span className="feature-icon"><FileText/></span><h3>Formulir sederhana</h3><p>Isi informasi kegiatan, pilih program kerja, dan tambahkan dokumentasi.</p></article><article className="feature-card"><span className="feature-icon"><ClipboardCheck/></span><h3>Data terorganisasi</h3><p>Setiap laporan tersimpan dan dapat dikelola melalui panel admin.</p></article><article className="feature-card"><span className="feature-icon"><ShieldCheck/></span><h3>Peninjauan admin</h3><p>Status laporan diperbarui oleh administrator setelah ditinjau.</p></article></div></div></section>
    <section className="steps-section container" id="alur"><div className="section-heading"><span className="eyebrow">CARA KERJA</span><h2>Empat langkah pelaporan</h2></div><div className="steps-grid">{["Buka formulir laporan","Isi detail kegiatan","Unggah dokumentasi","Kirim untuk ditinjau"].map((s,i)=><div className="step" key={s}><span>{String(i+1).padStart(2,"0")}</span><p>{s}</p></div>)}</div><div className="bottom-cta"><div><h2>Siap mengirim laporan?</h2><p>Pastikan informasi yang dikirim sudah benar.</p></div><Link href="/lapor" className="button light">Mulai Melapor <ArrowRight size={18}/></Link></div></section>
  </main><SiteFooter/></>;
}
