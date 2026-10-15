import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/password";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD before running npm run seed.");
  }
  const name = process.env.ADMIN_NAME || "Administrator";
  await prisma.admin.upsert({
    where: { email },
    update: { name },
    create: { name, email, passwordHash: await hashPassword(password) }
  });

  if ((await prisma.division.count()) === 0) {
    await prisma.division.createMany({
      data: [
        { name: "Sekretariat", description: "Administrasi dan dokumentasi" },
        { name: "Acara", description: "Perencanaan dan pelaksanaan kegiatan" },
        { name: "Humas", description: "Informasi dan komunikasi" }
      ]
    });
  }
  if ((await prisma.proker.count()) === 0) {
    await prisma.proker.createMany({
      data: [
        { name: "Program Kerja Umum", description: "Program kerja umum organisasi", period: "2026/2027", status: "Aktif" }
      ]
    });
  }
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: { id: "main", siteName: "Laporan Program Kerja", siteDescription: "Portal pelaporan program kerja." }
  });
  console.log("Seed complete. Admin account is ready.");
}

main().finally(async () => prisma.$disconnect());
