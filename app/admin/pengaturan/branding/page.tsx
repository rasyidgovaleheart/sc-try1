import { prisma } from "@/lib/prisma";
import BrandingForm from "./BrandingForm";
export const dynamic="force-dynamic";
export default async function BrandingPage(){
 const s=await prisma.siteSettings.findUnique({where:{id:"main"}});
 return <><div className="admin-page-header"><div><span className="eyebrow">PENGATURAN WEBSITE</span><h1>Branding</h1><p>Atur nama, deskripsi, dan logo website.</p></div></div><BrandingForm settings={s||{siteName:"Laporan Program Kerja",siteDescription:"Portal pelaporan program kerja.",headerLogoUrl:null,footerLogoUrl:null}}/></>;
}
