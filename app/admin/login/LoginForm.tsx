"use client";
import { useState } from "react";
export default function LoginForm() {
  const [error,setError] = useState("");
  const [busy,setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login",{method:"POST",body:fd});
    const data = await res.json().catch(()=>({}));
    if (!res.ok) { setError(data.error || "Login gagal."); setBusy(false); return; }
    window.location.href="/admin/dashboard";
  }
  return <form onSubmit={submit} className="stack-form"><label>Email<input type="email" name="email" required autoComplete="username"/></label><label>Password<input type="password" name="password" required autoComplete="current-password"/></label>{error && <p className="error-message">{error}</p>}<button className="button primary" disabled={busy}>{busy?"Memeriksa...":"Masuk"}</button></form>;
}
