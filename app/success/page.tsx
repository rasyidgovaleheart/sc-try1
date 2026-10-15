import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CheckCircle2, ArrowRight } from "lucide-react";
export default function SuccessPage() {
  return <><SiteHeader/><main className="success-page container"><span className="success-icon"><CheckCircle2 size={46}/></span><span className="eyebrow">LAPORAN TERKIRIM</span><h1>Terima kasih!</h1><p>Laporan kegiatan berhasil dikirim dan akan ditinjau oleh administrator.</p><div className="hero-actions"><Link href="/" className="button secondary">Kembali ke Beranda</Link><Link href="/lapor" className="button primary">Kirim Laporan Lain <ArrowRight size={17}/></Link></div></main><SiteFooter/></>;
}
