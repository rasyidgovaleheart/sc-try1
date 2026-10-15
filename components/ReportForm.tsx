"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Option = { id: string; name: string };
export default function ReportForm({ prokers, divisions }: { prokers: Option[]; divisions: Option[] }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(""); setBusy(true);
    const form = e.currentTarget;
    try {
      const data = new FormData(form);
      const upload = new FormData();
      files.forEach(f => upload.append("files", f));
      const uploadRes = await fetch("/api/uploads/evidence", { method: "POST", body: upload });
      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadJson.error || "Gagal mengunggah bukti.");
      data.set("evidence", JSON.stringify(uploadJson.files || []));
      const res = await fetch("/api/reports", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal mengirim laporan.");
      router.push("/success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally { setBusy(false); }
  }

  function chooseFiles(list: FileList | null) {
    if (!list) return;
    const selected = Array.from(list);
    const valid = selected.filter(f => ["image/jpeg","image/png","image/webp","video/mp4","video/quicktime","video/webm"].includes(f.type) && f.size <= 20 * 1024 * 1024);
    if (valid.length !== selected.length) setError("File harus JPG, PNG, WEBP, MP4, MOV, atau WEBM dan maksimal 20 MB per file.");
    setFiles(valid.slice(0, 10));
  }
  return <form className="form-card report-form" onSubmit={submit}>
    <div className="form-grid">
      <label>Nama pelapor *<input name="reporterName" required maxLength={120} placeholder="Nama lengkap"/></label>
      <label>Email (opsional)<input name="reporterEmail" type="email" maxLength={180} placeholder="nama@email.com"/></label>
      <label className="full">Judul laporan *<input name="title" required maxLength={180} placeholder="Contoh: Pelaksanaan Rapat Kerja"/></label>
      <label>Program kerja<select name="prokerId" defaultValue=""><option value="">Pilih program kerja (opsional)</option>{prokers.map(p => <option value={p.id} key={p.id}>{p.name}</option>)}</select></label>
      <label>Divisi<select name="divisionId" defaultValue=""><option value="">Pilih divisi (opsional)</option>{divisions.map(d => <option value={d.id} key={d.id}>{d.name}</option>)}</select></label>
      <label>Tanggal kegiatan<input name="eventDate" type="date"/></label>
      <label className="full">Deskripsi kegiatan *<textarea name="description" required minLength={10} maxLength={5000} rows={6} placeholder="Jelaskan kegiatan, hasil, dan kendala yang ditemukan..."/></label>
      <label className="full">Dokumentasi kegiatan<input type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm" multiple onChange={e => chooseFiles(e.target.files)}/><small>Format JPG, PNG, WEBP, MP4, MOV, WEBM. Maksimal 20 MB/file, hingga 10 file.</small></label>
    </div>
    {files.length > 0 && <div className="file-list"><strong>{files.length} file dipilih</strong>{files.map((f,i) => <div key={`${f.name}-${i}`}>{f.name} <button type="button" className="text-button" onClick={() => setFiles(old => old.filter((_,j)=>i!==j))}>Hapus</button></div>)}</div>}
    {error && <p className="error-message">{error}</p>}
    <button className="button primary" disabled={busy}>{busy ? "Mengirim laporan..." : "Kirim Laporan"}</button>
  </form>;
}
