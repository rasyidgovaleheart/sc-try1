import { prisma } from "@/lib/prisma";
import ProkerManager from "./ProkerManager";
export const dynamic="force-dynamic";
export default async function ProkerPage(){
 const [prokers,divisions]=await Promise.all([prisma.proker.findMany({orderBy:{createdAt:"desc"}}),prisma.division.findMany({orderBy:{name:"asc"}})]);
 return <><div className="admin-page-header"><div><span className="eyebrow">DATA MASTER</span><h1>Program Kerja</h1><p>Tambah dan kelola daftar program kerja.</p></div></div><ProkerManager initial={prokers.map(p=>({...p,createdAt:p.createdAt.toISOString()}))} divisions={divisions.map(d=>({id:d.id,name:d.name}))}/></>;
}
