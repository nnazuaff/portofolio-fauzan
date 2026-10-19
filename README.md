# Fauzan Portfolio

Next.js App Router, Tailwind CSS, Framer Motion, Lenis. Static export; tanpa backend.

## Lokal

```bash
npm ci
npm run dev
```

Buka http://localhost:3000. Klik layar atau tekan Enter/Space untuk masuk. Splash muncul setiap refresh dengan konten utama diburamkan, posisi halaman kembali ke atas, dan scroll terkunci sampai masuk.

## Konten dan background

- Profil, tujuh proyek, keahlian, sosial: `lib/portfolio.ts`.
- Ganti `backgroundMedia.src` dengan MP4 milik sendiri atau URL placeholder publik di objek yang sama.
- Video lokal: `public/media/ambient.mp4`. Poster: `public/media/hero-poster.webp`.
- Sumber dan lisensi media/font dicatat di folder aset masing-masing.
- Plus Jakarta Sans di-host lokal melalui `next/font/local`; build tidak mengambil font dari Google.
- Video dengan audio asli, loop, playsInline; baru dimuat setelah klik masuk atau putar manual. Kontrol jeda ada di pojok kanan atas. Video dijeda ketika hero keluar viewport atau tab tersembunyi.
- Reduced motion dan Save-Data memakai poster; video bisa dimainkan manual. Touch memakai scrolling native. JavaScript diperlukan untuk melewati splash.

## Verifikasi

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

`npm run build` menghasilkan `out/` untuk static hosting. `npm run start` melayani hasil export. Jangan mengekspos development server ke publik.

Untuk metadata produksi, salin `.env.example` menjadi `.env.local`, lalu isi `NEXT_PUBLIC_SITE_URL`.

## Dependency baseline

Audit penuh awal: 15 temuan (1 critical, 11 high, 3 moderate). Dengan lockfile asli dipertahankan, `npm audit --omit=dev` melaporkan 3 temuan (1 critical, 2 high); pemulihan metadata dependency oleh npm sempat memasukkan tooling ke hitungan produksi, bukan perubahan keamanan. Tidak dilakukan forced upgrade Next.js/Tailwind di dalam pekerjaan visual ini. Static export tidak menjalankan server Next.js atau Image Optimizer di hosting, tetapi temuan dependency tetap perlu ditangani sebelum berpindah ke runtime server.
