"use client";
import { useState } from "react";
export default function ReportStatusForm({id,status,notes}:{id:string;status:string;notes:string}) {
 const [value,setValue]=useState(status); const [note,setNote]=useState(notes); const [message,setMessage]=useState(""); const [busy,setBusy]=useState(false);
 async function save(){setBusy(true);setMessage("");const res=await fetch(`/api/reports/${id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:value,adminNotes:note})});const data=await res.json().catch(()=>({}));setMessage(res.ok?"Perubahan tersimpan.":(data.error||"Gagal menyimpan."));setBusy(false);}
 return <div className="stack-form"><label>Status<select value={value} onChange={e=>setValue(e.target.value)}>{["Menunggu","Diproses","Disetujui","Ditolak"].map(s=><option key={s}>{s}</option>)}</select></label><label>Catatan admin<textarea rows={5} value={note} onChange={e=>setNote(e.target.value)} maxLength={3000} placeholder="Catatan untuk internal..."/></label>{message&&<p className={message.includes("tersimpan")?"success-message":"error-message"}>{message}</p>}<button onClick={save} className="button primary" disabled={busy}>{busy?"Menyimpan...":"Simpan Perubahan"}</button></div>;
}
