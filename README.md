# PROKER Reporting System — Next.js + PostgreSQL + Vercel Blob

A starter full-stack system for public work-program reporting and admin management.

## Included
- Public homepage and report submission form
- Image/video evidence uploads to Vercel Blob
- PostgreSQL data storage with Prisma
- Admin login using signed HTTP-only cookie sessions
- Admin dashboard, reports/status management, PROKER CRUD, division CRUD
- Branding settings and header/footer logo upload to Blob
- Responsive UI

## Important data-safety note
This is a new project scaffold. It cannot contain records from a previous website/database. Deploy and test against a **new/staging PostgreSQL database first**. Back up any production database before changing schemas. Never run `prisma migrate reset` against production.

## 1. Install
```bash
npm install
```

## 2. Configure environment
Copy `.env.example` to `.env` and fill in:
- `DATABASE_URL`: PostgreSQL connection string
- `AUTH_SECRET`: long random secret (32+ characters)
- `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`: initial admin login
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob read/write token
- `NEXT_PUBLIC_SITE_URL`: deployed site URL

Do not commit `.env`.

## 3. Create database tables and admin
```bash
npx prisma generate
npx prisma db push
npm run seed
```
The seed command creates the admin account from `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`, and adds sample divisions/PROKER only if the database is empty.

## 4. Run locally
```bash
npm run dev
```
Visit `/` and `/admin/login`.

## 5. Deploy to Vercel
1. Push this folder to a private GitHub repository.
2. Import the repository in Vercel.
3. Add the environment variables in Vercel Project Settings → Environment Variables.
4. Make sure the production `DATABASE_URL` points to the intended database.
5. Deploy. Run `npx prisma db push` from a trusted local terminal using the production environment only after taking a backup. For automated production schema migrations, prefer checked-in Prisma migrations and review them before applying.
6. Confirm the Vercel Blob token has read/write permission.

## Upload limits
The API currently limits each uploaded file to 20 MB and accepts JPG/JPEG/PNG/WEBP images plus MP4/MOV/WEBM videos. Logo uploads are limited to 5 MB. SVG is intentionally not accepted by default because arbitrary SVG files can contain active content.

## Security
- Admin routes are protected by a signed HTTP-only cookie.
- Passwords are stored as scrypt hashes.
- Set a strong unique `AUTH_SECRET` and admin password.
- Use HTTPS in production.
- This starter is not a substitute for a security review before handling sensitive or high-value data.
