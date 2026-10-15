import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "proker_admin_session";
const secret = () => {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) throw new Error("AUTH_SECRET must be at least 32 characters.");
  return value;
};
const sign = (value: string) => createHmac("sha256", secret()).update(value).digest("hex");

export function createSession(adminId: string): string {
  const payload = Buffer.from(JSON.stringify({ adminId, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}
export function verifySession(token?: string): { adminId: string } | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = Buffer.from(sign(payload));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { adminId: string; exp: number };
    if (!data.adminId || data.exp < Date.now()) return null;
    return { adminId: data.adminId };
  } catch { return null; }
}
export async function currentAdmin() {
  const jar = await cookies();
  const session = verifySession(jar.get(COOKIE)?.value);
  if (!session) return null;
  const { prisma } = await import("@/lib/prisma");
  return prisma.admin.findUnique({ where: { id: session.adminId }, select: { id: true, name: true, email: true } });
}
export async function requireAdmin() {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
export const sessionCookieName = COOKIE;
