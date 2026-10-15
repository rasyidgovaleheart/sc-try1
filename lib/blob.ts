import { put, del } from "@vercel/blob";

export const evidenceMimeTypes = new Set([
  "image/jpeg", "image/png", "image/webp", "video/mp4", "video/quicktime", "video/webm"
]);
export const logoMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function uploadBlob(file: File, folder: string) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error("BLOB_READ_WRITE_TOKEN belum diatur.");
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-100) || "upload";
  const blob = await put(`${folder}/${Date.now()}-${crypto.randomUUID()}-${safeName}`, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type,
    token: process.env.BLOB_READ_WRITE_TOKEN
  });
  return { url: blob.url, pathname: blob.pathname };
}
export async function deleteBlob(pathname: string) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;
  await del(pathname, { token: process.env.BLOB_READ_WRITE_TOKEN });
}
