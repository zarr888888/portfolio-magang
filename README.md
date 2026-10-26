# Portofolio Magang

Portofolio satu halaman berbahasa Indonesia berdasarkan CV: profil, pendidikan, organisasi, AQUARA, keterampilan, dan kontak. Next.js 16, React 19, TypeScript, Tailwind CSS, next-themes, dan lucide-react. Tidak menggunakan API runtime, analytics, widget, atau font eksternal.

## Menjalankan lokal

```powershell
Set-Location 'C:\Portofolio\portfolio-magang'
npm ci --no-audit --no-fund
npm run dev
```

Development memakai root tanpa basePath. Setelah perubahan konfigurasi/dependency, restart dev server yang sudah berjalan.

## Validasi dan preview static

```powershell
npm run typecheck
npm run lint
npm run build
npm run verify:export
npm run preview
```

Preview lokal: `http://127.0.0.1:4173/portfolio-magang/`. Hasil build: `C:\Portofolio\portfolio-magang\out`. `npm start` juga menjalankan preview static, bukan server Next.js.

## Data dan persetujuan publikasi

- Data utama: `C:\Portofolio\portfolio-magang\config\portfolio.ts`.
- Email sengaja `null`; jangan aktifkan sebelum pemilik menyetujui publikasinya.
- Foto publik saat ini tersedia dan telah disetujui pemilik; Hero menggunakan foto tersebut.
- Foto kandidat dipindahkan tanpa modifikasi ke `C:\Portofolio\portfolio-magang\private-assets\portofolio-unconfirmed.jpeg`.
- PDF yang belum disetujui dipindahkan ke `C:\Portofolio\portfolio-magang\private-assets\cv-verlita-unapproved.pdf`.
- PDF publik saat ini beserta seluruh isinya telah disetujui pemilik; Download CV aktif. Persetujuan ini tidak mengaktifkan email kontak website.
- Semua file dalam public dapat diakses langsung setelah deploy, meskipun tidak ditautkan. Jangan menyimpan dokumen belum disetujui di sana.
- Screenshot AQUARA opsional: `C:\Portofolio\portfolio-magang\public\images\aquara.webp`. Saat belum tersedia, tampil ilustrasi berlabel, bukan screenshot rekaan.
- Domain/username GitHub, tautan repository proyek, dan demo belum diberikan; tidak dibuat URL rekaan. Canonical URL dan sitemap belum diaktifkan.
- Verifikasi mengikuti flag persetujuan dan SHA-256 di config/portfolio.ts. Hanya versi foto/PDF yang disetujui diterima. File tambahan dalam public ditolak sampai allowlist diperbarui berdasarkan persetujuan. Jangan mengganti hash untuk file baru tanpa izin.

## GitHub Pages — hanya setelah persetujuan

1. Tinjau perubahan dan isi publik terlebih dahulu. Jangan unggah `.env.local`, `private-assets`, `.template-backup`, atau `test-results`.
2. Setelah izin, buat repository baru bernama `portfolio-magang`; periksa remote agar tidak mengarah ke repository template. Jangan membawa riwayat proyek lain atau credential.
3. Commit dan push hanya setelah disetujui pemilik.
4. Repository Settings → Pages → Source: GitHub Actions.
5. Actions → Deploy portfolio to GitHub Pages → Run workflow pada branch yang telah ditinjau.
6. Buka URL hasil job deployment. Workflow hanya `workflow_dispatch`; push tidak otomatis deploy.

Workflow menggunakan build static, artifact `out`, izin minimum, dan environment `github-pages`. Base path production `/portfolio-magang`; jangan menambahkan prefix kedua pada Next Link. Fungsi `assetPath` digunakan untuk aset public.

## Pengujian 26 Oktober 2026

- TypeScript, lint TS/TSX, dan build berhasil.
- Verifikasi output: identitas, tujuh anchor navigasi, basePath, keberadaan aset, tidak ada API dan dokumen privat.
- Chrome headless pada 1440, 768, 390, 320 px: tidak ada overflow horizontal, tema dapat diganti dan bertahan setelah reload, menu mobile berfungsi, detail proyek dapat dibuka, tidak ada runtime exception atau HTTP error.
- Screenshot lokal di `C:\Portofolio\portfolio-magang\test-results` (diabaikan Git).
- Finalisasi: foto dan seluruh isi PDF disetujui melalui konfirmasi pengguna. Hasil pengujian finalisasi dilaporkan terpisah.
- Workflow GitHub belum dijalankan; deployment nyata belum dilakukan.

## Keamanan dan lisensi

Next.js diperbarui terbatas dari 16.0.10 ke 16.4.1, beserta konfigurasi/plugin ESLint Next yang selaras. Tidak menjalankan audit ulang atau `npm audit fix --force`. Dependency template yang tidak lagi diimpor masih dapat tersisa di manifest; static export bukan jaminan bebas risiko dependency/build.

Halaman, API, komponen, konten, serta aset template yang tidak digunakan dipindah ke `C:\Portofolio\portfolio-magang\.template-backup` (lokal, diabaikan Git). Tidak mengubah proyek AQUARA/SAMUDERA. File LICENSE asli dan copyright MIT dipertahankan, bukan digunakan sebagai identitas profil.
