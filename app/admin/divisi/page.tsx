import { prisma } from "@/lib/prisma";
import DivisionManager from "./DivisionManager";
export const dynamic="force-dynamic";
export default async function DivisionPage(){
 const divisions=await prisma.division.findMany({orderBy:{name:"asc"},include:{_count:{select:{reports:true}}}});
 return <><div className="admin-page-header"><div><span className="eyebrow">DATA MASTER</span><h1>Divisi</h1><p>Kelola divisi yang tersedia di formulir laporan.</p></div></div><DivisionManager initial={divisions.map(d=>({...d,createdAt:d.createdAt.toISOString(),updatedAt:d.updatedAt.toISOString()}))}/></>;
}
