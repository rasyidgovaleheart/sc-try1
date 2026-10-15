import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Laporan Program Kerja", description: "Portal pelaporan program kerja organisasi." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
